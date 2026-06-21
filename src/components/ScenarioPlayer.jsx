import React from 'react'
import { useScenario } from '../hooks/useScenario.js'
import ProgressDots from './ProgressDots.jsx'
import CoachingPanel from './CoachingPanel.jsx'

export default function ScenarioPlayer({ scenario, onBack }) {
  const { currentNode, history, showCoaching, lastChoice, choose, advance } = useScenario(scenario)

  if (!currentNode) return null

  const isTerminal = lastChoice && lastChoice.nextNodeId === null

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
          onContinue={() => advance(lastChoice.nextNodeId)}
          isTerminal={isTerminal}
        />
      )}
    </div>
  )
}
