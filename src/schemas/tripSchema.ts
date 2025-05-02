import { z } from 'zod'

export const tripSchema = z.object({
  destination: z.string().min(1, 'Destination is required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  accommodation: z.string().optional(),
  transportation: z.string().optional(),
  specialRequests: z.string().optional()
})

export type TripFormData = z.infer<typeof tripSchema> 