import { REGISTER_ERROR, REGISTER_SUCCESS, CLEAR_REGISTER_ERROR } from '../Actions/Actions'
const initialState = {}

const register = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_ERROR:
            return {
                ...state,
                errors: action.errors
            }
        // falls through
        case REGISTER_SUCCESS:
        if (action.success.hasOwnProperty('success')) {
            console.log(action.success)
                return {
                    ...state,
                    success: action.success
                }

            } else {
                return {
                    ...state,
                    success: action.success
                }
            }

        case CLEAR_REGISTER_ERROR:
            return {}

        default:
            return state
    }
}

export default register