import React, {useCallback} from 'react';
import './photo-widget-dropzone.sass';
import {useDropzone} from 'react-dropzone';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

interface IProps {
    setFiles: (files: object[]) => void;
}

const dropzoneActive = {
    borderColor: '#388e3c'
};

const PhotoWidgetDropzone: React.FC<IProps> = ({setFiles}) => {

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })));
  }, [setFiles]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div 
        className="photo-widget-dropzone"
        {...getRootProps()} 
        style={isDragActive ? {...dropzoneActive} : {} }
        //style={ isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles }
    >
        <input {...getInputProps()} />
        <Typography variant="h5">Drop image here</Typography>
        <PublishIcon fontSize="large"/>
        {/* {
        isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        } */}
    </div>
  );
};

export default PhotoWidgetDropzone;