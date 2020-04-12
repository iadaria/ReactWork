import React from 'react';
import { CircularProgress, Typography, makeStyles, Theme, createStyles, Box } from '@material-ui/core';

const LoadingComponent: React.FC<{content? : string}> = ({content}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <CircularProgress />
            <Typography 
                className={classes.loadTitle} 
                variant="subtitle2"
            >
                {content}
            </Typography>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        //border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '98vh'
    },
    loadTitle: {
        marginTop: 10,
        color: '#90a4ae',
        textTransform: "uppercase"
    }
    /* button: {
      margin: theme.spacing(2),
    },*/
  }),
);

export default LoadingComponent;