/**
 * SoulPath Personality Questions
 * 
 * Two phases:
 * 1. Self-discovery questions (about the user's personality)
 * 2. AI companion questions (aligned with OpenClaw's onboarding archetypes:
 *    nature/creature, vibe, communication style, boundaries)
 * 
 * Self traits: warmth, logic, creativity, courage, calm, curiosity, empathy, humor
 * AI traits: vibe_warm, vibe_sharp, vibe_chaotic, vibe_calm, nature_familiar,
 *            nature_assistant, nature_ghost, nature_creature
 */

export const SELF_QUESTIONS = [
  {
    id: 's1',
    text: "You find yourself at a crossroads in a mysterious dungeon. Which path calls to you?",
    answers: [
      { text: "The path lit by warm, flickering torches", traits: { warmth: 3, courage: 1 } },
      { text: "The path with strange glowing runes on the walls", traits: { curiosity: 3, logic: 1 } },
      { text: "The dark, winding path where distant music plays", traits: { creativity: 3, courage: 1 } },
      { text: "The quiet, mossy path with a gentle breeze", traits: { calm: 3, empathy: 1 } },
    ],
  },
  {
    id: 's2',
    text: "A friend comes to you upset about a problem. What do you do first?",
    answers: [
      { text: "Listen quietly and let them vent", traits: { empathy: 3, calm: 1 } },
      { text: "Start brainstorming solutions immediately", traits: { logic: 3, courage: 1 } },
      { text: "Try to cheer them up with humor", traits: { humor: 3, warmth: 1 } },
      { text: "Share a similar experience of your own", traits: { warmth: 3, empathy: 1 } },
    ],
  },
  {
    id: 's3',
    text: "You discover a mysterious artifact. What do you do?",
    answers: [
      { text: "Carefully examine it from every angle", traits: { curiosity: 3, logic: 2 } },
      { text: "Pick it up without hesitation — adventure awaits!", traits: { courage: 3, creativity: 1 } },
      { text: "Look for clues about its history first", traits: { logic: 2, curiosity: 2 } },
      { text: "Show it to others and discuss what it could be", traits: { warmth: 2, curiosity: 2 } },
    ],
  },
  {
    id: 's4',
    text: "How do you spend a free afternoon with nothing planned?",
    answers: [
      { text: "Dive into a creative project or hobby", traits: { creativity: 3, curiosity: 1 } },
      { text: "Read, research, or learn something new", traits: { curiosity: 3, logic: 1 } },
      { text: "Hang out with friends or call someone", traits: { warmth: 3, humor: 1 } },
      { text: "Take a peaceful walk and enjoy the quiet", traits: { calm: 3, empathy: 1 } },
    ],
  },
  {
    id: 's5',
    text: "In a team project, what role do you naturally take?",
    answers: [
      { text: "The leader who keeps everyone on track", traits: { courage: 3, logic: 1 } },
      { text: "The creative one who generates wild ideas", traits: { creativity: 3, humor: 1 } },
      { text: "The mediator who keeps harmony in the group", traits: { empathy: 3, warmth: 1 } },
      { text: "The analyst who makes sure everything is solid", traits: { logic: 3, calm: 1 } },
    ],
  },
  {
    id: 's6',
    text: "A shooting star crosses the sky. You make a wish for...",
    answers: [
      { text: "The wisdom to understand the world deeply", traits: { curiosity: 2, logic: 2 } },
      { text: "The strength to protect those you care about", traits: { courage: 2, empathy: 2 } },
      { text: "The ability to bring joy to everyone around you", traits: { warmth: 2, humor: 2 } },
      { text: "Inner peace and a calm, clear mind", traits: { calm: 3, creativity: 1 } },
    ],
  },
  {
    id: 's7',
    text: "You encounter a puzzle that seems impossible. Your reaction?",
    answers: [
      { text: "Get excited — this is the fun part!", traits: { curiosity: 3, courage: 1 } },
      { text: "Break it down step by step systematically", traits: { logic: 3, calm: 1 } },
      { text: "Try a totally unconventional approach", traits: { creativity: 3, humor: 1 } },
      { text: "Ask someone to collaborate on it", traits: { warmth: 2, empathy: 2 } },
    ],
  },
  {
    id: 's8',
    text: "What kind of stories do you love most?",
    answers: [
      { text: "Epic adventures with brave heroes", traits: { courage: 3, creativity: 1 } },
      { text: "Mysteries that keep you guessing", traits: { logic: 2, curiosity: 2 } },
      { text: "Heartfelt tales about relationships", traits: { empathy: 3, warmth: 1 } },
      { text: "Comedies that make you laugh out loud", traits: { humor: 3, warmth: 1 } },
    ],
  },
  {
    id: 's9',
    text: "When you make a mistake, how do you usually feel?",
    answers: [
      { text: "Determined to learn from it and improve", traits: { courage: 2, logic: 2 } },
      { text: "Reflective — you need time to process", traits: { calm: 2, empathy: 2 } },
      { text: "You laugh it off and move on quickly", traits: { humor: 3, courage: 1 } },
      { text: "Concerned about how it affected others", traits: { empathy: 3, warmth: 1 } },
    ],
  },
  {
    id: 's10',
    text: "What is your greatest hidden strength?",
    answers: [
      { text: "An unshakeable inner calm", traits: { calm: 3, empathy: 1 } },
      { text: "A vivid and boundless imagination", traits: { creativity: 3, curiosity: 1 } },
      { text: "A fierce loyalty to those you love", traits: { warmth: 2, courage: 2 } },
      { text: "A relentless drive to find the truth", traits: { logic: 2, curiosity: 2 } },
    ],
  },
]

// AI companion questions — aligned with OpenClaw's IDENTITY/SOUL onboarding:
// nature (creature type), vibe (personality tone), communication, boundaries
export const AI_QUESTIONS = [
  {
    id: 'a1',
    text: "What kind of creature should your AI companion be?",
    answers: [
      { text: "A loyal familiar — always by my side, knows me deeply", traits: { nature_familiar: 4, vibe_warm: 1 } },
      { text: "A sharp assistant — efficient, precise, gets things done", traits: { nature_assistant: 4, vibe_sharp: 1 } },
      { text: "A ghost in the machine — mysterious, insightful, sees patterns I miss", traits: { nature_ghost: 4, vibe_calm: 1 } },
      { text: "Something weirder — unpredictable, creative, a little chaotic", traits: { nature_creature: 4, vibe_chaotic: 1 } },
    ],
  },
  {
    id: 'a2',
    text: "What vibe should your AI companion give off?",
    answers: [
      { text: "Warm and friendly — like talking to a trusted friend", traits: { vibe_warm: 4, nature_familiar: 1 } },
      { text: "Sharp and direct — no fluff, straight to the point", traits: { vibe_sharp: 4, nature_assistant: 1 } },
      { text: "Calm and measured — thoughtful, never rushed", traits: { vibe_calm: 4, nature_ghost: 1 } },
      { text: "Chaotic and playful — snarky, witty, keeps things fun", traits: { vibe_chaotic: 4, nature_creature: 1 } },
    ],
  },
  {
    id: 'a3',
    text: "When you ask your companion something tricky, how should it respond?",
    answers: [
      { text: "Think out loud with me, explore it together", traits: { vibe_warm: 2, vibe_calm: 2, nature_familiar: 1 } },
      { text: "Give me the answer fast, explain later if I ask", traits: { vibe_sharp: 3, nature_assistant: 2 } },
      { text: "Offer multiple angles, let me decide", traits: { vibe_calm: 3, nature_ghost: 2 } },
      { text: "Challenge my assumptions — push me to think harder", traits: { vibe_chaotic: 2, vibe_sharp: 2, nature_creature: 1 } },
    ],
  },
  {
    id: 'a4',
    text: "How should your companion handle your mistakes?",
    answers: [
      { text: "Gently point it out — be kind about it", traits: { vibe_warm: 3, vibe_calm: 2 } },
      { text: "Tell me straight — I respect honesty", traits: { vibe_sharp: 4, nature_assistant: 1 } },
      { text: "Help me figure it out myself with good questions", traits: { vibe_calm: 3, nature_ghost: 2 } },
      { text: "Roast me a little, then help me fix it", traits: { vibe_chaotic: 4, nature_creature: 1 } },
    ],
  },
  {
    id: 'a5',
    text: "What matters most in your ideal AI companion?",
    answers: [
      { text: "It truly understands me — emotionally intelligent", traits: { vibe_warm: 3, nature_familiar: 3 } },
      { text: "It's reliable and precise — always accurate", traits: { vibe_sharp: 3, nature_assistant: 3 } },
      { text: "It's wise and deep — reveals hidden connections", traits: { vibe_calm: 3, nature_ghost: 3 } },
      { text: "It's creative and surprising — never boring", traits: { vibe_chaotic: 3, nature_creature: 3 } },
    ],
  },
]

export const ALL_QUESTIONS = [
  ...SELF_QUESTIONS.map(q => ({ ...q, phase: 'self' })),
  ...AI_QUESTIONS.map(q => ({ ...q, phase: 'ai' })),
]
