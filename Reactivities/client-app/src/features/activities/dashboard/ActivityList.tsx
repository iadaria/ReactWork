import React, { useContext, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from '../../activities/dashboard/ActivityListItem';
import { Chip } from '@material-ui/core';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityList: React.FC = () => {

    const rootStore = useContext(RootStoreContext);
    const { activitiesByDate } = rootStore.activityStore;

    return (
        <Fragment>
          {activitiesByDate.map(([group, activities]) => (
            <Fragment key={group}>
              <Chip label={group} color="primary" style={{marginTop: '.5em'}}/>
              <Fragment>
                {
                  activities.map(activity => (
                    <ActivityListItem key={activity.id} activity={activity}/>
                  ))
                }
              </Fragment>
            </Fragment>
          ))}
        </Fragment>
        
    );
};

export default observer(ActivityList);