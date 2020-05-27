import React, { useContext } from 'react';
import './activity-filter.sass';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
//import Divider from '@material-ui/core/Divider'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const ActivityFilters = () => {
    const rootStore = useContext(RootStoreContext);
    const {predicate, setPredicate} = rootStore.activityStore;
    
    /* const [date, changeDate] = React.useState(new Date());
    const handleDate = (date: any) => {
        console.log(date);
    } */
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
                        style={predicate.size === 0 ? styleActive : {}}
                        onClick={() => setPredicate('all', 'true')}
                    >
                        All Activities
                    </MenuItem>
                    
                    <MenuItem 
                        style={predicate.has('isGoing') ? styleActive: {}}
                        onClick={() => setPredicate('isGoing', 'true')}
                    >
                        I'm Going
                    </MenuItem>
                    
                    <MenuItem
                        style={predicate.has('isHost') ? styleActive : {}}
                        onClick={() => setPredicate('isHost', 'true')}
                    >
                        I'm hosting
                </MenuItem>
                </MenuList>
            </Paper>
            <Paper className="activity-filter__calendar">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                </MuiPickersUtilsProvider>
            </Paper>
        </div>
    );
};

export default observer(ActivityFilters);