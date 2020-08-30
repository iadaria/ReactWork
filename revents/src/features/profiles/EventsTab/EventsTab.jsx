import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import ProfileEvent from '../ProfileEvent';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getUserEventsQuery } from '../../../app/firestore/firestoreService';
import { listenToUserEvents } from '../profileActions';


function Props(index) {
    return {
        id: `profile-activities-tab-${index}`,
        'aria-controls': `profile-activities-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function EventsTab({ profile }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const { profileEvents } = useSelector(state => state.profile);
    const { loading } = useSelector(state => state.async);

    useFirestoreCollection({
        query: () => getUserEventsQuery(activeTab, profile.id),
        data: _events => dispatch(listenToUserEvents(_events)),
        deps: [dispatch, activeTab, profile.id]
    });

    function handleChangeTab(event, numberTab) {
        //console.log('change tab', numberTab);
        setActiveTab(numberTab);
    }

    if (loading) return <CircularProgress />;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5">
                    Events
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.root}>
                   <AppBar
                        color="transparent"
                        position="static">
                        <Tabs
                            value={activeTab}
                            variant='scrollable'
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChangeTab}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="Future Events" {...Props(0)} />
                            <Tab label="Past Events" {...Props(1)} />
                            <Tab label="Hosting" {...Props(2)} />
                        </Tabs>
                    </AppBar>
                    {/* 
                        <TabPanel value={value} index={0}></TabPanel>
                        <TabPanel value={value} index={1}></TabPanel>
                        <TabPanel value={value} index={2}></TabPanel> 
                    */}
                </div>
                <br />
                <Grid container spacing={3} direction="row">
                    {profileEvents.map((event) => (
                        <Grid key={event.id} item lg={2} md={2} sm={4} xs={6}>
                            <ProfileEvent event={event} />
                        </Grid>
                    ))}
                </Grid>

            </Grid>
        </Grid>
    );
}