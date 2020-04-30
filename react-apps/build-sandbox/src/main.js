import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <p>Hellow</p>;

ReactDOM.render(<App />,
    document.getElementById('root'));

/* class App {

   run = async (name = 'World') => {
        console.log(`Hellow ${name}`);
        console.log([1, 2, [2, 3]].flat());
    };
}

const app = new App();
app.run().then(() => console.log('done')); */
