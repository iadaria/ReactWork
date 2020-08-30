import React from 'react';
import './event-detailed-sidebar.sass';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';


const AttendeeAvatar = ({ attendee }) => {
    return (
        <Avatar
            key={attendee.username}
            alt={attendee.displayName}
            sizes="(max-width: 35px): 30px"
            src={attendee.photoURL || '/assets/user.png'}
        />
    );
};

export default function EventDetailedSidebar({ attendees, hostUid }) {

    return (
        <Card className="event-detailed-sidebar">
            <CardHeader
                className="header"
                subheader={`${attendees.length} ${attendees.length === 1 ? 'Person' : 'People'}`}
            />
            <List className="people-list">
                {/* attendees - участники мероприятия(встречи) */}
                {attendees.map((attendee, index) => (
                    <ListItem
                        key={attendee.displayName}
                        className="person"
                        alignItems="flex-start">
                        <ListItemAvatar>
                            {hostUid === attendee.id 
                                ? (
                                    <Badge
                                        className="badge"
                                        color="primary"
                                        overlap="circle"
                                        badgeContent="Host"
                                        invisible={false}>
                                        <AttendeeAvatar attendee={attendee} />
                                    </Badge>
                                )
                                : <AttendeeAvatar attendee={attendee} />
                            }
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link to={`/profile/${attendee.id}`}>
                                    <b className="person-name">{attendee.displayName}</b>
                                </Link>
                            }
                            secondary={
                                attendee.following &&
                                    <Typography
                                        component="span"
                                        className="subheader">
                                        Following
                                    </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};