import {HIDE_ALERT, HIDE_MODAL, SHOW_ALERT, SHOW_MODAL} from "./actionTypes"

export const showModal = (type, text, func) => {
    return {
        type: SHOW_MODAL,
        payload: {type, text, func}
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const showAlert = (type, text) => {
    return {
        type: SHOW_ALERT,
        payload: {type, text}
    }
}

export const hideAlert = () => {
    return {
        type: HIDE_ALERT
    }
}