import { motion } from 'framer-motion'
import { useState } from 'react'

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  globalProgress,
  globalTotal,
  phaseLabel,
  onAnswer,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  if (!question) return null

  const handleSelect = (answer, index) => {
    if (isTransitioning) return
    setSelectedIndex(index)
    setIsTransitioning(true)

    setTimeout(() => {
      onAnswer(question.id, answer)
      setSelectedIndex(null)
      setIsTransitioning(false)
    }, 400)
  }

  const progressPercent = (globalProgress / globalTotal) * 100
  const phaseProgress = (questionNumber / totalQuestions) * 100

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Progress bars */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="font-pixel text-xs text-pmd-cyan">{phaseLabel}</span>
          <span className="font-body text-lg text-pmd-text opacity-60">
            {questionNumber} / {totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-pmd-blue overflow-hidden mb-3">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-pmd-cyan to-pmd-gold"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${phaseProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="w-full h-1 rounded-full bg-pmd-blue overflow-hidden opacity-40">
          <motion.div
            className="h-full rounded-full bg-pmd-gold"
            initial={{ width: `${((globalProgress) / globalTotal) * 100}%` }}
            animate={{ width: `${((globalProgress + 1) / globalTotal) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={`q-${question.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pmd-panel p-6 md:p-8 mb-6"
      >
        <p className="font-body text-2xl md:text-3xl text-pmd-text leading-relaxed">
          {question.text}
        </p>
      </motion.div>

      {/* Answers */}
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <motion.button
            key={`${question.id}-${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.08 }}
            onClick={() => handleSelect(answer, index)}
            disabled={isTransitioning}
            className={`
              option-btn w-full text-left pmd-panel p-4 md:p-5
              font-body text-xl md:text-2xl text-pmd-text
              transition-all duration-200 cursor-pointer
              ${selectedIndex === index
                ? 'border-pmd-gold bg-opacity-100 scale-[1.02] border-2 border-yellow-400/60'
                : 'hover:border-pmd-gold/40'
              }
              ${isTransitioning && selectedIndex !== index ? 'opacity-40' : ''}
            `}
          >
            <span className="flex items-start gap-3">
              <span className={`
                inline-flex items-center justify-center w-7 h-7 rounded-full 
                font-pixel text-xs shrink-0 mt-0.5
                ${selectedIndex === index
                  ? 'bg-pmd-gold text-pmd-dark'
                  : 'bg-pmd-blue text-pmd-cyan border border-pmd-border'
                }
              `}>
                {String.fromCharCode(65 + index)}
              </span>
              <span>{answer.text}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
