import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Storage from '../../Services/Storage'

const Login = React.lazy(() => import('../Subpages/Login/Login'))
const Dashboard = React.lazy(() => import('../Subpages/Dashboard/Dashboard'))

class Home extends Component {
    render() {
        const username = Storage.getUsername();
        return (
            <div>
                <Route
                    path={`/${username}/login`}
                    component={Login}
                />
                <Route
                    path={`/${username}/dashboard`}
                    component={Dashboard}
                />
            </div>
        )
    }
}

export default withRouter(Home)
