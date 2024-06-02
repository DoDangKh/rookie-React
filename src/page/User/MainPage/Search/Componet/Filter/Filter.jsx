import { Button, Checkbox, Form, Input, List } from 'antd'
import React, { useState, useEffect } from 'react'
import { request } from '../../../../../../axios_helper'
import { Check } from '@mui/icons-material'


function Filter({ setSearchParams, searchParamsObject }) {


    const [categories, setcategories] = useState([])

    const [selectedCategories, setselectedCategories] = useState([])

    const [feature, setfeature] = useState(false)



    useEffect(() => {
        request("GET", "/category/all")
            .then((res) => {
                setcategories(res.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    const onChangeCategories = (checkedValues) => {
        console.log(checkedValues)
        const categoryids = checkedValues.join(",")
        setSearchParams({
            ...searchParamsObject,
            Categories: categoryids
        })
    }


    return (
        <div className=''>
            <Checkbox.Group
                onChange={onChangeCategories}>
                <List
                    dataSource={categories}
                    renderItem={(item) => (
                        <List.Item className="">
                            <Checkbox value={item.id} />
                            <p className='my-0 mx-2'>{item.name}</p>
                        </List.Item>
                    )}
                />
            </Checkbox.Group>
            <Form className=''>
                <div className="flex items-center">
                    <Form.Item
                        label="Max price"
                        name="maxprice"
                    >
                        <Input className='w-20' />
                    </Form.Item>
                </div>
                <div className="flex items-center">
                    <Form.Item
                        label="Min price"
                        name="minprice"
                    >
                        <Input className='w-20' />
                    </Form.Item>
                </div>
                <div className="flex items-center">
                    <Form.Item
                    >
                        <Button>Apply</Button>
                    </Form.Item>
                </div>
            </Form>
            <Checkbox value={feature} onChange={(e) => {
                setfeature(e.target.checked)
                setSearchParams({
                    ...searchParamsObject,
                    feature: e.target.checked
                })

            }}>Feature</Checkbox>
        </div>
    )
}

export default Filter
