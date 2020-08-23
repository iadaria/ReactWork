import './event-list-item.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import Avatar from '@material-ui/core/Avatar';
import EventListAttendees from '../eventListAttendees';
//import { useDispatch } from 'react-redux';
//import { deleteEvent } from '../../eventActions';
import { format } from 'date-fns';
import { deleteEventInFirestore } from '../../../../app/firestore/firestoreService';
//import Chip from '@material-ui/core/Chip';

export default function EventListItem({ event }) {
    //const dispatch = useDispatch();

    const classes = useStyles();
    return (
        <Card key={event.id} className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        style={{ minWidth: 90, height: 'auto' }}
                        alt="user's avatar"
                        src={event.hostPhotoURL || `/assets/user.png`}
                    />
                }
                title={
                    <Link className={classes.card_title} to={`/events/${event.id}`}>
                        {event.title}
                    </Link>
                }
                subheader={
                    <>
                        <Typography variant="caption" color="textSecondary">
                            Hosted by {event.hostedBy}{/* Hosted by <b><Link to={`/profile/${host.hostedBy}`}>{host.displayName}</Link></b> */}
                        </Typography>
                        {event.isCancelled && (
                            <Typography color="error" style={{top: "-40px"}}>
                                This event has been cancelled
                            </Typography>
                        )}
                        {/* {isHost}
                            {isGoing} */}
                    </>
                }
            />
            <CardContent>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    <AccessTimeIcon color="primary" style={{ marginRight: '.5rem' }} fontSize="small" />
                    {format(event.date, 'MMMM d, yyyy h:mm a')}
                    <RoomIcon style={{ marginLeft: '1rem' }} fontSize="small" />
                    {event.city.address}, {event.venue.address}
                </Typography>

                {event.attendees && <EventListAttendees attendees={event.attendees} />}

                <Typography variant="body2" component="div">
                    <p>{event.description}</p>
                </Typography>
            </CardContent>
            <CardActions className={classes.cardButtons}>
                <Button variant="outlined" size="small">{event.category || "None"}</Button>

                <Box>
                    <Button
                        //onClick={ () => dispatch(deleteEvent(event.id)) }
                        onClick={() => deleteEventInFirestore(event.id)}
                        size="small"
                        color="secondary"
                    >
                        Delete
                        </Button>
                    <Button
                        //onClick={selectEvent.bind(null, event)}
                        //onClick={ () => selectEvent(event) }
                        component={Link} to={`/events/${event.id}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        style={{ marginLeft: 5 }}
                    >
                        View
                        </Button>
                </Box>

            </CardActions>
        </Card>
    )
};

const useStyles = makeStyles({
    root: {
        marginTop: '5px',
        padding: 10,
    },
    host: {
        color: '#f57c00',
        borderColor: '#f57c00',
        fontWeight: 'bold'
    },
    going: {
        color: '#4caf50',
        borderColor: '#4caf50',
        fontWeight: 'bold'
    },
    card_title: {
        textDecoration: 'none',
        color: '#115293',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
    },
    pos: {
        marginBottom: 12,
    },
    cardButtons: {
        justifyContent: "space-between"
    },
    delete: {
        marginRight: 10
    },
});