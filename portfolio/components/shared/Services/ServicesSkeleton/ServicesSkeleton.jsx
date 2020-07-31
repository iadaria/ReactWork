import React from 'react';
import './services-skeleton.scss';
import Skeleton from '@material-ui/lab/Skeleton';

const ServicesSkeleton = () => {
    return (
        <ul className="services-skeleton">
            <li className="service">
                <Skeleton width="100%" component="h1" />
                <Skeleton width="100%" height={100} variant="rect" />
            </li>
            <li className="service">
                <Skeleton width="100%" component="h1" />
                <Skeleton width="100%" height={100} variant="rect" />
            </li>
            <li className="service">
                <Skeleton width="100%" component="h1" />
                <Skeleton width="100%" height={100} variant="rect" />
            </li>
        </ul>
    );
};

export default ServicesSkeleton;
