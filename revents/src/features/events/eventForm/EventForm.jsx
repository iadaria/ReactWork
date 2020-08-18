/* global google */
import './event-form.scss';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import cuid from 'cuid';

import { useSelector, useDispatch } from 'react-redux';
import { /* updateEvent, createEvent, */ listenToEvents } from '../eventActions';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Select } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DataFnsUtils from '@date-io/date-fns';


import * as Yup from 'yup';
import { categoryData } from '../../../app/api/categoryData';
import { CircularProgress } from '@material-ui/core';
import MyPlaceInput from '../../../app/common/form/MyPlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore, updateEventInFirestore, addEventToFirestore, cancelEventToggle } from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/common/components/LoadingComponent';
import { toast } from 'react-toastify';

export default function EventForm({ match, history }) {
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const selectedEvent = useSelector(state =>
        state.event.events.find(event => event.id === match.params.id)
    );
    const { loading, error } = useSelector((state) => state.async);


    useFirestoreDoc({
        shouldExecute: !!match.params.id,
        query: () => listenToEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    });

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: { address: '', latLng: null },
        venue: { address: '', latLng: null },
        date: new Date(),
        hostedBy: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required("You must provide a title"),
        category: Yup.string().required("You must provide a category"),
        description: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required("City is required")
        }),
        venue: Yup.object().shape({
            address: Yup.string().required("Venue is required")
        }),
        date: Yup.string().required(),
    });

    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(false);

        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    if (loading /* || (!selectedEvent && !error) */) {
        return <LoadingComponent content="Loading event ..." />;
    }
    if (error) return <Redirect to='/error' />

    return (
        <Grid container justify="center">
            <Grid className="event-form" container item md={7} sm={10} xs={12} direction="column">
                <Paper className="card-event">
                    <h3>{selectedEvent ? "Edit the event" : "Create new event"}</h3>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                selectedEvent
                                    ? await updateEventInFirestore(values) //dispatch(updateEvent({ ...selectedEvent, ...values }))
                                    : addEventToFirestore(values);
                                setSubmitting(false);
                                history.push('/events');
                            } catch (error) {
                                toast.error(error.message);
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting, dirty, isValid, values, setFieldValue }) => {

                            const isDisabledSubmit = !isValid || !dirty || isSubmitting;
                            return (
                                <Form className="form ui">

                                    <Field
                                        component={TextField}
                                        name="title"
                                        label="Title"
                                        placeholder="Event title"
                                        variant="outlined"
                                        size="small"
                                    />

                                    <FormControl>
                                        <InputLabel className="select-label" htmlFor="category-label">Category</InputLabel>
                                        <Field
                                            component={Select}
                                            name="category"
                                            inputProps={{ id: 'category-label' }}
                                            variant="outlined"
                                            size="small"
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
                                            //InputLabelProps={{ shrink: true }}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </MuiPickersUtilsProvider>

                                    <Field
                                        component={TextField}
                                        name="description"
                                        label="Description"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        size="small"
                                    />

                                    <MyPlaceInput
                                        label="City"
                                        name="city"
                                        placeholder="City"
                                    //setFieldValue={setFieldValue}
                                    />

                                    <MyPlaceInput
                                        label="Venue"
                                        name="venue"
                                        placeholder="Venue"
                                        disabled={!values.city.latLng}
                                        options={{
                                            location: new google.maps.LatLng(values.city.latLng),
                                            radius: 1000,
                                            types: ['establishment']
                                        }}
                                    />

                                    {/* <Field
                                        component={TextField}
                                        name="venue"
                                        label="Enter the Venue of the event"
                                        variant="filled"
                                    /> */}

                                    <Field
                                        component={TextField}
                                        name="hostedBy"
                                        label="Enter the name of person hosting"
                                        variant="outlined"
                                        size="small"
                                    />

                                    <Box className="event-buttons">

                                        {selectedEvent &&
                                            <Button
                                                className={selectedEvent.isCancelled ? "btn-reactivate" : "btn-cancel"}
                                                onClick={() => setConfirmOpen(true)}
                                                type="button"
                                                variant="contained"
                                                size="small"
                                            >
                                                {loadingCancel && <CircularProgress size="1.3rem" />}
                                                {!loadingCancel && (selectedEvent.isCancelled ? "Reactivate event" : "Cancel Event")}
                                            </Button>
                                        }

                                        <div className="right">
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
                                        </div>

                                    </Box>
                                </Form>
                            )
                        }}
                    </Formik>
                    <Dialog
                        open={confirmOpen}
                        //onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {selectedEvent?.isCancelled
                                    ? "This will reactivate the event - are you sure?"
                                    : "This will cancel the event - are you sure?"
                                }    
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmOpen(false)} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleCancelToggle(selectedEvent)} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Grid>
        </Grid>
    );
};
/**
 dispatch(createEvent({
    ...values,
    id: cuid(),
    hostedBy: 'Bob',
    attendees: [],
    hostPhotoURL: '/assets/user.png'
    }));
 */

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