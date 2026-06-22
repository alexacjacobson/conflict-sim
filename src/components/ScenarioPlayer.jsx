import React, { useState } from 'react'
import { useScenario } from '../hooks/useScenario.js'
import ProgressDots from './ProgressDots.jsx'
import CoachingPanel from './CoachingPanel.jsx'
import Tag from './Tag.jsx'

const STYLE_MESSAGES = {
  Fighter: {
    headline: 'You lead with directness.',
    body: "When something is wrong, you say so. That directness is a real asset — it cuts through ambiguity and names what others are thinking but not saying. The cost is that it can land hard on relationships, especially when the other person isn't ready to engage with the real issue. The Fighter approach works best when you have positional power or clear wrongdoing. In lateral conflicts, it often wins the argument and loses the dynamic.",
  },
  Negotiator: {
    headline: 'You look for the third option.',
    body: "Your instinct is to find a path that works for both parties — not to split the difference, but to surface interests that weren't on the table yet. That's integrative negotiation, and it's rare. The risk is that good process without a concrete ask leaves agreements vague. You're strongest when you close the loop: name the option, propose the structure, follow up the same day.",
  },
  Diplomat: {
    headline: 'You protect the relationship first.',
    body: "You read the room well and you know that how something lands matters as much as what's said. That attunement is a genuine leadership skill — it keeps relationships intact through hard conversations. The risk is that diplomacy can shade into avoidance when the real issue needs to be named. The most effective Diplomats make the relational move first, then bring the structural ask.",
  },
  Avoider: {
    headline: 'You tend to absorb rather than address.',
    body: "You pick your battles carefully, which means you preserve a lot of goodwill. But avoidance has a compounding cost: the undiscussed thing doesn't disappear, it just grows more expensive to raise. The conflicts you defer rarely resolve themselves — they resurface with more evidence and more friction. Your insight about what not to fight is valuable. The skill to develop is knowing which things need to be raised even when it's uncomfortable.",
  },
  'People Pleaser': {
    headline: 'You lead with warmth.',
    body: "You're good at making people feel heard and respected, and that creates real trust over time. The pattern to watch is when warmth becomes a substitute for accountability — saying yes to protect the moment, or leaving feedback vague to avoid discomfort. People Pleasers often mistake a good conversation for a solved problem. The ask doesn't have to be aggressive to be real.",
  },
  Coaching: {
    headline: 'You ask before you tell.',
    body: "Your instinct is to surface what the other person already knows rather than hand them the answer. That's the foundation of coaching — and it's rarer than it sounds. When someone already has insight, your questions unlock it. The edge case to watch: sometimes people need direct information, not a question. Coaching and mentoring aren't competing approaches; they're tools for different moments. You've learned to reach for the right one.",
  },
}

function getDominantStyle(approach) {
  if (approach.includes('Fighter')) return 'Fighter'
  if (approach.includes('Negotiator')) return 'Negotiator'
  if (approach.includes('Diplomat')) return 'Diplomat'
  if (approach.includes('Avoider')) return 'Avoider'
  if (approach.includes('People Pleaser')) return 'People Pleaser'
  if (
    approach.includes('Coaching') ||
    approach.includes('Radical Candor') ||
    approach.includes('Mentoring')
  ) return 'Coaching'
  return 'Negotiator'
}

export default function ScenarioPlayer({ scenario, onBack }) {
  const { currentNode, history, showCoaching, lastChoice, choose, advance, reset } = useScenario(scenario)
  const [showOutcome, setShowOutcome] = useState(false)

  if (!currentNode && !showOutcome) return null

  const isTerminal = lastChoice && lastChoice.nextNodeId === null

  function handleContinue() {
    if (isTerminal) {
      setShowOutcome(true)
    } else {
      advance(lastChoice.nextNodeId)
    }
  }

  function handleReset() {
    reset()
    setShowOutcome(false)
  }

  if (showOutcome) {
    const choiceHistory = history.map(entry => {
      const node = scenario.nodes[entry.nodeId]
      return node?.choices.find(c => c.id === entry.choiceId)
    }).filter(Boolean)

    const approachCounts = {}
    choiceHistory.forEach(choice => {
      const style = getDominantStyle(choice.approach)
      approachCounts[style] = (approachCounts[style] || 0) + 1
    })

    const dominantStyle =
      Object.entries(approachCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Negotiator'

    const message = STYLE_MESSAGES[dominantStyle] || STYLE_MESSAGES['Negotiator']

    const allFrameworks = [...new Set(choiceHistory.flatMap(c => c.frameworks))]

    return (
      <div className="outcome">
        <div className="outcome__eyebrow">Scenario complete</div>
        <div className="outcome__title">{message.headline}</div>
        <div className="outcome__body">{message.body}</div>

        <div className="outcome__section">
          <div className="coaching-panel__coaching-label">Your path</div>
          <div className="outcome__path">
            {choiceHistory.map((choice, i) => (
              <div key={i} className="outcome__path-item">
                <div className="choice-btn__approach">{choice.approach}</div>
                <div className="choice-btn__label">{choice.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="outcome__section">
          <div className="coaching-panel__coaching-label">Frameworks encountered</div>
          <div className="outcome__frameworks">
            {allFrameworks.map(fw => (
              <Tag key={fw} label={fw} variant="cobalt" />
            ))}
          </div>
        </div>

        <div className="outcome__actions">
          <button className="coaching-panel__back" onClick={handleReset}>
            ← Try again
          </button>
          <button className="btn btn--primary" onClick={onBack}>
            All scenarios →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="scenario-player__meta">
        <span className="scenario-player__label">
          {scenario.number} — {scenario.title}
        </span>
        <ProgressDots total={scenario.decisionCount} current={history.length} />
      </div>

      {!showCoaching && (
        <>
          <div className="situation">
            <div className="situation__context">The situation</div>
            <div className="situation__text">{currentNode.situation}</div>
          </div>
          <div className="choices">
            {currentNode.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-btn"
                onClick={() => choose(choice)}
              >
                <div className="choice-btn__approach">{choice.approach}</div>
                <div className="choice-btn__label">{choice.label}</div>
                <div className="choice-btn__text">{choice.text}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {showCoaching && lastChoice && (
        <CoachingPanel
          choice={lastChoice}
          onContinue={handleContinue}
          onBack={() => advance(null)}
          isTerminal={isTerminal}
        />
      )}
    </div>
  )
}
