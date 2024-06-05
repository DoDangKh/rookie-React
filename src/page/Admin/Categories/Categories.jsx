import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import Table from './Table/Table'
import { Box, Button, CircularProgress, Snackbar } from '@mui/material'
import { request } from '../../../axios_helper'
import useSWR, { mutate } from 'swr'
import {
    getAllCategory
    , CategoryEndPoint as cacheKey
    , deleteCategories
    , activeCategories
} from '../../../api/CategoryApi'
import Toast from '../../../components/Toast/Toast'
import { useNavigate } from 'react-router-dom'

function Admin() {

    const [Categories, setCategories] = useState(null)


    const [status, setstatus] = useState(false)

    const navigate = useNavigate()

    const [muatae, setmuatae] = useState(0)

    // const {
    //     isLoading,
    //     error,
    //     data,
    //     mutate
    // } = useSWR(cacheKey, getAllCategory, { revalidateOnMount: true })

    useEffect(() => {
        request("GET", "/category/all")
            .then((res) => {
                // console.log(res.data)
                const temp = [...res.data]

                setCategories([...temp])
            })
            .catch((e) => {
                console.log(e)
            })
    }, [muatae])


    const handleDelete = async (categories) => {
        try {
            await deleteCategories(categories)
            let temp = muatae + 1
            console.log(temp)
            setmuatae(temp)
            console.log(muatae)


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
            let temp = muatae + 1
            setmuatae(temp)
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


    // if (isLoading) return (


    //     <CircularProgress className="justify-self-center w-10" />

    // )
    // else if (error) {
    //     console.log(error)
    //     return (
    //         <p>error</p>
    //     )
    // }
    if (Categories === null)
        return (
            <CircularProgress></CircularProgress>
        )
    else {

        return (
            <div className='w-100'>
                <Button className="b" onClick={() => { navigate("add") }}>Add</Button>
                <Table headCells={headCells} Categories={Categories} deleteCategories={handleDelete} handleActive={hanedleActive} />
                <Snackbar />
            </div>
        )
    }
}

export default Admin
