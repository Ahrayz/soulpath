import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const QUOTA_FILE = path.join(__dirname, 'quota.json')
const MAX_AI_USERS = 100

const app = express()
app.use(cors())
app.use(express.json())

// Serve static frontend files in production
const distPath = path.join(__dirname, '..', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
}

// --- Quota management ---

function loadQuota() {
  try {
    if (fs.existsSync(QUOTA_FILE)) {
      return JSON.parse(fs.readFileSync(QUOTA_FILE, 'utf-8'))
    }
  } catch (e) {
    console.error('Failed to load quota file:', e.message)
  }
  return { count: 0, users: [] }
}

function saveQuota(quota) {
  fs.writeFileSync(QUOTA_FILE, JSON.stringify(quota, null, 2))
}

function checkAndConsumeQuota(sessionId) {
  const quota = loadQuota()
  // Check if this session already used a slot
  if (quota.users.includes(sessionId)) {
    return { allowed: true, remaining: MAX_AI_USERS - quota.count }
  }
  if (quota.count >= MAX_AI_USERS) {
    return { allowed: false, remaining: 0 }
  }
  quota.count++
  quota.users.push(sessionId)
  saveQuota(quota)
  return { allowed: true, remaining: MAX_AI_USERS - quota.count }
}

// --- API routes ---

// Check quota status
app.get('/api/quota', (req, res) => {
  const quota = loadQuota()
  res.json({
    remaining: MAX_AI_USERS - quota.count,
    total: MAX_AI_USERS,
    available: quota.count < MAX_AI_USERS,
  })
})

// Generate soul.md and user.md via AI model
app.post('/api/generate', async (req, res) => {
  const { sessionId, chosenName, userGuideline, soulGuideline, userPrompt, soulPrompt } = req.body

  if (!sessionId || !chosenName || !userPrompt || !soulPrompt) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const API_KEY = process.env.GEMINI_API_KEY
  if (!API_KEY) {
    return res.json({
      aiAvailable: false,
      reason: 'AI generation not available on this server',
    })
  }

  // Check quota
  const quotaResult = checkAndConsumeQuota(sessionId)
  if (!quotaResult.allowed) {
    return res.json({
      aiAvailable: false,
      reason: `AI generation quota reached (${MAX_AI_USERS} users). You can use the prompts below with any AI model to generate richer output.`,
      remaining: 0,
    })
  }

  try {
    const userMd = await callGemini(API_KEY, userPrompt)
    const soulMd = await callGemini(API_KEY, soulPrompt)

    res.json({
      aiAvailable: true,
      userMd,
      soulMd,
      remaining: quotaResult.remaining,
    })
  } catch (err) {
    console.error('AI generation error:', err.message)
    // Don't waste quota on API errors — refund
    refundQuota(sessionId)
    res.json({
      aiAvailable: false,
      reason: 'AI generation failed. You can use the prompts below with any AI model instead.',
    })
  }
})

function refundQuota(sessionId) {
  const quota = loadQuota()
  const idx = quota.users.indexOf(sessionId)
  if (idx !== -1) {
    quota.users.splice(idx, 1)
    quota.count = Math.max(0, quota.count - 1)
    saveQuota(quota)
  }
}

async function callGemini(apiKey, prompt) {
  const model = 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }),
  })

  if (!response.ok) {
    const errBody = await response.text()
    throw new Error(`Gemini ${response.status}: ${errBody.slice(0, 200)}`)
  }

  const data = await response.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) {
    throw new Error('Empty response from Gemini')
  }

  // Strip any accidental code fences
  return text.replace(/^```(?:markdown)?\n?/m, '').replace(/\n?```$/m, '').trim()
}

// SPA fallback — serve index.html for all non-API routes
if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SoulPath server running on port ${PORT}`)
  console.log(`AI API key: ${process.env.GEMINI_API_KEY ? 'configured ✓' : 'NOT SET — local fallback only'}`)
  console.log(`Quota: ${MAX_AI_USERS} users max`)
})
