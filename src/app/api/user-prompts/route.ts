import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { GeneratedPrompt } from '@/models/Prompt';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('gemini-prompts');
    const promptsCollection =
      db.collection<GeneratedPrompt>('generated_prompts');

    // Get user's prompts with pagination
    const prompts = await promptsCollection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalCount = await promptsCollection.countDocuments({
      userId: session.user.id,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      prompts: prompts.map((prompt) => ({
        id: prompt._id?.toString(),
        prompt: prompt.prompt,
        originalImageUrl: prompt.originalImageUrl,
        metadata: prompt.metadata,
        creditsUsed: prompt.creditsUsed,
        createdAt: prompt.createdAt,
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching user prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
