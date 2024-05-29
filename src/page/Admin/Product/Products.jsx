import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import Table from './Table/Table'
import { Box, Button, CircularProgress, Snackbar } from '@mui/material'
import { request } from '../../../axios_helper'
import useSWR from 'swr'
import {
    getAllProduct,
    ProductEndPoint as cacheKey,
    deleteProduct
} from '../../../api/ProductApi'

import { useNavigate } from 'react-router-dom'

function Product() {

    // const [Categories, setCategories] = useState([])

    const [status, setstatus] = useState(false)

    const navigate = useNavigate()

    const {
        isLoading,
        error,
        data,
        mutate
    } = useSWR(cacheKey, getAllProduct, { revalidateOnMount: true })




    const handleDelete = async (idList) => {
        try {

            console.log(idList)
            await deleteProduct(idList)
            mutate(cacheKey)
            console.log(data)
        }
        catch (e) {
            console.log("error")
            console.log(e)

        }

    }



    const headCells = [
        {
            id: 'id',
            numeric: true,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'name',
            numeric: false,
            disablePadding: false,
            label: 'Name',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'Description',
        },
        {
            id: 'amount',
            numeric: true,
            disablePadding: false,
            label: 'Amount',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'img',
            disablePadding: false,
            label: 'Image',
        },

    ];


    if (isLoading) return (


        <CircularProgress className="justify-self-center w-10" />

    )
    else if (error) {
        console.log(error)
        return (
            <p>error</p>
        )
    }
    else {

        console.log(data)

        return (
            <div className='w-100'>
                <Button className="b" onClick={() => { navigate("add") }}>Add</Button>
                <Table headCells={headCells} Products={data} deleteProducts={handleDelete} />
                <Snackbar />
            </div>
        )
    }
}

export default Product
