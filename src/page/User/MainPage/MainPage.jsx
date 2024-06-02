import React from 'react'
import ImageSlider from './Carousel/Carousel'
import { Card, Carousel, Col, Row } from 'antd'
import Meta from 'antd/es/card/Meta'
function MainPage() {
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

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                        >
                            <Meta title="Nike" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                        >
                            <Meta title="Nike" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                        >
                            <Meta title="Nike" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Card
                            hoverable
                            style={{
                                width: 240,
                            }}
                            cover={<img alt="example" src="http://localhost:8080/images/8cda66e1-21b3-4957-8f5b-83fdb84df979.png" />}
                        >
                            <Meta title="Nike" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>



            </div>
        </div >
    )
}

export default MainPage