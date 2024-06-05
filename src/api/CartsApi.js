import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

export const cartsEndPoint = "/carts"

export const getAuthToken = () => {
    return window.localStorage.getItem("auth-token")
}

export const addToCart = async (data) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.post(cartsEndPoint + "/add", {
        idUser: data.idUser,
        amount: data.amount,
        productsDto: data.products
    })
    return response.data
}


export const getCartsByIdUsers = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.get(cartsEndPoint + "/" + id)

    return response.data
}

export const updateCarts = async (data) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.put(cartsEndPoint + "/update/" + data.id, {
        id: data.id,
        idUser: data.idUser,
        amount: data.amount,
        productsDto: data.products
    })
    return await response.data
}

export const deleteCarts = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.delete(cartsEndPoint + "/delete/" + id)

    return response.data
}