import React from 'react';
import './photo-upload-widget.sass';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import ButtonGroup from '@material-ui/core/ButtonGroup';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { CircularProgress } from '@material-ui/core';

interface IProps {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({loading, uploadPhoto}) => {
    const [files, setFiles] = React.useState<any[]>([]);
    const [image, setImage] = React.useState<Blob | null>(null);

    React.useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview)); //for clean up
        }
    }, [files]);

    return (
        <Grid className="photo-upload-widget" container spacing={3}>
            {/*  <Grid item xs={12}>
                Row
            </Grid> */}
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
                                onClick={() => uploadPhoto(image!)}
                            >
                                { loading && <CircularProgress size='1.3rem'/> }
                                {!loading && <CheckIcon /> }
                            </IconButton>
                            <IconButton
                                disabled={loading}
                                onClick={() => setFiles([])}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    </>
                }
            </Grid>
        </Grid>
    );
};

export default observer(PhotoUploadWidget);

/* <Card className="preview-card">
    <CardActionArea>
        <CardMedia
            className="preview-card__media"
            image={files[0].preview}
        />
    </CardActionArea>
</Card> */