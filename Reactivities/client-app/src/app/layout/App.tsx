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
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(activity => activity.id === id)[0]);
    //close edit window
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    //for display current created activity
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    //first array after fileter will be contain a new array of all of the activities
    //that do not match the id of the changing activity
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    //for display current changed activity
    setSelectedActivity(activity);
    setEditMode(false);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) => {
      let activities: IActivity[] = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);//response.data);
    })   
  }, []);

  return ( 
    <Fragment>
      <NavBar 
        openCreateForm={handleOpenCreateForm}
      />
      <Container style={{marginTop: '5em'}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
        />
      </Container>
    </Fragment>    
  );
}

export default App;