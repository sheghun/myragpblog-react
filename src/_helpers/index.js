export function setUsername(username) {
    localStorage.setItem('username', username)
}

export const username = localStorage.getItem('username')

// export const baseUrl = 'https://api.myragpblog.com'
export const baseUrl = 'http://localhost:8000/'
