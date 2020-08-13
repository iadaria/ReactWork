import React from 'react';
import './event-detailed-info.scss';
import { format }  from 'date-fns';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';

export default function EventDetailedInfo({ event }) {
    
    return (
        <ul className="info-list">
            <li>
                <InfoOutlinedIcon style={{color: 'teal'}}/>
                <p>{event.description}</p>
            </li>
            <li>
                <CalendarTodayIcon style={{color: 'teal'}}/>
                <p>
                    {format(event.date, 'MMMM d, yyyy h:mm a')}
                    {/* {format(event.date, 'eeee do MMMM')} at {format(event.date, 'h:mm a')} */}
                </p>
            </li>
            <li>
                <RoomIcon style={{color: 'teal'}}/>
                <p>{event.venue.address}, {event.city.address}</p>
            </li>
        </ul>        
    );
};