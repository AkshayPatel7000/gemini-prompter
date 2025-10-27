import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';
import User from '@/lib/models/User';
import mongoose from 'mongoose';

// POST /api/prompts/[id]/like - Like/Unlike a prompt
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to like prompts.' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find the prompt
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Check if prompt is public (can't like private prompts unless owner)
    if (!prompt.isPublic && prompt.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Cannot like private prompts' },
        { status: 403 }
      );
    }

    // Check if user already liked this prompt
    const hasLiked = prompt.likedBy.includes(user._id);

    let updatedPrompt;
    let action;

    if (hasLiked) {
      // Unlike: Remove user from likedBy array and decrement likes
      updatedPrompt = await Prompt.findByIdAndUpdate(
        id,
        {
          $pull: { likedBy: user._id },
          $inc: { likes: -1 },
        },
        { new: true }
      );
      action = 'unliked';
    } else {
      // Like: Add user to likedBy array and increment likes
      updatedPrompt = await Prompt.findByIdAndUpdate(
        id,
        {
          $addToSet: { likedBy: user._id },
          $inc: { likes: 1 },
        },
        { new: true }
      );
      action = 'liked';
    }

    return NextResponse.json({
      success: true,
      action,
      likes: updatedPrompt.likes,
      hasLiked: !hasLiked,
    });
  } catch (error) {
    console.error('Error liking prompt:', error);
    return NextResponse.json(
      { error: 'Failed to like prompt' },
      { status: 500 }
    );
  }
}

// GET /api/prompts/[id]/like - Check if user has liked the prompt
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({
        hasLiked: false,
        likes: 0,
      });
    }

    await dbConnect();

    const { id } = params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid prompt ID' }, { status: 400 });
    }

    // Find the user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({
        hasLiked: false,
        likes: 0,
      });
    }

    // Find the prompt
    const prompt = await Prompt.findById(id);
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    const hasLiked = prompt.likedBy.includes(user._id);

    return NextResponse.json({
      hasLiked,
      likes: prompt.likes,
    });
  } catch (error) {
    console.error('Error checking like status:', error);
    return NextResponse.json(
      { error: 'Failed to check like status' },
      { status: 500 }
    );
  }
}
