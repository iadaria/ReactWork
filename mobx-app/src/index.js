import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const appState = observable({
    count: 0
});

appState.decrement = function() { this.count--; }
appState.increment = function() { this.count++; }

@observer class Counter extends  React.Component {
    @observable count = 0;

    render() {
        return (
            <div>
                Counter: {this.props.store.count} <br/>
                <button onClick={this.handleDec}>-</button>
                <button onClick={this.handleInc}>+</button>
            </div>
        );
    }

    handleDec = () => {
        this.props.store.increment();
    }

    handleInc = () => {
        this.props.store.decrement();
    }
}

ReactDOM.render(<Counter store={appState}/>, document.getElementById('root'));