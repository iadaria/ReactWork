import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

export default function useFirestoreDoc({ query, data, deps, shouldExecute = true }) {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useFirestoreDoc -> should Execute', shouldExecute);
        if (!shouldExecute) return;
        dispatch(asyncActionStart());
        const unsubscibe = query().onSnapshot(
            snapshot => {
                //console.log(snapshot);
                if (!snapshot.exists) {
                    dispatch(asyncActionError({code: 'not-found', message: "Could not find document"}))
                    return;
                }
                data(dataFromSnapshot(snapshot));
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError(error))
        )
        return () => {
            unsubscibe();
        }
    // eslint-disable-next-line
    }, deps);
}