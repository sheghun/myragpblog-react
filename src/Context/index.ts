import React from "react";

export interface contextAction {
	type: "LOGIN" | "LOGOUT";
}

export interface contextState {
	loggedIn: boolean;
	loggedInOnce: boolean;
}

const state: contextState = { loggedIn: false, loggedInOnce: false };
const dispatch = (action: contextAction) => { /* No code */ };
const Context = React.createContext({ state, dispatch });

const name = "";
const image = "";
const referalId = "";
const whatsappNumber = "";
const BlogContext = React.createContext({
	name,
	image,
	referalId,
	whatsappNumber,
});

export {
	BlogContext,
	Context,
};