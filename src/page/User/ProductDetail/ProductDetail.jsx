import React, { useEffect, useState } from 'react';
import { Card, Button, Carousel, Rate, Input, List, Image, Pagination } from 'antd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { request } from '../../../axios_helper';
import { CircularProgress } from '@mui/material';
import { addToCart } from '../../../api/CartsApi';

const { TextArea } = Input;

const ProductDetailPage = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    const [Status, setStatus] = useState(false);
    const [severity, setSeverity] = useState("success");
    const [message, setMessage] = useState("");
    const [reset, setReset] = useState(false);

    let { id } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        // Fetch product details
        console.log('render:', reset)
        request("GET", "/product/" + id)
            .then((res) => {
                setProduct(res.data);
                console.log(res.data)
            })
            .catch((e) => {
                console.log(e);
            });

        // Fetch comments and ratings
    }, [reset]);


    const handleRatingChange = value => {
        setRating(value);
    };

    const handleCommentChange = e => {
        setComment(e.target.value);
    };

    const handleSubmit = () => {
        // Handle submission of rating and comment


        if (window.localStorage.getItem("auth-token")) {
            const idUser = window.localStorage.getItem("user");
            console.log(idUser)
            const data = {
                scores: rating,
                comment: comment,
                idproduct: id,
                iduser: idUser
            };
            request("POST", "/rates/add", data)
                .then((res) => {

                    if (reset === false)
                        setReset(true)
                    else
                        setReset(false)
                    setMessage("Rating added successfully");
                    setSeverity("success");
                    setStatus(true);
                })
                .catch((e) => {
                    setMessage("Failed to add rating");
                    setSeverity("error");
                    setStatus(true);
                    console.log(e);
                });
        } else {
            window.location = window.location.protocol + "//" + window.location.host + "/login";
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setStatus(false);
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddToCart = (item) => {

        if (window.localStorage.getItem("auth-token") === null) {
            navigate("/login")
        }

        else {
            const data = {
                products: product,
                idUser: window.localStorage.getItem("user"),
                amount: 1
            }

            console.log(data)

            addToCart(data).then((res) => {
                console.log(res)
                // message.success("Add to cart success")
                setMessage(" Add to cart successfully");
                setSeverity("success");
                setStatus(true);
            })
                .catch((e) => {
                    console.log(e)
                    // message.error("Add to cart fail")
                    setMessage("Add to Cart fail");
                    setSeverity("error");
                    setStatus(true);
                })
        }
    }


    if (product === null) {
        return (
            <CircularProgress></CircularProgress>
        )
    }
    else
        return (
            <div>
                <div className="container mx-auto px-4 py-8 flex">
                    <Snackbar open={Status} autoHideDuration={3000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <div className="w-1/2">
                        <Carousel autoplay={true} arrows className='flex justify-center items-center  bg-slate-500'
                            st={{ backgroud: 'blue' }}>
                            {product && product.images.map((image, index) => (
                                <div className='flex justify-center items-center h-full'>
                                    <Image
                                        src={`http://localhost:8080/images/${image.url}`}
                                        alt={`Product ${index + 1}`}
                                        className="h-64 object-fill"
                                        width={"100%"}
                                        key={index}
                                        fluid
                                    />
                                </div>

                            ))}
                        </Carousel>
                    </div>
                    <div className="w-1/2 px-4">
                        <Card className="w-full">
                            {product && (
                                <>
                                    <Card.Meta title={product.name} description={product.description} />
                                    <div className="flex justify-between items-center mt-4">
                                        <div>
                                            <span className="font-bold text-lg">{product.price}$</span>
                                        </div>
                                        <div>
                                            <Button type="primary" onClick={handleAddToCart}>Add to Cart</Button>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p>Rate this product:</p>
                                        <Rate value={rating} onChange={handleRatingChange} />
                                    </div>
                                    <div className="mt-4">
                                        <p>Add a comment:</p>
                                        <TextArea rows={4} value={comment} onChange={handleCommentChange} />
                                    </div>
                                    <div className="mt-4">
                                        <Button type="primary" onClick={handleSubmit}>Submit</Button>
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>

                </div>
                <div className="container mx-auto px-4 py-8">
                    <List
                        header={<div>Comments</div>}
                        bordered
                        dataSource={product.rates}
                        renderItem={(item) => (
                            <List.Item>
                                <div>
                                    <p>{item.name}:</p>
                                    <Rate disabled value={item.scores} />
                                    <p>{item.comment}</p>

                                </div>
                            </List.Item>
                        )}
                    />
                    {totalComments > 0 && (
                        <Pagination
                            className="mt-4"
                            current={currentPage}
                            pageSize={10} // adjust as needed
                            total={totalComments}
                            onChange={onPageChange}
                        />
                    )}
                </div>
            </div >
        );
};

export default ProductDetailPage;
