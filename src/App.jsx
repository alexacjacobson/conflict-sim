import { useState } from 'react'
import './index.css'
import { scenarios } from './data/scenarios.js'
import Nav from './components/Nav.jsx'
import ScenarioCard from './components/ScenarioCard.jsx'
import ScenarioPlayer from './components/ScenarioPlayer.jsx'

function App() {
  const [selectedScenario, setSelectedScenario] = useState(null)

  function handleSelectScenario(scenario) {
    setSelectedScenario(scenario)
  }

  function handleClose() {
    setSelectedScenario(null)
  }

  return (
    <>
      <Nav />
      <div className="page home">
        <div className="home__header">
          <div className="home__eyebrow">Module 03 — Lateral Leadership</div>
          <h1 className="home__title">
            The leadership situations<br />nobody <em>rehearses.</em>
          </h1>
          <p className="home__subtitle">Real situations. No scripts. Practice the hard conversations before they happen.</p>
        </div>
        <div className="scenario-grid">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              onClick={() => handleSelectScenario(scenario)}
            />
          ))}
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
            <button className="modal__close" onClick={handleClose}>
              ← All scenarios
            </button>
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
