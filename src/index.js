import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './Store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import axios from 'axios'
import { install } from '@material-ui/styles'

install()

axios.defaults.baseURL = 'http://localhost:8000';
// axios.defaults.baseURL = 'https://api.myragpblog.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
const RCRedux = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
}

ReactDOM.render(<RCRedux />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
