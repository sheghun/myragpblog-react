class Storage {

    static getUsername() {
        return localStorage.getItem('username')
    }

    static setUsername(username) {
        return localStorage.setItem('username', username)
    }

    static setUserToken(userToken) {
        return localStorage.setItem('userToken', userToken)
    }

    static getUserToken() {
        return localStorage.getItem('userToken')
    }

    render() {
        return null;
    }

}

export default Storage;