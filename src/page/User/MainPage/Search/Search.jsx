import React, { useEffect, useState } from 'react'
import Filter from './Componet/Filter/Filter'
import { Card, Layout, List, Pagination } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useSearchParams } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
import Meta from 'antd/es/card/Meta'
import { request } from '../../../../axios_helper'
import { filter } from '../../../../api/ProductApi'

function Search() {

    const [searchParams, setSearchParams] = useSearchParams({
        p: 0,
        Categories: "",
    })

    const [product, setProduct] = useState([])

    const searchParamsObject = Object.fromEntries(searchParams.entries())

    useEffect(() => {
        console.log("render")
        // request("GET", "/product/all")
        //     .then((res) => {
        //         setProduct(res.data)
        //     })
        //     .catch((e) => {
        //         console.log(e)
        //     })
        const params = Object.fromEntries(searchParams.entries())

        // let categoryids = null

        // if (params.Categories !== '')
        //     categoryids = params.Categories.split(",")



        const data = {
            page: parseInt(params.p),
            categoryids: params.Categories
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

    // console.log(Object.fromEntries(searchParams.entries()))

    return (
        <Layout className='bg-white'>
            <Sider className='bg-white border-solid border-2 border-slate-1001 m-2 p-2 w-36' width="auto" style={{ maxWidth: '400px' }} >
                <Filter setSearchParams={setSearchParams} searchParamsObject={searchParamsObject} />
            </Sider>
            <Content>
                <div className='gap-4 m-3'>
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
                                        cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                                    // cover={<img alt="example" src={"http://localhost:8080/images/" + item.images[0].url} />}
                                    >
                                        <Meta title={item.name} description={item.desc} />
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
        </Layout>
    )
}

export default Search