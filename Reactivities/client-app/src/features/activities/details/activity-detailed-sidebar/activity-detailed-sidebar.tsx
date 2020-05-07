import React from 'react';
import './activity-detailed-sidebar.sass';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';


const ActivityDetailedSidebar = () => {
    return (
        <Card className="activity-detailed-sidebar">
            <CardHeader
                className="header"
                subheader="3 People Going"
            />
            <List className="people-list">

                <ListItem 
                    className="person"
                    alignItems="flex-start">
                    <ListItemAvatar>
                        <Badge
                            className="badge"
                            color="primary"
                            overlap="circle"
                            badgeContent="Host"
                            invisible={false}>
                            <Avatar alt="user" src="/assets/user.png" />
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <b className="person-name">Bob</b>
                        }
                        secondary={
                            <Typography
                                component="span"
                                className="subheader">
                                Following
                            </Typography>
                        }
                    />
                </ListItem>
                
                <Divider variant="inset" component="li" />
                
                <ListItem 
                    className="person"
                    alignItems="flex-start">
                    
                    <ListItemAvatar>
                        <Avatar alt="user" src="/assets/user.png" />
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <b className="person-name">Tom</b>
                        }
                        secondary={
                            <Typography
                                component="span"
                                className="subheader">
                                Following
                            </Typography>
                        }
                    />
                </ListItem>

                
                <Divider variant="inset" component="li" />

                <ListItem 
                    className="person"
                    alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="user" src="/assets/user.png" />
                    </ListItemAvatar>
                    <ListItemText 
                        primary={
                            <b className="person-name">Sally</b>
                        }
                        secondary={
                            <Typography
                                component="span"
                                className="subheader">
                                
                            </Typography>
                        }
                    />
                </ListItem>


            </List>
        </Card>
    );
};

export default ActivityDetailedSidebar;