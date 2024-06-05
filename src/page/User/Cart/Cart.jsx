import React, { useState, useEffect } from 'react';
import { Table, Button, Space, InputNumber, Image } from 'antd';
import './Cart.css';
import { deleteCarts, getCartsByIdUsers, updateCarts } from '../../../api/CartsApi';
import { render } from '@testing-library/react';
import { update } from '../../../api/CategoryApi';

const CartPage = () => {
    // Dummy data for demonstration
    const [cartItems, setCartItems] = useState([
    ]);

    useEffect(() => {
        getCartsByIdUsers(window.localStorage.getItem("user")).then((res) => {
            setCartItems(res)
        })
            .catch((e) => {
                console.log(e)
            })
    }, [])


    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return record.productsDto.name;
            }
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => {
                console.log(record.productsDto.price)
                const price = record.productsDto.price;
                return '$' + price;
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
                console.log(record.productsDto.images[0].url)
                return < Image src={'http://localhost:8080/images/' + record.productsDto.images[0].url} alt='failed' width={"128px"} ></Image >
            },
        },

        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    defaultValue={record.amount}
                    onChange={(value) => handleQuantityChange(record, value)}
                />
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => `$${record.productsDto.price * record.amount}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleRemoveItem(record.id)}>Remove</Button>
            ),
        },
    ];

    const handleQuantityChange = (record, quantity) => {
        if (quantity > 0) {

            let temp = { ...record }

            temp.amount = quantity

            updateCarts(temp).then((res) => {
                console.log(res)
            })
                .catch((e) => { console.log(e) })


            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === record.id ? { ...item, amount: quantity } : item
                )
            );
        }
        else {
            setCartItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === record.id ? { ...item, amount: item.amount } : item
                )
            );
        }
    };

    const handleRemoveItem = (id) => {
        deleteCarts(id).then((res) => {
            setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
            console.log(res)
        }
        )
            .catch((e) => {
                console.log(e)
            })
    };

    const total = cartItems.reduce(

        (acc, curr) => acc + curr.productsDto.price * curr.amount,
        0
    );



    return (
        <div className="container mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <Table
                columns={columns}
                dataSource={cartItems}
                pagination={false}
                rowKey="id"
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total:</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                            <strong>${total}</strong>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            <div className="mt-4 flex justify-end">
                <Space>
                    <Button type="primary">Checkout</Button>
                    <Button>Continue Shopping</Button>
                </Space>
            </div>
        </div>
    );
};

export default CartPage;
