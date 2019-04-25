import { LOGIN_ACTION } from '../Actions/Actions';

const initialState = false;


export const isLoggedIn = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTION:
            return true;
        default:
            return state;
    }
}