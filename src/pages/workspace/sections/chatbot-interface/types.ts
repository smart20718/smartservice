export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachmentName?: string; // filename if attachment
  attachmentUrl?: string; // url or object URL
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
} 