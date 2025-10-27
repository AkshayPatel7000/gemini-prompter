/**
 * Utility functions for image processing and validation
 */

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  size?: number;
  dimensions?: { width: number; height: number };
}

/**
 * Validate image file before processing
 */
export function validateImageFile(file: File): ImageValidationResult {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    return {
      isValid: false,
      error: 'Unsupported image format. Please use JPG, PNG, or WebP.',
    };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image too large. Please use an image smaller than 10MB.',
    };
  }

  // Check minimum file size (1KB)
  if (file.size < 1024) {
    return {
      isValid: false,
      error: 'Image too small. Please use a larger image.',
    };
  }

  return {
    isValid: true,
    size: file.size,
  };
}

/**
 * Convert file to base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validate base64 image data
 */
export function validateBase64Image(base64Data: string): ImageValidationResult {
  try {
    // Check if it's a valid data URL
    if (!base64Data.startsWith('data:image/')) {
      return {
        isValid: false,
        error: 'Invalid image data format.',
      };
    }

    // Extract mime type
    const mimeMatch = base64Data.match(/data:([^;]+);base64,/);
    if (!mimeMatch) {
      return {
        isValid: false,
        error: 'Invalid image data format.',
      };
    }

    const mimeType = mimeMatch[1];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!allowedTypes.includes(mimeType.toLowerCase())) {
      return {
        isValid: false,
        error: 'Unsupported image format.',
      };
    }

    // Extract base64 data
    const base64Content = base64Data.split(',')[1];
    if (!base64Content || base64Content.length === 0) {
      return {
        isValid: false,
        error: 'Empty image data.',
      };
    }

    // Estimate file size (base64 is ~33% larger than original)
    const estimatedSize = (base64Content.length * 3) / 4;
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (estimatedSize > maxSize) {
      return {
        isValid: false,
        error: 'Image too large.',
      };
    }

    return {
      isValid: true,
      size: estimatedSize,
    };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid image data.',
    };
  }
}

/**
 * Compress image if needed (client-side)
 */
export function compressImage(
  file: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get image dimensions from file
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
}
