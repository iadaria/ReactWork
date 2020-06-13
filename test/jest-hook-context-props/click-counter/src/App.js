import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      error: null
    };

  }

  isCorrect = (operation) => this.state.counter > 0 || operation > 0;

  handleCounter(digit){
    if (this.isCorrect(digit)) {
      this.setState({ counter: this.state.counter + digit, error: null});
    } else {
      this.setState({error : "The counter can't go below zero"})
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        { !!this.state.error &&
          <h2 data-test="error-display" style={{color: 'red'}}><b>{this.state.error}</b></h2>
        }
        <button 
          onClick={() => this.handleCounter(1)}
          data-test="increment-button"
        >
          Increment counter
        </button>
        <button 
          onClick={() => this.handleCounter(-1)}
          data-test="decrement-button"
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

export default App;
