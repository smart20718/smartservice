import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import { ChatMessage, ChatState } from './types';
import { sendMessageStream, StreamResponse, generateChatName } from './services/geminiService';
import { ChevronDown, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/overlays/dropdown-menu';
import { supabase } from '@/lib/supabase';
import { useUserProfileContext } from '@/user-profile/UserProfileContext';

// Helper function to generate UUID using the browser's crypto API
const generateUUID = (): string => {
  return crypto.randomUUID();
};

type Chat = {
  id: string;
  chat_name: string;
};

const ChatbotInterface: React.FC = () => {
  const { profile } = useUserProfileContext();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  });

  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [chatName, setChatName] = useState('New Chat');

  const assistantContentRef = useRef('');

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const fetchRecentChats = async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('chats')
      .select('id, chat_name')
      .eq('user_id', profile.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching recent chats:', error);
    } else {
      setRecentChats(data);
      if (data.length > 0 && !activeChat) {
        setActiveChat(data[0]);
        setChatName(data[0].chat_name);
      } else if (data.length === 0) {
        // If no chats, create one
        createNewChat();
      }
    }
  };

  const createNewChat = async () => {
    if (!profile) return;
    const newChatName = `Chat on ${new Date().toLocaleString()}`;
    const { data, error } = await supabase
      .from('chats')
      .insert({ user_id: profile.id, chat_name: newChatName })
      .select()
      .single();

    if (error) {
      console.error('Error creating new chat:', error);
    } else {
      setActiveChat(data);
      setChatName(data.chat_name);
      setRecentChats([data, ...recentChats]);
      setChatState({ messages: [], loading: false, error: null });
    }
  };

  useEffect(() => {
    if (profile) {
      fetchRecentChats();
    }
  }, [profile]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat) return;

      const { data, error } = await supabase
        .from('chat_messages')
        .select('message')
        .eq('chat_id', activeChat.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setChatState((prev) => ({
          ...prev,
          messages: data.map((d: any) => ({ ...d.message, timestamp: new Date(d.message.timestamp) })),
        }));
      }
    };

    fetchMessages();
  }, [activeChat]);

  const handleSendMessage = useCallback(async (content: string, file?: File | null) => {
    if (!activeChat) return;

    // List of audio extensions for quick checks
    const AUDIO_EXTENSIONS = ['mp3','wav','ogg','webm','aac','m4a'];

    const userMessage: ChatMessage = {
      id: generateUUID(),
      role: 'user',
      content: content || '',
      timestamp: new Date(),
    };
    
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      userMessage.attachmentName = file.name;
      userMessage.attachmentUrl = objectUrl;

      const ext = file.name.split('.').pop()?.toLowerCase();
      const isAudio = AUDIO_EXTENSIONS.includes(ext || '');

      if (!content.trim() && !isAudio) {
        userMessage.content = `I've uploaded a file: ${file.name}`;
      }
    }

    const isAudioFile = file ? AUDIO_EXTENSIONS.includes(file.name.split('.').pop()?.toLowerCase() || '') : false;

    const assistantMessageId = generateUUID();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: file ? (isAudioFile ? '' : 'Analyzing your document...') : '',
      timestamp: new Date(),
    };

    // This is the history to pass to the AI. It should be the *current* state + the new user message.
    const historyForAI = [...chatState.messages, userMessage];

    // Update UI immediately with the user message and a placeholder for the assistant
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, assistantMessage],
      loading: true,
      error: null,
    }));

    // Save user message to the database
    await supabase.from('chat_messages').insert({ chat_id: activeChat.id, message: userMessage });

    assistantContentRef.current = '';

    sendMessageStream(
      historyForAI, // Pass the correct history to the AI
      file ?? null,
      (chunk: StreamResponse) => {
        assistantContentRef.current += chunk.text;
        setChatState((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: (msg.content === 'Analyzing your document...' || msg.content === '') ? chunk.text : msg.content + chunk.text }
              : msg
          ),
        }));
      },
      (error: Error) => {
        // Handle errors and save the error message
        const errorMessage = { ...assistantMessage, content: `Error: ${error.message}` };
        setChatState((prev) => ({
          ...prev,
          messages: prev.messages.map(msg => msg.id === assistantMessageId ? errorMessage : msg),
          loading: false,
          error: error.message,
        }));
        supabase.from('chat_messages').insert({ chat_id: activeChat.id, message: errorMessage });
      },
      () => {
        const finalAssistant: ChatMessage = {
          ...assistantMessage,
          content: assistantContentRef.current,
          timestamp: new Date(),
        };
        supabase.from('chat_messages')
          .insert({ chat_id: activeChat.id, message: finalAssistant })
          .then(async ({ error }) => {
            if (error) {
              console.error('Error saving assistant message:', error);
            }
            // Update state: replace placeholder with final content and stop loading
            setChatState((prev) => ({
              ...prev,
              messages: prev.messages.map((msg) =>
                msg.id === assistantMessageId ? { ...msg, content: finalAssistant.content } : msg
              ),
              loading: false,
            }));

            // NOW: Generate a concise chat title only once we have the assistant's reply
            const userMessageCount = [...chatState.messages, userMessage].filter(m => m.role === 'user').length;
            if (userMessageCount === 3 && activeChat.chat_name.startsWith('Chat on')) {
              try {
                const newName = await generateChatName([...chatState.messages, userMessage, finalAssistant]);
                setChatName(newName);
                setActiveChat(prev => (prev ? { ...prev, chat_name: newName } : null));
                setRecentChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, chat_name: newName } : c));
                await supabase.from('chats').update({ chat_name: newName }).eq('id', activeChat.id);
              } catch (err) {
                console.error('Error generating chat name:', err);
              }
            }
          });
      }
    );
  }, [activeChat, chatState.messages]); // Keep dependencies to ensure correct state is used

  const deleteCurrentChat = async () => {
    if (!activeChat) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this chat? This action cannot be undone.');
    if (!confirmDelete) return;

    // Delete chat (messages cascade)
    const { error } = await supabase.from('chats').delete().eq('id', activeChat.id);
    if (error) {
      console.error('Error deleting chat:', error);
      return;
    }

    // Update UI
    const remaining = recentChats.filter(c => c.id !== activeChat.id);
    setRecentChats(remaining);
    if (remaining.length > 0) {
      setActiveChat(remaining[0]);
      setChatName(remaining[0].chat_name);
    } else {
      // create new empty chat automatically
      setActiveChat(null);
      setChatName('New Chat');
      setChatState({ messages: [], loading: false, error: null });
      createNewChat();
    }
  };

  return (
    <div className={`h-full w-full flex flex-col ${theme === 'dark' ? 'bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364]' : 'bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3]'}`}>
      {/* Header */}
      <div className={`py-4 px-4 md:px-6 ${theme === 'dark' ? 'bg-[#0a1a20]/70' : 'bg-white/70'} backdrop-blur-md border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between z-10`}>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`flex items-center gap-2 text-left ${theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'}`}>
                <div className="relative">
                  <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{chatName}</h2>
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <ChevronDown className={`h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'}`}>
              <DropdownMenuItem 
                onSelect={createNewChat} 
                className={`flex items-center gap-2 ${theme === 'dark' ? 'focus:bg-gray-700' : 'focus:bg-gray-100'}`}
              >
                <PlusCircle className="h-4 w-4" />
                New Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {recentChats.map(chat => (
                <DropdownMenuItem 
                  key={chat.id} 
                  onSelect={() => {
                    setActiveChat(chat);
                    setChatName(chat.chat_name);
                  }}
                  className={`${theme === 'dark' ? 'focus:bg-gray-700' : 'focus:bg-gray-100'}`}
                >
                  {chat.chat_name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className={`text-red-600 ${theme === 'dark' ? 'focus:bg-gray-700' : 'focus:bg-gray-100'}`} 
                onSelect={deleteCurrentChat}
              >
                Delete Chat
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <ChatContainer 
          messages={chatState.messages} 
          loading={chatState.loading}
          theme={theme} 
        />
        
        <div className={`p-2 sm:p-3 md:p-4 ${theme === 'dark' ? 'bg-[#0a1a20]/70' : 'bg-white/70'} backdrop-blur-md border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="w-full max-w-screen-2xl mx-auto">
            <ChatInput 
              onSendMessage={handleSendMessage}
              disabled={chatState.loading}
              theme={theme}
            />
            {chatState.error && (
              <div className="mt-2 text-red-500 text-sm">
                Error: {chatState.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface; 