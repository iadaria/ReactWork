import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { setActivityProps, craeteAttendee } from '../common/util/util';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

//for pagination
const LIMIT = 2;

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        //if predicates key was change
        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.activityRegistry.clear();
                this.loadActivities();
            }
        )
    }

    @observable activity: IActivity | null = null;
    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';
    @observable loading = false;
    @observable.ref hubConnection: HubConnection | null = null;
    //for pagination
    @observable activityCount = 0;
    @observable page = 0;
    //for filter
    @observable predicate = new Map();
    //for filter
    @action setPredicate = (predicate: string, value: string | Date) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value)
        }
    };
    @computed get axiosParams() {
        const params = new URLSearchParams();
        params.append('limit', String(LIMIT));
        params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            if (key === 'startDate') {
                params.append(key, value.toISOString());
            } else {
                params.append(key, value);
            }
        });

        return params;
    };

    //for pagination
    @computed get totalPages() {
        return Math.ceil(this.activityCount / LIMIT);
    }
    @action setPage = (page: number) => {
        this.page = page;
    };

    @action createHubConnection = (activityId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log(this.hubConnection!.state))
            .then(() => {
                console.log('Attempting to join group');
                this.hubConnection!.invoke('AddToGroup', activityId)
            })
            .catch(error => console.log('Error estableshing connection: ', error));

        this.hubConnection.on('ReceiveComment', comment => {
            runInAction(() => {
                this.activity!.comments.push(comment)
            });;
        });

        this.hubConnection.on('Send', message => {
            toast.info(message);
        });
    };

    @action stopHubConnection = () => {
        this.hubConnection!.invoke('RemoveFromGroup', this.activity!.id)
            .then(() => {
                this.hubConnection!.stop();
            })
            .then(() => console.log('Connection stoped'))
            .catch(err => console.log(err))
    };      

    @action addComment = async (values: any) => {
        values.activityId = this.activity!.id;
        try {
            await this.hubConnection!.invoke('SendComment', values);//ChatHub.cs -> SendCommand
        }
        catch (error) { console.log(error);} 
        //finally { runInAction('load activities finally', () => {this.loadingInitial= false;}); }
    };

    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(
            Array.from(this.activityRegistry.values())
        );
        /* return Array.from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date)); */
    }
    
    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort(
            //(a, b) => Date.parse(a.date) - Date.parse(b.date)
            (a, b) => a.date.getTime() - b.date.getTime()
        );

        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key: string]: IActivity[]}));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activitiesEnvelope = await agent.Activities.list(this.axiosParams);
            const { activities, activityCount } = activitiesEnvelope;
            runInAction('loading activities', () => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date);
                    setActivityProps(activity, this.rootStore.userStore.user!); //current user
                    this.activityRegistry.set(activity.id, activity);
                });
                this.activityCount = activityCount;
            });
        } 
        catch (error) { console.log(error);} 
        finally { runInAction('load activities error', () => {this.loadingInitial= false;}); }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            const attendee = craeteAttendee(this.rootStore.userStore.user!);
            attendee.isHost = true;
            let attendees = [];
            attendees.push(attendee);
            activity.attendees = attendees;
            activity.comments = [];
            activity.isHost = true;
            runInAction('creating activity', () => {

                this.activityRegistry.set(activity.id, activity);
            });
            history.push(`/activities/${activity.id}`)
        } 
        catch (error) { console.log(error.response); toast.error('Problem submitting data');} 
        finally { runInAction('create activity finally', () => {this.submitting = false;}); }
    };

    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity = activity;
            });
            history.push(`/activities/${activity.id}`)
        }
        catch (error) { console.log(error.response); toast.error('Problem submitting data');} 
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
            return toJS(activity); //? not observable
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    setActivityProps(activity, this.rootStore.userStore.user!); //current user
                    activity.date = new Date(activity.date);
                    this.activity = activity;
                    this.activityRegistry.set(activity.id, activity);
                    //this.loadingInitial = false;
                });
                return activity;
            }
            catch (error) { 
                //runInAction('get activity error', () => {
                    console.log(error.response);
                    toast.error('Problem submitting data');
                //});  
                //throw error; don't need after add history to router and agent
            } 
            finally { 
                runInAction('get activity finally', () => {
                    this.submitting = false;
                    this.loadingInitial = false;
                }); 
            }
        }
    };

    @action clearActivity = () => this.activity = null;

    getActivity = (id: string) => this.activityRegistry.get(id);

    @action openCreateForm = () => {
        this.activity = null;
    };

    @action openEditForm = (id: string) => {
        this.activity = this.activityRegistry.get(id);
    };

    @action selectActivity = (id: string) => {
        this.activity = this.activityRegistry.get(id);
    };

    @action cancelactivity = () => this.activity = null;
    //@action cancelFormOpen = () => this.editMode = false;

    //Посетить мероприятие
    @action attendActivity = async () => {
        //Создаем участника текущего мероприятия
        const attendee = craeteAttendee(this.rootStore.userStore.user!);
        this.loading = true;
        try {
            await agent.Activities.attend(this.activity!.id);
            //use runInAction because all what execute after await execute inside in different functions
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees.push(attendee); 
                    this.activity.isGoing = true; //собирается посетить текущий пользователь
                    this.activityRegistry.set(this.activity.id, this.activity);//обновить изменение по id
                }
            });
        } catch {
            toast.error('Problem signing up to activity');
        } finally { 
            runInAction(() => { this.loading = false; }); 
        }
    };
    //Отменить явку(посещение)
    @action cancelAttendance = async () => {
        this.loading = true;
        try {
            await agent.Activities.unattend(this.activity!.id);
            runInAction(() => {
                if (this.activity) {
                    this.activity.attendees = this.activity.attendees.filter(
                        a => a.username !== this.rootStore.userStore.user!.username
                    );
                    this.activity.isGoing = false; //не собирается посетить текущий пользователь
                    this.activityRegistry.set(this.activity.id, this.activity);//обновить изменение по id
                }
            });
        } catch {
            toast.error('Problem signing up to activity');
        } finally { 
            runInAction(() => { this.loading = false; }); 
        }
    };
}

//export default createContext(new ActivityStore());