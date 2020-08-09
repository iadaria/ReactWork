import React from 'react';
import './event-detailed-info.scss';
//import { format }  from 'date-fns';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';

export default function EventDetailedInfo() {
    const event = {};
    return (
        <ul className="info-list">
            <li>
                <InfoOutlinedIcon style={{color: 'teal'}}/>
                <p>{event.description}</p>
            </li>
            <li>
                <CalendarTodayIcon style={{color: 'teal'}}/>
                <p>
                    {event.date}
                    {/* {format(event.date, 'eeee do MMMM')} at {format(event.date, 'h:mm a')} */}
                </p>
            </li>
            <li>
                <RoomIcon style={{color: 'teal'}}/>
                <p>{event.venue}, {event.city}</p>
            </li>
        </ul>        
    );
};