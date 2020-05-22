export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    isGoing: boolean;
    isHost: boolean;
    attendees: IAttendee[]; // Список участников мероприятия
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = new Date();
        }

        Object.assign(this, init);
    }
}

//Участник встречи
export interface IAttendee {
    username: string;
    displayName: string;
    image: string;
    isHost: boolean;
}