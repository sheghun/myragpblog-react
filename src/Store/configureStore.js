import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';

import reducers from './Reducers';

const composers = () => {
	return compose(
		applyMiddleware(
			thunkMiddleware
		)
	)
}

const configureStore = () => {
	return createStore(
		reducers,
		composers()
	);
}

export default configureStore();