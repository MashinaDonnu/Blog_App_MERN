import React, {useReducer} from 'react'
import {ModalContext} from './modalContext'
import {modalReducer} from "./modalReducer";
import * as actions from "../actionCreators";

const noop = () => {}

export const ModalState = ({children}) => {
    const initialState = {visible: false}
    const [state, dispatch] = useReducer(modalReducer, initialState)
    const showModal = (type = 'confirm', text = 'Lorem ipsum', func = noop) => {
        return dispatch(actions.showModal(type, text, func))
    }

    const hideModal = () => {
        return dispatch(actions.hideModal())
    }
    return (
        <ModalContext.Provider value={{
            showModal, hideModal, modal: state
        }}>
            {children}
        </ModalContext.Provider>
    )
}