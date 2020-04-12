import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Container } from '@material-ui/core';
import LoadingComponent from './LoadingComponent';
import NavBar from '../../features/nav/NavBar';
import ActivityStore from '../stores/activityStore';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App = () => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //activityStore as its dependency

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return ( 
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '5em'}}>
        <ActivityDashboard />
      </Container>
    </Fragment>    
  );
}

export default observer(App);