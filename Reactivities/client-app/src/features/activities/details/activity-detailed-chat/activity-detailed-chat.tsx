import React from 'react';
import './activity-detailed-chat.sass';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';

export const ActivityDetailedChat = () => {
    return (
        <Card className="activity-detailed-chat">
                <CardHeader
                    className="header"
                    title="Chat about this event"
                />
                <CardContent>
                    <List className="comments">
                        <ListItem
                            className="comment"
                            alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar 
                                    src="/assets/user.png" 
                                    alt="user"
                                    variant="rounded"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <b className="comment-author-name">Matt<time>05.05.2000</time></b>
                                }
                                secondary={
                                    <Typography
                                        component="span">
                                        It is a comment. It is a simple of the comment.
                                    </Typography>
                                }>

                            </ListItemText>

                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ReplyIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem
                            className="comment"
                            alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar 
                                    src="/assets/user.png" 
                                    alt="user"
                                    variant="rounded"/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <b className="comment-author-name">Matt<time>05.05.2000</time></b>
                                }
                                secondary={
                                    <Typography
                                        component="span">
                                        It is a comment. It is a simple of the comment.
                                    </Typography>
                                }>

                            </ListItemText>

                            <ListItemSecondaryAction>
                                <IconButton>
                                    <ReplyIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                    </List>
                    <CardActionArea>
                        <form autoComplete="false">
                            <TextField
                                multiline
                                rows={8}
                                variant="outlined"
                                fullWidth
                            />
                        </form>
                    </CardActionArea>
                    <CardActions>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            style={{marginTop: 10}} 
                            size="small"
                            startIcon={<EditIcon />}>
                            Add Reply
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
    );
};

export default ActivityDetailedChat;
