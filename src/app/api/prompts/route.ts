import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    interface QueryFilter {
      category?: string;
      $text?: { $search: string };
    }

    const query: QueryFilter = {};
    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const prompts = await Prompt.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('userId', 'name image');

    const total = await Prompt.countDocuments(query);

    return NextResponse.json({
      prompts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
