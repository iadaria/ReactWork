import React, { useContext, useEffect } from 'react';
import './activity-detailed-chat.sass';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions'; 
import EditIcon from '@material-ui/icons/Edit';
import { RootStoreContext } from '../../../../app/stores/rootStore';
import { Link } from 'react-router-dom';

//import { combineValidators, isRequired } from 'revalidate';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../../app/common/form/TextInput';
import { CircularProgress } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { formatDistance } from 'date-fns';

export const ActivityDetailedChat = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        createHubConnection,
        stopHubConnection,
        addComment,
        activity } = rootStore.activityStore;

    useEffect(() => {
        createHubConnection(activity!.id);
        return () => {
            stopHubConnection();
        }
    }, [createHubConnection, stopHubConnection, activity])

    return (
        <Card className="activity-detailed-chat">
            <CardHeader
                className="header"
                title="Chat about this event"
            />
            <CardContent>
                <List className="comments">

                    {activity && activity?.comments && activity.comments.map((comment) => (
                        <ListItem
                            key={comment.id}
                            className="comment"
                            alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar
                                    src={comment.image || "/assets/user.png"}
                                    alt={comment.displayName}
                                    variant="rounded" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <b className="comment-author-name">
                                        <Link to={`/profile/${comment.username}`}>{comment.displayName}</Link>
                                        <time>
                                            {formatDistance(comment.createdAt, new Date())}
                                        </time>
                                    </b>
                                }
                                secondary={
                                    <Typography
                                        component="span">
                                        {comment.body}
                                    </Typography>
                                }>

                            </ListItemText>

                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ReplyIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}

                </List>
                {/* <CardActionArea> */}
                    <FinalForm
                        onSubmit={addComment}
                        render={({ handleSubmit, submitting, form }) => (
                            <form
                                style={{ textAlign: 'right' }}
                                className="profile-edit-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSubmit()!.then(() => form.reset());  //clear fields
                                }}
                                autoComplete="Off"
                            >
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
                            </form>
                        )}
                    />
                {/* </CardActionArea> */}
                {/* <CardActions>
                </CardActions> */}
            </CardContent>
        </Card>
    );
};

export default observer(ActivityDetailedChat);