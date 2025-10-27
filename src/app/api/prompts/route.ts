import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';
import User from '@/lib/models/User';

// GET /api/prompts - List prompts with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const userId = searchParams.get('userId'); // For user's own prompts
    const isPublic = searchParams.get('public'); // Filter by public/private
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // createdAt, likes, views
    const order = searchParams.get('order') || 'desc'; // asc, desc

    const session = await auth();
    const currentUser = session?.user
      ? await User.findOne({ email: session.user.email })
      : null;

    // Build query
    const query: Record<string, unknown> = {};

    // If userId is specified, show user's prompts (both public and private if it's their own)
    if (userId) {
      query.userId = userId;
      // If viewing someone else's prompts, only show public ones
      if (!currentUser || currentUser._id.toString() !== userId) {
        query.isPublic = true;
      }
    } else {
      // Default: only show public prompts
      query.isPublic = true;
    }

    // Filter by public/private (only for own prompts)
    if (
      isPublic !== null &&
      currentUser &&
      userId === currentUser._id.toString()
    ) {
      query.isPublic = isPublic === 'true';
    }

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search in prompt text
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sortOptions: Record<string, 1 | -1> = {};
    if (sortBy === 'likes') {
      sortOptions.likes = order === 'asc' ? 1 : -1;
    } else if (sortBy === 'views') {
      sortOptions.views = order === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = order === 'asc' ? 1 : -1;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [prompts, total] = await Promise.all([
      Prompt.find(query)
        .populate('userId', 'name image')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Prompt.countDocuments(query),
    ]);

    // Format response
    const formattedPrompts = prompts.map((prompt) => ({
      id: prompt._id,
      prompt: prompt.prompt,
      imageData: prompt.imageData,
      imageType: prompt.imageType,
      likes: prompt.likes,
      views: prompt.views,
      isPublic: prompt.isPublic,
      isGenerated: prompt.isGenerated,
      tags: prompt.tags,
      category: prompt.category,
      metadata: prompt.metadata,
      createdAt: prompt.createdAt,
      user: {
        id: prompt.userId?._id,
        name: prompt.userId?.name,
        image: prompt.userId?.image,
      },
      isOwner:
        currentUser &&
        prompt.userId?._id.toString() === currentUser._id.toString(),
    }));

    return NextResponse.json({
      success: true,
      prompts: formattedPrompts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

// POST /api/prompts - Create a new prompt (manual creation)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const {
      prompt,
      imageData,
      imageType,
      tags,
      category,
      isPublic = true,
    } = body;

    // Validate required fields
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt text is required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create prompt
    const newPrompt = await Prompt.create({
      prompt,
      imageData,
      imageType,
      userId: user._id,
      isPublic,
      isGenerated: false, // Manual creation
      tags: tags || [],
      category: category || 'General',
      metadata: {
        wordCount: prompt.split(' ').length,
        characterCount: prompt.length,
        generatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      prompt: {
        id: newPrompt._id,
        prompt: newPrompt.prompt,
        isPublic: newPrompt.isPublic,
        tags: newPrompt.tags,
        category: newPrompt.category,
        createdAt: newPrompt.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}
