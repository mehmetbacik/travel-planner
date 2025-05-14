"use client";

import { motion } from 'framer-motion'
import { Dictionary } from '@/types/dictionary'

interface FeaturesProps {
  dict: Dictionary
}

const features = [
  {
    icon: '🌤️',
    key: 'weather'
  },
  {
    icon: '🏛️',
    key: 'attractions'
  },
  {
    icon: '🚗',
    key: 'transportation'
  },
  {
    icon: '🍽️',
    key: 'food'
  }
]

export default function Features({ dict }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {dict.features[feature.key as keyof typeof dict.features]}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 