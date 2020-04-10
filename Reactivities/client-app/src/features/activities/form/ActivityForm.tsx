import React from 'react';
import { TextField, makeStyles, createStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '5px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
  }),
);


export const ActivityForm = () => {
    //const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();

    /* const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }; */

    return (
        <form className={classes.root} autoComplete="Off">
            <TextField 
                id="activityFormTitle"
                label="Title"
                variant="outlined"
                color="secondary"
                fullWidth
            />
            <TextField 
                id="activityFormDescription"
                label="Description"
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
                rows="3"
            />
            <TextField 
                id="activityFormCategory"
                label="Category"
                variant="outlined"
                color="secondary"
                fullWidth
            />
            {/* <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            /> */}
            <TextField 
                id="activityFormDate"
                label="Date"
                InputLabelProps={{
                    shrink: true,
                  }}
                variant="outlined"
                color="secondary"
                fullWidth
                type="date"
            />
            <TextField 
                id="activityFormCity"
                label="City"
                variant="outlined"
                color="secondary"
                fullWidth
            />
            <TextField 
                id="activityFormVenue"
                label="Venue"
                variant="outlined"
                color="secondary"
                fullWidth
            />
        </form>
    );
};
