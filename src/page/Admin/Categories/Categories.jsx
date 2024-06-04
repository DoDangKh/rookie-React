import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import Table from './Table/Table'
import { Box, Button, CircularProgress, Snackbar } from '@mui/material'
import { request } from '../../../axios_helper'
import useSWR from 'swr'
import {
    getAllCategory
    , CategoryEndPoint as cacheKey
    , deleteCategories
    , activeCategories
} from '../../../api/CategoryApi'
import Toast from '../../../components/Toast/Toast'
import { useNavigate } from 'react-router-dom'

function Admin() {

    // const [Categories, setCategories] = useState([])


    const [status, setstatus] = useState(false)

    const navigate = useNavigate()

    const {
        isLoading,
        error,
        data,
        mutate
    } = useSWR(cacheKey, getAllCategory, { revalidateOnMount: true })

    // useEffect(() => {

    //     request("GET", "/category/all")
    //         .then((res) => {
    //             // console.log(res.data)
    //             setCategories(res.data)
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //         })
    // }, [])


    const handleDelete = async (categories) => {
        try {
            // console.log(categories)
            await deleteCategories(categories)
            mutate(cacheKey)
            console.log(data)
        }
        catch (e) {
            console.log("error")
            console.log(e)
            // Toast({
            //     title: "Delete Fail",
            //     message: "Categories fail to delete",
            //     status: true
            // })
        }
        // console.log(categories)
    }

    const hanedleActive = async (id) => {
        try {
            await activeCategories(id)
        }
        catch (e) {
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
            id: 'delete',
            numeric: false,
            disablePadding: false,
            label: 'Delete',
        }
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

        return (
            <div className='w-100'>
                <Button className="b" onClick={() => { navigate("add") }}>Add</Button>
                <Table headCells={headCells} Categories={data} deleteCategories={handleDelete} handleActive={hanedleActive} />
                <Snackbar />
            </div>
        )
    }
}

export default Admin
