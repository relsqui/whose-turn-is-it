const React = require('react');
const ReactDOM = require('react-dom/client');

const defaultState = {names: ["Apple", "Banana", "Cherry", ""], index: 0};

class TurnForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState ?? defaultState;
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
  }

  handleNameChange(index, event) {
    var names = this.state.names.slice();
    names[index] = event.target.value;
    names = names.filter(name => name.length > 0);
    names.push("");
    this.setState({...this.state, names});
  }

  handleButtonChange(index, event) {
    this.setState({...this.state, index: index});
  }

  render() {
    const nameInputs = this.state.names.map((name, index) => {
      return <p key="{index}">
        <input type="radio" key="radio{index}" value={index} checked={index === this.state.index} onChange={this.handleButtonChange.bind(this, index)} />
        <input type="text" key="name{index}" value={name} onChange={this.handleNameChange.bind(this, index)} />
      </p>
    });
    return <html><body>
      <form key="form" onSubmit={this.handleSubmit}>
        {nameInputs}
        <textarea rows="10" cols="80" key="debug" readOnly value={JSON.stringify(this.state)} />
      </form>
    </body></html>;
  }
}

function decodeState (stateString64) {
  if (!stateString64) {
    return defaultState;
  }
  const stateString = Buffer.from(stateString64, 'base64').toString('utf-8');
  const [index, ...names] = stateString.split(",");
  return {index, names};
}

function encodeState (turnState) {
  const stateString = [turnState.index, ...turnState.names].join(",");
  return Buffer.from(stateString).toString('base64');
}

function nextTurn (turnState) {
  var {names, index} = turnState;
  index = Number(index);
  return {index: (index + 1) % names.length, names};
}

const rootNode = document.getElementById('root');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(TurnForm, props={initialState: defaultState}));
