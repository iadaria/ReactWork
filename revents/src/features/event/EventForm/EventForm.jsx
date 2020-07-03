import React, { Component } from 'react';
import './event-form.sass';

//import { makeStyles, createStyles,} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
//import CircularProgress from '@material-ui/core/CircularProgress';
//import { ActivityFormValues } from '../../../app/models/activity';
//import { green } from '@material-ui/core/colors';

import Grid from '@material-ui/core/Grid';

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

class EventForm extends Component {

    state = {
        id: '', title: '', date: '', city: '', venue: '', hostedBy: ''
    };

    componentDidMount() {
        if (this.props.selelectedEvent !== null) {
            this.setState({...this.props.selectedEvent});
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.id) {
            this.props.updateEvent(this.state);
        } else {
            this.props.createEvent(this.state);
        }
    }

    handleInputChange = ({target: {name, value}}) => {
        this.setState({ [name] : value });
    }

    render() {
        const { cancelFormOpen } = this.props;
        const { title, date, city, venue, hostedBy } = this.state;
        return (
            <Grid className="event-form" container justify="center">
                <Grid item sm={8} xs={12}>
                    <form onSubmit={this.handleFormSubmit} className="form" noValidate autoComplete="off">
                        <div>
                            <label>Event Title</label>
                            <input value={title} onChange={this.handleInputChange} name="title" placeholder="First Name" />

                            <label>Event Date</label>
                            <input value={date} onChange={this.handleInputChange} name="date" type="date" placeholder="Event Date" />

                            <label>City</label>
                            <input value={city} onChange={this.handleInputChange} name="city" placeholder="City event is taking place" />

                            <label>Venue</label>
                            <input value={venue} onChange={this.handleInputChange} name="vanue" placeholder="Enter the Venue of the event" />

                            <label>Hosted By</label>
                            <input value={hostedBy} onChange={this.handleInputChange} name="hostedBy" placeholder="Enter the name of person hosting" />

                            <Box className="event-buttons">
                                <Button
                                    onClick={cancelFormOpen}
                                    // onClick={
                                    //     activity.id 
                                    //         ? () => history.push(`/activities/${activity.id}`)
                                    //         : () => history.push('/activities')
                                    //     } 
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
        )
    }
};

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

export default EventForm;