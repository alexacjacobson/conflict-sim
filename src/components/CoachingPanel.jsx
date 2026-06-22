import React from 'react'
import Tag from './Tag.jsx'

export default function CoachingPanel({ choice, onContinue, onBack, isTerminal }) {
  return (
    <div className="coaching-panel">
      <div className="coaching-panel__eyebrow">What just happened</div>
      <div className="coaching-panel__consequence">{choice.consequence}</div>
      <div className="coaching-panel__coaching-label">Coaching</div>
      <div className="coaching-panel__coaching-text">{choice.coaching}</div>
      <div className="coaching-panel__frameworks">
        {choice.frameworks.map((fw) => (
          <Tag key={fw} label={fw} />
        ))}
      </div>
      <div className="coaching-panel__actions">
        <button className="coaching-panel__back" onClick={onBack}>
          ← Back
        </button>
        {!isTerminal && (
          <button className="btn btn--primary" onClick={onContinue}>
            Continue →
          </button>
        )}
        {isTerminal && (
          <button className="btn btn--primary" onClick={onContinue}>
            See outcome →
          </button>
        )}
      </div>
    </div>
  )
}
