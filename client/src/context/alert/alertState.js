import React, {useReducer} from 'react'
import {alertReducer} from "./alertReducer";
import * as actions from "../actionCreators";
import {AlertContext} from "./alertContext";

export const AlertState = ({children}) => {
    const initialState = {
        visible: false,
        message: '',
        type: ''
    }
    const [state, dispatch] = useReducer(alertReducer, initialState)

    const showAlert = (text, type) => {
        dispatch(actions.showAlert(text,type))
        const timer = setTimeout(() => {
            dispatch(actions.hideAlert())
            clearTimeout(timer)
        }, 5000)
    }

    const hideAlert = () => {
        dispatch(actions.hideAlert())
    }

    return (
        <AlertContext.Provider value={{alert: state, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    )
}