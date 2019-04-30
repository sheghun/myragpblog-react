import React from "react";

export interface contextAction {
    type: 'LOGIN' | 'LOGOUT';
}

export interface contextState {
    loggedIn: boolean;
    loggedInOnce: boolean;
}

const state: contextState = { loggedIn: false, loggedInOnce: false };
const dispatch = (action: contextAction) => {};

// For checking if the user is logged in
const Context = React.createContext({state, dispatch});
export default Context