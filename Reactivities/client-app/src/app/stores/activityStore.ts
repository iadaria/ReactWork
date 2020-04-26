import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

configure({enforceActions: 'always'});

class ActivityStore {
    @observable activityRegistry = new Map();
    @observable activities: IActivity[] = [];
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;
    @observable target = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activities', () => {
                activities.forEach((activity) => {
                    activity.date = activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id, activity);
                });
            });
        } 
        catch (error) { console.log(error);} 
        finally { runInAction('load activities finally', () => {this.loadingInitial= false;}); }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('creating activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
            });
        } 
        catch (error) { console.log(error);} 
        finally { runInAction('create activity finally', () => {this.submitting = false;}); }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
                this.editMode = false;
            });
        }
        catch (error) { console.log(error);} 
        finally { runInAction('edit activity finally', () => {this.submitting = false;}); }
    };

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Activities.delete(id);
            runInAction('deleting activity', () => {
                this.activityRegistry.delete(id);
            });
        }
        catch (error) { console.log(error);} 
        finally { 
            runInAction('delete activity finally', () => {
                this.submitting = false;
                this.target = '';
            }); 
        }
    };

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                });
            }
            catch (error) { console.log(error);} 
            finally { runInAction('get activity finally', () => {this.submitting = false;}); }
        }
    };

    @action clearActivity = () => this.activity = null;

    getActivity = (id: string) => this.activityRegistry.get(id);

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = null;
    };

    @action openEditForm = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = true;
    };

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = false;
    };

    @action cancelactivity = () => this.activity = null;
    @action cancelFormOpen = () => this.editMode = false;
}

export default createContext(new ActivityStore());