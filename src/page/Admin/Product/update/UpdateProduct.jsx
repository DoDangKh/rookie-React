import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./updateProduct.css"
import {
    update,
    ProductEndPoint as cacheKey,
    getProductById
} from '../../../../api/ProductApi'
import { request } from '../../../../axios_helper'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { redirect, useNavigate, useParams } from 'react-router-dom'
import DropDownSelect from "./DropDownSelect/DropDownSelect"
import UpLoadPicture from "./uploadPicture/UpLoadPicture"
import { CheckBox } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import "./updateProduct.css"
import * as Yup from 'yup';
import useSWR from 'swr';


export default function UpdateProduct() {

    let { id } = useParams()

    // const { isLoading,
    //     error,
    //     data,
    //     mutate
    // } = useSWR(cacheKey, getProductById(id))

    const [product, setproduct] = useState(null)

    useEffect(() => {

        request("GET", "/product/" + id)
            .then((res) => {
                // console.log("res:", res.data)
                setproduct(res.data)
                // console.log('product:', product)
                // setimages(res.data.images)
                setcategories(res.data.categories)
                let temp = []
                for (let i in res.data.images) {
                    // console.log("i", res.data.images[i].url)
                    // console.log("I:", i)
                    let tempstring = { ...res.data.images[i] }
                    tempstring.url = "http://localhost:8080/images/" + res.data.images[i].url
                    temp.push(tempstring)
                }
                // console.log('temp:', temp)
                setfileList(temp)
                temp = []
                for (let i in res.data.categories) {
                    // console.log(res.data.categories[i].id)

                    temp.push(res.data.categories[i].id)
                }
                // console.log(state)
                setname(temp)
                temp = []
                for (let i in res.data.images) {
                    // console.log(res.data.categories[i].id)

                    temp.push({
                        uid: res.data.images[i].id,
                        url: res.data.images[i].url

                    })
                }
                setimages(temp)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    const navigate = useNavigate()

    const [Status, setStatus] = useState(false)

    const [severity, setseverity] = useState("success")

    const [images, setimages] = useState([])

    const [categories, setcategories] = useState([])

    const [message, setmessage] = useState("")

    const [fileList, setfileList] = useState([])

    const [name, setname] = useState([])
    console.log("categories", categories)

    console.log("Cha:", images)


    const handleChangeCategories = (listcategories) => {
        setcategories(listcategories)
    }

    const handleChangeImages = (listImages) => {
        setimages(listImages)
    }

    const handleUpdate = async (values) => {
        console.log(values)
        try {
            // event.preventDefault()
            // console.log(images)
            let imagename = []
            for (let i in images) {
                // console.log("i: ", images[i].url)
                imagename.push(images[i].url)
            }
            // console.log(imagename)

            const data = {
                id: id,
                name: values.name,
                description: values.description,
                price: values.price,
                amount: values.amount,
                categories: categories,
                images: imagename,
                rates: [],
                features: values.feature

            }

            if (imagename.length === 0) {
                setseverity("error")
                setmessage("Please add at least 1 Image for this product")

                setStatus(true)
                return
            }

            if (categories.length === 0) {
                setseverity("error")
                setmessage("Please add at least 1 Category for this product")

                setStatus(true)
                return
            }

            console.log(data)

            setseverity("success")
            setmessage("Product has bean Created")
            await update(data, id)
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

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string()
    //         .required('Product name is required')
    //         .min(6, 'Product name must be at least 6 characters'),
    //     description: Yup.string(),
    //     price: Yup.number(),
    //     amount: Yup.number(),
    // });

    // const formik = useFormik({
    //     initialValues: {
    //       categoryName: initialValues.categoryName || '',
    //       description: initialValues.description || '',
    //       icon: initialValues.icon || '',
    //     },
    //     validationSchema,
    //     onSubmit: values => {
    //       console.log(values);
    //       notification.success({ message: `Category ${mode === 'create' ? 'created' : 'updated'} successfully` });
    //     },
    //   });

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Product name is required')
            .min(6, 'Product name must be at least 6 characters'),
        description: Yup.string().required('Description is required'),
        price: Yup.number()
            .required('Price is required'),
        amount: Yup.number()
            .required('Amount is required'),
    });



    if (product === null) {
        return (
            <CircularProgress></CircularProgress>
        )
    }
    else {
        // console.log("product:", product)

        return (
            <div className='p-10  w-100 '>
                <Snackbar open={Status} autoHideDuration={3000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity={severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
                <h2 className='text-center'>
                    Update Product
                </h2>
                <div className="border-b border-gray-300 pb-4">
                    <label className="text-gray-600">Audit</label>
                    <div className="flex ">
                        <label className="text-gray-600">Created at:</label>
                        <p className="ml-2 text-gray-800">{product.createdAt}</p>
                    </div>
                    <div className="flex ">
                        <label className="text-gray-600">Updated at:</label>
                        <p className="ml-2 text-gray-800">{product.updatedAt}</p>
                    </div>
                    <div className="flex ">
                        <label className="text-gray-600">Last updated by:</label>
                        <p className="ml-2 text-gray-800">{product.modifiedUser}</p>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        amount: product.amount,
                        feature: product.feature
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleUpdate(values)

                    }
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Name</label>
                                <Field type="text" id="name" name='name' className="block w-full p-2  text-gray-900 border-1 border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Description</label>
                                <Field type="text" id="description" name='description' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Price</label>
                                <Field type="number" id="price" name='price' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="price" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product's Amount</label>
                                <Field type="number" id="amount" name='amount' className="block w-full p-4 text-gray-900 border-1 border-gray-300 rounded-lg  bg-gray-50 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="amount" component="div" className="text-red-500 text-xs" />
                            </div>

                            <FormControlLabel
                                control={<Checkbox checked={values.feature} onChange={handleChange} name="feature" />}
                                label="Feature"
                            />

                            {/* Add your DropDownSelect and UpLoadPicture components here */}
                            <DropDownSelect categories={name} handleChangeCategories={handleChangeCategories}></DropDownSelect>
                            <UpLoadPicture images={images} fileList={fileList} handleChangeImages={handleChangeImages}></UpLoadPicture>

                            <div className="flex gap-10 justify-center">
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                <button type="button" onClick={() => { navigate("/Admin/Category") }} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Quit</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>

        )
    }
}
