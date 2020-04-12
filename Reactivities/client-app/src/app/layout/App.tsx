import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import agent from '../api/agent';

import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { Container } from '@material-ui/core';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';

interface IState {
  activities: IActivity[]
  selectedActivity: IActivity | null;
}

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

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
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      //for display current created activity
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      //first array after fileter will be contain a new array of all of the activities
      //that do not match the id of the changing activity
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      //for display current changed activity
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    agent.Activities.list()
    .then((response) => {
      let activities: IActivity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);//response.data);
    })
    .then(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent content='Loading activities...'/>

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
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>    
  );
}

export default App;