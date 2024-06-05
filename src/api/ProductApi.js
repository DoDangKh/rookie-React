import axios from "axios"


const Api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

const responseInterceptor = Api.interceptors.response.use(response => {
    return response
}, (error) => {
    console.log("interceptors:", error)

    const status = error.response?.status || 500
    console.log("status:", status)
    if (status === 401) {
        console.log("check")
        // redirect("/login")
        window.location = window.location.protocol + "//" + window.location.host + "/login"
        window.localStorage.removeItem("auth-token")
        window.localStorage.removeItem("user")
        window.localStorage.removeItem("email")
    }
    else {
        return Promise.reject(error)
    }

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


export const deleteProduct = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    return await Api.delete(ProductEndPoint + "/delete/" + id)
}

export const activeProduct = async (id) => {
    Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    return await Api.put(ProductEndPoint + "/active/" + id)
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

export const filter = async (data) => {

    if (getAuthToken() !== null)
        Api.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    console.log(data.minprice)
    if (data.feature != null) {
        data.feature = data.feature.toUpperCase()
    }

    const response = await Api.get(ProductEndPoint + "/filter", {



        params: {
            name: data.name,
            page: 0,
            size: data.size,
            categoryids: data.categoryids,
            minprice: data.minprice,
            maxprice: data.maxprice,
            order: data.order,
            isActive: data.isActive,
            feature: data.feature
        },
    })
    return response.data
}