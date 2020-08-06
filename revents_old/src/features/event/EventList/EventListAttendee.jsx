import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';

class EventListAttendee extends Component {
    render() {
        return (
            <AvatarGroup max={3}>
           {this.props.attendees.map(attendee => (
               <Tooltip 
                key={attendee.id}
                title={attendee.name} 
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
}

export default EventListAttendee;
