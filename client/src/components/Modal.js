import React, {useContext, useEffect, useState} from 'react';
import {ModalContext} from "../context/modal/modalContext";
import {Modal as BModal, Button, InputGroup, FormControl} from "react-bootstrap";
import {useFetch} from "../hooks/useFetch";
import {AlertContext} from "../context/alert/alertContext";
import {AuthContext} from "../context/auth/authContext";

export const Modal = () => {
    const auth = useContext(AuthContext)
    const [data, setData] = useState({})
    const {hideModal, modal} = useContext(ModalContext)
    const {showAlert} = useContext(AlertContext)
    const {request, error, clearError} = useFetch()

    useEffect(() => {
        if(error) {
            showAlert('danger', error)
            clearError()
        }
    }, [error, clearError, showAlert])

    if(!modal.visible) {
        return null
    }
    const getData = event => {
        setData({...data, [event.target.name]: event.target.value})
    }

    const createBtnName = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const authHandler = async (type) => {
        const response = await request(`/auth/${modal.type}`, 'POST', data)
        if(type === 'login') {
            auth.login(response.token, response.userId)
        }
        if(response.reg) {
            showAlert('success', response.message)
        }
    }

    if (modal.type === 'confirm') {
        return (
            <BModal show={modal.visible} onHide={() => hideModal()}>
                <BModal.Header closeButton>
                    <BModal.Title>{modal.text}</BModal.Title>
                </BModal.Header>
                <BModal.Footer>
                    <Button variant="secondary" onClick={hideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        modal.func()
                        hideModal()
                    }}>
                        {createBtnName(modal.type)}
                    </Button>
                </BModal.Footer>
            </BModal>
        )
    }

    return (
        <BModal show={modal.visible} onHide={() => hideModal()}>
            <BModal.Header closeButton>
                <BModal.Title>{modal.text}</BModal.Title>
            </BModal.Header>
            <BModal.Body>
                {modal.type === 'registration' &&
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            onChange={getData}
                            name="name"
                            placeholder="Name"
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                }
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={getData}
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={getData}
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </BModal.Body>
            <BModal.Footer>
                <Button variant="secondary" onClick={hideModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    authHandler(modal.type)
                    hideModal()
                }}>
                    {createBtnName(modal.type)}
                </Button>
            </BModal.Footer>
        </BModal>
    )
}
