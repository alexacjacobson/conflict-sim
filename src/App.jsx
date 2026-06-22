import { useState } from 'react'
import './index.css'
import { scenarios } from './data/scenarios.js'
import Nav from './components/Nav.jsx'
import ScenarioCard from './components/ScenarioCard.jsx'
import ScenarioPlayer from './components/ScenarioPlayer.jsx'
import Tag from './components/Tag.jsx'
import SplashScreen from './components/SplashScreen.jsx'

const FRAMEWORK_CATEGORIES = [
  {
    variant: 'pink',
    name: 'Conflict Style',
    description: 'How you tend to respond when facing disagreement or tension.',
    items: [
      { name: 'Fighter', description: 'Direct and forceful; useful in high-stakes moments but can damage relationships.' },
      { name: 'Negotiator', description: 'Seeks joint solutions; finds third options neither party initially considered.' },
      { name: 'Diplomat', description: 'Protects harmony and lowers defensiveness; useful when trust is fragile.' },
      { name: 'Avoider', description: 'Steps back from conflict; useful when emotions are high or stakes are low.' },
      { name: 'People Pleaser', description: "Prioritizes others' needs; builds goodwill but risks authenticity." },
    ],
  },
  {
    variant: 'cobalt',
    name: 'Framework',
    description: 'Structured models from the course for giving feedback and navigating conflict.',
    items: [
      { name: 'Radical Candor', description: 'Care personally and challenge directly at the same time.' },
      { name: 'AID Model', description: 'Action, Impact, Development: structure feedback around what happened and what changes.' },
      { name: 'SBI Model', description: 'Situation, Behavior, Impact: keep feedback specific and observable.' },
      { name: 'GROW Model', description: 'Goal, Reality, Options, Will: a coaching conversation structure.' },
      { name: 'Ruinous Empathy', description: 'Being kind in the moment at the cost of honesty and real help.' },
      { name: 'Facilitation as Leadership', description: 'Using meeting design and presence to create conditions for good work.' },
      { name: 'Priya Parker — Purpose', description: "Every gathering needs a clear purpose; the host's job is to protect it." },
      { name: 'ABC Triangle', description: 'Attitude, Behaviour, Context: the three invisible layers of any conflict.' },
      { name: 'DesignOps', description: 'Orchestrating people, processes, and tools to amplify design at scale.' },
      { name: 'Psychological Safety', description: "The shared belief that it's safe to speak up, take risks, and be honest." },
      { name: 'Integrative Negotiation', description: 'Win-win: finding joint gain through open-minded collaboration.' },
      { name: 'Commitment and Consistency', description: 'People align with prior commitments; use this to make agreements stick.' },
    ],
  },
  {
    variant: 'green',
    name: 'Power Concept',
    description: 'Sources of influence and authority from French, Raven, and Lukes.',
    items: [
      { name: 'Expert Power', description: 'Influence through deep knowledge and skill others value.' },
      { name: 'Referent Power', description: 'Influence through identity and association; others want to be like you.' },
      { name: 'Legitimate Power', description: 'Authority from role or title; unstable if the role is removed.' },
      { name: 'Coercive Power', description: 'Ability to punish non-compliance; creates resentment if overused.' },
      { name: 'Reward Power', description: 'Ability to compensate compliance through tangible or intangible means.' },
      { name: 'Informational Power', description: 'Control of information others need; short-term and diminishing.' },
      { name: 'Connection Power', description: 'Influence through who you know and can connect others to.' },
      { name: 'Resource Power', description: 'Control over budget, tools, or access others need.' },
      { name: "Lukes' 2nd Dimension", description: "Power operates through what never gets put on the agenda at all." },
    ],
  },
  {
    variant: 'orange',
    name: 'Influence Principle',
    description: "Cialdini's six principles of persuasion.",
    items: [
      { name: 'Reciprocation', description: 'People return favors; give first to create goodwill.' },
      { name: 'Liking', description: 'People say yes to those they like and feel connected to.' },
      { name: 'Scarcity', description: 'Limited availability increases perceived value.' },
      { name: 'Unity', description: 'Shared identity creates influence; emphasize what you have in common.' },
      { name: 'Authority', description: 'People defer to credible experts; signal expertise clearly.' },
    ],
  },
  {
    variant: 'outline',
    name: 'Topic Tag',
    description: 'Broader concepts that provide context for the scenario.',
    items: [
      { name: 'Psychological Safety', description: "The belief that honesty and risk-taking won't be punished." },
      { name: 'Coaching vs Mentoring', description: 'Coaching asks questions; mentoring shares experience. Know which to apply.' },
    ],
  },
]

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [openCategories, setOpenCategories] = useState(new Set())
  const [selectedItems, setSelectedItems] = useState({})

  const allOpen = openCategories.size === FRAMEWORK_CATEGORIES.length

  function handleSelectScenario(scenario) {
    setSelectedScenario(scenario)
  }

  function handleClose() {
    setSelectedScenario(null)
  }

  function toggleCategory(name) {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  function toggleItem(catName, itemName) {
    setSelectedItems(prev => ({
      ...prev,
      [catName]: prev[catName] === itemName ? null : itemName,
    }))
  }

  function expandAll() {
    setOpenCategories(new Set(FRAMEWORK_CATEGORIES.map(c => c.name)))
  }

  function collapseAll() {
    setOpenCategories(new Set())
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Nav />
      <div className="page home">
        <div className="home__header">
          <h1 className="home__title">Conflict <em>Rehearsal.</em></h1>
          <p className="home__subtitle">Real situations. No scripts. Practice the hard conversations before they happen.</p>
        </div>
        <div className="section-eyebrow">01</div>
        <h2 className="section-heading">Scenarios</h2>
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onClick={() => handleSelectScenario(scenario)}
            />
          ))}
        </div>

        <div className="framework-guide">
          <div className="section-eyebrow">02</div>
          <div className="framework-guide__header">
            <h2 className="section-heading">Framework Guide</h2>
            <button
              className="framework-guide__toggle"
              onClick={allOpen ? collapseAll : expandAll}
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
          </div>

          {FRAMEWORK_CATEGORIES.map((cat) => {
            const isOpen = openCategories.has(cat.name)
            const activeItemName = selectedItems[cat.name]
            const activeItem = activeItemName ? cat.items.find(i => i.name === activeItemName) : null
            return (
              <div key={cat.name} className="fg-category">
                <div className="fg-category__header" onClick={() => toggleCategory(cat.name)}>
                  <span className={`fg-category__dot fg-category__dot--${cat.variant}`} />
                  <span className="fg-category__name">{cat.name}</span>
                  <svg className={`fg-category__caret${isOpen ? ' fg-category__caret--open' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {isOpen && (
                  <>
                    <div className="fg-category__description">{cat.description}</div>
                    <div className="fg-category__body">
                      <div className="fg-category__pills">
                        {cat.items.map(item => (
                          <button
                            key={item.name}
                            className={`fg-category__pill-btn${activeItemName === item.name ? ' fg-category__pill-btn--selected' : ''}`}
                            onClick={() => toggleItem(cat.name, item.name)}
                          >
                            <Tag label={item.name} variant={cat.variant} />
                          </button>
                        ))}
                      </div>
                      <div className="fg-category__detail">
                        {activeItem && (
                          <div className={`fg-detail-card fg-detail-card--${cat.variant}`}>
                            <div className="fg-detail-card__name">{activeItem.name}</div>
                            <div className="fg-detail-card__desc">{activeItem.description}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {selectedScenario !== null && (
        <div
          className="overlay"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <ScenarioPlayer
              scenario={selectedScenario}
              onBack={handleClose}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default App
