import React, { useEffect, useState } from 'react'
import ImageSlider from './Carousel/Carousel'
import { Card, Carousel, Col, List, Row, Spin } from 'antd'
import Meta from 'antd/es/card/Meta'
import { filter } from '../../../api/ProductApi'
import { useNavigate } from 'react-router-dom'
import { FireFilled, FireTwoTone } from '@ant-design/icons'
function MainPage() {

    const [product, setproduct] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {


        const data = {
            page: 0,
            feature: "TRUE",
            size: 10,
            isActive: "TRUE",
        }

        filter(data).then((res) => {
            console.log(res)
            setproduct(res.productdtos)
        })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    if (product === null) {
        return (
            <Spin></Spin>
        )
    }

    else
        return (
            <div>
                <ImageSlider />
                <div className='mx-4 my-4'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center items-center '>
                                <img src="https://i.pinimg.com/736x/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.jpg"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center items-center '>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center items-center '>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center '>
                                <img src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className='mx-4 my-4 flex justify-center items-center'>
                    <List
                        grid={{
                            gutter: 16,
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
                                        height: 456
                                    }}
                                    onClick={() => {
                                        navigate("/product/" + item.id)
                                    }}
                                    // cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                                    cover={<div style={{ overflow: "hidden", height: "full" }}>
                                        <img className='h-full' alt="example" src={"http://localhost:8080/images/" + item.images[0].url} />
                                    </div>}
                                >
                                    {item.feature &&
                                        <div className="flex">
                                            <FireTwoTone twoToneColor="red" />
                                            <p className="text-red-600 px-2 pt-4">Hot</p>

                                        </div>}
                                    <Meta title={item.name} description={item.price + "$"} />
                                </Card>
                            </List.Item>
                        )}
                    />

                </div>
            </div >
        )
}

export default MainPage