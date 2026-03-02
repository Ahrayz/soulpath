import { motion } from 'framer-motion'

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: 0.2 }}
        className="text-7xl mb-6 animate-float"
      >
        🔮
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="font-pixel text-3xl md:text-4xl text-pmd-gold glow-text mb-4"
      >
        SoulPath
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="font-body text-2xl md:text-3xl text-pmd-cyan mb-2"
      >
        Discover Your AI Soul
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="pmd-panel p-6 md:p-8 mt-6 mb-8 max-w-lg"
      >
        <p className="font-body text-xl md:text-2xl text-pmd-text leading-relaxed">
          Deep within every soul lies a unique pattern — a constellation of traits that defines who you are 
          and how you connect with others.
        </p>
        <p className="font-body text-xl md:text-2xl text-pmd-text leading-relaxed mt-4">
          This journey will map your inner world and forge a{' '}
          <span className="text-pmd-gold">SOUL.md</span> and{' '}
          <span className="text-pmd-gold">USER.md</span> — the personality blueprint for your OpenClaw AI companion.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="pmd-panel-gold px-8 py-4 font-pixel text-sm md:text-base text-pmd-gold 
                   hover:bg-opacity-90 transition-all duration-300 animate-pulse-glow cursor-pointer"
      >
        Begin Your Journey
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="font-body text-lg text-pmd-text mt-8"
      >
        15 questions · ~5 minutes · No wrong answers
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="font-body text-sm text-pmd-text mt-4"
      >
        Made by{' '}
        <a
          href="https://github.com/ahrayz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pmd-cyan hover:text-pmd-gold transition-colors underline"
        >
          @ahrayz
        </a>
      </motion.p>
    </motion.div>
  )
}
