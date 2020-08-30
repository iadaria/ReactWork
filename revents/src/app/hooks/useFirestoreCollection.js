import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

export default function useFirestoreCollection({ query, data, deps }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscibe = query().onSnapshot(
            snapshot => {
                const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
                data(docs);
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        );
        return () => {
            unsubscibe();
        }
    // eslint-disable-next-line
    }, deps);
}