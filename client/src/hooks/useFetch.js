import {useState, useCallback, useContext} from "react"
import {useAuth} from "./useAuth";
import {AlertContext} from "../context/alert/alertContext";

export const useFetch = () => {
    const {showAlert} = useContext(AlertContext)
    const {logout} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method, body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-type'] = 'application/json'
            }
            const response = await fetch(url,{method, body, headers})
            const data = await response.json()
            switch (response.status) {
                case 401:
                    logout()
                    window.location.reload()
                    break
                case 400:
                    showAlert('danger', data.message)
                    break
                case 500:
                    logout()
                break
                default: break
            }
            if (!response.ok) {
                setLoading(false)
                throw new Error(data.message || "Something went wrong (response)...")
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            return e
        }

    },[logout, showAlert])

    const clearError = () => setError(null)

    return {request, loading, error, clearError}
}