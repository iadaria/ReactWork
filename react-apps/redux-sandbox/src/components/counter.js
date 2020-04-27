import React from 'react';
import { connect } from 'react-redux';
//import { inc, dec, rnd } from '../actiones';
import * as actiones from '../actiones';
import { bindActionCreators } from 'redux';

const Counter = ({ counter, inc, dec, rnd }) => {
    return (
        <div id="root" className="jumbotron">
            <h2>{counter}</h2>
            <button 
                onClick={dec}
                className="btn btn-primary btn-lg">DEC</button>
            <button 
                onClick={inc}
                className="btn btn-primary btn-lg">INC</button>
            <button 
                onClick={rnd}
                className="btn btn-primary btn-lg">+RANDOM</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        counter: state
    };
};

const mapDispatchToProps = (dispatch) => {
    /* const {inc, dec, rnd} = */ return bindActionCreators(actiones, dispatch)
    /* return {
        inc, 
        dec, 
        rnd
    }; */
    //{
        /* inc: () => dispatch(inc()),
        dec: () => dispatch(dec()),
        rnd: () => {
            const payload = Math.floor(Math.random()*10);
            dispatch(rnd(payload));
        } */
   // };
};

//export default connect(mapStateToProps, mapDispatchToProps)(Counter);
export default connect(mapStateToProps, actiones)(Counter);