import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { IUserActivity } from '../../app/models/profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme, CircularProgress } from '@material-ui/core';
import ProfileActivity from './ProfileActivity';
import { observer } from 'mobx-react-lite';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

/* function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-activities-tabpanel-${index}`}
            aria-labelledby={`profile-activities-tab-${index}`}
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
 */
function Props(index: number) {
    return {
        id: `profile-activities-tab-${index}`,
        'aria-controls': `profile-activities-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ProfileActivities = () => {
    //debugger
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        let predicate;
        switch (newValue) {
            case 1:
                predicate = 'past';
                break;
            case 2:
                predicate = 'hosting';
                break;
            default:
                predicate = 'future';
                break;
        }
        loadUserActivities(profile!.username, predicate);
    };

    const rootStore = useContext(RootStoreContext);
    const {
        loadUserActivities,
        profile,
        loadingActivities,
        userActivities
    } = rootStore.profileStore!;

    useEffect(() => {
        loadUserActivities(profile!.username, 'future');
    }, [loadUserActivities, profile]);

    if (loadingActivities) return <CircularProgress />
    /* console.log('user activities');console.log(userActivities);
    console.log('value'); console.log(value); */
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h5">
                    Activities
                    </Typography>
            </Grid>
            <Grid item xs={12}>
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
                            <Tab label="Future Events" {...Props(0)} />
                            <Tab label="Past Events" {...Props(1)} />
                            <Tab label="Hosting" {...Props(2)} />
                        </Tabs>
                    </AppBar>
                    {/* <TabPanel value={value} index={0}>

                    </TabPanel>
                    <TabPanel value={value} index={1}>

                    </TabPanel>
                    <TabPanel value={value} index={2}>

                    </TabPanel> */}
                </div>
                <br />
                <Grid container spacing={3} direction="row">
                    {userActivities.map((activity: IUserActivity) =>
                        (
                            <Grid key={activity.id} item lg={2} md={2} sm={4} xs={6}>
                                <ProfileActivity activity={activity} />
                            </Grid>
                        )
                    )}
                </Grid>

            </Grid>
        </Grid>
    );
};

export default observer(ProfileActivities);