import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './profile-header.sass';
import { IProfile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface IProps {
    profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    return (
        <Grid className="profile-header" container direction="row">

            <Grid className="name" item md={8} xs={12}>
                <Avatar
                    style={{ minWidth: 90, minHeight: 90 }}
                    alt={profile.displayName || "user's avatar"}
                    src={profile.image || `/assets/user.png`}
                />
                <Typography variant="h3">
                    {profile.displayName}
                </Typography>
            </Grid>

            <Grid item md={4} xs={12}>
                <Grid className="follow" container direction="row" justify="space-around">
                    <Grid item>
                        <Typography variant="h5">
                            5
                            </Typography>
                        <Typography variant="h5">
                            Followers
                            </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">
                            42
                            </Typography>
                        <Typography variant="h5">
                            Following
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => setIsFollowing(!isFollowing)}
                            className="btn"
                            color={isFollowing ? "primary" : "secondary"}
                            variant={isFollowing ? "contained" : "outlined"}
                            fullWidth
                        >
                            {isFollowing ? "Following" : "Unfollow"}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default observer(ProfileHeader);
