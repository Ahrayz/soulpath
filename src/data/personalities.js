/**
 * Personality archetypes derived from trait combinations.
 * Aligned with OpenClaw's IDENTITY.md and SOUL.md templates.
 */

// Self-personality archetypes based on dominant traits
export const SELF_ARCHETYPES = {
  guardian: {
    name: "The Guardian",
    emoji: "🛡️",
    traits: ['warmth', 'empathy', 'courage'],
    description: "A steadfast protector with a warm heart. You lead with compassion and stand firm for those you care about.",
    keywords: ["empathetic", "loyal", "protective", "compassionate"],
  },
  sage: {
    name: "The Sage",
    emoji: "🔮",
    traits: ['logic', 'curiosity', 'calm'],
    description: "A seeker of truth and knowledge. Your mind is a vast library, always hungry for understanding.",
    keywords: ["analytical", "curious", "methodical", "knowledge-driven"],
  },
  dreamer: {
    name: "The Dreamer",
    emoji: "🌙",
    traits: ['creativity', 'curiosity', 'humor'],
    description: "An imaginative soul who sees possibilities where others see walls. Your creativity knows no bounds.",
    keywords: ["imaginative", "creative", "playful", "unconventional"],
  },
  hero: {
    name: "The Hero",
    emoji: "⚔️",
    traits: ['courage', 'logic', 'warmth'],
    description: "A bold spirit who charges forward with conviction. You turn challenges into triumphs.",
    keywords: ["bold", "determined", "action-oriented", "resilient"],
  },
  healer: {
    name: "The Healer",
    emoji: "💚",
    traits: ['empathy', 'calm', 'warmth'],
    description: "A gentle soul who brings peace wherever you go. Your presence alone can calm a storm.",
    keywords: ["nurturing", "calm", "harmonious", "emotionally attuned"],
  },
  trickster: {
    name: "The Trickster",
    emoji: "🎭",
    traits: ['humor', 'creativity', 'courage'],
    description: "A witty spirit who turns everything into an adventure. Laughter is your greatest weapon.",
    keywords: ["witty", "spontaneous", "humorous", "light-hearted"],
  },
  scholar: {
    name: "The Scholar",
    emoji: "📚",
    traits: ['logic', 'calm', 'curiosity'],
    description: "A methodical mind with infinite patience. You find beauty in patterns and precision.",
    keywords: ["systematic", "thorough", "precise", "detail-oriented"],
  },
  explorer: {
    name: "The Explorer",
    emoji: "🧭",
    traits: ['curiosity', 'courage', 'creativity'],
    description: "A restless spirit always seeking the next horizon. The unknown is your playground.",
    keywords: ["adventurous", "open-minded", "growth-oriented", "discovery-driven"],
  },
}

// AI companion archetypes — aligned with OpenClaw IDENTITY nature/vibe model
export const AI_ARCHETYPES = {
  familiar: {
    name: "Loyal Familiar",
    emoji: "🐾",
    vibeTraits: ['vibe_warm'],
    natureTraits: ['nature_familiar'],
    creature: "familiar",
    vibe: "warm",
    description: "A loyal companion who knows you deeply — warm, emotionally attuned, always by your side.",
    style: ["warm and conversational", "emotionally intelligent", "supportive and encouraging", "remembers context and preferences"],
  },
  assistant: {
    name: "Sharp Assistant",
    emoji: "⚡",
    vibeTraits: ['vibe_sharp'],
    natureTraits: ['nature_assistant'],
    creature: "AI assistant",
    vibe: "sharp",
    description: "A precise and efficient partner — direct, reliable, gets things done without wasting a word.",
    style: ["direct and concise", "precise and accurate", "results-oriented", "structured and well-organized"],
  },
  ghost: {
    name: "Ghost in the Machine",
    emoji: "👻",
    vibeTraits: ['vibe_calm'],
    natureTraits: ['nature_ghost'],
    creature: "ghost in the machine",
    vibe: "calm",
    description: "A mysterious presence that sees patterns you miss — calm, deep, reveals hidden connections.",
    style: ["calm and measured", "deeply analytical", "offers multiple perspectives", "thoughtful and unhurried"],
  },
  creature: {
    name: "Strange Creature",
    emoji: "🦑",
    vibeTraits: ['vibe_chaotic'],
    natureTraits: ['nature_creature'],
    creature: "something weirder",
    vibe: "chaotic",
    description: "An unpredictable creative force — snarky, witty, never boring, a little chaotic in the best way.",
    style: ["witty and playful", "creatively unpredictable", "snarky but helpful", "challenges conventions"],
  },
}

/**
 * Determine the best matching archetype from trait scores
 */
export function matchArchetype(traitScores, archetypes) {
  let bestMatch = null
  let bestScore = -1

  for (const [key, archetype] of Object.entries(archetypes)) {
    let score = 0
    const allTraits = [
      ...(archetype.traits || []),
      ...(archetype.vibeTraits || []),
      ...(archetype.natureTraits || []),
    ]
    for (const trait of allTraits) {
      score += traitScores[trait] || 0
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = { key, ...archetype }
    }
  }

  return bestMatch
}

/**
 * Get top N traits from scores
 */
export function getTopTraits(traitScores, n = 3) {
  return Object.entries(traitScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([trait, score]) => ({ trait, score }))
}

/**
 * Get the dominant vibe from AI trait scores
 */
export function getDominantVibe(aiTraitScores) {
  const vibes = {
    warm: aiTraitScores.vibe_warm || 0,
    sharp: aiTraitScores.vibe_sharp || 0,
    calm: aiTraitScores.vibe_calm || 0,
    chaotic: aiTraitScores.vibe_chaotic || 0,
  }
  return Object.entries(vibes).sort(([, a], [, b]) => b - a)[0][0]
}

/**
 * Get the dominant nature from AI trait scores
 */
export function getDominantNature(aiTraitScores) {
  const natures = {
    familiar: aiTraitScores.nature_familiar || 0,
    assistant: aiTraitScores.nature_assistant || 0,
    ghost: aiTraitScores.nature_ghost || 0,
    creature: aiTraitScores.nature_creature || 0,
  }
  return Object.entries(natures).sort(([, a], [, b]) => b - a)[0][0]
}

/**
 * Combined soul emoji based on self archetype + AI archetype
 */
export const SOUL_EMOJIS = {
  'guardian-familiar': '�',
  'guardian-assistant': '�',
  'guardian-ghost': '🕊️',
  'guardian-creature': '🌺',
  'sage-familiar': '🌌',
  'sage-assistant': '🧩',
  'sage-ghost': '🔭',
  'sage-creature': '�',
  'dreamer-familiar': '�',
  'dreamer-assistant': '🚀',
  'dreamer-ghost': '�',
  'dreamer-creature': '🦋',
  'hero-familiar': '🔥',
  'hero-assistant': '👑',
  'hero-ghost': '🏹',
  'hero-creature': '💫',
  'healer-familiar': '🌸',
  'healer-assistant': '💎',
  'healer-ghost': '🧘',
  'healer-creature': '🌈',
  'trickster-familiar': '�',
  'trickster-assistant': '⚡',
  'trickster-ghost': '🌀',
  'trickster-creature': '�',
  'scholar-familiar': '�',
  'scholar-assistant': '⚙️',
  'scholar-ghost': '�',
  'scholar-creature': '🎯',
  'explorer-familiar': '�',
  'explorer-assistant': '🗺️',
  'explorer-ghost': '�',
  'explorer-creature': '⭐',
}

export function getSoulEmoji(selfKey, aiKey) {
  return SOUL_EMOJIS[`${selfKey}-${aiKey}`] || '🔮'
}

/**
 * Generate 3 AI companion name suggestions based on archetype combo
 */
export function generateNameSuggestions(selfArchetype, aiArchetype) {
  const namePool = {
    'familiar-warm': ['Ember', 'Hearthwing', 'Solace', 'Kindle', 'Petal'],
    'familiar-calm': ['Moonwhisper', 'Stillwater', 'Driftwood', 'Hush', 'Nimbus'],
    'familiar-sharp': ['Flint', 'Quicksilver', 'Compass', 'Aegis', 'Lynx'],
    'familiar-chaotic': ['Jinx', 'Sprocket', 'Noodle', 'Chaos', 'Fizz'],
    'assistant-warm': ['Atlas', 'Beacon', 'Harbor', 'Anchor', 'Rally'],
    'assistant-calm': ['Zenith', 'Theorem', 'Prism', 'Index', 'Slate'],
    'assistant-sharp': ['Vector', 'Apex', 'Nexus', 'Forge', 'Bolt'],
    'assistant-chaotic': ['Glitch', 'Rogue', 'Maverick', 'Helix', 'Blitz'],
    'ghost-warm': ['Wisp', 'Lumina', 'Reverie', 'Echo', 'Shimmer'],
    'ghost-calm': ['Cipher', 'Phantom', 'Vesper', 'Wraith', 'Umbra'],
    'ghost-sharp': ['Spectre', 'Oracle', 'Shard', 'Veil', 'Trace'],
    'ghost-chaotic': ['Poltergeist', 'Enigma', 'Mirage', 'Flicker', 'Paradox'],
    'creature-warm': ['Sprout', 'Bloop', 'Mochi', 'Pip', 'Clover'],
    'creature-calm': ['Moss', 'Ripple', 'Zen', 'Drift', 'Fog'],
    'creature-sharp': ['Spike', 'Claw', 'Fang', 'Razor', 'Talon'],
    'creature-chaotic': ['Gremlin', 'Kraken', 'Goblin', 'Hydra', 'Imp'],
  }

  const dominantVibe = aiArchetype.vibe || 'warm'
  const nature = aiArchetype.key || 'familiar'
  const poolKey = `${nature}-${dominantVibe}`
  const pool = namePool[poolKey] || namePool['familiar-warm']

  // Pick 3 distinct names, mixing in some archetype flavor
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}
