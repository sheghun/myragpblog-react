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

const Blog = loadable(() => import("./Layouts/Blog/Blog.jsx"), {
	fallback: <Spinner />,
});
const Signin = loadable(() => import("./Views/Signin/Signin"), {
	fallback: <Spinner />,
});
const Dashboard = loadable(() => import("./Layouts/Dashboard/Dashboard"), {
	fallback: <Spinner />,
});
const Register = loadable(() => import("./Layouts/Register/Register"), {
	fallback: <Spinner />,
});
const Payment = loadable(() => import("./Layouts/Payment/Payment"), {
	fallback: <Spinner />,
});
const Web = loadable(() => import("./Views/Web/Web"), {
	fallback: <Spinner />,
});

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
    { exact: true, path: "/", component: Web },
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
    route.exact ?
    <Route exact={true} key={index} path={route.path} component={route.component} />
    :
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
                    </Switch>
                </Context.Provider>
            </MuiThemeProvider>
        </Suspense>
    );
};

export default withRouter(App);
