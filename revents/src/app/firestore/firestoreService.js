import firebase from '../config/firebase';
import cuid from 'cuid';

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
    if (!snapshot.exists) return undefined;
    const data = snapshot.data();

    for (const prop in data) {
        if (data.hasOwnProperty(prop)) {
            if (data[prop] instanceof firebase.firestore.Timestamp) {
                data[prop] = data[prop].toDate()
            }
        }
    }

    return {
        ...data,
        id: snapshot.id
    }
}

export function listenEventsFromFirestore() {
    return db.collection('events').orderBy('date');
}

export function listenToEventFromFirestore(eventId) {
    return db.collection('events').doc(eventId); //collection('some').doc(id) and soon
}

export function addEventToFirestore(event) {
    return db.collection('events').add({
        ...event,
        hostedBy: "Dasha",
        hostPhotoURL: "https://randomuser.me/api/portraits/women/22.jpg",
        attendees: firebase.firestore.FieldValue.arrayUnion({
            id: cuid(),
            displayName: "Diana",
            photoURL: "https://randomuser.me/api/portraits/women/22.jpg"
        })
    });
}

export function updateEventInFirestore(event) {
    return db.collection('events').doc(event.id).update(event);
}

export function deleteEventInFirestore(eventId) {
    return db.collection('events').doc(eventId).delete();
}

export function cancelEventToggle(event) {
    return db.collection('events').doc(event.id).update({
        isCancelled: !event.isCancelled
    });
}

export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

/******************** Old records ********************/

/* export function getEventsFromFirestore(observer) {
    return db.collection('events').onSnapshot(observer);
} */