import { TripFormData } from '@/schemas/tripSchema';
import { AppError, ErrorType } from '@/utils/errorHandler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const tripsApi = {
  async create(data: TripFormData) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new AppError(
          error.message || 'Failed to create trip',
          ErrorType.SERVER,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Network error occurred',
        ErrorType.NETWORK
      );
    }
  },

  async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/trips`);

      if (!response.ok) {
        const error = await response.json();
        throw new AppError(
          error.message || 'Failed to fetch trips',
          ErrorType.SERVER,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Network error occurred',
        ErrorType.NETWORK
      );
    }
  },

  async getById(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/${id}`);

      if (!response.ok) {
        const error = await response.json();
        throw new AppError(
          error.message || 'Failed to fetch trip',
          ErrorType.SERVER,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Network error occurred',
        ErrorType.NETWORK
      );
    }
  },

  async update(id: string, data: Partial<TripFormData>) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new AppError(
          error.message || 'Failed to update trip',
          ErrorType.SERVER,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Network error occurred',
        ErrorType.NETWORK
      );
    }
  },

  async delete(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new AppError(
          error.message || 'Failed to delete trip',
          ErrorType.SERVER,
          error.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        'Network error occurred',
        ErrorType.NETWORK
      );
    }
  }
}; 