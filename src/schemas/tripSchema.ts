import { z } from 'zod'

export const tripSchema = z.object({
  destination: z.string().min(1, 'validation.destination.required'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  startDate: z.string().min(1, 'validation.startDate.required'),
  endDate: z.string().min(1, 'validation.endDate.required'),
  budget: z.number().min(0, 'validation.budget.min'),
  description: z.string().optional(),
  activities: z.array(z.string()).optional(),
  accommodation: z.object({
    type: z.string(),
    name: z.string(),
    address: z.string(),
  }).optional(),
  transportation: z.object({
    type: z.string(),
    details: z.string(),
  }).optional(),
  specialRequests: z.string().optional()
})

export type TripFormData = z.infer<typeof tripSchema> 