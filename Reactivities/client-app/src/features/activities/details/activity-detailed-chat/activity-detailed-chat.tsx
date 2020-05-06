import React from 'react';
import './activity-detailed-chat.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const ActivityDetailedChat = () => {
    return (
        <Paper className="activity-detailed-chat">
            <Typography className="header">
                Chat about this event
            </Typography>

            <Box className="comments">
                <Card className="comment">
                    <CardHeader       
                        avatar={
                            <Avatar src="/assets/user.png"/>
                        }
                        title={
                            <Typography className="title">
                                <b>Matt</b><time>05.05.2000</time>
                            </Typography>
                        }
                        subheader={
                            <Typography>hellow</Typography>
                        }
                        action={
                            <Button>Reply</Button>
                        }
                    />
                </Card>
                <Card className="comment">
                    <CardHeader       
                        avatar={
                            <Avatar src="/assets/user.png"/>
                        }
                        title={
                            <Typography className="title">
                                <b>Matt</b><time>05.05.2000</time>
                            </Typography>
                        }
                        subheader={
                            <Typography>hellow</Typography>
                        }
                        action={
                            <Button>Reply</Button>
                        }
                    />
                </Card>
                <form autoComplete="false">
                    <TextField
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                    />
                </form>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{marginTop: 10}} 
                    size="small">
                    Add Reply
                </Button>
            </Box>

        </Paper>
    );
};

export default ActivityDetailedChat;
