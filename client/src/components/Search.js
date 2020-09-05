import React from 'react';

export const Search = ({seachHendler, searchStr, searchPosts}) => {
    return (
        <div className="input-group input-group-sm mb-3 w-75">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">Search posts</span>
            </div>
            <input type="text" className="form-control" aria-label="Sizing example input"
                   value={searchStr}
                   onChange={seachHendler}
                   aria-describedby="inputGroup-sizing-sm" placeholder="Enter post title" />
        </div>
    )
}
