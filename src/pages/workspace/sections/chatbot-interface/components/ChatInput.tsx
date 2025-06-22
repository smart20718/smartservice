import React, { useState, KeyboardEvent, ChangeEvent, useRef } from 'react';
import { Send, Paperclip, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { audioBlobToFileData } from '../utils/audioUtils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInputProps {
  onSendMessage: (message: string, file?: File | null) => void;
  disabled: boolean;
  theme: 'dark' | 'light';
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, theme }) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = useState(false);
  const { t } = useLanguage();

  const handleSend = () => {
    if ((message.trim() || selectedFile) && !disabled) {
      onSendMessage(message, selectedFile);
      setMessage('');
      
      // Reset height of textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      
      // Clear selected file after sending
      setSelectedFile(null);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Don't send immediately, wait for user to click send
      // onSendAttachment(file);
      // reset value so same file can be selected again
      e.target.value = '';
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const startRecording = async () => {
    if (recording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const { file } = await audioBlobToFileData(blob);
        setSelectedFile(file);
        setRecording(false);
      };
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
    } catch (err) {
      console.error('Microphone access error', err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {selectedFile && (() => {
        const ext = selectedFile.name.split('.').pop()?.toLowerCase();
        const isImage = ['jpg','jpeg','png','gif','webp','bmp','svg','heic','heif'].includes(ext || '');
        const previewUrl = URL.createObjectURL(selectedFile);
        return (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-800/70 border border-gray-700/50' 
              : 'bg-gray-100/70 border border-gray-200'
            } backdrop-blur-sm max-w-fit animate-slide-in-bottom`}
          >
            {isImage ? (
              <img src={previewUrl} alt={selectedFile.name} className="h-12 w-auto rounded" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
              </svg>
            )}
            <span className="text-sm truncate max-w-[120px]">{selectedFile.name}</span>
            <button 
              onClick={handleRemoveFile}
              className={`p-1 rounded-full ${
                theme === 'dark' 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-200 text-gray-500 hover:text-gray-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        );
      })()}
      
      <div className={`flex items-end gap-2 w-full ${
        theme === 'dark'
          ? 'bg-gray-800/70 border border-gray-700/50'
          : 'bg-white/70 border border-gray-200'
        } p-2 sm:p-3 rounded-xl backdrop-blur-md shadow-lg transition-shadow ${
          message ? 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' : ''
        }`}
      >
        <Button
          size="icon"
          variant="ghost"
          className={`rounded-full shrink-0 ${
            theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.csv,.xls,.xlsx,.html,.css,.xml,.rtf,.js,.py,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg,.heic,.heif,.mp3,.mp4,.wav"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <textarea
          ref={textareaRef}
          className={`flex-1 ${
            theme === 'dark'
              ? 'bg-transparent text-white placeholder:text-gray-400'
              : 'bg-transparent text-gray-900 placeholder:text-gray-500'
          } border-none outline-none resize-none min-h-[40px] max-h-[120px] py-2 px-1 scrollbar-thin scrollbar-thumb-blue-400 dark:scrollbar-thumb-blue-600 scrollbar-track-transparent hover:scrollbar-thumb-blue-500 dark:hover:scrollbar-thumb-blue-500`}
          placeholder={t.workspace.chatbot.inputPlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          style={{ 
            height: 'auto',
            overflowY: 'auto'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
          }}
        />
        
        <Button
          size="icon"
          variant="ghost"
          className={`rounded-full shrink-0 ${
            recording
              ? 'bg-red-600 text-white animate-pulse'
              : theme === 'dark'
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
          onClick={recording ? stopRecording : startRecording}
          disabled={disabled}
        >
          {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button 
          size="icon"
          className={`rounded-full h-10 w-10 shrink-0 flex items-center justify-center transition-all ${
            message.trim() || selectedFile
              ? theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
              : theme === 'dark'
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSend}
          disabled={(!message.trim() && !selectedFile) || disabled}
        >
          <Send className={`h-5 w-5 ${(message.trim() || selectedFile) ? 'transform -rotate-45' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput; 