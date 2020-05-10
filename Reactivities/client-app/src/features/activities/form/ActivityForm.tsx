import React, { useState, FormEvent, useContext, useEffect } from 'react';
import './activity-form.sass';

import ActivityStore from '../../../app/stores/activityStore';
import { TextField, Button, Box, makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core';
import { IActivity, ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid} from 'uuid';
import { green } from '@material-ui/core/colors';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import TimeInput from '../../../app/common/form/TimeInput';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history 
    }) => {
    const activityStore = useContext(ActivityStore);
    const {
        //createActivity, 
        editActivity, 
        submitting,
        activity: initialFormState,
        loadActivity,
        //clearActivity
    } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());

    useEffect(() => {
        if (match.params.id) {
            loadActivity(match.params.id).then(
                //activity => setActivity(activity)
                (activity) => setActivity(new ActivityFormValues(activity))
            );
        }
        /* return () => {
            clearActivity();
        }; */

    },[loadActivity, match.params.id]);
    
    const handleFinalFormSubmit = (values: any) => {
        console.log(values);
    }

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //need to delete
        /* const {name, value} = event.currentTarget;
        setActivity({ ...activity, [name]: value }); */
    };

    /* const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    }; */
    
    const classes = useStyles();
    return (
        <Grid className="activity-form" container justify="center">
            <Grid item sm={8} xs={12}>
                <FinalForm
                    initialValues={activity}
                    onSubmit={handleFinalFormSubmit}
                    render={({handleSubmit}) => (
                        <form className={classes.root} onSubmit={handleSubmit} autoComplete="Off">                 
                            <Field 
                                component={TextInput}
                                value={activity.title}
                                name='title'
                                placeholder='Title'
                                label="Title"
                            />
                            <Field
                                component={TextAreaInput} 
                                value={activity.description}
                                name="description"
                                placeholder="Description"
                                rows="4"
                            />
                            <Field 
                                component={SelectInput}
                                options={category}
                                name="category" 
                                placeholder="Category"           
                                //id="activityFormCategory"
                                //label="Category"
                                value={activity.category}
                            />
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div style={{display: 'flex'}}>
                                    <Field 
                                        component={DateInput}
                                        name="date"
                                        placeholder="Date"
                                        label="Select date"
                                        value={activity.date}
                                        //value={new Date()}
                                    />
                                    <Field 
                                        style={{marginLeft: 10}}
                                        component={TimeInput}
                                        name="time"
                                        placeholder="Time"
                                        label="Select time"
                                        value={activity.time}
                                    />
                                </div>
                            </MuiPickersUtilsProvider> 
                            {/* <div className="group-line">
                                <Field 
                                    component={DateInput}
                                    date={true}
                                    name="date"
                                    placeholder="Date"
                                    value={activity.date!}
                                    //fullWidth={true}
                                />
                                <Field 
                                    component={DateInput}
                                    time={true}
                                    name="time"
                                    placeholder="Time"
                                    value={activity.date!}
                                    //fullWidth={true}
                                />
                            </div> */}
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
                    )}
                />
            </Grid>
        </Grid>
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