import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/activityStore';
import ActivityList from './ActivityList';
import { Grid } from '@material-ui/core';
import LoadingComponent from '../../../app/layout/LoadingComponent';


const ActivityDashboard: React.FC = () => {
    const activityStore = useContext(ActivityStore);

    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore]); //activityStore as its dependency
  
    if (activityStore.loadingInitial) 
      return <LoadingComponent content='Loading activities...'/>

    return (
        <Grid container spacing={3}>        
            <Grid item md={8} sm={6} xs={12}>
                <ActivityList />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <h1>Activity filter</h1>
            </Grid>
        </Grid>
    );
};

/* const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        fontSize: 14,
    },
    rightPanel: {
        position: "fixed",
        maxWidth: 400,
        [theme.breakpoints.down('xs')]: {
            position: "static",
            border: 1, 
            margin: "auto"
        }
    }
  })
); */

export default observer(ActivityDashboard);