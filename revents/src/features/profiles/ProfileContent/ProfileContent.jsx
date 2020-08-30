import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AboutTab from '../AboutTab';
import PhotosTab from '../PhotosTab/PhotosTab';
import EventsTab from '../EventsTab';
// import ProfilePhotos from './ProfilePhotos';
// import ProfileDescription from './ProfileDescription';
// import ProfileFollowings from './ProfileFollowings';
// import ProfileActivities from './ProfileActivities';

function TabPanel(props) {
    const { children , value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Props(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
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


export default function ProfileContent(/* { setActiveTab } */{ profile, isCurrentUser }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        //setActiveTab(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar
                color="transparent"
                position="static">
                <Tabs
                    value={value}
                    variant='scrollable'
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="About" {...Props(0)}/>
                    <Tab label="Photos" {...Props(1)}/>
                    <Tab label="Events" {...Props(2)}/>
                    <Tab label="Activities" {...Props(3)}/>
                    <Tab label="Followers" {...Props(4)}/>
                    <Tab label="Following" {...Props(5)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
            </TabPanel>
            <TabPanel value={value} index={1}> 
                <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
            </TabPanel>
            <TabPanel value={value} index={2}> 
                <EventsTab profile={profile}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* <ProfileActivities /> */} Activit
            </TabPanel>
            <TabPanel value={value} index={4}>
                {/* <ProfileFollowings /> */} Followers
            </TabPanel>
            <TabPanel value={value} index={5}>
                {/* <ProfileFollowings /> */} Followings
            </TabPanel>
        </div>
    );
}