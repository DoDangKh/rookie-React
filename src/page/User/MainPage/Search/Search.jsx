import React, { useEffect, useState } from 'react'
import Filter from './Componet/Filter/Filter'
import { Button, Card, Flex, Layout, List, Pagination, Select } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import Meta from 'antd/es/card/Meta'
import { request } from '../../../../axios_helper'
import { filter } from '../../../../api/ProductApi'
import { FireTwoTone } from '@ant-design/icons'
import { addToCart } from '../../../../api/CartsApi'


function Search() {

    const [searchParams, setSearchParams] = useSearchParams({
        p: 0,
        Categories: "",
        minprice: "",
        maxprice: "",
    })

    const navigate = useNavigate()

    const [product, setProduct] = useState([])

    const searchParamsObject = Object.fromEntries(searchParams.entries())

    useEffect(() => {
        console.log("render")

        const params = Object.fromEntries(searchParams.entries())




        const data = {
            page: parseInt(params.p),
            categoryids: params.Categories,
            name: params.Name,
            minprice: params.minprice,
            maxprice: params.maxprice,
            order: params.order,
            size: 16,
            feature: params.feature,
            isActive: "TRUE",
        }

        console.log(data)



        filter(data).then((response) => {
            console.log(response)
            setProduct(response.productdtos)
        })
            .catch((e) => {
                console.log(e)
            })
    }, [searchParams])



    const handleAddToCart = (item) => {

        if (window.localStorage.getItem("auth-token") === null) {
            navigate("/login")
        }

        else {
            const data = {
                products: item,
                idUser: window.localStorage.getItem("user"),
                amount: 1
            }

            console.log(data)

            addToCart(data).then((res) => {
                console.log(res)
            })
                .catch((e) => {
                    console.log(e)
                })
        }
    }


    const onPageChange = (pageNumber) => {
        setSearchParams(
            { ...searchParamsObject, p: pageNumber - 1 }
        )
    }

    const onOrderChange = (value) => {
        setSearchParams({ ...searchParamsObject, order: value })
    }

    return (
        <Layout className='bg-white'>
            <Sider className='bg-white border-solid border-2 border-slate-1001 m-2 p-2 w-36' width="auto" style={{ maxWidth: '400px' }} >
                <Filter setSearchParams={setSearchParams} searchParamsObject={searchParamsObject} />
            </Sider>
            <Content>
                <div className='gap-4 m-3'>
                    <div className='Flex p-2'>
                        <p>Sort</p>
                        <Select
                            options={[
                                { value: 'asc', label: 'Price Ascending' },
                                { value: 'desc', label: 'Price Descending' }
                            ]}
                            defaultValue={searchParamsObject.order}
                            onChange={onOrderChange}
                            className='w-36'></Select>
                    </div>
                    <div>
                        <List
                            grid={{
                                gutter: 1,
                                column: 4,
                            }}
                            dataSource={product}
                            renderItem={(item) => (
                                <List.Item>
                                    <Card
                                        className="border-2 border-gray-300 rounded-md shadow-md overflow-hidden"
                                        hoverable
                                        style={{ width: 300 }}
                                        cover={
                                            <div style={{ height: 300, overflow: 'hidden' }}>
                                                <img
                                                    onClick={() => navigate('/product/' + item.id)}
                                                    className="object-cover w-full h-full"
                                                    alt={item.name}
                                                    src={'http://localhost:8080/images/' + item.images[0].url}
                                                />
                                            </div>
                                        }

                                    >
                                        {item.feature && (
                                            <div className="flex items-center mb-4">
                                                <FireTwoTone twoToneColor="red" className="text-lg mr-2" />
                                                <p className="text-red-600">Hot</p>
                                            </div>
                                        )}

                                        <Meta
                                            title={item.name}
                                            description={<span className="text-lg font-bold">${item.price}</span>}
                                        />
                                        <Button className="w-full mt-4" type="primary" onClick={() => { handleAddToCart(item) }}>
                                            Add to Cart
                                        </Button>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </div>

                    <div div className='flex justify-center'>
                        <Pagination defaultCurrent={searchParamsObject.p + 1} total={product.length} onChange={onPageChange}>

                        </Pagination>
                    </div>
                </div>
            </Content>
        </Layout >
    )
}

export default Search