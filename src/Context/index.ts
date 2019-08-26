import React from "react";

export interface IContextAction {
	type: "LOGIN" | "LOGOUT";
}

export interface IContextState {
	loggedIn: boolean;
	loggedInOnce: boolean;
}

const state: IContextState = { loggedIn: false, loggedInOnce: false };
const dispatch = (action: IContextAction) => { /* No code */ };
const Context = React.createContext({ state, dispatch });

const name = "";
const image = "";
const ragpReferalId = "";
const whatsappNumber = "";
let username = "";
const BlogContext = React.createContext({
	image,
	name,
	ragpReferalId,
	username,
	whatsappNumber,
});

const network = 0;
const transactions = [] as string[][];
const wallet = 0;
const pv = 0;
username = "";
const cummulativePv = 0;

const DashboardContext = React.createContext({
	cummulativePv,
	network,
	pv,
	transactions,
	username,
	wallet,
});

export {
	BlogContext,
	Context,
	DashboardContext,
};
