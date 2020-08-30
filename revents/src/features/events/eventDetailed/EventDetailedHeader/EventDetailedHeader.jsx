import './event-detailed-header.scss';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { addUserAttendance, cancelUserAttendance } from '../../../../app/firestore/firestoreService';

export default function EventDetailedHeader({ event, isHost, isGoing }) {
    const [loading, setLoading] = useState(false);
    
    async function handleUserJoinEvent() {
        setLoading(true);
        try {
            await addUserAttendance(event);
        } 
        catch (error) { toast.error(error.message); } 
        finally { setLoading(false); }
    }

    async function handleUserLeaveEvent() {
        setLoading(true);
        try {
            await cancelUserAttendance(event);
        } 
        catch (error) { toast.error(error.message); } 
        finally { setLoading(false); }
    }

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
                        {format(event.date, 'MMMM d, yyyy h:mm a')}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Hosted by <strong><Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link></strong>
                    </Typography>
                </CardContent>
            </div>

            <CardActions className="group-between">
                { isHost ? (
                    <Button
                        className="btn-manage"
                        component={Link} to={`/manage/${event.id}`}
                        size="small">
                        Manage Event
                    </Button>
                ) : isGoing ? (
                    <Button
                        onClick={handleUserLeaveEvent}
                        variant="contained"
                        size="small"
                    >
                        {loading && <CircularProgress size='1.3rem' />}
                        {!loading && 'Cancel attendance'}
                    </Button>
                ) : (
                    <Button
                        onClick={handleUserJoinEvent}
                        className="btn-join"
                        size="small"
                    >
                        {loading && <CircularProgress size='1.3rem' />}
                        {!loading && 'Join Activity'}
                    </Button>
                )}
            </CardActions>
            
        </Card>
    );
}