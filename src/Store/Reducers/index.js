import { combineReducers } from 'redux';
import {isLoggedIn} from './Login';
import loading from './Loading';
import error from './Error';
import MemberDetails from './MemberDetails';
import register from './Register'
import userDetails from './UserDetails';
import posts from './posts';

const reducers = combineReducers({
    isLoggedIn,
    memberDetails: MemberDetails,
    userDetails: userDetails,
    loading,
    error,
    posts,
    register: register

})

export default reducers;