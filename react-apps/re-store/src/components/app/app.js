import React from 'react'
import './app.css';
import { HomePage, CardPage } from '../pages';
import { Switch, Route } from 'react-router-dom';
import ShopHeader from '../shop-header';

const App = () => {

    return (
        <main role="main" className="container">
            <ShopHeader numItems={5} total={210} />
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/card" component={CardPage}/>
            </Switch>
        </main>
    );
}

export default App;