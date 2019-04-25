import React, { Component } from 'react'
import { Route } from 'react-router-dom';

const Register = React.lazy(() => import('../Subpages/Register/Register'))
const Base = React.lazy(() => import('./Base'))
const Home = React.lazy(() => import('../Home/Home'))
const Post = React.lazy(() => import('../Subpages/Post/Post'))

class BaseRoute extends Component {
    render() {
        localStorage.setItem('username', this.props.match.params.username)
        if (this.props.match.params.username === 'home') {
            return <Home />
        }
        return (
            <div className="base">

                <Route
                    path={`${this.props.match.url}/register/:step`}
                    component={Register}
                />
                <Route
                    path={`${this.props.match.url}/post`}
                    component={Post}
                />
                <Route
                    exact
                    path={`${this.props.match.url}`}
                    render={() => <Base {...this.props} />}
                />
            </div>
        )
    }
}


export default BaseRoute
