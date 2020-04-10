import React from 'react';
import { TextField, makeStyles, createStyles, Theme, Button, Box } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

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
    success: {
        backgroundColor: green[500],
        color: '#fff',
        marginLeft: 10
    },
    wrapperForButtons: {
        marginRight: 5,
        marginLeft: "auto",
    },
    button: {
        marginLeft: 5
    }
  }),
);


export const ActivityForm = () => {
    //const [name, setName] = React.useState('Composed TextField');
    const classes = useStyles();

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
            <Box className={classes.wrapperForButtons}>
                <Button type="button" variant="outlined" size="small">Cancel</Button>
                <Button className={classes.success} type="submit" variant="contained" size="small">Submit</Button>
            </Box>
        </form>
    );
};
