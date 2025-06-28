import { GoogleGenAI } from '@google/genai';
import { extractFileData, MAX_INLINE_SIZE } from '../utils/fileUtils';
import { ChatMessage } from '../types';
// Gemini streaming service using Google Generative AI REST endpoint

export interface StreamResponse {
  text: string;
  done: boolean;
}

const GEMINI_MODEL = 'gemini-2.0-flash-lite'; // Updated to use the model specified in the example
const GENERATE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// ----------------------------------------------------------------------------
//  UPDATED IMPLEMENTATION – real streaming via Google GenAI SDK (no fallbacks)
// ----------------------------------------------------------------------------

// NOTE: Embedding key directly as requested – **do NOT commit real keys in prod!**
export const API_KEY = 'AIzaSyDzvlfkNGvusUCmwxdRnYCvjtIQ39JUR1E';

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Streams a response from Gemini.
 */
export const sendMessageStream = async (
  history: ChatMessage[],
  file: File | null,
  onChunk: (chunk: StreamResponse) => void,
  onError: (error: Error) => void,
  onComplete: () => void
) => {
  try {
    console.log('[Gemini] Starting request processing');
    
    // Build the request content from history
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content || '' }],
    }));
    
    // Add file to the last user message if provided
    if (file) {
      console.log(`[Gemini] Processing file: ${file.name} (${file.type}), size: ${file.size} bytes`);
      try {
        const { base64Data, mimeType } = await extractFileData(file);
        
        const lastUserMessage = contents.filter(c => c.role === 'user').pop();
        if (lastUserMessage) {
          console.log(`[Gemini] Adding file data to request parts with MIME type: ${mimeType}`);
          // Ensure parts is an array
          if (!Array.isArray(lastUserMessage.parts)) {
            lastUserMessage.parts = [];
          }
          lastUserMessage.parts.push({
            inlineData: {
            data: base64Data,
              mimeType: mimeType,
            },
          } as any);
          }
      } catch (fileErr) {
        console.error('[Gemini] File processing error', fileErr);
        // Forward specific error for oversize file
        if (fileErr.message.includes('20 MB')) {
          onError(
            new Error(
              `File too large. The maximum size for inline uploads is ${(MAX_INLINE_SIZE / (1024 * 1024)).toFixed(
                0
              )} MB. Consider using a smaller document.`
            )
          );
        } else {
        onError(new Error(`Failed to process file: ${fileErr.message}`));
        }
        return;
      }
    }

    console.log('[Gemini] Sending request to API');
    console.log('[Gemini] Request contents:', JSON.stringify(contents, null, 2));
    
    // Determine language preference from localStorage (defaults to 'en')
    let preferredLang: 'en' | 'fr' = 'en';
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language') as 'en' | 'fr' | null;
      if (storedLang === 'fr') preferredLang = 'fr';
    }

    const systemText = preferredLang === 'fr'
      ? 'Vous êtes Smart Service, un chatbot utile et amical dédié à répondre aux questions des utilisateurs avec clarté et précision. Répondez uniquement en français.'
      : 'You are Smart Service, a helpful and friendly chatbot dedicated to answering user questions with clarity and precision.';

    const response = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      contents: contents,
      config: {
        systemInstruction: [
          {
            text: systemText,
          },
        ],
        responseMimeType: 'text/plain',
      },
    });

    console.log('[Gemini] Stream response started');
    for await (const chunk of response) {
      console.log(`[Gemini] Received chunk: ${chunk.text?.length || 0} chars`);
      onChunk({ text: chunk.text ?? '', done: false });
    }

    console.log('[Gemini] Stream complete');
    onComplete();
  } catch (err) {
    console.error('[Gemini] Streaming error', err);
    
    // Enhanced error logging
    if (err.response) {
      console.error('[Gemini] Error response:', err.response);
    }
    
    let errorMessage = err.message;
    if (err.message?.includes?.('400')) {
      errorMessage = 'Invalid request format. Please check file format and try again.';
    } else if (err.message?.includes?.('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (err.message?.includes?.('500')) {
      errorMessage = 'Server error. Please try again later.';
    }
    
    onError(new Error(errorMessage));
  }
};

export const generateChatName = async (history: ChatMessage[]): Promise<string> => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content || '' }],
    }));

    // Add instruction to generate a title
    contents.push({
      role: 'user',
      parts: [{ text: 'Based on this conversation, create a short, concise title no longer than 5 words.' }],
    });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: contents,
    });

    if (!response.text) {
      return 'Untitled Chat';
    }

    // Use only the first non-empty line
    let chatName = response.text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)[0] || 'Untitled Chat';

    // Strip leading markdown / list markers
    chatName = chatName.replace(/^[-*\d.\s]+/, '');

    // Remove surrounding quotes or backticks
    chatName = chatName.replace(/^["'`]{1,2}|["'`]{1,2}$/g, '');

    // Limit to ~30 chars / 5 words to keep header neat
    const words = chatName.split(/\s+/).slice(0, 5);
    chatName = words.join(' ');

    return chatName;

  } catch (err) {
    console.error('[Gemini] Chat name generation error', err);
    return 'Untitled Chat'; // Fallback name
  }
}; 