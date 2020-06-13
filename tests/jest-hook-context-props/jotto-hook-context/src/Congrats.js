import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

/**
 * Functional react component for congratulatory message.
 * @function
 * //@param {object} props - React props. - don't use because use context
 * @returns {JSX.Element} - Rendered component (or null if `success` prop is false).
 */
const Congrats = (/* props */) => {
  const language = React.useContext(languageContext);
  const [success] = successContext.useSuccess();

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  } else {
    return (
      <div data-test="component-congrats" />
    );
  }
};

/* Don't use anymore
Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
}; */ 

export default Congrats;
