import React from 'react'
import ReactDOM from 'react-dom/client'
import { Buffer } from 'buffer'

interface TurnState {
  index: number
  names: string[]
}

const defaultState = {
  index: 0,
  names: ['Apple', 'Banana', 'Cherry', '']
}

function decodeState (base64: string): TurnState {
  if (base64 === undefined) return defaultState
  const stateString = Buffer.from(base64, 'base64').toString('utf-8')
  const [index, ...names] = stateString.split(',')
  names.push('')
  return { index: Number(index), names }
}

function encodeState (state: TurnState): string {
  const stateString = [state.index, ...state.names].join(',')
  return Buffer.from(stateString).toString('base64')
}

function NextLink ({ turnState, baseUrl }): React.ReactElement {
  const names = turnState.names.filter((name: string) => name.length > 0)
  const index = (Number(turnState.index) + 1) % names.length
  const base64 = encodeState({ index, names })
  const nextURI = `${baseUrl}?z=${base64}`
  return <p>Next Link: <a href={nextURI}>{nextURI}</a></p>
}

function TurnForm ({ initialState }) {
  const [state, setState] = React.useState(initialState)

  function handleNameChange (index: number) {
    return (event: React.ChangeEvent) => {
      let names = state.names.slice()
      names[index] = (event.currentTarget as HTMLInputElement).value
      names = names.filter((name: string) => name.length > 0)
      names.push('')
      setState({ ...state, names })
    }
  }

  function handleButtonChange (index: number) {
    return () => {
      setState({ ...state, index })
    }
  }

  const nameInputs = state.names.map((name: string, index: number) => {
    return <div key={`name${index}`}>
      <input type="radio" key={`radio${index}`} value={index} checked={index === state.index} data-index={index} onChange={handleButtonChange(index)} />
      <input type="text" key={`input${index}`} value={name} data-index={index} onChange={handleNameChange(index)} />
    </div>
  })

  return <>
    <h1>It's <b>{state.names[state.index]}'s</b> turn.</h1>
    <NextLink turnState={state} baseUrl={baseUrl} />
    <form key="form">
      <p>Adjust the rotation:</p>
      {nameInputs}
    </form>
  </>
}

const [baseUrl, base64] = window.location.href.split('?z=')
const initialState = decodeState(base64)
const rootNode = document.getElementById('root')
const root = ReactDOM.createRoot(rootNode!)
root.render(React.createElement(TurnForm, { initialState }))
