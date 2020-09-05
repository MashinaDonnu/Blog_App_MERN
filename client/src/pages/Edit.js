import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useFetch} from "../hooks/useFetch"
import {useAuth} from "../hooks/useAuth";
import {useHistory} from 'react-router-dom'
import {Loader} from "../components/Loader";
import {AlertContext} from "../context/alert/alertContext";

export const Edit = props => {
    const [postTitle, setPostTitle] = useState(null)
    const id = props.match.params.id
    const history = useHistory()
    const {token} = useAuth()
    const {request, loading} = useFetch()
    const [post, setPost] = useState({})
    const {showAlert} = useContext(AlertContext)

    const changePostData = event => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    const getPost = useCallback( async () => {
            try {
                if(token) {
                    const response = await request(`/post/edit/${id}`, 'GET', null, {Authorization: `Bearer ${token}`})
                    setPostTitle(response.title)
                    setPost(response)
                }
            } catch (e) {
                showAlert('danger', e.message)
                throw new Error(e)
            }
    }, [showAlert, token, request, id])

    const editPost = useCallback(async () => {
        if (!post.title || !post.description){
            return showAlert('warning', 'Fill in the fields (title, description)')
        }
        try {
            await request('/post/edit', 'POST', {post}, {Authorization: `Bearer ${token}`})
            history.push('/posts')
        } catch (e) {
            showAlert('danger', e.message)
            throw new Error(e)
        }
    }, [request, showAlert, token, post, history])

    useEffect(() => {
        getPost()
    }, [getPost])

    if (loading) {
        return <Loader/>
    }

    return (
            <div>
                <h1 className="post-header">Edit post "{postTitle}"</h1>
                <div className="mt-5">
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="title">Post title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                id="title"
                                defaultValue={post.title}
                                placeholder="title"
                                onChange={changePostData}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Post description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                id="description"
                                rows="3"
                                defaultValue={post.description}
                                onChange={changePostData}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Img url</label>
                            <input
                                type="text"
                                name="img"
                                className="form-control"
                                id="img"
                                placeholder="url"
                                aria-describedby="urlHelp"
                                defaultValue={post.img}
                                onChange={changePostData}
                            />
                            <small id="urlHelp" className="form-text text-muted">Set img url.</small>
                        </div>
                        <div>
                            <button className="btn btn-dark btn-block" onClick={editPost}>Edit post</button>
                        </div>
                    </form>
                </div>
            </div>
        )
}
