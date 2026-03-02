import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ResultScreen({ result, onRestart }) {
  const [activeTab, setActiveTab] = useState('soul')
  const [copiedField, setCopiedField] = useState(null)
  const [showPrompt, setShowPrompt] = useState(false)

  const {
    chosenName,
    soulEmoji,
    selfArchetype,
    aiArchetype,
    userMd,
    soulMd,
    soulValidation,
    userValidation,
    aiGenerated,
    promptFallback,
    userPrompt,
    soulPrompt,
  } = result

  const handleCopy = async (content, field) => {
    try {
      await navigator.clipboard.writeText(content)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = content
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const currentMd = activeTab === 'soul' ? soulMd : userMd
  const currentValidation = activeTab === 'soul' ? soulValidation : userValidation
  const currentFilename = activeTab === 'soul' ? 'SOUL.md' : 'USER.md'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-3xl mx-auto px-4 py-8"
    >
      {/* Soul Emoji Hero */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
        className="text-center mb-4"
      >
        <div className="soul-emoji inline-block animate-float">{soulEmoji}</div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-pixel text-xl md:text-2xl text-pmd-gold glow-text text-center mb-1"
      >
        Your Soul Has Been Forged
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="font-body text-2xl text-pmd-cyan text-center mb-2"
      >
        {chosenName} — {aiArchetype.name} {aiArchetype.emoji}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="font-body text-lg text-pmd-text text-center mb-6 opacity-60"
      >
        {selfArchetype.name} {selfArchetype.emoji} × {aiArchetype.name} {aiArchetype.emoji}
      </motion.p>

      {/* Archetype Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <div className="pmd-panel p-5">
          <div className="text-3xl mb-2">{selfArchetype.emoji}</div>
          <h3 className="font-pixel text-xs text-pmd-cyan mb-1">You Are</h3>
          <h4 className="font-pixel text-sm text-pmd-gold mb-2">{selfArchetype.name}</h4>
          <p className="font-body text-lg text-pmd-text">{selfArchetype.description}</p>
        </div>
        <div className="pmd-panel-gold p-5">
          <div className="text-3xl mb-2">{aiArchetype.emoji}</div>
          <h3 className="font-pixel text-xs text-pmd-gold mb-1">{chosenName}</h3>
          <h4 className="font-pixel text-sm text-pmd-cyan mb-2">{aiArchetype.name}</h4>
          <p className="font-body text-lg text-pmd-text">{aiArchetype.description}</p>
        </div>
      </motion.div>

      {/* Generation Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-6"
      >
        {aiGenerated ? (
          <span className="font-body text-lg text-green-400 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400" />
            AI-generated
          </span>
        ) : (
          <span className="font-body text-lg text-yellow-400 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
            Local template
          </span>
        )}
        {currentValidation.valid && (
          <span className="font-body text-lg text-green-400 flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-400" />
            {currentFilename} validated
          </span>
        )}
      </motion.div>

      {/* Prompt fallback notice */}
      {promptFallback && !aiGenerated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="pmd-panel p-4 mb-6 text-center"
        >
          <p className="font-body text-lg text-yellow-400 mb-2">{promptFallback}</p>
          <button
            onClick={() => setShowPrompt(!showPrompt)}
            className="font-body text-sm text-pmd-cyan hover:text-pmd-gold transition-colors cursor-pointer underline"
          >
            {showPrompt ? 'Hide prompts' : 'Show prompts (use with any AI model)'}
          </button>
          {showPrompt && (
            <div className="mt-4 space-y-4 text-left">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-xs text-pmd-cyan">USER.md Prompt</span>
                  <button
                    onClick={() => handleCopy(userPrompt, 'userPrompt')}
                    className="font-body text-sm text-pmd-gold cursor-pointer"
                  >
                    {copiedField === 'userPrompt' ? '✓' : '📋'}
                  </button>
                </div>
                <pre className="soul-md-output p-3 max-h-40 overflow-y-auto text-xs">{userPrompt}</pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel text-xs text-pmd-gold">SOUL.md Prompt</span>
                  <button
                    onClick={() => handleCopy(soulPrompt, 'soulPrompt')}
                    className="font-body text-sm text-pmd-gold cursor-pointer"
                  >
                    {copiedField === 'soulPrompt' ? '✓' : '📋'}
                  </button>
                </div>
                <pre className="soul-md-output p-3 max-h-40 overflow-y-auto text-xs">{soulPrompt}</pre>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tab Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex justify-center gap-2 mb-4"
      >
        <button
          onClick={() => setActiveTab('soul')}
          className={`font-pixel text-xs px-5 py-2.5 rounded-t-lg transition-all cursor-pointer
            ${activeTab === 'soul'
              ? 'pmd-panel-gold text-pmd-gold'
              : 'pmd-panel text-pmd-text opacity-60 hover:opacity-100'
            }`}
        >
          {soulEmoji} SOUL.md
        </button>
        <button
          onClick={() => setActiveTab('user')}
          className={`font-pixel text-xs px-5 py-2.5 rounded-t-lg transition-all cursor-pointer
            ${activeTab === 'user'
              ? 'pmd-panel-gold text-pmd-gold'
              : 'pmd-panel text-pmd-text opacity-60 hover:opacity-100'
            }`}
        >
          👤 USER.md
        </button>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mb-4"
      >
        <button
          onClick={() => handleCopy(currentMd, activeTab)}
          className="pmd-panel-gold px-5 py-2.5 font-pixel text-xs text-pmd-gold
                     hover:brightness-110 transition-all cursor-pointer"
        >
          {copiedField === activeTab ? '✓ Copied!' : `📋 Copy ${currentFilename}`}
        </button>
        <button
          onClick={() => handleDownload(currentMd, currentFilename)}
          className="pmd-panel px-5 py-2.5 font-pixel text-xs text-pmd-cyan
                     hover:brightness-110 transition-all cursor-pointer"
        >
          {'💾 Download ' + currentFilename}
        </button>
        <button
          onClick={() => {
            handleDownload(soulMd, 'SOUL.md')
            setTimeout(() => handleDownload(userMd, 'USER.md'), 300)
          }}
          className="pmd-panel px-5 py-2.5 font-pixel text-xs text-pmd-text
                     hover:brightness-110 transition-all cursor-pointer"
        >
          📦 Download Both
        </button>
      </motion.div>

      {/* Markdown Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="pmd-panel p-5 md:p-8 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-pixel text-xs text-pmd-cyan">{currentFilename} Preview</h3>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <RenderedMarkdown markdown={currentMd} />
        </div>
      </motion.div>

      {/* Raw source toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="mb-6"
      >
        <details className="group">
          <summary className="font-body text-lg text-pmd-text opacity-50 hover:opacity-100 cursor-pointer text-center">
            View raw markdown source
          </summary>
          <pre className="soul-md-output p-4 md:p-6 max-h-80 overflow-y-auto text-sm mt-3">
            {currentMd}
          </pre>
        </details>
      </motion.div>

      {/* Restart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onRestart}
          className="font-body text-lg text-pmd-text opacity-50 hover:opacity-100
                     transition-opacity cursor-pointer underline"
        >
          ↻ Start Over
        </button>
      </motion.div>
    </motion.div>
  )
}

function RenderedMarkdown({ markdown }) {
  const lines = markdown.split('\n')
  const blocks = []
  let codeLines = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('```')) {
      if (codeLines === null) {
        codeLines = []
      } else {
        blocks.push({ type: 'code', lines: codeLines, index: i })
        codeLines = null
      }
      continue
    }
    if (codeLines !== null) {
      codeLines.push(line)
    } else {
      blocks.push({ type: 'line', text: line, index: i })
    }
  }

  const elements = blocks.map((block) => {
    if (block.type === 'code') {
      return (
        <div key={`code-${block.index}`} className="bg-pmd-dark/60 rounded p-3 my-2 font-mono text-sm text-pmd-gold">
          {block.lines.map((l, j) => (
            <div key={j}>{l || '\u00A0'}</div>
          ))}
        </div>
      )
    }

    const { text: line, index: i } = block
    if (line.startsWith('# ')) {
      return (
        <h1 key={i} className="font-pixel text-base text-pmd-gold glow-text mt-4 mb-2">
          {renderInline(line.slice(2))}
        </h1>
      )
    } else if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="font-pixel text-xs text-pmd-cyan mt-4 mb-2">
          {renderInline(line.slice(3))}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="font-pixel text-xs text-pmd-text mt-3 mb-1">
          {renderInline(line.slice(4))}
        </h3>
      )
    } else if (line.startsWith('> ')) {
      return (
        <blockquote key={i} className="border-l-2 border-pmd-gold/40 pl-3 my-2 text-pmd-text/60 font-body text-lg italic">
          {renderInline(line.slice(2))}
        </blockquote>
      )
    } else if (line.startsWith('- ')) {
      return (
        <div key={i} className="font-body text-lg text-pmd-text pl-4 my-0.5">
          {'• '}{renderInline(line.slice(2))}
        </div>
      )
    } else if (/^\d+\./.test(line)) {
      return (
        <div key={i} className="font-body text-lg text-pmd-text pl-4 my-0.5">
          {renderInline(line)}
        </div>
      )
    } else if (line.trim() === '') {
      return <div key={i} className="h-2" />
    } else {
      return (
        <p key={i} className="font-body text-lg text-pmd-text my-1">
          {renderInline(line)}
        </p>
      )
    }
  })

  return <div>{elements}</div>
}

function renderInline(text) {
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const codeMatch = remaining.match(/`(.+?)`/)

    let firstMatch = null
    let firstIndex = remaining.length

    if (boldMatch && boldMatch.index < firstIndex) {
      firstMatch = { type: 'bold', match: boldMatch }
      firstIndex = boldMatch.index
    }
    if (codeMatch && codeMatch.index < firstIndex) {
      firstMatch = { type: 'code', match: codeMatch }
      firstIndex = codeMatch.index
    }

    if (!firstMatch) {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }

    if (firstIndex > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, firstIndex)}</span>)
    }

    if (firstMatch.type === 'bold') {
      parts.push(
        <strong key={key++} className="text-pmd-gold">{firstMatch.match[1]}</strong>
      )
      remaining = remaining.slice(firstIndex + firstMatch.match[0].length)
    } else if (firstMatch.type === 'code') {
      parts.push(
        <code key={key++} className="bg-pmd-dark/60 px-1 rounded text-pmd-cyan text-sm">{firstMatch.match[1]}</code>
      )
      remaining = remaining.slice(firstIndex + firstMatch.match[0].length)
    }
  }

  return parts
}
