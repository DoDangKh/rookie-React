import { Button, Checkbox, Form, Input, List } from 'antd'
import React, { useState, useEffect } from 'react'
import { request } from '../../../../../../axios_helper'
import { Check } from '@mui/icons-material'


function Filter({ setSearchParams, searchParamsObject }) {


    const [categories, setcategories] = useState([])

    const [selectedCategories, setselectedCategories] = useState(searchParamsObject.Categories)

    const [feature, setfeature] = useState((searchParamsObject.feature === 'true'))

    console.log("feature:", typeof (feature))


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
        setselectedCategories(checkedValues)
        const categoryids = checkedValues.join(",")
        setSearchParams({
            ...searchParamsObject,
            Categories: categoryids
        })

    }

    const onSubmitName = (values) => {
        console.log(values)
        setSearchParams({
            ...searchParamsObject,
            Name: values.search
        })

    }


    return (
        <div className=''>
            <Form onFinish={onSubmitName}>
                <div className="flex items-center">
                    <Form.Item
                        label="Search"
                        name="search"
                        initialValue={searchParamsObject.Name}
                    >
                        <Input className='w-20' placeholder='Name of product' />
                    </Form.Item>
                </div>
                <div className="flex items-center">
                    <Form.Item
                    >
                        <Button htmlType='submit'>Search</Button>
                    </Form.Item>
                </div>
            </Form>

            <Checkbox.Group
                onChange={onChangeCategories}
                value={selectedCategories}
            // defaultValue={selectedCategories ? selectedCategories.split(",") : []}
            >
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
                        <Button htmlType='submit'>Apply</Button>
                    </Form.Item>
                </div>
            </Form>
            <Checkbox value={feature} checked={feature} onChange={(e) => {
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
