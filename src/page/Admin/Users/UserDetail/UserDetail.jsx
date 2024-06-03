import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { request } from '../../../../axios_helper';
import { CircularProgress } from '@mui/material';

function UserDetail() {


    let { id } = useParams()

    const [user, setuser] = useState(null)

    useEffect(() => {

        request("GET", "/eusers/" + id).then((res) => {
            console.log(res.data)
            setuser(res.data)
        })
            .catch((e) => {
                console.log(e)
            })

    }, [])


    if (user === null) {
        return (
            <CircularProgress></CircularProgress>
        )
    }
    else
        return (
            <div className="container mx-auto px-4 py-8 border border-gray-300 rounded-md shadow-md">
                <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-4">
                        <label className="text-gray-600">Audit</label>
                        <div className="flex ">
                            <label className="text-gray-600">Created at:</label>
                            <p className="ml-2 text-gray-800">{user.createdAt}</p>
                        </div>
                        <div className="flex ">
                            <label className="text-gray-600">Updated at:</label>
                            <p className="ml-2 text-gray-800">{user.updatedAt}</p>
                        </div>
                        <div className="flex ">
                            <label className="text-gray-600">Last updated by:</label>
                            <p className="ml-2 text-gray-800">{user.modifiedUser}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex ">
                            <label className="text-gray-600">First Name:</label>
                            <p className="ml-2 text-gray-800">{user.firstName}</p>
                        </div>
                        <div className="flex ">
                            <label className="text-gray-600">Last Name:</label>
                            <p className="ml-2 text-gray-800">{user.lastName}</p>
                        </div>
                        <div className="flex ">
                            <label className="text-gray-600">Email:</label>
                            <p className="ml-2 text-gray-800">{user.email}</p>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Return</Button>
                    </div>
                </div>
            </div>
        );
}

export default UserDetail;
