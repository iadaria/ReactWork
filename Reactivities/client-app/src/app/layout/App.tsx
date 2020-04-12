import React, { useState, useEffect, Fragment, SyntheticEvent, useContext } from 'react';
import agent from '../api/agent';

import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { Container } from '@material-ui/core';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { LoadingComponent } from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IState {
  activities: IActivity[]
  selectedActivity: IActivity | null;
}

const App = () => {
  const activityStore = useContext(ActivityStore);

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
    activityStore.loadActivities();
  }, [activityStore]); //activityStore as its dependency

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading activities...'/>

  return ( 
    <Fragment>
      <NavBar 
        openCreateForm={handleOpenCreateForm}
      />
      <Container style={{marginTop: '5em'}}>
        <ActivityDashboard 
          activities={activityStore.activities}
          selectActivity={handleSelectActivity}
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

export default observer(App);