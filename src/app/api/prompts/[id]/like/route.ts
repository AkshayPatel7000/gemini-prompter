import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const prompt = await Prompt.findByIdAndUpdate(
      params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
    }

    // Mark as trending if likes > 10
    if (prompt.likes >= 10) {
      prompt.isTrending = true;
      await prompt.save();
    }

    return NextResponse.json(prompt);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to like prompt' },
      { status: 500 }
    );
  }
}
