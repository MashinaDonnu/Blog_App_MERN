import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {Auth} from "./pages/Auth";
import {Home} from "./pages/Home";
import {Create} from "./pages/Create";
import {Edit} from "./pages/Edit";
import {Settings} from "./pages/Settings";

export const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/posts" component={Home}  />
                <Route path="/create" component={Create}  />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/user/:id" component={Settings} />
                <Redirect to="/posts" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" component={Auth} exact />
            <Redirect to="/"/>
        </Switch>
    )
}