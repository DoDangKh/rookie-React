import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/api/v1'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth-token")
}

export const setAuthToken = (token) => {
    window.localStorage.setItem("auth-token", token)
}

export const request = (method, url, data) => {
    let headers = {}
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { "Authorization": 'Bearer:' + getAuthToken() }
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data,
    });
}