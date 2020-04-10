import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { Container } from '@material-ui/core';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';


interface IState {
  activities: IActivity[]
  selectedActivity: IActivity | null;
}

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      setActivities(response.data);
    })   
  }, []);

  return ( 
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '3em'}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
        />
      </Container>
    </Fragment>    
  );
}

export default App;