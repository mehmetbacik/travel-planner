import { NextResponse } from 'next/server';
import { pdfService } from '@/services/pdf/index';
import { AppError } from '@/utils/errorHandler';

export async function POST(request: Request) {
  try {
    const { tripData, recommendations } = await request.json();

    if (!tripData || !recommendations) {
      return NextResponse.json(
        { message: 'Trip data and recommendations are required' },
        { status: 400 }
      );
    }

    const pdfBlob = await pdfService.generateTravelPlan(tripData, recommendations);

    return new NextResponse(pdfBlob, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="travel-plan-${tripData.destination}.pdf"`,
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message, code: error.code },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 