import React from 'react';
import { Card, CardContent, Typography, makeStyles, CardHeader, CardActions, Button, Box } from '@material-ui/core';
import { IActivity } from '../../../app/models/activity';

interface IProps {
  activities: IActivity[]
  selectActivity: (id: string) => void;
}

export const ActivityList: React.FC<IProps> = ({activities, selectActivity}) => {
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
                  <Button 
                    onClick={() => selectActivity(activity.id)}
                    size="large" color="primary"
                  >
                    View
                  </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
    );
};

const useStyles = makeStyles({
  root: {
    marginTop: '5px'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardButtons: {
    justifyContent: "space-between"
  }
});