import React from 'react'
import './app.css';
import { HomePage, CardPage } from '../pages';
import { Switch, Route } from 'react-router-dom';

const App = () => {

    return (
        <div>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/card" component={CardPage}/>
            </Switch>
        </div>
    );
}

export default App;