import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileEditForm from './ProfileEditForm';

const ProfileDescription = () => {
    const rootStore = React.useContext(RootStoreContext);
    const { updateProfile, profile, isCurrentUser } = rootStore.profileStore;
    const [editMode, setEditMode] = React.useState(false);

    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography variant="h5" align="left">
                        {`About ${profile!.displayName}`}
                    </Typography>
                    {isCurrentUser && (
                        <Typography variant="button" align="right">
                            <Button
                                onClick={() => setEditMode(!editMode)}
                                variant="contained"
                                size="small"
                            >
                                {editMode ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </Typography>
                        )
                    }
                </div>
            </Grid>
            <Grid item xs={12}>
                {editMode ? (
                    <ProfileEditForm updateProfile={updateProfile} profile={profile!} />
                ) : (
                    <Typography variant="body1">
                        {profile!.bio}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default observer(ProfileDescription);
