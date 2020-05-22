import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";

export const combineDateAndTime = (date: Date, time: Date) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;

    return new Date(dateString + ' ' + timeString);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
    //Initialize data which don't recieved with activity from api
    //isGoing - собирается пойти на мероприятие текущий пользователь
    activity.isGoing = activity.attendees.some( //участники данного мероприятия
        attendee => attendee.username === user.username //входит ли текущий пользователь
    );
    //isHost - автор мероприятия текущий пользователь
    activity.isHost = activity.attendees.some(
        attendee => attendee.username === user.username && attendee.isHost
    );
    return activity;
}

export const craeteAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    };
}