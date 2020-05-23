import React from 'react';
import './activity-detailed-sidebar.sass';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Badge from '@material-ui/core/Badge';
import { IAttendee } from '../../../../app/models/activity';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

interface IProps {
    attendees: IAttendee[]; //Участники мероприятия
}

interface IAvatarProps {
    attendee: IAttendee;
}

const AttendeeAvatar: React.FC<IAvatarProps> = ({ attendee }) => {
    return (
        <Avatar
            key={attendee.username}
            alt={attendee.displayName}
            sizes="(max-width: 35px): 30px"
            src={attendee.image || '/assets/user.png'}
        />
    );
};

const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
    return (
        <Card className="activity-detailed-sidebar">
            <CardHeader
                className="header"
                subheader={`${attendees.length} ${attendees.length === 1 ? 'Person' : 'People'}`}
            />
            <List className="people-list">
                {/* attendees - участники мероприятия(встречи) */}
                {attendees.map((attendee, index) => (
             
                    <ListItem
                        key={attendee.username}
                        className="person"
                        alignItems="flex-start">
                        <ListItemAvatar>
                            {attendee.isHost 
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
                                <Link to={`/profile/${attendee.username}`}>
                                    <b className="person-name">{attendee.displayName}</b>
                                </Link>
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
                ))}
            </List>
        </Card>
    );
};

export default observer(ActivityDetailedSidebar);