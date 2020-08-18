import './event-list-item-skeleton.scss';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function EventListItemSkeleton() {
    return (
        <div className="event-list-item-skeleton">
            <div className="title">
                <Skeleton variant="circle" width={70} height={70} />
                <Skeleton className="title-text" component="p" width="30%"/>
            </div>
            <Skeleton component="h2" width="90%"/>
            <Skeleton variant="rect" width="100%" height={150} />
        </div>
    );
}
