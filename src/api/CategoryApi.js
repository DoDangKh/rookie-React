import axios from "axios"


const CategoryApi = axios.create({
    baseURL: "http://localhost:8080/api/v1",
})

export const CategoryEndPoint = '/category'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth-token")
}

export const getCategory = async (id) => {
    CategoryApi.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()
    // console.log(id)
    await CategoryApi.get(CategoryEndPoint + "/" + id).then(res => { return res.data })

}

export const getAllCategory = async () => {


    CategoryApi.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken()

    const response = await CategoryApi.get(CategoryEndPoint + "/all")
    console.log(response.headers)
    console.log(response.config)
    return response.data
}

export const deleteCategories = async (idList) => {

    CategoryApi.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken();

    // console.log(idList)

    // return true;
    return await CategoryApi.delete(CategoryEndPoint + "/delete/many", { data: idList });

}

export const add = async (data) => {

    CategoryApi.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken();


    const response = await CategoryApi.post(CategoryEndPoint + "/add", {
        name: data.name,
        description: data.description
    });

    return response.data

}

export const update = async (data) => {
    CategoryApi.defaults.headers.common["Authorization"] = 'Bearer ' + getAuthToken();


    const response = await CategoryApi.put(CategoryEndPoint + "/update/" + data.id, {
        id: data.id,
        name: data.name,
        description: data.description
    });

    return response.data
}