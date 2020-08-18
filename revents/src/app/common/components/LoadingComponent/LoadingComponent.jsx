import './loading.scss';
import React from 'react';
import { CircularProgress } from '@material-ui/core';

export default function LoadingComponent({ inverted = true, content = "Loading ..." }) {
    return (
        <div className="loading">
            <CircularProgress color="secondary" />
            <p className="loading__content">{content}</p>
        </div>
    );
}
