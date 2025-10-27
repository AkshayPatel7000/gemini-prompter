/**
 * Test utility to verify Gemini API configuration
 * This file can be used to test the Gemini API setup independently
 */

import { GoogleGenAI } from '@google/genai';

export async function testGeminiConnection(): Promise<{
  success: boolean;
  error?: string;
  model?: string;
}> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: 'GEMINI_API_KEY environment variable is not set',
      };
    }

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // Test with a simple text prompt
    const result = await genAI.models.generateContent({
      model: 'models/gemini-2.0-flash-lite',
      contents: 'Say "Hello, Gemini API is working!"',
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text && text.length > 0) {
      return {
        success: true,
        model: 'models/gemini-2.0-flash-lite',
      };
    } else {
      return {
        success: false,
        error: 'Gemini API returned empty response',
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function testImageAnalysis(
  base64Image: string,
  mimeType: string
): Promise<{
  success: boolean;
  prompt?: string;
  error?: string;
}> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return {
        success: false,
        error: 'GEMINI_API_KEY environment variable is not set',
      };
    }

    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const prompt = `
      Analyze this image and create a brief description in one sentence.
      Focus on the main subject, style, and key visual elements.
    `;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const result = await genAI.models.generateContent({
      model: 'models/gemini-2.0-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }, imagePart],
        },
      ],
    });

    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (generatedText && generatedText.length > 0) {
      return {
        success: true,
        prompt: generatedText.trim(),
      };
    } else {
      return {
        success: false,
        error: 'Gemini API returned empty response for image analysis',
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Unknown error occurred during image analysis',
    };
  }
}
