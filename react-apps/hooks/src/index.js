import React, { useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [value, setValue] = useState(1);
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

        <PlanetInfo id={value}/>

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

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}`)
    .then(res => res.json())
    .then(data => data);
};

const useRequest = (request) => {
  const [ dataState, setDataState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let cancelled = false;

    request()
      .then(data => !cancelled && setDataState(data));

    return () => { console.log('unmound'); cancelled = true; }
  }, [ request ]);

  return dataState;
}

const usePlanetInfo = (id) => {
  
  // если id не изменится, то useCallback вернет ту же функцию и не будет создавать новую
  const request = useCallback(
    () => getPlanet(id), [ id ]
  );

  //const request = () => getPlanet(id); //каждый раз request создается заново
  return useRequest(request);
}

const PlanetInfo = ( {id} ) => {

  const data = usePlanetInfo(id);

  return (
    <div>{id} - {data && data.name}</div>
  );
};


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);