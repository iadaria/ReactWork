export const collectIdsAndDocs = doc => { 
    return {  id: doc.id, /* id: doc.data().id, */ ...doc.data() };
};
