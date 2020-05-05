import React from 'react'
import './activity-detailed-header.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export const ActivityDetailedHeader = () => {
    return (
        <Card className="activity-detailed-header">
            <CardMedia
                className="image"
                image={`/assets/placeholder.png`}
                title="photo"
            />
            <CardHeader 
                className="header"
                title="header"/>
            <CardContent>
                <Typography color="textSecondary" component="p">
                    Date
                </Typography>
                <Typography variant="body2" component="p">
                    Hosted by <strong>Bob</strong>
                </Typography>
            </CardContent>
  
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
                    size="small">
                    Manage Event
                </Button>
            </CardActions>
        </Card>
    )
};

export default ActivityDetailedHeader;
