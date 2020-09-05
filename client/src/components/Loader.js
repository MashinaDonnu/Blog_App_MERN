import React from 'react';

export const Loader = props => {

    return (
        <div className="loader">
            <div
                className="spinner-grow text-dark"
                style={{width: "5rem", height: "5rem"}}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
