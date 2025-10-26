import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function GET() {
  try {
    await dbConnect();

    const prompts = await Prompt.find({ isTrending: true })
      .sort({ likes: -1, createdAt: -1 })
      .limit(20)
      .populate('userId', 'name image');

    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trending prompts' },
      { status: 500 }
    );
  }
}
