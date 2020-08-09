import './event-list-attendees.scss';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';

export default function EventListAttendees({ attendees }) {
    return (
        <AvatarGroup max={3}>
            {attendees.map(attendee => (
                <Tooltip
                    key={attendee.id}
                    title={attendee.displayName}
                    placement="top"
                >
                    <Avatar
                        //style={ attendee.following! ? styles : {}}
                        alt={attendee.id}
                        sizes="(max-width: 35px): 30px"
                        src={attendee.photoURL || '/assets/user.png'}
                    />
                </Tooltip>
            ))}
        </AvatarGroup>
    );
}