import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { IAttendee } from '../../../app/models/activity';
import Tooltip from '@material-ui/core/Tooltip';

interface IProps {
    attendees: IAttendee[];
}

const styles = {
    borderColor: 'orange',
    borderWidth: 2
}

// Лист участников
const ActivityListItemAttendees: React.FC<IProps> = ({attendees}) => {
    return (
       <AvatarGroup max={3}>
           {attendees.map(attendee => (
               <Tooltip 
                key={attendee.username}
                title={attendee.displayName} 
                placement="top"
               >
                   <Avatar  
                        style={ attendee.following! ? styles : {}}
                        alt={attendee.displayName}
                        sizes="(max-width: 35px): 30px" 
                        src={attendee.image || '/assets/user.png'}
                    />
               </Tooltip>
           ))}
       </AvatarGroup>
    );
};

export default ActivityListItemAttendees;
