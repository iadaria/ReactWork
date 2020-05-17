import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import { Grid } from '@material-ui/core';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial } = rootStore.activityStore;

    useEffect(() => {
      loadActivities();
    }, [loadActivities]); //rootStore as its dependency
  
    if (loadingInitial) 
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

export default observer(ActivityDashboard);

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
