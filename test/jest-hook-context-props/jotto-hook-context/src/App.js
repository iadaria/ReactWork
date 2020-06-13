import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Input from './Input';
import LanguagePicker from './LanguagePicker';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

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
    case "setLanguage":
      return {...state, language: action.payload}
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  //default state
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: "", language: 'en' }
  );

  const setSecretWord = (secretWord) => 
    dispatch({ type: "setSecretWord", payload: secretWord});
  const setLanguage = (language) =>
    dispatch({ type: "setLanguage", payload: language});


  React.useEffect(
    () => { hookActions.getSecretWord(setSecretWord)},
    []
  );

  if (!state.secretWord) return <Spinner />;

  return (
    <div className="App" data-test="component-app">
      <h1>Jotto</h1>
      <p>The secret word is {state.secretWord}</p>

      {/* Part 11.1 */}
      <languageContext.Provider value={state.language}>
        
        <LanguagePicker setLanguage={setLanguage} />
        
        <guessedWordsContext.GuessedWordsProvider>

          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord}/>
          </successContext.SuccessProvider>
  
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
        
      </languageContext.Provider>
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