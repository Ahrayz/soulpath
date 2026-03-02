import { useState, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Starfield from './components/Starfield'
import WelcomeScreen from './components/WelcomeScreen'
import PhaseTransition from './components/PhaseTransition'
import QuizScreen from './components/QuizScreen'
import UsernameScreen from './components/UsernameScreen'
import ResultScreen from './components/ResultScreen'
import { ALL_QUESTIONS } from './data/questions'
import {
  computeQuizResults,
  generateLocalUserMd,
  generateLocalSoulMd,
  buildUserPrompt,
  buildSoulPrompt,
  validateSoulMd,
  validateUserMd,
} from './data/soulGenerator'

const PHASES = {
  WELCOME: 'welcome',
  SELF_INTRO: 'self_intro',
  SELF_QUIZ: 'self_quiz',
  AI_INTRO: 'ai_intro',
  AI_QUIZ: 'ai_quiz',
  NAME_SELECT: 'name_select',
  GENERATING: 'generating',
  RESULT: 'result',
}

const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : ''

function generateSessionId() {
  return 'sp_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
}

export default function App() {
  const [phase, setPhase] = useState(PHASES.WELCOME)
  const [answers, setAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizResults, setQuizResults] = useState(null)
  const [result, setResult] = useState(null)
  const sessionIdRef = useRef(generateSessionId())

  const selfQuestions = ALL_QUESTIONS.filter(q => q.phase === 'self')
  const aiQuestions = ALL_QUESTIONS.filter(q => q.phase === 'ai')

  const handleStart = useCallback(() => {
    setPhase(PHASES.SELF_INTRO)
  }, [])

  const handleSelfIntroComplete = useCallback(() => {
    setCurrentQuestionIndex(0)
    setPhase(PHASES.SELF_QUIZ)
  }, [])

  const handleAiIntroComplete = useCallback(() => {
    setCurrentQuestionIndex(0)
    setPhase(PHASES.AI_QUIZ)
  }, [])

  // Compute trait scores from all collected answers
  const computeTraitScores = useCallback((allAnswers) => {
    const selfTraitScores = {}
    const aiTraitScores = {}

    for (const [qId, ans] of Object.entries(allAnswers)) {
      const question = ALL_QUESTIONS.find(q => q.id === qId)
      if (!question) continue
      const targetScores = question.phase === 'self' ? selfTraitScores : aiTraitScores
      for (const [trait, value] of Object.entries(ans.traits)) {
        targetScores[trait] = (targetScores[trait] || 0) + value
      }
    }

    return { selfTraitScores, aiTraitScores }
  }, [])

  const handleAnswer = useCallback((questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    const isInSelfPhase = phase === PHASES.SELF_QUIZ
    const questions = isInSelfPhase ? selfQuestions : aiQuestions
    const nextIndex = currentQuestionIndex + 1

    if (nextIndex >= questions.length) {
      if (isInSelfPhase) {
        setPhase(PHASES.AI_INTRO)
      } else {
        // All questions done — compute results and go to name selection
        const { selfTraitScores, aiTraitScores } = computeTraitScores(newAnswers)
        const results = computeQuizResults(selfTraitScores, aiTraitScores)
        setQuizResults(results)
        setPhase(PHASES.NAME_SELECT)
      }
    } else {
      setCurrentQuestionIndex(nextIndex)
    }
  }, [phase, currentQuestionIndex, answers, selfQuestions, aiQuestions, computeTraitScores])

  // Handle name selection → generate output
  const handleNameSelect = useCallback(async (chosenName) => {
    if (!quizResults) return
    setPhase(PHASES.GENERATING)

    const {
      soulEmoji, selfArchetype, aiArchetype,
      selfTopTraits, dominantVibe,
      userGuideline, soulGuideline,
    } = quizResults

    // Build model prompts
    const userPrompt = buildUserPrompt(chosenName, userGuideline)
    const soulPrompt = buildSoulPrompt(chosenName, soulGuideline)

    // Try AI generation via backend
    let userMd = null
    let soulMd = null
    let aiGenerated = false
    let promptFallback = null

    try {
      const resp = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          chosenName,
          userGuideline,
          soulGuideline,
          userPrompt,
          soulPrompt,
        }),
      })

      if (resp.ok) {
        const data = await resp.json()
        if (data.aiAvailable) {
          userMd = data.userMd
          soulMd = data.soulMd
          aiGenerated = true
        } else {
          promptFallback = data.reason
        }
      }
    } catch (err) {
      console.log('Backend not available, using local generation:', err.message)
    }

    // Fallback to local generation
    if (!userMd) {
      userMd = generateLocalUserMd(chosenName, selfArchetype, selfTopTraits, aiArchetype, dominantVibe)
    }
    if (!soulMd) {
      soulMd = generateLocalSoulMd(chosenName, aiArchetype, dominantVibe, selfArchetype, soulEmoji, selfTopTraits)
    }

    const soulValidation = validateSoulMd(soulMd)
    const userValidation = validateUserMd(userMd)

    setResult({
      chosenName,
      soulEmoji,
      selfArchetype,
      aiArchetype,
      dominantVibe,
      userMd,
      soulMd,
      soulValidation,
      userValidation,
      aiGenerated,
      promptFallback,
      userPrompt,
      soulPrompt,
    })
    setPhase(PHASES.RESULT)
  }, [quizResults])

  const handleRestart = useCallback(() => {
    setPhase(PHASES.WELCOME)
    setAnswers({})
    setCurrentQuestionIndex(0)
    setQuizResults(null)
    setResult(null)
    sessionIdRef.current = generateSessionId()
  }, [])

  const getCurrentQuestions = () => {
    if (phase === PHASES.SELF_QUIZ) return selfQuestions
    if (phase === PHASES.AI_QUIZ) return aiQuestions
    return []
  }

  const totalQuestions = ALL_QUESTIONS.length
  const answeredCount = Object.keys(answers).length

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-pmd-dark">
      <Starfield />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {phase === PHASES.WELCOME && (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          )}

          {phase === PHASES.SELF_INTRO && (
            <PhaseTransition
              key="self-intro"
              title="Chapter I"
              subtitle="Know Thyself"
              description="First, let us explore the depths of your soul. Answer honestly — there are no wrong paths, only different ones."
              emoji="🪞"
              onComplete={handleSelfIntroComplete}
            />
          )}

          {phase === PHASES.SELF_QUIZ && (
            <QuizScreen
              key="self-quiz"
              question={getCurrentQuestions()[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={selfQuestions.length}
              globalProgress={answeredCount}
              globalTotal={totalQuestions}
              phaseLabel="Your Soul"
              onAnswer={handleAnswer}
            />
          )}

          {phase === PHASES.AI_INTRO && (
            <PhaseTransition
              key="ai-intro"
              title="Chapter II"
              subtitle="Shape Your Companion"
              description="Now, envision your ideal AI companion. What qualities speak to you? How should it walk beside you?"
              emoji="🌟"
              onComplete={handleAiIntroComplete}
            />
          )}

          {phase === PHASES.AI_QUIZ && (
            <QuizScreen
              key="ai-quiz"
              question={getCurrentQuestions()[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={aiQuestions.length}
              globalProgress={answeredCount}
              globalTotal={totalQuestions}
              phaseLabel="AI Soul"
              onAnswer={handleAnswer}
            />
          )}

          {phase === PHASES.NAME_SELECT && quizResults && (
            <UsernameScreen
              key="name-select"
              nameSuggestions={quizResults.nameSuggestions}
              aiArchetype={quizResults.aiArchetype}
              soulEmoji={quizResults.soulEmoji}
              onSelect={handleNameSelect}
            />
          )}

          {phase === PHASES.GENERATING && (
            <PhaseTransition
              key="generating"
              title="Forging Your Soul..."
              subtitle=""
              description="The stars align... your soul.md and user.md are being woven from the threads of your answers."
              emoji="⚗️"
              autoAdvance={false}
            />
          )}

          {phase === PHASES.RESULT && result && (
            <ResultScreen
              key="result"
              result={result}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
