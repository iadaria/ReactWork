import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import ProfileFollowings from './ProfileFollowings';

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

interface IProps {
    setActiveTab: (activeIndex: number) => void;
}

const ProfileContent: React.FC<IProps> = ({ setActiveTab }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(3);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
        setActiveTab(newValue);
    };

    return (
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
                    <Tab label="About" {...Props(0)}/>
                    <Tab label="Photos" {...Props(1)}/>
                    <Tab label="Activities" {...Props(2)}/>
                    <Tab label="Followers" {...Props(3)}/>
                    <Tab label="Following" {...Props(4)}/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ProfileDescription />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfilePhotos />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Activities
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ProfileFollowings />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <ProfileFollowings />
            </TabPanel>
        </div>
    );
};

export default ProfileContent;
