import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Loader} from "../components/Loader";
import {useFetch} from "../hooks/useFetch";
import {AuthContext} from "../context/auth/authContext";
import {PostItem} from "../components/PostItem";
import {NoPosts} from "../components/NoPosts";
import {ModalContext} from "../context/modal/modalContext";
import {AlertContext} from "../context/alert/alertContext";
import {Search} from "../components/Search";


export const Home = () => {
    const {showAlert} = useContext(AlertContext)
    const [userName, setUserName] = useState(null)
    const [searchStr, setSearchStr] = useState('')
    const {showModal} = useContext(ModalContext)
    const [posts, setPosts] = useState([])
    const [searchPosts, setSearchPosts] = useState(posts)
    const {token} = useContext(AuthContext)
    const {request, loading} = useFetch()
    const fetchedPosts = useCallback(async () => {
        try {
            const response = await request('/post', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPosts(response.posts)
            setSearchPosts(response.posts)
            setUserName(response.user)
        } catch (e) {
            showAlert('danger', e.message)
            throw new Error(e)
        }
    }, [token, request, showAlert])

    useEffect(() => {
        fetchedPosts()
    }, [fetchedPosts])

    const searchPostsHandler = event => {
        const search = event.target.value.trim()
        setSearchStr(search)
        const filterPosts = posts.filter(post => {
              return post.title.toLowerCase().includes(search.toLowerCase())
        })
       setSearchPosts([...filterPosts])
    }

    const deletePost = id => {
        const delPost = posts.find(post => post._id === id)
        const delFunc = async () => {
            setPosts(posts.filter( post => post._id !== id))
            try {
                const response = await request(`/post/${id}`, 'DELETE', null, {
                    Authorization: `Bearer ${token}`
                })
                showAlert('warning', `Post "${response}" is deleted.`)
            } catch (e) {
                showAlert('danger', e.message)
                throw new Error(e)
            }

        }
        showModal('confirm', `Delete post "${delPost.title}"?`, delFunc)
    }

    if(loading) {
        return <Loader/>
    }

    const renderPosts = () => {
        if (!posts || !posts.length) {
            return <NoPosts/>
        }
        if (!searchStr) {
            return  posts.map((post, index) => {
                return <PostItem key={index} data = {post} deletePost={deletePost}  />
            })
        }
        return  searchPosts.map((post, index) => {
            return <PostItem key={index} data = {post} deletePost={deletePost}  />
        })
    }



    return (
        <div className="posts-wrapp">
            <h1 className="post-header">{`Hello, ${userName}!`}</h1>
            <Search seachHendler={searchPostsHandler} searchStr={searchStr} />
            {renderPosts()}
        </div>
    )
}
