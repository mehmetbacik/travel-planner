import { NextResponse } from 'next/server';
import { aiService } from './index';
import { AppError } from '@/utils/errorHandler';

export async function POST(request: Request) {
  try {
    const { destination, budget } = await request.json();

    if (!destination || !budget) {
      return NextResponse.json(
        { message: 'Destination and budget are required' },
        { status: 400 }
      );
    }

    const recommendations = await aiService.getTravelRecommendations(
      destination,
      budget
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to get recommendations' },
      { status: 500 }
    );
  }
} 