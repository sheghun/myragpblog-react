import "./bootstrap";

// tslint:disable-next-line: ordered-imports
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { baseUrl } from "./_helpers";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./Store/configureStore";

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
const RCRedux = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				{
					// @ts-ignore
					<App />
				}
			</Provider>
		</BrowserRouter>
	);
};

ReactDOM.render(<RCRedux />, document.getElementById("root"));

serviceWorker.unregister();
