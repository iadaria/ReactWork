import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core';
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
import Chip from '@material-ui/core/Chip';
import { format }  from 'date-fns';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import ActivityListItemAttendees from './ActivityListItemAttendees';

export const ActivityListItem: React.FC<{activity: IActivity}> = ({activity}) => {

    const classes = useStyles();
    const host = activity.attendees.filter(x => x.isHost)[0];
    const isHost = activity.isHost ?
      <div>
        <Chip
          className={ classes.host } 
          label="You are hosting this activity" 
          variant="outlined" 
          size="small"/>
      </div>
      : null;

    const isGoing = !activity.isHost && activity.isGoing ?
      <div>
        <Chip
          className={ classes.going } 
          label="You are going to this activity" 
          variant="outlined" 
          size="small"/>
      </div>
      : null;

    return (
      <Card key={activity.id} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar 
              alt="user's avatar"
              src={host.image || `/assets/user.png`}
            />
          }
          title={
            <Link className={classes.card_title} to={`/activities/${activity.id}`}>
              {activity.title}
            </Link>
          }
          subheader={
            <>
              <Typography variant="caption" color="textSecondary">
                Hosted by <b>{ host.displayName }</b>
              </Typography>
              { isHost }
              { isGoing }
            </>
          }
        />
        <CardContent>
          
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              <AccessTimeIcon color="primary" style={{marginRight: '.5rem'}} fontSize="small"/>
              {format(activity.date, 'h:mm a')}
              <RoomIcon style={{marginLeft: '1rem'}} fontSize="small"/>
              {activity.city}, {activity.venue}
          </Typography>
          
          <ActivityListItemAttendees attendees={activity.attendees}/>

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
    host: {
      color:'#f57c00',
      borderColor: '#f57c00',
      fontWeight: 'bold'
    },
    going: {
      color:'#4caf50',
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
      //color: red[500],
      //borderColor: red[500],
      marginRight: 10
    },
  }));

export default ActivityListItem;