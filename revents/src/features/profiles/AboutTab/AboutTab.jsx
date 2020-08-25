import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {format} from 'date-fns';
import ProfileForm from '../ProfileForm';


export default function AboutTab({ profile, isCurrentUser }) {
    const [editMode, setEditMode] = useState(false);

    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <Typography variant="h5" align="left">
                        {`About ${profile.displayName}`}
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
                <div style={{marginTop: 20}}>
                    {editMode ? (
                        <ProfileForm profile={profile} />
                    ) : (
                        <div>
                            <strong>Member sicne: {format(profile.createdAt, "dd MMM yyyy")}</strong>
                            <p>{profile.description}</p>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};