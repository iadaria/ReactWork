import { createStore, bindActionCreators } from 'redux';
import reducer from './reducer';
//import { inc, dec, random } from './actiones';
import * as actions from './actiones';

const store = createStore(reducer);
const { dispatch } = store;

/* const bindActionCreator = (creator, dispatch) => (...args) => {
    dispatch(creator(...args));
}

const incDespatch = bindActionCreator(inc, dispatch);
const decDespatch = bindActionCreator(dec, dispatch);
const randomDespatch = bindActionCreator(random, dispatch); */
const { inc, dec, rnd } = bindActionCreators(
    /* incDespatch: inc,
    decDespatch: dec,
    rndDespatch: random */
    actions
, dispatch);
/* const decDespatch = bindActionCreators(dec, dispatch);
const randomDespatch = bindActionCreators(random, dispatch); */

document
    .getElementById('inc')
    .addEventListener('click', inc);//incDespatch);

document
    .getElementById('dec')
    .addEventListener('click', dec);//decDespatch);

document
    .getElementById('random')
    .addEventListener('click', () => {
        const payload = Math.floor(Math.random()*10);
        rnd(payload);
    });


const update = () => {
    document
        .getElementById('counter')
        .innerHTML = store.getState();
};

store.subscribe(update);