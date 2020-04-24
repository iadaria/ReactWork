import React, { useState, Component, useEffect, Fragment} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>

        <button
          onClick={() => setValue(v => v + 1)}>
          +
        </button>

        <button
          onClick={() => setVisible(false)}>
          hide
        </button>

        {/* <HookCounter value={value} /> */}

        <Notification />

      </div>
    );
  } else {
    //удаляется <HookCounter/>
    return (
      <button
        onClick={() => setVisible(true)}>
        show
      </button>
    );

  }
};

const HookCounter = ({ value }) => {
  
  useEffect(() => console.log(' didMount '), []); //[] пустой т.е. говорим что

  useEffect(() => console.log(' update ')); 
  
  useEffect(() =>  () => console.log(' unmount '), []); //[] пустой т.е. говорим что

  //Чаще всего будет использоваться комбинация
  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  }, []);

  return <p>{value}</p>;
}

const Notification = () => {

    const [ visible, setVisible ] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => setVisible(false), 2500);

      return () => clearTimeout(timeout);
    }, []);

    return (
      <Fragment>
        { visible && <p>Hellow</p>}
      </Fragment>
    );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);