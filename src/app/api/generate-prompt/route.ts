import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { auth } from '@/lib/auth';

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to continue.' },
        { status: 401 }
      );
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Service configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { imageData, imageType } = body;

    // Validate input
    if (!imageData || !imageType) {
      return NextResponse.json(
        { error: 'Image data and type are required.' },
        { status: 400 }
      );
    }

    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(imageType.toLowerCase())) {
      return NextResponse.json(
        { error: 'Unsupported image format. Please use JPG, PNG, or WebP.' },
        { status: 400 }
      );
    }

    // Remove data URL prefix if present
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');

    // Validate base64 data
    if (!base64Data || base64Data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid image data provided.' },
        { status: 400 }
      );
    }

    // Check image size (approximate - base64 is ~33% larger than original)
    const imageSizeBytes = (base64Data.length * 3) / 4;
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    if (imageSizeBytes > maxSizeBytes) {
      return NextResponse.json(
        { error: 'Image too large. Please use an image smaller than 10MB.' },
        { status: 400 }
      );
    }

    // Create the prompt for image analysis
    const analysisPrompt = `
      Analyze this image carefully and create a detailed, professional prompt that could be used to generate a similar image using AI image generators like DALL-E, Midjourney, or Stable Diffusion.

      Your response should be a single, comprehensive prompt that includes:
      1. Main subject and composition
      2. Art style and technique
      3. Lighting and atmosphere
      4. Color palette and mood
      5. Quality and technical specifications
      6. Camera angle and perspective (if applicable)

      Make the prompt detailed but concise, focusing on visual elements that would help recreate the essence and style of this image. The prompt should be between 50-150 words and ready to use directly in an AI image generator.

      Do not include any explanations or additional text - just return the prompt itself.
    `;

    // Prepare the image data for Gemini
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: imageType,
      },
    };

    // Generate content with timeout
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 30000)
    );

    const generationPromise = genAI.models.generateContent({
      model: 'models/gemini-2.0-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [{ text: analysisPrompt }, imagePart],
        },
      ],
    });

    const result = await Promise.race([generationPromise, timeoutPromise]);

    if (!result || typeof result !== 'object' || !('candidates' in result)) {
      throw new Error('Invalid response from AI service');
    }

    const response = result as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const generatedPrompt = response.candidates?.[0]?.content?.parts?.[0]?.text;

    // Validate the generated prompt
    if (!generatedPrompt || generatedPrompt.trim().length === 0) {
      return NextResponse.json(
        {
          error:
            'Failed to generate prompt. Please try with a different image.',
        },
        { status: 500 }
      );
    }

    // Clean up the prompt (remove any unwanted formatting)
    const cleanPrompt = generatedPrompt
      .trim()
      .replace(/^["']|["']$/g, '') // Remove quotes at start/end
      .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
      .trim();

    // Validate prompt length
    if (cleanPrompt.length < 20) {
      return NextResponse.json(
        {
          error:
            'Generated prompt is too short. Please try with a more detailed image.',
        },
        { status: 500 }
      );
    }

    if (cleanPrompt.length > 1000) {
      return NextResponse.json(
        { error: 'Generated prompt is too long. Please try again.' },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      prompt: cleanPrompt,
      metadata: {
        wordCount: cleanPrompt.split(' ').length,
        characterCount: cleanPrompt.length,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error generating prompt:', error);

    // Handle specific error types
    if (errorMessage === 'Request timeout') {
      return NextResponse.json(
        { error: 'Request timed out. Please try again with a smaller image.' },
        { status: 408 }
      );
    }

    if (errorMessage?.includes('API key')) {
      return NextResponse.json(
        { error: 'Service configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    if (errorMessage?.includes('quota') || errorMessage?.includes('limit')) {
      return NextResponse.json(
        {
          error:
            'Service temporarily unavailable due to high demand. Please try again later.',
        },
        { status: 429 }
      );
    }

    if (errorMessage?.includes('safety') || errorMessage?.includes('blocked')) {
      return NextResponse.json(
        {
          error:
            'Image content not suitable for prompt generation. Please try a different image.',
        },
        { status: 400 }
      );
    }

    if (
      errorMessage?.includes('INVALID_ARGUMENT') ||
      errorMessage?.includes('invalid')
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid image format or corrupted file. Please try a different image.',
        },
        { status: 400 }
      );
    }

    if (errorMessage?.includes('PERMISSION_DENIED')) {
      return NextResponse.json(
        { error: 'Access denied. Please check your account permissions.' },
        { status: 403 }
      );
    }

    if (errorMessage?.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        {
          error:
            'Service capacity exceeded. Please try again in a few minutes.',
        },
        { status: 503 }
      );
    }

    if (
      errorMessage?.includes('NOT_FOUND') ||
      errorMessage?.includes('not found')
    ) {
      return NextResponse.json(
        {
          error:
            'Model not available. The service may be temporarily unavailable.',
        },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to generate prompts.' },
    { status: 405 }
  );
}
