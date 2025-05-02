"use client";

import { motion } from 'framer-motion'
import { Dictionary } from '@/types/dictionary'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { tripSchema, TripFormData } from '@/schemas/tripSchema'
import { useState } from 'react'

interface TripPlannerProps {
  dict: Dictionary
}

const interestOptions = [
  { value: 'culture', label: 'Culture & History' },
  { value: 'nature', label: 'Nature & Outdoors' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'relaxation', label: 'Relaxation & Wellness' }
]

export default function TripPlanner({ dict }: TripPlannerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema)
  })

  const onSubmit = async (data: TripFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            {dict.common.planYourTrip}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.destination}
              </label>
              <input
                {...register('destination')}
                type="text"
                placeholder={dict.planner.destinationPlaceholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.interests}
              </label>
              <div className="grid grid-cols-2 gap-4">
                {interestOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      {...register('interests')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {dict.common.travelDates}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('startDate')}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                  )}
                </div>
                <div>
                  <input
                    {...register('endDate')}
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                  )}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? dict.planner.loading : dict.common.generateItinerary}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
} 