import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { IUserActivity } from '../../app/models/profile';
import { format } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import { RootStoreContext } from '../../app/stores/rootStore';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core';



interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
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

function Props(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
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

const panes = [
    { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
    { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
    { menuItem: 'Hosting', pane: { key: 'hosted' } },
];

const ProfileEvents = () => {
    
    const rootStore = useContext(RootStoreContext);
    const {
        loadUserActivities,
        profile,
        loadingActivities,
        userActivities
    } = rootStore.profileStore!;


    useEffect(() => {
        loadUserActivities(profile!.username);
    }, [loadUserActivities, profile]);

    /* const handleTabChange = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        data: TabProps
    ) => {
        let predicate;
        switch (data.activeIndex) {
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
    }; */
}

export const ProfileActivities = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
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
                            //onChange={(e, data) => setActiveTab(data.activeIndex)}
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
                    <TabPanel value={value} index={0}>
  
                    </TabPanel>
                    <TabPanel value={value} index={1}>
          
                    </TabPanel>
                    <TabPanel value={value} index={2}>

                    </TabPanel>
                </div>
                <br />
                <Grid container spacing={3} direction="row">
                    {[].map((activity: IUserActivity) =>
                        (
                            <Grid key={activity.id} item lg={2} md={2} sm={4} xs={6}>

                                <Link to={`/activities/${activity.id}`}>
                                    <Card className="profile-card">
                                        <CardActionArea>
                                            <CardMedia
                                                className="profile-card__media"
                                                image={`/assets/categoryImages/${activity.category}.jpg`}
                                                title="title"
                                            />
                                        </CardActionArea>
                                        <CardContent className="profile-card__content">
                                            <Typography variant="h5">
                                                <b>{activity.title}</b>
                                            </Typography>
                                            <Divider />
                                            <div className="profile-card__followers">
                                                <div>{format(new Date(activity.date), 'do LLL')}</div>
                                                <div>{format(new Date(activity.date), 'h:mm a')}</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>

                            </Grid>
                        )
                    )}
                </Grid>

            </Grid>
        </Grid>
    );
};