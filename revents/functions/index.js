const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const db = admin.firestore();

exports.addFollowing = functions.firestore
    .document('following/{userUid}/userFollowing/{profileId}')
    .onCreate(async (snapshot, context) => {
        const following = snapshot.data();
        functions.logger.log("following", following);
        const { userUid, profileId } = context.params;
        try {
            const userDoc = await db.collection('users').doc(userUid).get();
            const batch = db.batch();
            functions.logger.log("userDoc -> data()", userDoc.data());
            batch.set(
                db.collection('following').doc(profileId).collection('userFollowers').doc(userUid),
                {
                    displayName: userDoc.data().displayName,
                    photoURL: userDoc.data().photoURL,
                    uid: userDoc.id
                }
            );
            batch.update(db.collection('users').doc(profileId), {
                followerCount: admin.firestore.FieldValue.increment(1)
                }
            );
            return await batch.commit();
        } catch (error) {
            return console.log(error);
        }
    });

exports.removeFollowing = functions.firestore
    .document('following/{userUid}/userFollowing/{profileId}')
    .onDelete(async (snapshot, context) => {
        const batch = db.batch();
        const { userUid, profileId } = context.params;
        batch.delete(db.collection('following').doc(profileId).collection('userFollowers').doc(userUid));
        batch.update(db.collection('users').doc(profileId), {
            followerCount: admin.firestore.FieldValue.increment(-1)
        });

        try {
            return await batch.commit();
        } catch (error) {   
            return console.log(error);
        }
    });

exports.eventUpdated = functions.firestore
    .document('events/{eventId}')
    .onUpdate(async (snapshot, context) => {  

        const before = snapshot.before.data();
        const after = snapshot.after.data();
        if (before.attendees.length < after.attendees.length) {
            const { eventId } = context.params;
            let attendeeJoined = after.attendees.filter(item1 => !before.attendees.some(item2 => item2.id === item1.id))[0];
            functions.logger.log("attendeeJoined", attendeeJoined);
            try {
                const followerDocs 
                    = await db.collection('following').doc(attendeeJoined.id).collection('userFollowers').get();
                functions.logger.log("attendeeJoined", attendeeJoined);
                followerDocs.forEach(doc => {
                    admin.database().ref(`/posts/${doc.id}`).push(newPost(attendeeJoined, 'joined-event', eventId, before));
                });
            } catch (error) { return console.log(error); }
        }

        if (before.attendees.length > after.attendees.length) {
            const { eventId } = context.params;
            let attendeeLeft= before.attendees.filter(item1 => !after.attendees.some(item2 => item2.id === item1.id))[0];
            functions.logger.log({ attendeeLeft });
            try {
                const followerDocs 
                    = await db.collection('following').doc(attendeeLeft.id).collection('userFollowers').get();
                followerDocs.forEach(doc => {
                    admin.database().ref(`/posts/${doc.id}`).push(newPost(attendeeLeft, 'left-event', eventId, before));
                });
            } catch (error) { return console.log(error); }
        }

        return console.log('finished');
    });

function newPost(user, code, eventId, event) {
    return {
        photoURL: user.photoURL,
        date: admin.database.ServerValue.TIMESTAMP,
        code,
        displayName: user.displayName,
        eventId,
        userUid: user.id,
        title: event.title
    };
}