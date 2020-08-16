import React, { useState } from 'react';
import './event-detailed-info.scss';

import { format }  from 'date-fns';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';
import EventDetailedMap from '../../eventDetailedMap/EventDetailedMap';
import Button from '@material-ui/core/Button';

export default function EventDetailedInfo({ event }) {
    const [mapOpen, setMapOpenToggle] = useState(false);

    console.log('EventDetailedInfo -> event', event);
    
    return (
        <div className="event-detailed-info">
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
                    <div>
                        <RoomIcon style={{color: 'teal'}}/>
                        <p>{event.venue.address}, {event.city.address}</p>
                    </div>
                    <Button
                        onClick={() => setMapOpenToggle((prev) => {
                            return !prev; 
                        })}
                        className="show-map-btn" 
                        size="small"
                    >
                        {mapOpen ? 'Hide map' : 'Show Map'}
                    </Button>
                </li>
            </ul> 
            {mapOpen && <EventDetailedMap latLng={event.venue.latLng} />}
        </div>
    );
};