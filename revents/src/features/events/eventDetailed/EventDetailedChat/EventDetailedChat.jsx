import './event-detailed-chat.sass';
import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import { formatDistance } from 'date-fns';
import EventDetailedChatForm from '../EventDetailedChatForm/EventDetailedChatForm';
import { useDispatch, useSelector } from 'react-redux';
import { getEventChatRef, firebaseObjectToArray } from '../../../../app/firestore/firebaseService';
import { listenToEventChat } from '../../eventActions';
import { CLEAR_COMMENTS } from '../../eventConstants';
import { createDataTree } from '../../../../app/common/util/util';

export default function EventDetailedChat({ eventId }) {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.event);
    const [showReplyForm, setShowReplyForm] = useState({ open: false, commentId: null });

    useEffect(() => {
        getEventChatRef(eventId).on('value', (snapshot) => {
            if (!snapshot.exists()) return;
            //console.log(firebaseObjectToArray(snapshot.val()));
            dispatch(listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse()));
        });
        return () => {
            dispatch({ type: CLEAR_COMMENTS });
            getEventChatRef().off();
        };
    }, [eventId, dispatch]);

    function handleReply() {
        setShowReplyForm({ open: false, commentId: null });
    }

    return (
        <Card className="event-detailed-chat">
            <CardHeader
                className="header"
                title="Chat about this event"
            />
            <CardContent>
                <List className="comments">

                    {comments && createDataTree(comments).map((comment) => (
                        <Fragment key={comment.id}>
                            <ListItem
                                //key={comment.id}
                                className="comment"
                                alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar
                                        src={comment.photoURL || "/assets/user.png"}
                                        alt={comment.displayName}
                                        variant="rounded" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <b className="comment-author-name">
                                            <Link to={`/profile/${comment.uid}`}>{comment.displayName}</Link>
                                            <time>
                                                {formatDistance(comment.date, new Date())}
                                            </time>
                                        </b>
                                    }
                                    secondary={
                                        <Typography
                                            component="span">
                                            {comment.text.split('\n').map((text, i) => (
                                                <span key={i}>
                                                    {text}
                                                    <br />
                                                </span>
                                            ))}
                                        </Typography>
                                    }>

                                </ListItemText>

                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => {
                                            setShowReplyForm({ open: true, commentId: comment.id });
                                            //console.log('showReplyForm', showReplyForm);
                                        }}
                                    >
                                        <ReplyIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            {showReplyForm.open && showReplyForm.commentId === comment.id && (
                                <ListItem
                                //key={`${comment.id}_replay`}
                                >
                                    <EventDetailedChatForm
                                        eventId={eventId}
                                        parentId={comment.id}
                                        closeForm={handleReply}
                                    />
                                </ListItem>
                            )}

                            {comment.childNodes.length > 0 && (
                                <List style={{marginLeft: 20}}>
                                    {comment.childNodes.reverse().map(child => (
                                        <Fragment key={child.id}>
                                            <ListItem
                                                className="comment"
                                                alignItems="flex-start"
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        src={child.photoURL || "/assets/user.png"}
                                                        alt={child.displayName}
                                                        variant="rounded" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={
                                                        <b className="comment-author-name">
                                                            <Link to={`/profile/${child.uid}`}>{child.displayName}</Link>
                                                            <time>
                                                                {formatDistance(child.date, new Date())}
                                                            </time>
                                                        </b>
                                                    }
                                                    secondary={
                                                        <Typography
                                                            component="span">
                                                            {child.text.split('\n').map((text, i) => (
                                                                <span key={i}>
                                                                    {text}
                                                                    <br />
                                                                </span>
                                                            ))}
                                                        </Typography>
                                                    }>
                                                </ListItemText>
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        onClick={() => {
                                                            setShowReplyForm({ open: true, commentId: child.id });
                                                        }}
                                                    >
                                                        <ReplyIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {showReplyForm.open && showReplyForm.commentId === child.id && (
                                                    <ListItem
                                                    //key={`${comment.id}_replay`}
                                                    >
                                                        <EventDetailedChatForm
                                                            eventId={eventId}
                                                            parentId={child.parentId}
                                                            closeForm={handleReply}
                                                        />
                                                    </ListItem>
                                            )}
                                        </Fragment>
                                    ))}
                                </List>
                            )}

                        </Fragment>
                    ))}
                </List>

                <EventDetailedChatForm eventId={eventId} parentId={0} closeForm={null} />

                {/* <CardActionArea> */}
                {/* <FinalForm
                        onSubmit={addComment}
                        render={({ handleSubmit, submitting, form }) => ( */}
                {/* <form
                                style={{ textAlign: 'right' }}
                                className="profile-edit-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit()!.then(() => form.reset());  //clear fields
                                }}
                                autoComplete="Off"
                            >
                                <TextField
                                    name="body"
                                    variant="outlined"
                                    rows={8}
                                    multiline
                                    placeholder="Add your comment"
                                    fullWidth
                                />
                                <Field
                                    component={TextInput}
                                    multiple
                                    rows={8}
                                    variant="outlined"
                                    name="body"
                                    placeholder="Add your comment"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 10 }}
                                    size="small"
                                    startIcon={<EditIcon />}
                                >
                                    { submitting && <CircularProgress size='1.3rem' /> }
                                    { !submitting && 'Add Reply' }
                                </Button>
                            </form> */}
                {/*   )}
                    /> */}
                {/* </CardActionArea> */}
                {/* <CardActions>
                </CardActions> */}
            </CardContent>
        </Card>
    );
}