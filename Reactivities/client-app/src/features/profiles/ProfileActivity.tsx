import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { format } from 'date-fns';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { IUserActivity } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface IProps {
    activity: IUserActivity;
}

const ProfileActivity: React.FC<IProps> = ({ activity }) => {
    return (
        <Link to={`/activities/${activity.id}`}>
            <Card className="profile-card">
                <CardActionArea>
                    <CardMedia
                        className="profile-card__media"
                        image={`/assets/categoryImages/${activity.category}.jpg`}
                        title="title"
                    />
                </CardActionArea>
                <CardContent className="profile-card__content">
                    <Typography variant="h5">
                        <b>{activity.title}</b>
                    </Typography>
                    <Divider />
                    <div className="profile-card__followers">
                        <div>{format(new Date(activity.date), 'do LLL')}</div>
                        <div>{format(new Date(activity.date), 'h:mm a')}</div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default observer(ProfileActivity);