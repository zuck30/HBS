import { NextResponse } from 'next/server';
import { getScentRecommendation } from '@/lib/quizEngine';

export async function POST(req: Request) {
  try {
    const { answers } = await req.json();

    if (!answers) {
      return NextResponse.json({ error: 'Answers are required' }, { status: 400 });
    }

    const recommendations = await getScentRecommendation(answers);

    return NextResponse.json(recommendations);
  } catch (error: any) {
    console.error('Quiz API Error:', error);
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}
