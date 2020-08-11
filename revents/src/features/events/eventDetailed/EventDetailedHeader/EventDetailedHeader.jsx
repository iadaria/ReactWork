import './event-detailed-header.scss';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
//import { RootStoreContext } from '../../../../app/stores/rootStore';

export default function EventDetailedHeader({ event }) {
    //const rootStore = useContext(RootStoreContext);
    //const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
    const loading = false;
    //const event = { attendees: []};
    const attendActivity = () => {};
    const cancelAttendance = () => {};
    const host = event.attendees.filter(x => x.isHost)[0] || {};
    return (
        //<Card className="activity-detailed-header">
        <Card className="event-detailed-header">
            <CardMedia
                className="image"
                image={`/assets/categoryImages/${event.category}.jpg`}
                title="photo"
            />
            <div className="header">
                <CardHeader
                    title={event.title} />
                <CardContent>
                    <Typography component="p">
                        {/* {format(event.date, 'eeee do MMMM')} */}
                        {format(event.date, 'MMMM d, yyyy h:mm a')}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Hosted by <strong><Link to={`/profile/${host.username}`}>{host.displayName}</Link></strong>
                    </Typography>
                </CardContent>
            </div>

            <CardActions className="group-between">
                {event.isHost ? (
                    <Button
                        className="btn-manage"
                        component={Link} to={`/manage/${event.id}`}
                        size="small">
                        Manage Event
                    </Button>
                ) : event.isGoing ? (
                    <Button
                        onClick={cancelAttendance}
                        variant="contained"
                        size="small"
                    >
                        {loading && <CircularProgress size='1.3rem' />}
                        {!loading && 'Cancel attendance'}
                    </Button>
                ) : (
                            <Button
                                onClick={attendActivity}
                                className="btn-join"
                                size="small"
                            >
                                {loading && <CircularProgress size='1.3rem' />}
                                {!loading && 'Join Activity'}
                            </Button>
                        )}
                {/* <div className="group-left">buttons...</div> */}

            </CardActions>
        </Card>
    );
}