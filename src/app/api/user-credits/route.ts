import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { UserCredits } from '@/models/Prompt';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('gemini-prompts');
    const creditsCollection = db.collection<UserCredits>('user_credits');

    // Get user credits
    let userCredits = await creditsCollection.findOne({
      userId: session.user.id,
    });

    if (!userCredits) {
      // Create initial credits for new user
      userCredits = {
        userId: session.user.id,
        credits: 10,
        totalUsed: 0,
        lastUpdated: new Date(),
      };
      await creditsCollection.insertOne(userCredits);
    }

    return NextResponse.json({
      credits: userCredits.credits,
      totalUsed: userCredits.totalUsed,
      lastUpdated: userCredits.lastUpdated,
    });
  } catch (error) {
    console.error('Error fetching user credits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credits' },
      { status: 500 }
    );
  }
}
