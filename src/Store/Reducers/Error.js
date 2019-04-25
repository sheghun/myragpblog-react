import { USER_ERROR } from "../Actions/Actions";

export default (state = null, action) => {
    switch (action.type) {
        case USER_ERROR:
            state = {message: action.message}
            return state;
        default:
            return state;
    }
}