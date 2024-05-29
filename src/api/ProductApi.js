import axios from "axios"


const Api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

export const ProductEndPoint = '/product'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth-token")
}

export const add = async (data) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.post(ProductEndPoint + "/add", {
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.categories,
        images: data.images,
        feature: data.features,
        amount: data.amount
    })
    return response.data
}

export const getAllProduct = async () => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.get(ProductEndPoint + "/all")

    return response.data
}

export const getProductById = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.get(ProductEndPoint + "/" + id)

    return response.data
}


export const deleteProduct = async (idList) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    return await Api.delete(ProductEndPoint + "/delete/many", { data: idList })
}

export const update = async (data, id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await Api.put(ProductEndPoint + "/update/" + id, {
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.categories,
        images: data.images,
        feature: data.features,
        amount: data.amount
    })
    return response.data
}