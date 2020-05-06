import React from 'react';
import './activity-detailed-sidebar.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';


const ActivityDetailedSidebar = () => {
    return (
        <Card className="activity-detailed-sidebar">
            <CardHeader
                className="header"
                title="3 People Going"
            />
            <List className="">
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="user" src="/assets/user.png" />
                    </ListItemAvatar>
                    <ListItemText 
    
                    />
                </ListItem>
            </List>
        </Card>
    );
};

export default ActivityDetailedSidebar;