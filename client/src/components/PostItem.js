import React from 'react';
import {Link} from 'react-router-dom'

export const PostItem = ({data, deletePost}) => {
    return (
        <div className="card post" style={{width: '75%'}}>
            <img src={data.img} className="card-img-top" alt="post-img"/>
                <div className="card-body">
                    <h5 className="card-title">{data.title}</h5>
                    <p className="card-text">{data.description}</p>
                </div>
            <div className="p-3 post-btns">
                <div className="row justify-content-end pr-3">
                    <Link to={`edit/${data._id}`}><button className="btn btn-primary btn-lg">Edit</button></Link>
                    <button
                        className="btn btn-danger btn-lg"
                        onClick={(event => deletePost(event.target.dataset.id))}
                        data-id={data._id}
                    >Delete</button>
                </div>
            </div>
        </div>
    )
}
