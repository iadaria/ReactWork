import './event-form.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import Select from '@material-ui/core/Select';
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';
import cuid from 'cuid';
import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';

export default function EventForm({ match, history }) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state =>
        state.event.events.find(event => event.id === match.params.id)
    );

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
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(createEvent({
                ...values,
                id: cuid(),
                hostedBy: 'Bob',
                attendees: [],
                hostPhotoURL: '/assets/user.png'
            }));

            history.push('/events');

        //setFormOpen(false);
    };

    return (
        <Grid container justify="center">
            <Grid className="event-form" container item md={7} sm={10} xs={12} direction="column">
                <div className="card-event">
                    <h3>{selectedEvent ? "Edit the event" : "Create new event"}</h3>
                    <form onSubmit={handleFormSubmit} className="form" noValidate autoComplete="off">

                        <TextField
                            name="title"
                            label="Event Title"
                            value={values.title}
                            onChange={handleInputChange}
                            variant="filled"
                        />

                        <TextField
                            name="category"
                            label="Category"
                            value={values.category}
                            onChange={handleInputChange}
                            variant="filled"
                        />

                        <TextField
                            name="date"
                            type="date"
                            label="Event Date"
                            value={values.date}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            variant="filled"
                        />

                        <TextField
                            name="city"
                            label="City event is taking place"
                            value={values.city}
                            onChange={handleInputChange}
                            variant="filled"
                        />

                        <TextField
                            name="venue"
                            label="Enter the Venue of the event"
                            value={values.venue}
                            onChange={handleInputChange}
                            variant="filled"
                        />

                        <TextField
                            name="hostedBy"
                            label="Enter the name of person hosting"
                            value={values.hostedBy}
                            onChange={handleInputChange}
                            variant="filled"
                        />

                        <Box className="event-buttons">
                            <Button
                                // onClick={
                                //     activity.id 
                                //         ? () => history.push(`/activities/${activity.id}`)
                                //         : () => history.push('/activities')
                                //     } 
                                //onClick={setFormOpen.bind(null, false)}
                                //onClick={ () => setFormOpen(false)}
                                component={Link} to='/events'
                                type="button"
                                variant="outlined"
                                color="secondary"
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
                    </form>
                </div>
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