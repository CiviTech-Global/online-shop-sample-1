import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { banners } from '../../data/store'

export function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-surface shadow-sm">
      <div className="relative aspect-[16/7] md:aspect-[16/5] lg:aspect-[16/4]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={banners[current].image}
              alt={banners[current].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-secondary/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-secondary shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          aria-label="بنر قبلی"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-secondary shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
          aria-label="بنر بعدی"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? 'w-8 bg-primary' : 'w-2 bg-white/70 hover:bg-white'
              }`}
              aria-label={`بنر ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
