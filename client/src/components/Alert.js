import React, {useContext} from 'react'
import {AlertContext} from "../context/alert/alertContext"

export const Alert = () => {
    const {alert, hideAlert} = useContext(AlertContext)
    if (!alert.visible) {
        return  null
    }
    return (
            <div className={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`} style={{marginBottom:0}} role="alert">
                <strong>Message:</strong> {alert.text || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}
                <button onClick={hideAlert} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
    )
}
