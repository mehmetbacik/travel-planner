export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  createdAt: string;
  updatedAt: string;
}

export type TripCreateInput = Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>;

export type TripUpdateInput = Partial<TripCreateInput>;

export interface TripRecommendations {
  activities: string[];
  localTips: string[];
  budgetTips: string[];
  weatherInfo: string;
} 