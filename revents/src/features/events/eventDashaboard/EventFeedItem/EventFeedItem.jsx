import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InfoIcon from '@material-ui/icons/Info';
import { formatDistance } from 'date-fns';

export default function EventFeedItem({ post }) {
    let summary;

    switch (post.code) {
        case 'joined-event':
            summary = (
                <>
                    <Link to={`/profile/${post.userUid}`}>{post.displayName} </Link>
                     has signed up
                    <Link to={`/events/${post.eventId}`}>{post.title}</Link>
                </>
            );
            break;

        case 'left-event':
            summary = (
                <>
                    <Link to={`/profile/${post.userUid}`}>{post.displayName} </Link>
                     cancelled their place on {' '}
                    <Link to={`/events/${post.eventId}`}>{post.title}</Link>
                </>
            );
            break;

        default:
            summary = "Something happened";
            break;
    }
    return (
        <>
            <ListItem>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="New feeds" style={{ color: 'teal' }} />
            </ListItem>
            <ListItem
                //key={comment.id}
                className="comment"
                alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        src={post.photoURL}
                        alt={"Name"}
                        variant="rounded"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span style={{ color: 'grey', fontSize: 'smaller' }}>
                            {/* <Link to={`/profile/${comment.uid}`}>{comment.displayName}</Link> */}
                            <time>
                                {formatDistance(post.date, new Date())} ago
                        </time>
                        </span>
                    }
                    secondary={
                        <Typography
                            component="span">
                            {summary}
                        </Typography>
                    }>
                </ListItemText>
            </ListItem>
        </>
    );
}
