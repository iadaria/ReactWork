import { useGestureHandlerRef } from "@react-navigation/stack";
import { IAction } from "../../models/common";

/****************** CONST ***********************/
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

/**************** Actions ***********************/
export function openModal(payload) {
    return {
        type: OPEN_MODAL,
        payload
    };
}

export function closeModal(payload) {
    return {
        type: CLOSE_MODAL
    };
}

/***************** Reducer ********************/
export interface IModalState {
    modalType?: string | null;
    modalProps?: string | null;
}

const initialState: IModalState = {};

/* const initialState: IModalState = {
    modalType: null,
    modalProps: null,
}; */

export default function modalReducer(
    state: IModalState = initialState, 
    { type, payload } : IAction = { type: "", payload: undefined}
): IModalState {
    switch(type) {
        case OPEN_MODAL:
            const {modalType, modalProps} = payload;
            return {modalType, modalProps};

        case CLOSE_MODAL:
            return {}

        default: return state;
    }
}