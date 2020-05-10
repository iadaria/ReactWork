import React from 'react'
import './activity-detailed-header.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { format }  from 'date-fns';
import { Button } from '@material-ui/core';
import { IActivity } from '../../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

export const ActivityDetailedHeader: React.FC<{activity: IActivity}> = ({activity}) => {
    return (
        <Card className="activity-detailed-header">
            <CardMedia
                className="image"
                image={`/assets/categoryImages/${activity.category}.jpg`}
                title="photo"
            />
            <div className="header">
                <CardHeader 
                    title={activity.title}/>
                <CardContent>
                    <Typography component="p">
                        {format(activity.date, 'eeee do MMMM')}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Hosted by <strong>Bob</strong>
                    </Typography>
                </CardContent>
            </div>
  
            <CardActions className="group-between">
                <div className="group-left">
                    <Button 
                        className="btn-join"
                        size="small">
                        Join Activity
                    </Button>
                    <Button 
                        variant="contained"
                        size="small">
                            Cancel attendance
                    </Button>
                </div>
                <Button 
                    className="btn-manage"
                    component={Link} to={`/manage/${activity.id}`}
                    size="small">
                    Manage Event
                </Button>
            </CardActions>
        </Card>
    )
};

export default observer(ActivityDetailedHeader);
