import { apiClient } from '../client';
import { Trip, TripCreateInput, TripUpdateInput } from '@/types/trip';

export const tripsApi = {
  async getAll(): Promise<Trip[]> {
    return apiClient.get<Trip[]>('/trips');
  },

  async getById(id: string): Promise<Trip> {
    return apiClient.get<Trip>(`/trips/${id}`);
  },

  async create(data: TripCreateInput): Promise<Trip> {
    return apiClient.post<Trip>('/trips', data);
  },

  async update(id: string, data: TripUpdateInput): Promise<Trip> {
    return apiClient.put<Trip>(`/trips/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/trips/${id}`);
  },

  async generatePDF(tripData: Trip, recommendations: any) {
    const response = await apiClient.post<Blob>(
      '/pdf',
      { tripData, recommendations },
      {
        headers: {
          Accept: 'application/pdf',
        },
      }
    );

    return response;
  },
}; 