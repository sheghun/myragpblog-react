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
const username = "";
const BlogContext = React.createContext({
	image,
	username,
	name,
	ragpReferalId,
	whatsappNumber,
});

const network = 0;
const transactions = [] as string[][];
const wallet = 0;
const pv = 0;
const cummulativePv = 0;

const DashboardContext = React.createContext({
	cummulativePv,
	network,
	pv,
	transactions,
	wallet,
});

export {
	BlogContext,
	Context,
	DashboardContext,
};
