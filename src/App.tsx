import React, { Component, Suspense, useEffect } from 'react';

// React router dependencies
import { Route, withRouter, Switch, Redirect, RouteComponentProps } from 'react-router-dom';

// For lazy loading
import loadable from '@loadable/component';

// React redux dependencies
import { connect } from 'react-redux'

// Redux actions
import { loginUserAction } from './Store/Actions/Actions'

// Material-ui Components
import { MuiThemeProvider } from '@material-ui/core';

// Theme
import theme from './theme.js'


import './App.css'

// Personal Components
import Spinner from './Components/Spinner/Spinner';

const Blog = React.lazy(() => import('./Layouts/Blog/Blog.jsx'))
const Signin = loadable(() => import('./Views/Signin/Signin'))
const Dashboard = loadable(() => import('./Layouts/Dashboard/Dashboard'))
const Register = loadable(() => import('./Layouts/Register/Register'))
const Payment = loadable(() => import('./Layouts/Payment/Payment'))
const Web = loadable(() => import('./Layouts/Web/Web'))

interface props extends RouteComponentProps {
    loginUserAction: CallableFunction
}

const routes = [
    { path: '/login', component: Signin },
    { path: '/web', component: Web },
    { path: '/user', component: Dashboard },
    { path: '/payment', component: Payment },
    { path: '/register/:step', component: Register },
    { path: "/:username", component: Blog }
]

const App = (props: props) => {

    useEffect(() => {
        props.loginUserAction()
    });

    return (
        <Suspense fallback={<Spinner />}>
            <MuiThemeProvider theme={theme}>
                <Switch>
                    {routes.map((route, index) =>
                        <Route key={index} path={route.path} component={route.component} />
                    )}
                    {/* Redirect to the home page */}
                    <Redirect exact from='/' to='/web/home' />
                    {/* Redirect for register */}
                    <Redirect exact from="/register" to="register/1" />
                </Switch>
            </MuiThemeProvider>
        </Suspense>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    loginUserAction: () => dispatch(loginUserAction())
})


export default withRouter(connect(null, mapDispatchToProps)(App))