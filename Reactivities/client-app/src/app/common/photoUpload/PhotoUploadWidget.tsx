import React from 'react';
import './photo-upload-widget.sass';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardMedia from '@material-ui/core/CardMedia';
import PhotoWidgetCropper from './PhotoWidgetCropper';

const PhotoUploadWidget = () => {
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
                    {/* <Card className="preview-card">
                        <CardActionArea>
                            <CardMedia
                                className="preview-card__media"
                                image={files[0].preview}
                            />
                        </CardActionArea>
                    </Card> */}
                    </>
                }
            </Grid>
        </Grid>
    );
};

export default observer(PhotoUploadWidget);
