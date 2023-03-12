const React = require('react');
const ReactDOM = require('react-dom/client');
const Buffer = require('buffer/').Buffer;

const defaultState = {names: ["Apple", "Banana", "Cherry", ""], index: 0};

function decodeState (base64) {
  if (!base64) {
    return defaultState;
  }
  const stateString = Buffer.from(base64, 'base64').toString('utf-8');
  var [index, ...names] = stateString.split(",");
  names.push("");
  return {index, names};
}

function encodeState(state) {
  const stateString = [state.index, ...state.names].join(",");
  return Buffer.from(stateString).toString('base64');
}

function NextLink({turnState, baseUrl}) {
  const names = turnState.names.filter(name => name.length > 0);
  const index = (turnState.index + 1) % names.length;
  const base64 = encodeState({index, names});
  const nextURI = `${baseUrl}?z=${base64}`;
  return <>
    <p>Next Link: <a href={nextURI}>{nextURI}</a></p>
    <pre>{JSON.stringify({index, names})}</pre>
  </>
}

function TurnForm({initialstate}) {
  const [state, setState] = React.useState(initialState);

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
    <NextLink turnState={{index: state.index, names: state.names}} baseUrl={baseUrl} />
  </>
}

const [baseUrl, base64] = window.location.href.split("?z=");
const initialState = decodeState(base64);
const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(TurnForm, props = {initialState}));
