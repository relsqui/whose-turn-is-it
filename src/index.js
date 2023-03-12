const { useEffect } = require('react');
const React = require('react');
const ReactDOM = require('react-dom/client');
const Buffer = require('buffer/').Buffer;

const defaultState = {names: ["Apple", "Banana", "Cherry", ""], index: 0};

function NextLink({turnState}) {
  const stateString = [turnState.index, ...turnState.names].join(",");
  const base64 = Buffer.from(stateString).toString('base64');
  return <p>Next Link: <a href="">{base64}</a></p>
}

function TurnForm() {
  const [state, setState] = React.useState(defaultState);
  // const nameRef = React.useMemo(() => Array(state.names.length).fill(0).map(i => React.useRef()));

  function handleNameChange(index, event) {
    return (event) => {
      var names = state.names.slice();
      names[index] = event.target.value;
      names = names.filter(name => name.length > 0);
      names.push("");
      setState({...state, names});
    }
  }

  function handleButtonChange(index) {
    return () => {
      setState({...state, index});
    }
  }

  const nameInputs = state.names.map((name, index) => {
    return <div key={`name${index}`}>
      <input type="radio" key={`radio${index}`} value={index} checked={index === state.index} index={index} onChange={handleButtonChange(index)} />
      <input type="text" key={`input${index}`} value={name} index={index} onChange={handleNameChange(index)} />
    </div>
  });

  return <>
    <form key="form">
      {nameInputs}
      <textarea rows="10" cols="80" key="debug" readOnly value={JSON.stringify(state)} />
    </form>
    <h1>It's <b>{state.names[state.index]}'s</b> turn.</h1>
    <NextLink turnState={{index: state.index, names: state.names}} />
  </>
}

function decodeState (stateString64) {
  if (!stateString64) {
    return defaultState;
  }
  const stateString = Buffer.from(stateString64, 'base64').toString('utf-8');
  const [index, ...names] = stateString.split(",");
  return {index, names};
}

function nextTurn (turnState) {
  var {names, index} = turnState;
  index = Number(index);
  return {index: (index + 1) % names.length, names};
}

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(TurnForm, props={initialState: defaultState}));
