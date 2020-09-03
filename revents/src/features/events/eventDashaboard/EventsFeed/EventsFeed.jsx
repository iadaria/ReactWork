import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

import { getUserFeedRef, firebaseObjectToArray } from '../../../../app/firestore/firebaseService';
import { listenToFeed } from '../../../profiles/profileActions';
import EventFeedItem from '../EventFeedItem/EventFeedItem';

export default function EventsFeed() {
    const dispatch = useDispatch();
    const { feed } = useSelector(state => state.profile);

    useEffect(() => {
        getUserFeedRef().on('value', snapshot => {
            if(!snapshot.exists()) {
                return;
            }
            const _feed = firebaseObjectToArray(snapshot.val()).reverse();
            dispatch(listenToFeed(_feed));
        });
        return () => {
            getUserFeedRef().off();
        }
    }, [dispatch])

    return (
        <Paper>
            <List>
                {feed.map( post => <EventFeedItem post={post} key={post.id}/> )}
            </List>
        </Paper>
    );
}
