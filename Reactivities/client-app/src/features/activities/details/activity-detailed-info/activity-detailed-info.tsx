import React from 'react';
import './activity-detailed-info.css';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import RoomIcon from '@material-ui/icons/Room';
import { IActivity } from '../../../../app/models/activity';

export const ActivityDetailedInfo: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <ul className="info-list">
            <li>
                <InfoOutlinedIcon style={{color: 'teal'}}/>
                <p>{activity.description}</p>
            </li>
            <li>
                <CalendarTodayIcon style={{color: 'teal'}}/>
                <p>{activity.date}</p>
            </li>
            <li>
                <RoomIcon style={{color: 'teal'}}/>
                <p>{activity.venue}, {activity.city}</p>
            </li>
        </ul>        
    );
};

export default ActivityDetailedInfo;