import './event-form.scss';
import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import cuid from 'cuid';

import { useSelector, useDispatch } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DataFnsUtils from '@date-io/date-fns';


import * as Yup from 'yup';
import { categoryData } from '../../../app/api/categoryData';
import { CircularProgress } from '@material-ui/core';

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
        date: new Date(),
        hostedBy: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required(),
    });

    return (
        <Grid container justify="center">
            <Grid className="event-form" container item md={7} sm={10} xs={12} direction="column">
                <div className="card-event">
                    <h3>{selectedEvent ? "Edit the event" : "Create new event"}</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={values => {
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
                        }}
                    >
                        {({ isSubmitting, dirty, isValid }) => {
                            
                            const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                            return (
                                <Form className="form ui">
                                    <Field
                                        component={TextField}
                                        name="title"
                                        label="Title"
                                        placeholder="Event title"
                                        variant="filled"
                                    />

                                    <FormControl>
                                        <InputLabel className="select-label" htmlFor="category-label">Category</InputLabel>
                                        <Field
                                            component={Select}
                                            name="category"
                                            inputProps={{ id: 'category-label' }}
                                            variant="filled"
                                        >
                                            {categoryData.map(item =>
                                                <MenuItem key={item.key} value={item.value}>{item.text}</MenuItem>
                                            )}
                                        </Field>
                                    </FormControl>

                                    <MuiPickersUtilsProvider utils={DataFnsUtils}>
                                        <Field
                                            component={DatePicker}
                                            name="date"
                                            label="Event Date"
                                            InputLabelProps={{ shrink: true }}
                                            variant="filled"
                                        />
                                    </MuiPickersUtilsProvider>

                                    <Field
                                        component={TextField}
                                        name="city"
                                        label="City event is taking place"
                                        variant="filled"
                                    />

                                    <Field
                                        component={TextField}
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={3}
                                        variant="filled"
                                    />

                                    <Field
                                        component={TextField}
                                        name="venue"
                                        label="Enter the Venue of the event"
                                        variant="filled"
                                    />

                                    <Field
                                        component={TextField}
                                        name="hostedBy"
                                        label="Enter the name of person hosting"
                                        variant="filled"
                                    />

                                    <Box className="event-buttons">
                                        <Button
                                            disabled={isSubmitting}
                                            // onClick={
                                            //     event.id 
                                            //         ? () => history.push(`/events/${event.id}`)
                                            //         : () => history.push('/events')
                                            //     } 
                                            component={Link} to='/events'
                                            type="button"
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                        >
                                            Cancel
                                    </Button>


                                        <Button
                                            className={isDisabledSubmit ? "default" : "btn-success"}
                                            type="submit"
                                            disabled={isDisabledSubmit}
                                            variant="contained"
                                            size="small"
                                        >
                                            {isSubmitting && <CircularProgress size='1.3rem' />}
                                            {!isSubmitting && 'Submit'}
                                        </Button>

                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    );
};
/* const [values, setValues] = useState(initialValues);
 const useStyles = makeStyles((theme) =>
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

/* const handleInputChange = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
   } */