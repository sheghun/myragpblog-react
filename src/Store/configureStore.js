import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './Reducers';

const composers = () => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(
            applyMiddleware(
                thunkMiddleware,
            ),
        )
    } else {
        return compose(
            applyMiddleware(
                thunkMiddleware
            )
        )
    }
}

const configureStore = () => {
    return createStore(
        reducers,
        composers()
    );
}

export default configureStore();