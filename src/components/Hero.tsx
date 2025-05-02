"use client";

import { motion } from 'framer-motion'
import { Dictionary } from '@/types/dictionary'

interface HeroProps {
  dict: Dictionary
}

export default function Hero({ dict }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {dict.planner.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
        >
          {dict.planner.subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          {dict.common.getStarted}
        </motion.button>
      </div>
    </section>
  )
} 