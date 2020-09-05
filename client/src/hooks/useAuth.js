import {useCallback, useEffect, useState} from "react";

const storageName = 'auth'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem(storageName))
        if(user && user.token) {
            login(user.token, user.userId)
            setToken(user.token)
            setUserId(user.userId)
        }
        setReady(true)
    }, [login])

    return {token, userId, login, logout, ready}

}