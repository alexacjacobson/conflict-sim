import { useState } from 'react'

export function useScenario(scenario) {
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [history, setHistory] = useState([])
  const [showCoaching, setShowCoaching] = useState(false)
  const [lastChoice, setLastChoice] = useState(null)

  const currentNode = scenario.nodes[currentNodeId]

  function choose(choice) {
    setLastChoice(choice)
    setHistory(prev => [...prev, { nodeId: currentNodeId, choiceId: choice.id }])
    setShowCoaching(true)
  }

  function advance(nextNodeId) {
    setShowCoaching(false)
    if (nextNodeId !== null) {
      setCurrentNodeId(nextNodeId)
    }
  }

  function reset() {
    setCurrentNodeId('start')
    setHistory([])
    setShowCoaching(false)
    setLastChoice(null)
  }

  return { currentNode, history, showCoaching, lastChoice, choose, advance, reset }
}
