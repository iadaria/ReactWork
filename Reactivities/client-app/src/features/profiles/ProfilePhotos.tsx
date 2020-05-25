import React from 'react';
import './profile-photos.sass';
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
import DeleteIcon from '@material-ui/icons/Delete';
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';
import { observer } from 'mobx-react-lite';
import { CircularProgress } from '@material-ui/core';

const ProfilePhotos = () => {
    const rootStore = React.useContext(RootStoreContext);
    const { 
        profile, 
        isCurrentUser, 
        uploadPhoto,
        uploadingPhoto,
        setMainPhoto,
        deletePhoto,
        loading } = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = React.useState(false);
    const [target, setTarget] = React.useState<string | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = React.useState<string | undefined>(undefined);

    const handleUploadImage = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false))
    };

    const setEnableStyle = {
        'color': '#388e3c',
        'borderColor': '#388e3c'
    };

    const setDisableStyle = {
        'color': '#eee',
        'borderColor': '#eee'
    };

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
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                        variant="contained"
                    >
                        {addPhotoMode ? 'Cancel' : 'Add Photo'}
                    </Button>
                }
            </Grid>
            <Grid className="profile-photos__cards" item xs={12}>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto}/>
                ) : (
                    <Grid container spacing={3} direction="row">
                        {profile && (
                            profile?.photos.map(photo =>
                                ( <Grid key={photo.id} item lg={2} md={2} sm={4} xs={6}>
                                        <Card
                                            className="card"
                                        >
                                            <CardActionArea>
                                                <CardMedia
                                                    className="card-media"
                                                    image={photo.url}
                                                    title="title"
                                                />
                                            </CardActionArea>
                                            { isCurrentUser &&
                                                <CardActions className="buttons">
                                                    <Button
                                                        style={ photo.isMain ? {...setDisableStyle} : {...setEnableStyle} }
                                                        name={photo.id}
                                                        onClick={(e) => {
                                                            setMainPhoto(photo);
                                                            setTarget(e.currentTarget.name);
                                                        }}
                                                        disabled={photo.isMain}
                                                        className="btn-main"
                                                        variant="outlined"
                                                    >
                                                        { target === photo.id && loading && <CircularProgress size='1.3rem'/> }
                                                        { (target !== photo.id || !loading) && 'Main' }
                                                    </Button>
                                                    <IconButton
                                                        onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                                            deletePhoto(photo);
                                                            setDeleteTarget(e.currentTarget.name)
                                                        }}
                                                        disabled={photo.isMain}
                                                        name={photo.id}
                                                        className="btn-delete"
                                                        component="button"
                                                    >
                                                        { deleteTarget === photo.id && loading && <CircularProgress size='1.3rem'/> }
                                                        { (deleteTarget !== photo.id || !loading) && 
                                                            <DeleteIcon 
                                                                color={photo.isMain ? "disabled": "secondary"}
                                                                fontSize="default" 
                                                            /> 
                                                        }
                                                    </IconButton>
                                                </CardActions>
                                            }
                                        </Card>
                                    </Grid>
                                )
                            ) /* end map */
                        )}
                    </Grid>
                )}
            </Grid> {/* row */}
        </Grid>
    );
};

export default observer(ProfilePhotos);