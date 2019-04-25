export function setUsername(username) {
    localStorage.setItem('username', username)
}

export const username = localStorage.getItem('username')

export const baseUrl =  process.env.NODE_ENV === 'production' ? 'https://api.myragpblog.com' : 'http://localhost:8000'
    