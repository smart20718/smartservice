// Utility functions related to file handling for the chatbot interface.

/** Maximum file size (in bytes) allowed for inlineData according to Gemini docs (20 MB). */
export const MAX_INLINE_SIZE = 20 * 1024 * 1024; // 20 MB

/**
 * Extracts a File as base64 string and determines its MIME type.
 * @param file The file selected by the user
 * @returns Promise with { base64Data, mimeType }
 */
export async function extractFileData(file: File): Promise<{ base64Data: string; mimeType: string }> {
  // Validate file size for inline upload
  if (file.size > MAX_INLINE_SIZE) {
    throw new Error(
      `File exceeds the 20 MB inline upload limit supported by Gemini. Size: ${(file.size / (1024 * 1024)).toFixed(1)} MB`
    );
  }

  // Convert to base64 using FileReader
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

  // Determine MIME type with fallback to extension
  let mimeType = file.type;
  if (!mimeType || mimeType === '') {
    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'md':
        mimeType = 'text/md';
        break;
      case 'csv':
        mimeType = 'text/csv';
        break;
      case 'html':
        mimeType = 'text/html';
        break;
      case 'css':
        mimeType = 'text/css';
        break;
      case 'xml':
        mimeType = 'text/xml';
        break;
      case 'rtf':
        mimeType = 'text/rtf';
        break;
      case 'js':
      case 'javascript':
        mimeType = 'application/x-javascript';
        break;
      case 'py':
        mimeType = 'application/x-python';
        break;
      case 'doc':
      case 'docx':
        mimeType = 'application/octet-stream';
        break;
      case 'ppt':
      case 'pptx':
        mimeType = 'application/octet-stream';
        break;
      case 'xls':
      case 'xlsx':
        mimeType = 'application/octet-stream';
        break;
      case 'mp3':
        mimeType = 'audio/mpeg';
        break;
      case 'wav':
        mimeType = 'audio/wav';
        break;
      case 'mp4':
        mimeType = 'video/mp4';
        break;
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      case 'gif':
        mimeType = 'image/gif';
        break;
      case 'webp':
        mimeType = 'image/webp';
        break;
      case 'bmp':
        mimeType = 'image/bmp';
        break;
      case 'svg':
        mimeType = 'image/svg+xml';
        break;
      case 'heic':
        mimeType = 'image/heic';
        break;
      case 'heif':
        mimeType = 'image/heif';
        break;
      default:
        mimeType = 'application/octet-stream';
    }
  }
  return { base64Data, mimeType };
} 