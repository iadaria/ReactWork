import React, { SyntheticEvent } from 'react';
import { Card, CardContent, Typography, makeStyles, CardHeader, CardActions, Button, Box, Theme, createStyles, CircularProgress } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';
import { red } from '@material-ui/core/colors';

interface IProps {
  activities: IActivity[]
  selectActivity: (id: string) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({
  activities, 
  selectActivity,
  deleteActivity,
  submitting,
  target }) => {
    const classes = useStyles();
    return (
        <Box >
          {activities.map(activity => (
            <Card key={activity.id} className={classes.root}>
              <CardHeader 
                title={activity.title}
              />
              <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                      {activity.date}
                  </Typography>
                  <Typography variant="body2" component="div">
                      <p>{activity.description}</p>
                      <p>{activity.city}, {activity.venue}</p>
                  </Typography>
              </CardContent>
              <CardActions className={classes.cardButtons}>
                  <Button variant="outlined" size="small">{activity.category}</Button>
                  
                  <Box>
                    <Button 
                      className={classes.delete}
                      name={activity.id}
                      onClick={(event) => deleteActivity(event, activity.id)}
                      size="small" 
                      //variant="outlined"
                      color="secondary"
                    >
                      {target === activity.id && submitting && <CircularProgress size='1.3rem'/>}
                      {(target !== activity.id || !submitting) && 'Delete'}
                    </Button>
                    
                    <Button 
                      onClick={() => selectActivity(activity.id)}
                      size="small" 
                      color="primary"
                      variant="contained"
                    >
                      View
                    </Button>
                  </Box>

              </CardActions>
            </Card>
          ))}
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginTop: '5px',
    padding: 10
  },
  title: {
    fontSize: 14,
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