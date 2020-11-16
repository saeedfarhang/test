import ReactDOM from 'react-dom'
import React, { Fragment, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import App from './components/App'
import Header from './components/Header'
import Footer from './components/Footer'
import PostDetail from './components/blog/PostDetail'
import SignUp from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'


export default function Routing() {
    return (
        <Fragment>
            <Router>
            <Header />
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path={`/blog/:id`} component={PostDetail} />
            </Switch>
            <Footer />
            </Router>
        </Fragment>
    )
}


ReactDOM.render(<Routing />, document.getElementById('root'))