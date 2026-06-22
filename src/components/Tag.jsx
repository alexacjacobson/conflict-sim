import { useState } from 'react'
import { getTagVariant, tagDescriptions } from '../data/scenarios.js'

export default function Tag({ label, variant, hideTooltip }) {
  const resolvedVariant = variant ?? getTagVariant(label)
  const description = tagDescriptions[label]
  const [tooltipPos, setTooltipPos] = useState(null)

  function handleMouseEnter(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltipPos({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    })
  }

  function handleMouseLeave() {
    setTooltipPos(null)
  }

  return (
    <div
      className="tag-wrapper"
      onMouseEnter={description ? handleMouseEnter : undefined}
      onMouseLeave={description ? handleMouseLeave : undefined}
    >
      <span className={`tag tag--${resolvedVariant}`}>{label}</span>
      {description && tooltipPos && !hideTooltip && (
        <div
          className={`tag-tooltip tag-tooltip--${resolvedVariant}`}
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: 'translate(-50%, -100%)',
            opacity: 1,
          }}
        >
          {description}
        </div>
      )}
    </div>
  )
}
