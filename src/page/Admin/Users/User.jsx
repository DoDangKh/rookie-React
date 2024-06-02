import React, { useEffect, useState } from 'react'

import Table from './Table/Table'
import { Button, CircularProgress, Snackbar } from '@mui/material'
import { request } from '../../../axios_helper'
import useSWR from 'swr'
import {
    getAllCategory
    , CategoryEndPoint as cacheKey
    , deleteCategories
} from '../../../api/CategoryApi'

import { useNavigate } from 'react-router-dom'

function User() {

    const [users, setusers] = useState(null)


    const [status, setstatus] = useState(false)

    const navigate = useNavigate()



    useEffect(() => {

        request("GET", "/category/all")
            .then((res) => {
                // console.log(res.data)
                setusers(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    const handleDelete = async (categories) => {
        try {
            // console.log(categories)
            // await deleteCategories(categories)
            // mutate(cacheKey)
            // console.log(data)
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



    const headCells = [
        {
            id: 'id',
            numeric: true,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'firstname',
            numeric: false,
            disablePadding: false,
            label: 'First Name',
        },
        {
            id: 'lastname',
            numeric: false,
            disablePadding: false,
            label: 'Last Name',
        },
        {
            id: 'email',
            numeric: false,
            disablePadding: false,
            label: 'E-Mail',
        },
    ];


    if (users === null) return (


        <CircularProgress className="justify-self-center w-10" />

    )
    else {

        return (
            <div className='w-100'>
                <Button className="b" onClick={() => { navigate("add") }}>Add</Button>
                <Table headCells={headCells} Categories={users} deleteCategories={handleDelete} />
                <Snackbar />
            </div>
        )
    }
}

export default User
