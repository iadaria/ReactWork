import React, { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';
import { Container } from '@material-ui/core';
import NavBar from '../../features/nav/NavBar';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

import NotFound from './not-found';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';

const App: React.FC<RouteComponentProps> = ({location}) => {


  return ( 
    <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Container style={{marginTop: '5em'}}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route 
                key={location.key} 
                path={['/createActivity', '/manage/:id']} 
                component={ActivityForm}
              />
              <Route path='/login' component={LoginForm} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Fragment>
      )}/>
      
    </Fragment>    
  );
}

export default withRouter(observer(App));