import { z } from 'zod'

export const tripSchema = z.object({
  destinations: z.array(z.object({
    destination: z.string().min(1, 'validation.destination.required'),
    startDate: z.string().min(1, 'validation.startDate.required'),
    endDate: z.string().min(1, 'validation.endDate.required'),
  })).min(1, 'En az bir destinasyon ekleyin'),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
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
  specialRequests: z.string().optional(),
  currency: z.string().min(1, 'validation.currency.required'),
})

export type TripFormData = z.infer<typeof tripSchema> 