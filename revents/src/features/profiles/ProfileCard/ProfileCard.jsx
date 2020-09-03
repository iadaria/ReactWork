import React from 'react';
import './profile-card.sass';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Link } from 'react-router-dom';


export default function ProfileCard({ profile }){
    return (
        <Link to={`/profile/${profile.id}`}>
            <Card className="profile-card">
                <CardActionArea>
                    <CardMedia
                        className="profile-card__media"
                        image={profile.photoURL || '/assets/user.png'}
                        title="title"
                    />
                </CardActionArea>
                <CardContent className="profile-card__content">
                    <Typography variant="h5">
                        <b>{profile.displayName}</b>
                    </Typography>
                    <Divider />
                    <div className="profile-card__followers">
                        <PeopleAltIcon fontSize="small" />
                        {profile.followersCount} Followers
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
