import { NextResponse } from 'next/server'
import type { TripFormData } from '@/schemas/tripSchema'

export async function POST(request: Request) {
  try {
    const body: TripFormData = await request.json()

    // TODO: Implement AI integration
    const mockResponse = {
      itinerary: {
        destination: body.destination,
        duration: calculateDuration(body.startDate, body.endDate),
        dailyPlans: generateDailyPlans(body),
        weatherForecast: generateWeatherForecast(body),
        recommendations: generateRecommendations(body)
      }
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error('Error generating trip plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate trip plan' },
      { status: 500 }
    )
  }
}

function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function generateDailyPlans(data: TripFormData) {
  const duration = calculateDuration(data.startDate, data.endDate)
  return Array.from({ length: duration }, (_, index) => ({
    day: index + 1,
    activities: [
      {
        time: '09:00',
        activity: 'Breakfast at local cafe',
        location: 'Downtown area'
      },
      {
        time: '11:00',
        activity: 'Visit main attractions',
        location: 'City center'
      },
      {
        time: '14:00',
        activity: 'Lunch at recommended restaurant',
        location: 'Local district'
      },
      {
        time: '16:00',
        activity: 'Cultural activities',
        location: 'Museum district'
      }
    ]
  }))
}

function generateWeatherForecast(data: TripFormData) {
  return {
    summary: 'Sunny with occasional clouds',
    temperature: {
      min: 18,
      max: 25
    },
    precipitation: '20%'
  }
}

function generateRecommendations(data: TripFormData) {
  return {
    restaurants: [
      {
        name: 'Local Cuisine Restaurant',
        type: 'Traditional',
        rating: 4.5
      },
      {
        name: 'Modern Fusion',
        type: 'Contemporary',
        rating: 4.8
      }
    ],
    attractions: [
      {
        name: 'Historical Museum',
        type: 'Cultural',
        rating: 4.7
      },
      {
        name: 'City Park',
        type: 'Nature',
        rating: 4.6
      }
    ]
  }
} 