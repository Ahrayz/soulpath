# 🔮 SoulPath

**Discover Your AI Soul** — A Pokemon Mystery Dungeon-inspired personality quiz that generates `SOUL.md` and `USER.md` files for your [OpenClaw](https://github.com/openclaw/openclaw) AI companion.

## What is SoulPath?

SoulPath guides you through a mystical journey of self-discovery across three chapters:

1. **Know Thyself** — 10 questions exploring your personality traits
2. **Shape Your Companion** — 5 questions about your ideal AI's nature and vibe (aligned with OpenClaw archetypes)
3. **Name Your Companion** — Choose from 3 generated names or forge your own

At the end, SoulPath generates two files for your OpenClaw workspace:

- **SOUL.md** — Your AI companion's identity, vibe, boundaries, and communication style
- **USER.md** — Your personality profile, preferences, and context for the AI

The soul is shaped by your personality — SoulPath analyzes the pairing between you and your companion, and optionally uses an AI model for richer, more creative output.

## Features

- 🌟 **PMD-style atmospheric UI** with animated starfield, smooth transitions, and pixel-art aesthetic
- 📝 **15 personality questions** across two phases (self + AI companion)
- 🧬 **8 self-archetypes × 4 AI archetypes** with nature/vibe matching (aligned with OpenClaw IDENTITY.md)
- 🤖 **AI-enhanced generation** — first 100 users get AI-crafted output; others get local templates + copyable prompts for any model
- 📋 **Copy & Download** both SOUL.md and USER.md
- 👁️ **Tabbed preview** with rendered markdown
- 🐳 **Docker-ready** with Express backend

## Quick Start

### Development

```bash
npm install
npm run dev          # Frontend on :3000
npm run dev:server   # Backend on :3001
# Or both:
npm run dev:all
```

### AI API Setup (optional)

```bash
cp .env.example .env
# Edit .env and add your API key (currently supports Gemini)
```

Without the key, SoulPath generates personality-driven output locally. With it, the first 100 users get richer AI-enhanced output. Users beyond the quota get copyable prompts they can use with any AI model.

### Docker

```bash
# With AI generation:
GEMINI_API_KEY=your_key docker compose up -d

# Without AI (local templates only):
docker compose up -d
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Tech Stack

- **React 18** + **Vite** — Frontend
- **TailwindCSS** — Styling
- **Framer Motion** — Animations
- **Express** — Backend API server
- **AI model integration** — Gemini API for enhanced generation (optional)

## Project Structure

```
soulpath/
├── src/
│   ├── components/
│   │   ├── Starfield.jsx        # Animated starfield background
│   │   ├── WelcomeScreen.jsx    # Landing page
│   │   ├── PhaseTransition.jsx  # Chapter transitions
│   │   ├── QuizScreen.jsx       # Question display + answer selection
│   │   ├── UsernameScreen.jsx   # AI companion name selection
│   │   └── ResultScreen.jsx     # Dual output with tabs
│   ├── data/
│   │   ├── questions.js         # All personality questions
│   │   ├── personalities.js     # Archetypes, names, matching
│   │   └── soulGenerator.js     # Generation, prompts, validation
│   ├── App.jsx                  # Main app with state management
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles + PMD theme
├── server/
│   └── index.js                 # Express backend (AI API + quota)
├── .env.example                 # Environment variable template
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Docker Compose config
└── package.json
```

## OpenClaw Output Format

### SOUL.md

Follows OpenClaw's [SOUL.md template](https://docs.openclaw.ai/reference/templates/SOUL):

- **Core Truths** — Name, creature type, vibe, emoji, identity
- **Why You Exist** — How the human's personality shaped this soul
- **Boundaries** — Privacy and safety rules
- **Vibe** — Communication style and personality
- **Continuity** — Relationship growth guidelines

### USER.md

Follows OpenClaw's [USER.md template](https://docs.openclaw.ai/reference/templates/USER):

- **Name / Pronouns / Timezone** — Basic info (user fills in)
- **Context** — Personality profile from quiz results
- **Preferences** — Communication style preferences
- **AI Companion** — Chosen companion name

## Credits

Made by [@ahrayz](https://github.com/ahrayz)

## License

MIT
