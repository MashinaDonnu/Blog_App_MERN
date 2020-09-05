import React from 'react';

export  const NoPosts = props => {
    return (
        <div className="jumbotron jumbotron-fluid mt-5">
            <div className="container">
                <h1 className="display-4">You have no posts :(</h1>
                <p className="lead">In the header of the site in the menu, go to the page <strong>"Create"</strong> to create a new post</p>
            </div>
        </div>
    )
}
