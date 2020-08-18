import './event-filters.scss';
import React from 'react';
import Calendar from 'react-calendar';

export default function EventFilters() {
    return (
        <div className="event-filters">
            <ul className="filter-list">
                <li>Filters</li>
                <li>All Events</li>
                <li>I'm going</li>
                <li>I'm hosting</li>
            </ul>

            <ul className="filter-list filter-list-calendar">
                <li>Calendar</li>
            </ul>

            <Calendar className="calendar"/>

        </div>
    );
}
