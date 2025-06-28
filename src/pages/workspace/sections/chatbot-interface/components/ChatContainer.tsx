import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';
import ChatLoader from './ChatLoader';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatContainerProps {
  messages: ChatMessageType[];
  loading: boolean;
  theme: 'dark' | 'light';
}

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, loading, theme }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className={`flex-1 w-full overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 ${theme === 'dark' ? 'bg-[#0F2027]/50' : 'bg-white/30'} backdrop-blur-sm scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-500 dark:hover:scrollbar-thumb-blue-500`}>
      <div className="w-full max-w-screen-2xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className={`p-6 sm:p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md shadow-lg border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} max-w-md w-full text-center`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path d="M13 8H7"/>
                  <path d="M17 12H7"/>
                  <path d="M17 16h-5"/>
                </svg>
              </div>
              <h3 className={`text-xl font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.workspace.chatbot.startTitle}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {t.workspace.chatbot.startSubtitle}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} theme={theme} />
            ))}
            {loading && (
              <div className="flex justify-start mt-4">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-md shadow-md`}>
                  <ChatLoader theme={theme} />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer; 