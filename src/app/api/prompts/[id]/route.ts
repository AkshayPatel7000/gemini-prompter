import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';
import mongoose from 'mongoose';

// GET /api/prompts/[id] - Get a specific prompt
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
    }

    const prompt = await Prompt.findById(id).populate('userId', 'name image');

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Check if prompt is public or user owns it
    const session = await auth();
    const isOwner =
      session?.user?.email && prompt.userId?.email === session.user.email;

    if (!prompt.isPublic && !isOwner) {
      return NextResponse.json({ error: 'Prompt is private' }, { status: 403 });
    }

    // Increment view count (only if not the owner)
    if (!isOwner) {
      await Prompt.findByIdAndUpdate(id, { $inc: { views: 1 } });
      prompt.views += 1;
    }

    return NextResponse.json({
      success: true,
      prompt: {
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
          name: prompt.userId?.name,
          image: prompt.userId?.image,
        },
        isOwner,
      },
    });
  } catch (error) {
    console.error('Error fetching prompt:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    );
  }
}

// PATCH /api/prompts/[id] - Update prompt (privacy, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { id } = params;
    const body = await request.json();

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
    }

    const prompt = await Prompt.findById(id).populate('userId', 'email');

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Check ownership
    if (prompt.userId?.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Not authorized to update this prompt' },
        { status: 403 }
      );
    }

    // Update allowed fields
    const allowedUpdates = ['isPublic', 'tags', 'category'];
    const updates: Record<string, unknown> = {};

    for (const field of allowedUpdates) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    const updatedPrompt = await Prompt.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      prompt: {
        id: updatedPrompt._id,
        isPublic: updatedPrompt.isPublic,
        tags: updatedPrompt.tags,
        category: updatedPrompt.category,
        updatedAt: updatedPrompt.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to update prompt' },
      { status: 500 }
    );
  }
}

// DELETE /api/prompts/[id] - Delete prompt
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
    }

    const prompt = await Prompt.findById(id).populate('userId', 'email');

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Check ownership
    if (prompt.userId?.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Not authorized to delete this prompt' },
        { status: 403 }
      );
    }

    await Prompt.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Prompt deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return NextResponse.json(
      { error: 'Failed to delete prompt' },
      { status: 500 }
    );
  }
}
