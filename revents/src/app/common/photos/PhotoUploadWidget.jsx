import React from 'react';
import './photo-upload-widget.sass';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { CircularProgress } from '@material-ui/core';
import cuid from 'cuid';
import { getFileExtension } from '../util/util';
import { uploadToFirebaseStorage } from '../../firestore/firebaseService';
import { toast } from 'react-toastify';
import { updateUserProfilePhoto } from '../../firestore/firestoreService';

export default function PhotoUploadWidget ({ setEditMode }) {
    const [files, setFiles] = React.useState([]);
    const [image, setImage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview)); //for clean up
        }
    }, [files]);

    function handleUploadImage() {
        setLoading(true);
        const filename = cuid() + '.' + getFileExtension(files[0].name);
        console.log("PhotoUploadWidget - filename", filename);
        console.log("PhotoUploadWidget -> image", image);
        const uploadTask = uploadToFirebaseStorage(image, filename);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
        }, error => {
            toast.error(error.message);
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                updateUserProfilePhoto(downloadURL, filename).then(() => {
                    setLoading(false);
                    handelCancelCrop();
                    setEditMode(false);
                })
                .catch(error => toast.error(error.message))
                .finally(() => setLoading(false))
            });
        });
    }

    function handelCancelCrop() {
        setFiles([]);
        setImage(null);
    }

    return (
        <Grid className="photo-upload-widget" container spacing={3}>
            <Grid item xs={3}>
                <Typography variant="subtitle1">Step 1 - Add Photo</Typography>
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <Typography variant="subtitle1">Step 2 - Resize image</Typography>
                {files.length > 0 && <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview}/>}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
                <Typography variant="subtitle1">Step 3 - Preview & Upload</Typography>
                {files.length > 0 &&
                    <>
                        <div className='img-preview' style={{minHeight: '200px', overflow: 'hidden'}}/>
                        <>
                            <IconButton
                                //style={{border: '1px solid black'}}
                                style={{color: 'green'}}
                                onClick={handleUploadImage}
                            >
                                { loading && <CircularProgress size='1.3rem'/> }
                                {!loading && <CheckIcon /> }
                            </IconButton>
                            <IconButton
                                color="secondary"
                                disabled={loading}
                                onClick={handelCancelCrop}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    </>
                }
            </Grid>
        </Grid>
    );
}