import React from 'react';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './profile-header.sass';
import { IProfile } from '../../app/models/profile';
import { observer } from 'mobx-react-lite';

interface IProps {
    profile: IProfile,
    isCurrentUser: boolean,
    loading: boolean,
    follow: (username: string) => void;
    unfollow: (username: string) => void;
}

const ProfileHeader: React.FC<IProps> = ({ 
    profile,
    isCurrentUser,
    loading,
    follow,
    unfollow
 }) => {
    //const [isFollowing, setIsFollowing] = useState(false);

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
                                onClick={
                                    profile.following 
                                        ? () => unfollow(profile.username) 
                                        : () => follow(profile.username)
                                }
                                className="btn"
                                color={!profile.following ? "primary" : "secondary"}
                                variant={!profile.following ? "contained" : "outlined"}
                                fullWidth
                            >
                                {!profile.following ? "Following" : "Unfollow"}
                            </Button>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default observer(ProfileHeader);
