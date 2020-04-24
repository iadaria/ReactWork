import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <HookSwitcher />
    </div>
  );
};

//Компонент будет менять цвет фона в зависимости от значения в state
const HookSwitcher = () => {
  const [color, setColor] = useState('gray');
  const [fontSize, setFontSize] = useState(14);

  return(
    <div style={{ padding: '10px', background: color, fontSize: `${fontSize}px` }}>  
      <p>Hellow world!</p>
      <button 
        onClick={() => { setColor('green'); setFontSize((s) => s + 2);}}>
        Dark
      </button>

      <button 
        onClick={() => setColor('white')}>
        Light
      </button>

    </div>
  )

};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);