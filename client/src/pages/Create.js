import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useAuth} from "../hooks/useAuth";
import {useFetch} from "../hooks/useFetch";
import {AlertContext} from "../context/alert/alertContext";

export const Create = () => {
    const {token} = useAuth()
    const {showAlert} = useContext(AlertContext)
    const history = useHistory()
    const [data, setData] = useState({title: '', description: ''})
    const {request} = useFetch()
    const [disabled, setDisabled] = useState(true)
    const getDataHandler = event => {
        if (data.title && data.description) {
            setDisabled(false)
        }
        setData({...data, [event.target.name]: event.target.value})
    }

    const addHandler = async () => {
          try {
            await request('/post/add', 'POST', data, {
                Authorization: `Bearer ${token}`
            })
            history.push('/posts')
        } catch (e) {
            showAlert('danger', e.message)
            throw new Error(e)
        }
    }

    return (
        <div>
            <h1 className="post-header">Create new post</h1>
            <div className="mt-5">
                <form onSubmit={event => event.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Post title</label>
                        <input onChange={getDataHandler} value={data.title} type="text" name="title" className="form-control" id="title"  placeholder="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Post description</label>
                        <textarea onChange={getDataHandler} value={data.description} className="form-control" name="description" id="description" rows="3"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Img url</label>
                        <input onChange={getDataHandler} type="text" name="img" className="form-control" id="img"  placeholder="url" aria-describedby="urlHelp" />
                        <small id="urlHelp" className="form-text text-muted">Set img url.</small>
                    </div>
                    <div>
                        <button onClick={addHandler} disabled={disabled} className="btn btn-dark btn-block">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
