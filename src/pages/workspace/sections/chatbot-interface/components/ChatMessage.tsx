import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Avatar } from '@/components/ui/data-display/avatar';
import { ChatMessage as ChatMessageType } from '../types';
import { useUserProfileContext } from '@/user-profile/UserProfileContext';
import { formatDistanceToNow } from 'date-fns';
import { Download, Copy, Check, Paperclip } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  theme: 'dark' | 'light';
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, theme }) => {
  const { profile } = useUserProfileContext();
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const hasAttachment = message.attachmentName && message.attachmentUrl;
  const hasContent = message.content && message.content.trim().length > 0;

  const copyToClipboard = () => {
    if (message.content) {
      navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // File type detection for icon selection
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['pdf'].includes(extension || '')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'heic', 'heif'].includes(extension || '')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      );
    } else if (['doc', 'docx'].includes(extension || '')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
      );
    } else {
      return <Paperclip className="h-4 w-4" />;
    }
  };

  // If this is an attachment-only message with no content, don't render it
  if (!hasContent && !hasAttachment) {
    return null;
  }

  return (
    <div className={`group flex gap-3 md:gap-4 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className={`h-8 w-8 md:h-10 md:w-10 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-md shrink-0`}>
          <img src="/Smart_service_logo.png" alt="Smart Service Agent" />
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
            {isUser ? profile?.username || 'You' : 'Smart Service Agent'}
          </span>
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <div className="relative group w-full">
          <div 
            className={`px-4 py-3 sm:px-5 sm:py-3 rounded-2xl shadow-lg backdrop-blur-md w-full
              ${isUser 
                ? theme === 'dark'
                  ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white border border-blue-500/30'
                  : 'bg-gradient-to-r from-blue-500/80 to-indigo-500/80 text-white border border-blue-400/30'
                : theme === 'dark'
                  ? 'bg-gray-800/70 text-white border border-gray-700/50'
                  : 'bg-white/70 text-gray-800 border border-gray-200/50'
              }
              ${!isUser && theme === 'dark' ? 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' : ''}
            `}
          >
            {/* Message content */}
            {hasContent && (
              <div className={`prose dark:prose-invert max-w-none whitespace-pre-wrap break-words ${
                hasAttachment ? 'mb-3 pb-3 border-b border-opacity-20 border-current' : ''
              }`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
              </div>
            )}
            
            {/* Attachment */}
            {hasAttachment && (() => {
              const ext = message.attachmentName?.split('.').pop()?.toLowerCase();
              const isImage = ['jpg','jpeg','png','gif','webp','bmp','svg','heic','heif'].includes(ext || '');
              const isAudio = ['mp3','wav','ogg','webm','aac','m4a'].includes(ext || '');
              if (isImage && message.attachmentUrl) {
                return (
                  <img
                    src={message.attachmentUrl}
                    alt={message.attachmentName}
                    className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg max-h-60 object-contain rounded-lg mt-2 border border-current/10"
                  />
                );
              }
              if (isAudio && message.attachmentUrl) {
                return (
                  <div className="flex flex-col mt-2 gap-2 w-full">
                    <audio controls src={message.attachmentUrl} className="w-full rounded-md overflow-hidden" />
                    <div className="text-xs opacity-80 truncate max-w-full">{message.attachmentName}</div>
                  </div>
                );
              }
              return (
              <a 
                href={message.attachmentUrl} 
                download={message.attachmentName}
                className={`flex items-center gap-2 p-2 rounded-lg 
                  ${theme === 'dark' 
                    ? isUser 
                      ? 'bg-blue-700/50 hover:bg-blue-800/50' 
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                    : isUser
                      ? 'bg-blue-600/20 hover:bg-blue-600/30'
                      : 'bg-gray-200/50 hover:bg-gray-300/50'
                  } 
                  transition-colors`}
              >
                <div className={`p-2 rounded-lg ${
                  theme === 'dark' 
                    ? isUser ? 'bg-blue-800/70' : 'bg-gray-800/70' 
                    : isUser ? 'bg-blue-700/20' : 'bg-gray-300/50'
                }`}>
                    {getFileIcon(message.attachmentName || '')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium text-sm">{message.attachmentName}</div>
                  <div className="text-xs opacity-80">Click to download</div>
                </div>
                <Download className="h-4 w-4 shrink-0" />
              </a>
              );
            })()}
          </div>
        </div>
          {/* Copy button */}
        {!isUser && hasContent && (
          <div className={`flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
            <button 
              onClick={copyToClipboard}
              className={`flex items-center gap-1 text-xs p-1 rounded-full
                ${theme === 'dark' 
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50' 
                  : 'bg-white/80 border border-gray-200/50 text-gray-600 hover:bg-gray-300/70'}`}
            >
              {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          )}
      </div>
      
      {isUser && (
        <Avatar className={`h-8 w-8 md:h-10 md:w-10 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-md shrink-0`}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={profile?.username || 'User'} />
          ) : (
            <div className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} h-full w-full flex items-center justify-center text-white font-medium`}>
              {profile?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage; 