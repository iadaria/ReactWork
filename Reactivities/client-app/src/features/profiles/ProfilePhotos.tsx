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

const ProfilePhotos = () => {
    return (
        <Grid className="profile-photos" container spacing={3}>
            <Grid className="profile-photos__header" item xs={12}>

                <Box className="icon-wrapper">
                    <PhotoSizeSelectActualIcon />
                    <Typography variant="h5" display="inline">
                        Photos
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                >
                    Add Photo
                </Button>
            </Grid>
            <Grid className="profile-photos__cards" item xs={12}>

                <Grid container spacing={3} direction="row">
                {
                    [1, 2, 3, 4, 5, 6, 7].map(index =>
                        (
                            <Grid item lg={2} md={2} sm={4} xs={6}>
                                <Card 
                                    className="card"
                                    key={index}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            className="card-media"
                                            image='/assets/user.png'
                                            title="title"
                                        />
                                    </CardActionArea>
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
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Grid> {/* row */}
        </Grid>
    );
};

export default ProfilePhotos;
