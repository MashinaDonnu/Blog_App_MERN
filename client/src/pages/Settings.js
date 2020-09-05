import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useFetch} from "../hooks/useFetch";
import {useAuth} from "../hooks/useAuth";
import {Loader} from "../components/Loader";
import {AlertContext} from "../context/alert/alertContext";

export const Settings = props => {
    const id = props.match.params.id
    const {token} = useAuth()
    const [userData, setUserData] = useState({name: '', email: '', password: ''})
    const {request, loading} = useFetch()
    const {showAlert} = useContext(AlertContext)

    const changeUserData = event => {
        setUserData({...userData, [event.target.name]: event.target.value})
    }

    const getUserData = useCallback(async () => {
        try {
            const response = await request(`/user/${id}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUserData(response)
        } catch (e) {
            showAlert(e.message)
        }

    }, [request, token, id, showAlert])

    useEffect(() => {
        getUserData()
    }, [getUserData])

    const saveChange = async () => {
        const _id = props.match.params.id
        try {
            const response = await request(`/user`, 'POST', {...userData, _id}, {
                Authorization: `Bearer ${token}`
            })
            showAlert('success', response.message)
        } catch (e) {
            showAlert('danger', e.message)
        }
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            <h1 className="post-header">Change user data</h1>
            <div className="mt-5">
                <form onSubmit={event => event.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="name"
                            defaultValue={userData.name}
                            onChange={changeUserData}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            defaultValue={userData.email}
                            onChange={changeUserData}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            defaultValue={userData.password}
                            onChange={changeUserData}
                        />
                    </div>
                    <div>
                        <button className="btn btn-dark btn-block" onClick={saveChange}>Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
