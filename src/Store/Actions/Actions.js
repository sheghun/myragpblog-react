import Axios from "axios";

export const LOGIN_ACTION = 'LOGIN_ACTION'
export const FETCHUSER_ACTION = 'FETCH_USER'
export const LOADING_ACTION = 'LOADING_ACTION'
export const LOADED_ACTION = 'LOADED_ACTION'
export const USER_ERROR = 'USER_ERROR'
export const MEMBER_FETCHED = 'MEMBER_FETCHED'
export const USER_FETCHED = 'USER_FETCHED'
export const REGISTER_ERROR = 'REGISTER_ERROR'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const CLEAR_REGISTER_ERROR = 'CLEAR_REGISTER_ERROR'
export const FETCHED_POSTS = 'FETCHED_POSTS'

export const loginAction = () => {
    return {
        type: LOGIN_ACTION
    }
}

export const loadingAction = () => {
    return {
        type: LOADING_ACTION
    }
}

export const loadedAction = () => {
    return {
        type: LOADED_ACTION
    }
}

export const errorAction = (message) => {
    return {
        type: USER_ERROR,
        message
    }
}

export const fetchedPosts = (posts) => {
    return {
        type: FETCHED_POSTS,
        posts
    }
}

export const memberFetched = (details) => {
    return {
        type: MEMBER_FETCHED,
        details
    }
}

export const userFetched = (details) => {
    return {
        type: USER_FETCHED,
        details
    }
}

export const registerError = (errors) => {
    return {
        type: REGISTER_ERROR,
        errors
    }
}

export const registerSuccess = (success) => {
    return {
        type: REGISTER_SUCCESS,
        success
    }
}

export const clearRegisterSuccessOrError = () => {
    return {
        type: CLEAR_REGISTER_ERROR
    }
}

export const fetchUserAction = (username) => {
    return dispatch => {
        dispatch(loadingAction())
        return Axios.post('/member', {
            "username": username
        },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then(response => {
                let resp = JSON.parse(JSON.stringify(response.data))
                console.log(resp)
                return resp
            })
            .then(response => {
                dispatch(loadedAction())
                dispatch(memberFetched(response))
            })
            .catch(err => {
                console.log(err)
                dispatch(errorAction('User Not Found'))
                dispatch(loadedAction())
            })
    }
}

export const registerAction = (inputs, step) => {
    return dispatch => {
        dispatch(clearRegisterSuccessOrError())
        dispatch(loadingAction())
        return Axios.post('/register', {
            ...inputs,
            step
        },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }).then(response => {
                dispatch(loadedAction())
                let resp = response.data
                if (resp.hasOwnProperty('errors')) {
                    dispatch(registerError(resp.errors))
                } else if (resp.hasOwnProperty('success')) {
                    dispatch(registerSuccess(resp.success))
                }
                console.log(resp)
            }).catch(err => {
                dispatch(loadedAction())
                dispatch(errorAction('Invalid Network'))
                console.log(err);
            })
    }
}

export const loginUserAction = (inputs = null) => {
    return dispatch => {
        dispatch(loadingAction())
        if (inputs) {
            return Axios.post('/login', {
                ...inputs
            },
                {
                    headers: {
                        'Content-type': 'applications/json'
                    },
                    withCredentials: true
                }
            ).then(response => {
                dispatch(clearRegisterSuccessOrError())
                dispatch(loadedAction())
                const resp = response.data;
                if (resp.hasOwnProperty('errors')) {
                    dispatch(registerError(resp.errors))
                } else if (resp.hasOwnProperty('success')) {
                    dispatch(registerSuccess(resp))
                    dispatch(loginAction())
                    dispatch(userFetched(resp.success))
                }
            })
        }
        dispatch(loadingAction())
        return Axios.get('/login', {
            headers: { 'Content-type': 'applications/json' },
            withCredentials: true
        }).then(response => {
            const resp = response.data
            console.log(resp)
            if (resp.hasOwnProperty('success')) {
                dispatch(loginAction())
                dispatch(userFetched(resp.success))
                dispatch(loadedAction())
            }
            if (resp.hasOwnProperty('errors')) {
                dispatch(loadedAction())
            }
            }).catch(error => {
                dispatch(loadedAction())
                dispatch(errorAction('Network Error'))
            })
    }
}

export const fetchPostsAction = (username) => {
    return dispatch => {
        dispatch(loadingAction())
        return Axios.get(`/posts?username=${username}`, {
            headers: { 'Content-type': 'applications/json' },
            withCredentials: true
        }).then(response => {
            const res = response.data
            dispatch(loadedAction())
            dispatch(fetchedPosts(res))
            console.log(res)
        })

    }
}