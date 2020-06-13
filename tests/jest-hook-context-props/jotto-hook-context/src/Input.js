import React from 'react';
import PropTypes from 'prop-types';
import { getLetterMatchCount } from './helpers';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import stringsModule from './helpers/strings';

const Input = ({ secretWord }) => {
  //Использование React.useState важно, иначе не выполнится Mock
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [ guessedWords, setGuessedWords ] = guessedWordsContext.useGuessedWords();
  const [ currentGuess, setCurrentGuess ] = React.useState("");

  if (success) { return null; }


  return (
    <div data-test='component-input'>
      <form className="form-inline" style={{justifyContent: 'center'}} >
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(evt) => {
            evt.preventDefault();
            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount}];
            setGuessedWords(newGuessedWords);
            //TODO: check against secretWord and update success if needed
            if (currentGuess === secretWord) setSuccess(true);
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  )
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;