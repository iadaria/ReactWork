import React, { useEffect, Fragment, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

import { Container } from '@material-ui/core';
import LoadingComponent from './LoadingComponent';
import NavBar from '../../features/nav/NavBar';
import ActivityStore from '../stores/activityStore';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
//import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

const App: React.FC<RouteComponentProps> = ({location}) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); //activityStore as its dependency

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return ( 
    <Fragment>
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{marginTop: '5em'}}>
            <Route exact path='/activities' component={ActivityDashboard} />
            <Route path='/activities/:id' component={ActivityDetails} />
            <Route 
              key={location.key} 
              path={['/createActivity', '/manage/:id']} 
              component={ActivityForm}
            />
          </Container>
        </Fragment>
      )}/>
      
    </Fragment>    
  );
}

export default withRouter(observer(App));