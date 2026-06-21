import Tag from './Tag.jsx'

export default function ScenarioCard({ scenario, onClick }) {
  return (
    <div className="scenario-card" onClick={onClick}>
      <div className="scenario-card__number">{scenario.number}</div>
      <div className="scenario-card__title">{scenario.title}</div>
      <div className="scenario-card__description">{scenario.description}</div>
      <div className="scenario-card__footer">
        <div className="scenario-card__tags">
          {scenario.tags.map((tag, i) => (
            <Tag key={tag} label={tag} variant={scenario.tagVariants[i]} />
          ))}
        </div>
        <span className="scenario-card__cta">Enter scenario →</span>
      </div>
    </div>
  )
}
