import './event-filters.scss';
import React from 'react';
import Calendar from 'react-calendar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
//import { DatePicker } from '@material-ui/pickers';
//import DateFnsUtils from '@date-io/date-fns';

export default function EventFilters({ predicate, setPredicate, loading }) {
    const styleActive = { backgroundColor: 'teal', color: '#fff', opacity: .8 };
    return (
        <div className="activity-filter">
            <Paper>
                <MenuList>

                    <MenuItem style={{ color: 'teal' }}>
                        <ListItemIcon>
                            <FilterListIcon />
                        </ListItemIcon>
                        <Typography color="inherit">Filters</Typography>
                    </MenuItem>

                    <MenuItem
                        style={predicate.get('filter') === 'all' ? styleActive : {}}
                        onClick={() => setPredicate('filter', 'all')}
                        disabled={loading}
                    >
                        All Activities
                    </MenuItem>

                    <MenuItem
                        style={predicate.get('filter') === 'isGoing' ? styleActive : {}}
                        onClick={() => setPredicate('filter', 'isGoing')}
                        disabled={loading}
                    >
                        I'm going
                    </MenuItem>

                    <MenuItem
                        style={predicate.get('filter') === 'isHost' ? styleActive : {}}
                        onClick={() => setPredicate('filter', 'isHost')}
                        disabled={loading}
                    >
                        I'm hosting
                    </MenuItem>
                </MenuList>
            </Paper>
            <Paper className="activity-filter__calendar">
                <MenuList>
                    <MenuItem style={{ color: 'teal' }}>
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                        <Typography color="inherit">Select Date</Typography>
                    </MenuItem>
                    <MenuItem>
                        <Calendar
                            className="calendar"
                            onChange={date => setPredicate('startDate', date)}
                            value={predicate.get('startDate') || new Date()}
                            tileDisabled={() => loading}
                        />
                    </MenuItem>
                </MenuList>

                {/*  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <MenuItem style={{ color: 'teal' }}>
                        <ListItemIcon>
                            <CalendarTodayIcon />
                        </ListItemIcon>
                        <Typography color="inherit">Select Date</Typography>
                    </MenuItem>
                    <DatePicker
                        className="dataPicker"
                        autoOk
                        value={predicate.get('startDate') || new Date()}
                        variant="static"
                        onChange={(date) => setPredicate('startDate', date!)}
                        size="small"
                    />
                </MuiPickersUtilsProvider> */}
            </Paper>
        </div>
    );
}

/* <div className="event-filters">
        <ul className="filter-list">
            <li>
                Filters
            </li>
            <li
                className=
                onClick={() => setPredicate('filter', 'all')}
            >
                All Events
            </li>
            <li>I'm going</li>
            <li>I'm hosting</li>
        </ul>

        <ul className="filter-list filter-list-calendar">
            <li>Calendar</li>
        </ul>

        <Calendar className="calendar"/>

    </div> */