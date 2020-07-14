import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const SkeletonDrawerMenu = () => {
    return (
        <>
            <li className="nav-item">
                <Skeleton width="90%" component="h1" />
            </li>
            <li className="nav-item">
                <Skeleton width="90%" component="h1" />
            </li>
            <li className="nav-item">
                <Skeleton width="90%" component="h1" />
            </li>
            <li className="nav-item">
                <Skeleton width="90%" component="h1" />
            </li>
        </>
    );
};

export default SkeletonDrawerMenu;
