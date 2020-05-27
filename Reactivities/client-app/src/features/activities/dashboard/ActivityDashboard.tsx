import React, { useContext, useEffect, useState } from 'react';
import './activity-dashboard.sass';
import { observer } from 'mobx-react-lite';
import ActivityList from './ActivityList';
import Grid from '@material-ui/core/Grid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadActivities, loadingInitial, setPage, page, totalPages } = rootStore.activityStore;
    const [ loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadActivities().then(() => setLoadingNext(false));
    };

    const theEnd = page === 0;

    useEffect(() => {
      loadActivities();
    }, [loadActivities]); //rootStore as its dependency
  
    if (loadingInitial && theEnd) 
      return <LoadingComponent content='Loading activities...'/>

    return (
        <Grid className="activity-dashboard" container spacing={3} /* direction="column-reverse" */>        
            <Grid item md={8} sm={6} xs={12} style={{position: 'relative'}}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && page + 1 < totalPages}
                    initialLoad={true}
                >
                    <ActivityList />
                </InfiniteScroll>
                {/* <Button
                    style={isDisable ? {...styleEnableMore, ...styleDisableMore} : styleEnableMore }
                    onClick={handleGetNext}
                    variant="outlined"
                    disabled={isDisable}
                >
                    { loadingNext && <CircularProgress size="1.3rem"/> }
                    { !loadingNext && 'More...' }
                </Button> */}
            </Grid>
            <Grid className="filter" item md={4} sm={6} xs={12}>
                <ActivityFilters />
            </Grid>
            {/* <Grid item md={4} sm={6} xs={12}>
                <CircularProgress size="large" />
            </Grid> */}
        </Grid>
    );
};

export default observer(ActivityDashboard);

/* const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {
        fontSize: 14,
    },
    rightPanel: {
        position: "fixed",
        maxWidth: 400,
        [theme.breakpoints.down('xs')]: {
            position: "static",
            border: 1, 
            margin: "auto"
        }
    }
  })
); */
