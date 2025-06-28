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
    <div className={`flex-1 w-full overflow-y-auto ${theme === 'dark' ? 'bg-[#0F2027]/50' : 'bg-white/30'} backdrop-blur-sm scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-500 dark:hover:scrollbar-thumb-blue-500`}>
      {/* Top Images Section */}
      <div className="relative w-full">
        {/* Hero Banner */}
        <div className={`relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-100/50 to-purple-100/50'} backdrop-blur-sm`}>
          {/* Background Pattern/Image Placeholder */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme === 'dark' ? '#ffffff' : '#000000'} strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Floating Chat Icons */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto px-6">
              {/* Chat Bubble 1 */}
              <div className={`absolute top-4 left-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-200/60'} backdrop-blur-sm flex items-center justify-center animate-float`}>
                <svg className={`w-6 h-6 sm:w-8 sm:h-8 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              
              {/* Chat Bubble 2 */}
              <div className={`absolute top-8 right-12 w-10 h-10 sm:w-14 sm:h-14 rounded-full ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-200/60'} backdrop-blur-sm flex items-center justify-center animate-float-delayed`}>
                <svg className={`w-5 h-5 sm:w-7 sm:h-7 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                </svg>
              </div>
              
              {/* AI Brain Icon */}
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30' : 'bg-gradient-to-br from-blue-300/50 to-purple-300/50'} backdrop-blur-sm flex items-center justify-center animate-pulse`}>
                <svg className={`w-8 h-8 sm:w-10 sm:h-10 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              {/* Message Dots */}
              <div className={`absolute top-1/2 right-1/4 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-200/60'} backdrop-blur-sm flex items-center justify-center animate-bounce`}>
                <div className="flex space-x-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-green-300' : 'bg-green-600'} animate-pulse`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-green-300' : 'bg-green-600'} animate-pulse`} style={{animationDelay: '0.2s'}}></div>
                  <div className={`w-1.5 h-1.5 rounded-full ${theme === 'dark' ? 'bg-green-300' : 'bg-green-600'} animate-pulse`} style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="text-center">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                AI Assistant
              </h2>
              <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Your intelligent conversation partner
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Section */}
      <div className="p-3 sm:p-4 md:p-6 space-y-4">
        <div className="w-full max-w-screen-2xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[300px]">
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;