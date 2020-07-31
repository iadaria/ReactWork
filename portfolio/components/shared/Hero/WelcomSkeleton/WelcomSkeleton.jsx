import React from 'react';
import './welcom-skeleton.scss';
import Skeleton from '@material-ui/lab/Skeleton';

function WelcomSkeleton() {
    return (
        <div className="welcom-skeleton" style={{width: '100%'}}>
            <Skeleton component="h1" width="80%"/>
            <Skeleton component="h1" />
            <Skeleton component="h1" />
            <Skeleton component="h1" width="80%"/>
        </div>
    );
};

export default WelcomSkeleton;