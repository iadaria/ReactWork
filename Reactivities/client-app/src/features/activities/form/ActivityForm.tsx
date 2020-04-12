import React, { useState, FormEvent, useContext } from 'react';
import ActivityStore from '../../../app/stores/activityStore';
import { TextField, Button, Box, TextareaAutosize, makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid} from 'uuid';
import { green } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IActivity | null;
}

const ActivityForm: React.FC<IProps> = ({
    activity: initialFormState}) => {

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
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity);
        } else {
            editActivity(activity);
        }
    };
    
    const classes = useStyles();
    const activityStore = useContext(ActivityStore);
    const {createActivity, editActivity, cancelFormOpen, submitting} = activityStore;

    return (
        <form className={classes.root} onSubmit={handleSubmit} autoComplete="Off">
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
                type="datetime-local"
                color="secondary"
                value={activity.date.length ===0 ? (new Date()).toISOString() : activity.date}
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
                <Button 
                    onClick={cancelFormOpen} 
                    type="button"
                    variant="outlined" 
                    size="small"
                >
                    Cancel
                </Button>


                    <Button 
                        className={classes.success} 
                        type="submit" 
                        variant="contained" 
                        size="small"
                    >
                        {submitting && <CircularProgress size='1.3rem'/>}
                        {!submitting && 'Submit'}
                    </Button>

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

export default observer(ActivityForm);