import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, makeStyles, createStyles, Theme, Button, Box, TextareaAutosize } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity | null;
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initialFormState }) => {
    
    
    
    const initializeForm = () : IActivity => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    };
    const [activity, setActivity] = useState<IActivity>(initializeForm);
    
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //const {name, value} = event.target;
        const {name, value} = event.currentTarget;
        //console.log(`${event.target.name} = ${event.target.value}`);
        setActivity({ ...activity, [name]: value });
        //[event.target.name]: event.target.value
    }
    
    const classes = useStyles();

    return (
        <form className={classes.root} autoComplete="Off">
            <TextField 
                onChange={handleInputChange}
                name="title"
                id="activityFormTitle"
                label="Title"
                variant="outlined"
                color="secondary"
                value={activity.title}
                fullWidth
            />
            <TextareaAutosize
                onChange={handleInputChange}
                name="description"
                id="activityFormDescription"
                style={{width: '100%'}}
                placeholder="description"
                //label="Description"
                //variant="outlined"
                color="secondary"
                //multiline
                rows="3"
                value={activity.description}
                //fullWidth       
            />
            <TextField 
                onChange={handleInputChange}
                name="category"            
                id="activityFormCategory"
                label="Category"
                variant="outlined"
                color="secondary"
                value={activity.category}
                fullWidth
            />
            <TextField 
                onChange={handleInputChange}
                name="date"
                id="activityFormDate"
                label="Date"
                InputLabelProps={{
                    shrink: true,
                  }}
                variant="outlined"
                type="date"
                color="secondary"
                value={activity.date}
                fullWidth
            />
            <TextField 
                onChange={handleInputChange}
                name="city"
                id="activityFormCity"
                label="City"
                variant="outlined"
                color="secondary"
                value={activity.city}
                fullWidth
            />
            <TextField 
                onChange={handleInputChange}
                name="venue"
                id="activityFormVenue"
                label="Venue"
                variant="outlined"
                color="secondary"
                value={activity.venue}
                fullWidth
            />
            <Box className={classes.wrapperForButtons}>
                <Button onClick={() => setEditMode(false)} type="button" variant="outlined" size="small">Cancel</Button>
                <Button className={classes.success} type="submit" variant="contained" size="small">Submit</Button>
            </Box>
        </form>
    );
};

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
