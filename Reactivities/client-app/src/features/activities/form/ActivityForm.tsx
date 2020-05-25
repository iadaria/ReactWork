import React, { useState, /* FormEvent,  */useContext, useEffect } from 'react';
import './activity-form.sass';

import { makeStyles, Theme, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ActivityFormValues } from '../../../app/models/activity';
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
import { combineDateAndTime } from '../../../app/common/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

interface DetailParams {
    id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
    match,
    history 
    }) => {
    const rootStore = useContext(RootStoreContext);
    const {
        editActivity, 
        submitting,
        //activity: initialFormState,
        loadActivity,
        createActivity
    } = rootStore.activityStore;

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
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        console.log(activity);

        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity)
        } else {
            editActivity(activity);
        }
    }
    
    const classes = useStyles();
    return (
        <Grid className="activity-form" container justify="center">
            <Grid item sm={8} xs={12}>
                <FinalForm
                    initialValues={activity}
                    onSubmit={handleFinalFormSubmit}
                    validate={validate}
                    render={({handleSubmit, invalid, pristine}) => (
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
                            <Field
                                component={TextInput}
                                value={activity.city}
                                name="city"
                                placeholder="City"
                                label="City"
                            /> 
                            <Field
                                component={TextInput}
                                value={activity.venue}
                                name="venue"
                                placeholder="Venue"
                                label="Venue"
                            /> 
                            <Box className={classes.wrapperForButtons}>
                                <Button 
                                    onClick={
                                        activity.id 
                                            ? () => history.push(`/activities/${activity.id}`)
                                            : () => history.push('/activities')
                                        } 
                                    type="button"
                                    variant="outlined" 
                                    size="small"
                                >
                                    Cancel
                                </Button>


                                    <Button 
                                        className={classes.success} 
                                        type="submit" 
                                        disabled={submitting || invalid || pristine}
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

//const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     //need to delete
//     /* const {name, value} = event.currentTarget;
//     setActivity({ ...activity, [name]: value }); */
// };