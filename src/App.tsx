import React, { Component, Suspense, useEffect, useReducer } from "react";

// React router dependencies
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";

// For lazy loading
import loadable from "@loadable/component";

// Global Context
import Context from "./Context";

// Material-ui Components
import { MuiThemeProvider } from "@material-ui/core";

// Theme
import theme from "./theme.js";

import "./App.css";

// Personal Components
import Spinner from "./Components/Spinner/Spinner";

const Blog = React.lazy(() => import("./Layouts/Blog/Blog.jsx"));
const Signin = loadable(() => import("./Views/Signin/Signin"));
const Dashboard = loadable(() => import("./Layouts/Dashboard/Dashboard"));
const Register = loadable(() => import("./Layouts/Register/Register"));
const Payment = loadable(() => import("./Layouts/Payment/Payment"));
const Web = loadable(() => import("./Layouts/Web/Web"));

interface IProps extends RouteComponentProps {
    loginUserAction: CallableFunction;
}

export interface IAction {
    type: "LOGIN" | "LOGOUT";
}

export interface IState {
    loggedIn: boolean;
    loggedInOnce: boolean;
}

const routes = [
    { path: "/login", component: Signin },
    { path: "/web", component: Web },
    { path: "/user", component: Dashboard },
    { path: "/payment", component: Payment },
    { path: "/register", component: Register },
    { path: "/:username", component: Blog },
];

// Initial state
const initialState: IState = { loggedIn: false, loggedInOnce: false };

/**
 * Reducers
 * @params state action
 */
const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, loggedIn: true, loggedInOnce: true };
        case "LOGOUT":
            return { ...state, loggedIn: false, loggedInOnce: true };
        default:
            return state;
    }
};

const renderRoutes = (routes.map((route, index) =>
    <Route key={index} path={route.path} component={route.component} />,
));

const App = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Suspense fallback={<Spinner />}>
            <MuiThemeProvider theme={theme}>
                <Context.Provider value={{ state, dispatch }}>
                    <Switch>
                        {renderRoutes}
                        {/* Redirect to the home page */}
                        <Redirect exact={true} from="/" to="/web/home" />
                        {/* Redirect for register */}
                        <Redirect exact={true} from="/register" to="register/1" />
                    </Switch>
                </Context.Provider>
            </MuiThemeProvider>
        </Suspense>
    );
};

export default withRouter(App);
