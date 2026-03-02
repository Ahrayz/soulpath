import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PhaseTransition({
  title,
  subtitle,
  description,
  emoji,
  onComplete,
  autoAdvance = true,
}) {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    if (autoAdvance) {
      const timer = setTimeout(() => setShowContinue(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [autoAdvance])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.5 }}
        className="text-6xl mb-6 animate-float"
      >
        {emoji}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-pixel text-lg md:text-xl text-pmd-cyan mb-2"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-pixel text-2xl md:text-3xl text-pmd-gold glow-text mb-6"
        >
          {subtitle}
        </motion.h3>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="pmd-panel p-6 md:p-8 mb-8"
      >
        <p className="font-body text-xl md:text-2xl text-pmd-text leading-relaxed">
          {description}
        </p>
      </motion.div>

      {autoAdvance && showContinue && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="pmd-panel-gold px-6 py-3 font-pixel text-sm text-pmd-gold 
                     animate-pulse-glow cursor-pointer"
        >
          Continue
        </motion.button>
      )}

      {!autoAdvance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-pmd-gold animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-pmd-gold animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="w-2 h-2 rounded-full bg-pmd-gold animate-pulse" style={{ animationDelay: '0.6s' }} />
        </motion.div>
      )}
    </motion.div>
  )
}
