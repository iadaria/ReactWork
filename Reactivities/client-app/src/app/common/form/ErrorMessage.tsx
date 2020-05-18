import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { AxiosResponse } from 'axios';
import Typography from '@material-ui/core/Typography';
//import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoneIcon from '@material-ui/icons/Done';

interface IProps {
    error: AxiosResponse,
    text?: string
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
    return (
        <Alert severity="error">
            <AlertTitle>{error.statusText}</AlertTitle>
            {error.data && Object.keys(error.data.errors).length > 0 && (
                <List style={{padding:0, margin:0}}>
                    {Object.values(error.data.errors).flat().map((error, index) =>(
                        <ListItem key={index} style={{padding:0, margin:0}}>
                            <ListItemIcon>
                                <DoneIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText primary={error} />
                        </ListItem>
                    ))}
                </List>
            )}
            {text && <Typography component="p">{text}</Typography>}
        </Alert>
    );
};

export default ErrorMessage;
