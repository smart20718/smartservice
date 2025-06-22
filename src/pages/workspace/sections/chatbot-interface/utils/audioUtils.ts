// Utility functions related to audio handling for the chatbot interface.

/** Maximum file size (in bytes) allowed for inlineData according to Gemini docs (20 MB). */
export const MAX_AUDIO_INLINE_SIZE = 20 * 1024 * 1024; // 20 MB

/**
 * Converts a recorded audio Blob into a File and extracts base64 + mime type.
 */
export async function audioBlobToFileData(blob: Blob): Promise<{ file: File; base64Data: string; mimeType: string }> {
  const mimeType = blob.type || 'audio/webm';
  const file = new File([blob], `recording_${Date.now()}.${mimeType.split('/')[1] || 'webm'}`, { type: mimeType });

  if (file.size > MAX_AUDIO_INLINE_SIZE) {
    throw new Error(
      `Audio exceeds the 20 MB inline upload limit supported by Gemini. Size: ${(file.size / (1024 * 1024)).toFixed(1)} MB`
    );
  }

  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const data = result.split(',')[1];
      resolve(data);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  return { file, base64Data, mimeType };
} 