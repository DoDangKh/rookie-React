import axios from "axios";


const Api = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})

export const ordersEndPoint = "/orders"

export const getAuthToken = () => {
    return window.localStorage.getItem("auth-token")
}

export const addOrders = async (data) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.post(ordersEndPoint + "/add", {
        idUser: data.idUser,
        status: data.status,
        orders_ProductsDtos: data.orders_ProductsDtos
    })
    return response.data
}

export const getOrdersByUserId = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.get(ordersEndPoint + "/users/" + id)

    return response.data
}