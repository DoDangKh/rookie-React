import { Button, Checkbox } from '@mui/material'
import React, { useRef, useState } from 'react'
import "./addProduct.css"
import {
    add
} from '../../../../api/ProductApi'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { redirect, useNavigate } from 'react-router-dom'
import DropDownSelect from "./DropDownSelect/DropDownSelect"
import UpLoadPicture from "./uploadPicture/UpLoadPicture"
import { CheckBox } from '@mui/icons-material';


export default function AddProduct() {

    const state = useState({
        name: "",
        description: "",
        price: 0,
        amount: 0
    }
    )

    const navigate = useNavigate()

    const [Status, setStatus] = useState(false)

    const [severity, setseverity] = useState("success")

    const [images, setimages] = useState([])

    const [categories, setcategories] = useState([])

    // console.log(categories)

    // console.log("Cha:", images)

    const onChangeHandler = (event) => {
        // console.log("testting:", event.target.name, event.target.value)
        let name = event.target.name
        let value = event.target.value
        state[name] = value
        console.log(state)
    }

    const handleChangeCategories = (listcategories) => {
        setcategories(listcategories)
    }

    const handleChangeImages = (listImages) => {
        setimages(listImages)
    }

    const handelAdd = async (event) => {
        try {
            event.preventDefault()

            let imagename = []
            for (let i in images) {
                console.log("i: ", images[i].name)
                imagename.push(images[i].name)
            }
            console.log(imagename)

            const data = {
                name: event.target["name"].value,
                description: event.target["description"].value,
                price: event.target["price"].value,
                amount: event.target["amount"].value,
                categories: categories,
                images: imagename,
                rates: [],
                features: event.target["feature"].checked

            }

            console.log(data)

            await add(data)
            setStatus(true)
            // childRef.current.handleClick()
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setStatus(false);
    };

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
                Add Product
            </h2>
            <form onSubmit={handelAdd}>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Name</label>
                    <input type="text" id="name" name='name' className="block w-full p-2  text-gray-900 border-1 border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChangeHandler} />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Description</label>
                    <input type="text" id="description" name='description' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChangeHandler} />
                </div>
                <div className="mb-6">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Price</label>
                    <input type="number" id="price" name='price' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChangeHandler} />
                </div>
                <div className="mb-6">
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Amount</label>
                    <input type="number" id="amount" name='amount' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={onChangeHandler} />
                </div>

                <DropDownSelect handleChangeCategories={handleChangeCategories}></DropDownSelect>
                <UpLoadPicture images={images} handleChangeImages={handleChangeImages}></UpLoadPicture>
                <Checkbox label="Feature" name="feature" /><label>Feature</label>
                <div className="flex gap-10 justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    <button type="button" onClick={() => { navigate("/Admin/Category") }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Quit</button>
                </div>

            </form>

        </div>

    )
}
