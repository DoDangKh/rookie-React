import React, { useEffect, useState } from 'react'
import ImageSlider from './Carousel/Carousel'
import { Button, Card, Carousel, Col, List, Row, Spin } from 'antd'
import Meta from 'antd/es/card/Meta'
import { filter } from '../../../api/ProductApi'
import { useNavigate } from 'react-router-dom'
import { FireFilled, FireTwoTone } from '@ant-design/icons'
import { addToCart } from '../../../api/CartsApi'
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
                            <Card className='flex justify-center items-center ' hoverable>
                                <img src="https://i.pinimg.com/736x/33/e6/3d/33e63d5adb0da6b303a83901c8e8463a.jpg"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center items-center ' hoverable>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6} >
                            <Card className='flex justify-center items-center ' hoverable>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png"
                                    className='h-32'>
                                </img>
                            </Card>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <Card className='flex justify-center ' hoverable>
                                <img src="https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-puma-inkythuatso-01-03-15-39-57.jpg"
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
            </div >
        )
}

export default MainPage