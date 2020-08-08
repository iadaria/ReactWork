import './event-form.scss';
import React, { useState, useEffect } from 'react';
//import { makeStyles, createStyles,} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//import CircularProgress from '@material-ui/core/CircularProgress';
//import { ActivityFormValues } from '../../../app/models/activity';
//import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import cuid from 'cuid';

// import { Form as FinalForm, Field } from 'react-final-form';
// import TextInput from '../../../app/common/form/TextInput';
// import TextAreaInput from '../../../app/common/form/TextAreaInput';
// import SelectInput from '../../../app/common/form/SelectInput';
// import { category } from '../../../app/common/options/categoryOptions';
// import DateInput from '../../../app/common/form/DateInput';
// import TimeInput from '../../../app/common/form/TimeInput';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { combineDateAndTime } from '../../../app/common/util';
// import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';

export default function EventForm({ setFormOpen, setEvents, createEvent, selectedEvent, updateEvent }) {
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
        hostedBy: ''
    };
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        selectedEvent 
            ? updateEvent({...selectedEvent, ...values})
            : (
                createEvent({
                    ...values,
                    id: cuid(),
                    hostedBy: 'Bob',
                    attendees: [],
                    hostPhotoURL: '/assets/user.png'
                })
            );
        setFormOpen(false);
    };

    return (
        <Grid className="event-form" container justify="center">
            <Grid item sm={8} xs={12}>
                <h3>{selectedEvent ? "Edit the event" : "Create new event"}</h3>
                <form onSubmit={handleFormSubmit} className="form" noValidate autoComplete="off">
                    <div>
                        <label>Event Title</label>
                        <input value={values.title} onChange={handleInputChange} name="title" placeholder="First Name" />

                        <label>Category</label>
                        <input value={values.category} onChange={handleInputChange} name="category" placeholder="Category" />

                        <label>Event Date</label>
                        <input value={values.date} onChange={handleInputChange} name="date" type="date" placeholder="Event Date" />

                        <label>City</label>
                        <input value={values.city} onChange={handleInputChange} name="city" placeholder="City event is taking place" />

                        <label>Venue</label>
                        <input value={values.venue} onChange={handleInputChange} name="venue" placeholder="Enter the Venue of the event" />

                        <label>Hosted By</label>
                        <input value={values.hostedBy} onChange={handleInputChange} name="hostedBy" placeholder="Enter the name of person hosting" />

                        <Box className="event-buttons">
                            <Button
                                // onClick={
                                //     activity.id 
                                //         ? () => history.push(`/activities/${activity.id}`)
                                //         : () => history.push('/activities')
                                //     } 
                                onClick={setFormOpen.bind(null, false)}
                                type="button"
                                variant="outlined"
                                size="small"
                            >
                                Cancel
                                </Button>


                            <Button
                                className="btn-success"
                                type="submit"
                                //disabled={submitting || invalid || pristine}
                                variant="contained"
                                size="small"
                            >
                                Submit
                                        {/* {submitting && <CircularProgress size='1.3rem'/>}
                                        {!submitting && 'Submit'} */}
                            </Button>

                        </Box>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};

//export default EventForm;

/* const useStyles = makeStyles((theme) =>
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
); */