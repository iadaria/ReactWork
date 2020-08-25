import './profile-header.sass';
import React from 'react';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function ProfileHeader({ profile, isCurrentUser }) {
    //const [isFollowing, setIsFollowing] = useState(false);

    return (
        <Grid className="profile-header" container direction="row">

            <Grid className="name" item md={8} xs={12}>
                <Avatar
                    style={{ minWidth: 90, minHeight: 90 }}
                    alt={profile.displayName || "user's avatar"}
                    src={profile.photoURL || `/assets/user.png`}
                />
                <Typography variant="h3">
                    {profile.displayName}
                </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
                <Grid className="follow" container direction="row" justify="space-around">
                    <Grid item>
                        <Typography variant="h5">
                            {profile.followersCount}
                            </Typography>
                        <Typography variant="h5">
                            Followers
                            </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            {profile.followingCount}
                            </Typography>
                        <Typography variant="h5">
                            Following
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        { !isCurrentUser &&
                            <Button
                                // onClick={
                                //     profile.following 
                                //         ? () => unfollow(profile.username) 
                                //         : () => follow(profile.username)
                                // }
                                className="btn"
                                color={!profile.following ? "primary" : "secondary"}
                                variant={!profile.following ? "contained" : "outlined"}
                                fullWidth
                            >
                                {!profile.following ? "Following" : "Unfollow"}
                            </Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}