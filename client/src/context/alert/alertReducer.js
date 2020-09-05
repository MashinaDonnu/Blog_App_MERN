import {HIDE_ALERT, SHOW_ALERT} from "../actionTypes";

export const alertReducer = (state, {type, payload}) => {
    switch (type) {
        case SHOW_ALERT:
            return {
                visible: true,
                ...payload
            }
        case HIDE_ALERT: return {...state, visible: false}
        default: return state
    }
}