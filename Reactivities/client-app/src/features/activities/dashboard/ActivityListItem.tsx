import React from 'react'
import { Card, CardContent, Typography, makeStyles, CardHeader, CardActions, Button, Box, Theme, createStyles } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import RoomIcon from '@material-ui/icons/Room';
import Avatar from '@material-ui/core/Avatar';
import { format }  from 'date-fns';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';

export const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {
    const classes = useStyles();

    return (
      <Card key={activity.id} className={classes.root}>
        {/* <CardMedia
          className={classes.avatar}
          image="/assets/user.png"
          title="user's avatar"
        /> */}
        <CardHeader
          avatar={
            <Avatar 
              alt="user's avatar"
              src="/assets/user.png"
            />
          }
          title={activity.title}
          subheader="Hosted by Daria"
        />
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              <AccessTimeIcon color="primary" style={{marginRight: '.5rem'}} fontSize="small"/>
              {format(activity.date, 'h:mm a')}
              <RoomIcon style={{marginLeft: '1rem'}} fontSize="small"/>
              {activity.city}, {activity.venue}
          </Typography>
          <Typography variant="body2" component="div">
              <p>{activity.description}</p>
          </Typography>
        </CardContent>
        <CardActions className={classes.cardButtons}>
          <Button variant="outlined" size="small">{activity.category || "None"}</Button>

          <Box>
            {/* <Button
                className={classes.delete}
                name={activity.id}
                onClick={(event) => deleteActivity(event, activity.id)}
                size="small"
                //variant="outlined"
                color="secondary"
            >
                {target === activity.id && submitting && <CircularProgress size='1.3rem' />}
                {(target !== activity.id || !submitting) && 'Delete'}
            </Button> */}

            <Button
                component={Link} to={`/activities/${activity.id}`}
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
    );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      marginTop: '5px',
      padding: 10,
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
      //color: red[500],
      //borderColor: red[500],
      marginRight: 10
    },
  }));

export default ActivityListItem;