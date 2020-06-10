import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import Input from './Input';
/**
 * 
 * @param {object} state - existing state
 * @param {object} action  - containes 'type' and 'payload', for example:{ type: "setSecretWord", payload: "party"}
 * 
 * @returns {object} -new state
 */
function reducer(state, action) {
  switch(action.type) {
    case "setSecretWord":
      return {...state, secretWord: action.payload}
    
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: "" }
  );

  const setSecretWord = (secretWord) => 
    dispatch({ type: "setSecretWord", payload: secretWord});

  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord)},
    []
  );

  if (!state.secretWord) return <Spinner />;

  return (
    <div className="App" data-test="component-app">
      <Input secretWord={state.secretWord}/>
    </div>
  );
}

function Spinner() {
  return (
    <div className="container" data-test="spinner">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>Loading secret word</p>
    </div>
  )
}

export default App;