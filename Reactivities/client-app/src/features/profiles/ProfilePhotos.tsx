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

const ProfilePhotos = () => {
    const rootStore = React.useContext(RootStoreContext);
    const { profile, isCurrentUser } = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = React.useState(true);

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
                    <PhotoUploadWidget />
                ) : (
                    <Grid container spacing={3} direction="row">
                        {profile && (
                            profile?.photos.map(photo =>
                                ( <Grid item lg={2} md={2} sm={4} xs={6}>
                                        <Card
                                            className="card"
                                            key={photo.id}
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
                                                        className="btn-main"
                                                        variant="outlined"
                                                    >
                                                        Main
                                                    </Button>
                                                    <IconButton
                                                        className="btn-delete"
                                                        component="button"
                                                    >
                                                        <DeleteIcon color="secondary" fontSize="default" />
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

export default ProfilePhotos;
