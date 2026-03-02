import { motion } from 'framer-motion'
import { useState } from 'react'

export default function UsernameScreen({ nameSuggestions, aiArchetype, soulEmoji, onSelect }) {
  const [selected, setSelected] = useState(null)
  const [customName, setCustomName] = useState('')
  const [useCustom, setUseCustom] = useState(false)

  const handleConfirm = () => {
    const name = useCustom ? customName.trim() : selected
    if (name) onSelect(name)
  }

  const isValid = useCustom ? customName.trim().length > 0 : selected !== null

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
        className="text-6xl mb-4 animate-float"
      >
        {soulEmoji}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-pixel text-lg md:text-xl text-pmd-cyan mb-2"
      >
        Chapter III
      </motion.h2>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-pixel text-xl md:text-2xl text-pmd-gold glow-text mb-2"
      >
        Name Your Companion
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="font-body text-xl text-pmd-text mb-6 opacity-70"
      >
        Your {aiArchetype.name} {aiArchetype.emoji} needs a name. Choose one, or forge your own.
      </motion.p>

      {/* Name suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-full space-y-3 mb-6"
      >
        {nameSuggestions.map((name, index) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
            onClick={() => { setSelected(name); setUseCustom(false) }}
            className={`
              option-btn w-full text-left pmd-panel p-4 md:p-5
              font-body text-xl md:text-2xl text-pmd-text cursor-pointer
              transition-all duration-200
              ${selected === name && !useCustom
                ? 'border-2 border-yellow-400/60 scale-[1.02]'
                : 'hover:border-pmd-gold/40'
              }
            `}
          >
            <span className="flex items-center gap-3">
              <span className={`
                inline-flex items-center justify-center w-8 h-8 rounded-full
                font-pixel text-xs shrink-0
                ${selected === name && !useCustom
                  ? 'bg-pmd-gold text-pmd-dark'
                  : 'bg-pmd-blue text-pmd-cyan border border-pmd-border'
                }
              `}>
                {aiArchetype.emoji}
              </span>
              <span className="font-pixel text-sm">{name}</span>
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Custom name input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="w-full mb-6"
      >
        <button
          onClick={() => { setUseCustom(!useCustom); setSelected(null) }}
          className="font-body text-lg text-pmd-cyan hover:text-pmd-gold transition-colors cursor-pointer mb-3"
        >
          {useCustom ? '← Back to suggestions' : '✏️ Or type your own name...'}
        </button>

        {useCustom && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pmd-panel p-4"
          >
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter a name..."
              maxLength={30}
              className="w-full bg-transparent border-b-2 border-pmd-border focus:border-pmd-gold
                         outline-none font-pixel text-sm text-pmd-gold py-2 px-1
                         placeholder-pmd-text/30 transition-colors"
              autoFocus
            />
          </motion.div>
        )}
      </motion.div>

      {/* Confirm button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isValid ? 1 : 0.3 }}
        whileHover={isValid ? { scale: 1.05 } : {}}
        whileTap={isValid ? { scale: 0.95 } : {}}
        onClick={handleConfirm}
        disabled={!isValid}
        className={`
          pmd-panel-gold px-6 py-3 font-pixel text-sm text-pmd-gold
          transition-all cursor-pointer
          ${isValid ? 'animate-pulse-glow' : 'opacity-30 cursor-not-allowed'}
        `}
      >
        Forge This Name
      </motion.button>
    </motion.div>
  )
}
