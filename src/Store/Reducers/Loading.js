import { LOADING_ACTION, LOADED_ACTION } from "../Actions/Actions";


const loading = (state = false, action) => {
    switch (action.type) {
        case LOADING_ACTION:
            return true;
        case LOADED_ACTION:
            return false;
        default:
            return state;
    }
}

export default loading;