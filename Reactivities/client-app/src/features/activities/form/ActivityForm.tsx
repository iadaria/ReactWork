import React, { useState, FormEvent, useContext, useEffect } from 'react';
import ActivityStore from '../../../app/stores/activityStore';
import { TextField, Button, Box, TextareaAutosize, makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid} from 'uuid';
import { green } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history 
    }) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity, 
        editActivity, 
        submitting,
        activity: initialFormState,
        loadActivity,
        clearActivity
    } = activityStore;

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(
                () => initialFormState && setActivity(initialFormState)
            );
        }

        return () => {
            clearActivity();
        };
    },[loadActivity, clearActivity, initialFormState, match.params.id, activity.id.length]);
    
    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    };
    
    const classes = useStyles();
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
                    onClick={() => history.push('/activities')} 
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