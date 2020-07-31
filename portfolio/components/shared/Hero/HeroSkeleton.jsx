import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function HeroSkeleton() {
    return (
        <div>
            <Skeleton component="h1" width="80%"/>
            <Skeleton component="h1" width="100%"/>
            <Skeleton component="h1" width="100%"/>
            <Skeleton component="h1" width="100%"/>
        </div>
    );
};

export default HeroSkeleton;
