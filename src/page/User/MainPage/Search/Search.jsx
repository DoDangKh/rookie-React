import React, { useEffect, useState } from 'react'
import Filter from './Componet/Filter/Filter'
import { Card, Flex, Layout, List, Pagination, Select } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import Meta from 'antd/es/card/Meta'
import { request } from '../../../../axios_helper'
import { filter } from '../../../../api/ProductApi'

function Search() {

    const [searchParams, setSearchParams] = useSearchParams({
        p: 0,
        Categories: "",
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
                                        className='border-5 border-slate-200'
                                        hoverable
                                        style={{
                                            width: 240,
                                        }}
                                        onClick={() => {
                                            navigate("/product/" + item.id)
                                        }}
                                        cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                                    // cover={<img alt="example" src={"http://localhost:8080/images/" + item.images[0].url} />}
                                    >
                                        <Meta title={item.name} description={item.price + "$"} />
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