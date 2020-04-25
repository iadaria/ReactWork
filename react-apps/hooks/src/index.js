import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  //useMemo кэшируется результат функции
  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: null
  }), []); //[] - значит не зависит ни от каких данных и будет вычисляться один раз

  const [ dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState);
    let cancelled = false;

    request()
      .then(data => !cancelled && setDataState({
        data,
        loading: false,
        error: null
      }))
      .catch(error => !cancelled && setDataState({
        data: null,
        loading: false,
        error
      }));

    return () => { console.log('unmound'); cancelled = true; }
  }, [ request, initialState ]);

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

  const { data, loading, error } = usePlanetInfo(id);

  if (error) {
    return <div>Something is wrong</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

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