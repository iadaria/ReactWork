import React from 'react';
import ReactDOM from 'react-dom';
import css from './main.scss';

console.log(css.toString());

const App = () => <p>This is WebPack React App</p>;

ReactDOM.render(<App/>, document.getElementById('root'));

/* import Log from './log';
import Calc from './calc';

import img from './death-star4.png';

const calc = new Calc();
const log = new Log();


log.log(calc.add(1, 2, 3));

const el = document.createElement('img');
el.src = img;
document.body.appendChild(el); */