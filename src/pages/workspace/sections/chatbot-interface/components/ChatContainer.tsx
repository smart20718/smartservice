import React, { useRef, useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    // Animation d'entrée pour le conteneur
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        flex-1 w-full overflow-y-auto p-3 sm:p-4 md:p-6 space-y-4 
        ${theme === 'dark' ? 'bg-[#0F2027]/50' : 'bg-white/30'} 
        backdrop-blur-sm scrollbar-thin scrollbar-thumb-blue-400 
        dark:scrollbar-thumb-blue-600 scrollbar-track-transparent 
        hover:scrollbar-thumb-blue-500 dark:hover:scrollbar-thumb-blue-500
        transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="w-full max-w-screen-2xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div 
              className={`
                p-6 sm:p-8 rounded-2xl 
                ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/50'} 
                backdrop-blur-md shadow-lg border 
                ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-200/50'} 
                max-w-md w-full text-center
                transform transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
                hover:scale-105 hover:shadow-xl
                animate-pulse-subtle
              `}
              style={{
                animation: isVisible ? 'float 6s ease-in-out infinite' : 'none'
              }}
            >
              <div 
                className={`
                  w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center 
                  ${theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-100'}
                  transform transition-all duration-500 ease-out
                  hover:rotate-12 hover:scale-110
                  animate-bounce-gentle
                `}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`
                    ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}
                    transform transition-all duration-300 ease-out
                    hover:scale-110
                  `}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path d="M13 8H7"/>
                  <path d="M17 12H7"/>
                  <path d="M17 16h-5"/>
                </svg>
              </div>
              <h3 
                className={`
                  text-xl font-medium mb-2 
                  ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
                  transform transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '300ms' }}
              >
                {t.workspace.chatbot.startTitle}
              </h3>
              <p 
                className={`
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-4
                  transform transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '500ms' }}
              >
                {t.workspace.chatbot.startSubtitle}
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="transform transition-all duration-500 ease-out animate-slide-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <ChatMessage message={message} theme={theme} />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start mt-4 animate-fade-in">
                <div 
                  className={`
                    p-4 rounded-2xl 
                    ${theme === 'dark' ? 'bg-gray-800/70' : 'bg-white/70'} 
                    backdrop-blur-md shadow-md
                    transform transition-all duration-300 ease-out
                    animate-pulse-gentle
                  `}
                >
                  <ChatLoader theme={theme} />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;