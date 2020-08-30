import './profile-event.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { format } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


export default function ProfileEvent({ event }) {
    return (
        <Link to={`/events/${event.id}`} key={event.id}>
            <Card className="profile-card">
                <CardActionArea>
                    <CardMedia
                        className="profile-card__media"
                        image={`/assets/categoryImages/${event.category}.jpg`}
                        title="title"
                    />
                </CardActionArea>
                <CardContent className="profile-card__content">
                    <Typography variant="h5">
                        <b>{event.title}</b>
                    </Typography>
                    <Divider />
                    <div className="profile-card__followers">
                        <div>{format(new Date(event.date), 'do LLL')}</div>
                        <div>{format(new Date(event.date), 'h:mm a')}</div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}