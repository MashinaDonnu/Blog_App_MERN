import {HIDE_MODAL, SHOW_MODAL} from "../actionTypes";

export function modalReducer(state, {type, payload}) {
    switch (type) {
        case SHOW_MODAL:
           return {...state, visible: true, ...payload}
        case HIDE_MODAL:
            return {...state, visible: false}
        default: return state
    }
}