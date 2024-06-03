import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import "./updateCategory.css"
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { request } from '../../../../axios_helper'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { update } from '../../../../api/CategoryApi'

export default function UpdateCategory() {

    let { id } = useParams()

    const [Categories, setCategories] = useState(null)

    const [Status, setStatus] = useState(false)

    const [severity, setseverity] = useState("success")

    const navigate = useNavigate()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false);
    };

    const onChangeHandler = (event) => {
        console.log("testting:", event.target.name, event.target.value)
        let name = event.target.name
        let value = event.target.value
        state[name] = value
    }

    const handelUpdate = async (event) => {
        try {
            event.preventDefault()
            if (state.name === "") {
                state.name = Categories.name
            }
            if (state.description === "") {
                state.description = Categories.description
            }
            const data = {
                id: id,
                name: state.name,
                description: state.description
            }
            // console.log(data)
            await update(data)
            setStatus(true)
            // childRef.current.handleClick()
        }
        catch (e) {
            console.log(e)
        }
    }


    const state = {
        name: "",
        description: ""
    }

    useEffect(() => {

        request("GET", "/category/" + id)
            .then((res) => {
                // console.log(res.data)
                setCategories(res.data)
                state.name = Categories.name
                state.description = Categories.description
                console.log(state)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])




    if (Categories === null) {
        // console.log(isLoading)
        // console.log(data)
        return (
            <CircularProgress className="justify-self-center w-10"></CircularProgress>

        )
    }

    else {
        // console.log(Categories)
        // console.log(error)

        return (
            <div className='p-10  w-100 '>
                <Snackbar open={Status} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        This is a success Alert inside a Snackbar!
                    </Alert>
                </Snackbar>
                <h2 className='text-center'>
                    Update Category
                </h2>
                <form onSubmit={handelUpdate}>
                    <p>Category ID:{Categories.id}</p>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category's Name</label>
                        <input type="text" id="name" name='name' className="block w-full p-2  text-gray-900 border-1 border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={onChangeHandler} defaultValue={Categories.name} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category's Description</label>
                        <input type="text" id="description" name='description' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={onChangeHandler} defaultValue={Categories.description} />
                    </div>
                    <div className="flex gap-10 justify-center">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        <button type="button" onClick={() => { navigate("/Admin/Category") }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Quit</button>
                    </div>
                </form>

            </div>

        )
    }
}
