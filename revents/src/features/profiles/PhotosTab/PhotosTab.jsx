import React, { useState } from 'react';
import './photos-tab.sass';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import LoadingComponent from '../../../app/common/components/LoadingComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { CircularProgress } from '@material-ui/core';
import PhotoUploadWidget from '../../../app/common/photos/PhotoUploadWidget';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { useDispatch, useSelector } from 'react-redux';
import { listenToUserPhotos } from '../profileActions';
import { toast } from 'react-toastify';
import { 
    getUserPhotos, 
    setMainPhoto, 
    deletePhotoFromCollection } from '../../../app/firestore/firestoreService';
import { deleteFromFirebaseStorage } from '../../../app/firestore/firebaseService';

export default function PhotosTab({ profile, isCurrentUser }) {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [updating, setUpdating] = useState({ isUpdating: false, target: null });
    const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

    const { loading } = useSelector(state => state.async);
    const { photos } = useSelector(state => state.profile);

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: _photos => dispatch(listenToUserPhotos(_photos)),
        deps: [profile, dispatch]
    });

    async function  handleSetMainPhoto(photo, target) {
        setUpdating({ isUpdating: true, target });
        try {
            await setMainPhoto(photo)
        } 
        catch(error) { toast.error(error.message); }
        finally { setUpdating({ isUpdating: false, target: null}); }
    }

    async function handleDeletePhoto(photo, target) {
        setDeleting({ isDeleting: true, target });
        try {
            await deleteFromFirebaseStorage(photo.name);
            await deletePhotoFromCollection(photo.id);
        } 
        catch(error) { toast.error(error.message); }
        finally { setDeleting({ isDeleting: false, target: null}); }
    }

    const setEnableStyle = {
        'color': '#388e3c',
        'borderColor': '#388e3c'
    };

    const setDisableStyle = {
        'color': '#eee',
        'borderColor': '#eee'
    };

    if (loading) return <LoadingComponent />;

    return (
        <Grid className="profile-photos" container spacing={3}>
            <Grid className="profile-photos__header" item xs={12}>

                <Box className="icon-wrapper">
                    <PhotoSizeSelectActualIcon />
                    <Typography variant="h5" display="inline">
                        Photos
                    </Typography>
                </Box>
                {isCurrentUser &&
                    <Button
                        onClick={() => setEditMode(!editMode)}
                        variant="contained"
                    >
                        {editMode ? 'Cancel' : 'Add Photo'}
                    </Button>
                }
            </Grid>
            <Grid className="profile-photos__cards" item xs={12}>
                {editMode ? (
                    <PhotoUploadWidget setEditMode={setEditMode} />
                ) : (
                    <Grid container spacing={3} direction="row">
                        {photos?.map(photo => {
                            const isMainPhoto = photo.url === profile.photoURL;
                            return (
                                <Grid key={photo.id} item lg={2} md={2} sm={4} xs={6}>
                                    <Card className="card">
                                        <CardActionArea>
                                            <CardMedia
                                                className="card-media"
                                                image={photo.url}
                                                title="title"
                                            />
                                        </CardActionArea>
                                        {isCurrentUser &&
                                            <CardActions className="buttons">
                                                <Button
                                                    style={isMainPhoto ? { ...setDisableStyle } : { ...setEnableStyle }}
                                                    name={photo.id}
                                                    onClick={(e) => handleSetMainPhoto(photo, e.currentTarget.name)}
                                                    disabled={isMainPhoto}
                                                    className="btn-main"
                                                    variant="outlined"
                                                >
                                                    { 
                                                        updating.isUpdating && updating.target === photo.id
                                                        ? <CircularProgress size='1.3rem' />
                                                        :'Main'}
                                                </Button>
                                                <IconButton
                                                    onClick={(e) => handleDeletePhoto(photo, e.currentTarget.name)}
                                                    disabled={isMainPhoto}
                                                    name={photo.id}
                                                    className="btn-delete"
                                                    component="button"
                                                >
                                                    {
                                                        deleting.isDeleting && deleting.target === photo.id
                                                        ? <CircularProgress size='1.3rem' />
                                                        : <DeleteIcon
                                                            color={isMainPhoto ? "disabled" : "secondary"}
                                                            fontSize="default"
                                                        />
                                                    }
                                                </IconButton>
                                            </CardActions>
                                        }
                                    </Card>
                                </Grid>
                            )}
                        )}
                    </Grid>
                )}
            </Grid> {/* row */}
        </Grid>
    );
}