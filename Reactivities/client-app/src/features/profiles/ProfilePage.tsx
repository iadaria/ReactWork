import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RootStoreContext } from '../../app/stores/rootStore';
import { RouteComponentProps } from 'react-router-dom';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

interface RouteParams {
    username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {

    const rootStore = React.useContext(RootStoreContext);
    const { 
        loadingProfile, 
        profile, 
        loadProfile, 
        follow, 
        unfollow, 
        isCurrentUser, 
        loading,
        setActiveTab } = rootStore.profileStore;

    React.useEffect(() => {
        loadProfile(match.params.username);
    }, [loadProfile, match]);

    if (loadingProfile) return <LoadingComponent content='Loading rofile...' />;

    return (
        <div>
            <h1>Profile page</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProfileHeader 
                        profile={profile!} 
                        isCurrentUser={isCurrentUser} 
                        loading={loading} 
                        follow={follow}
                        unfollow={unfollow}/>
                    <ProfileContent setActiveTab={setActiveTab}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default observer(ProfilePage);
