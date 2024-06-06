import React, { useState, useEffect } from 'react';
import { Table, Button, Space, InputNumber, Image, Checkbox, message } from 'antd';
import './Cart.css';
import { deleteCarts, getCartsByIdUsers, updateCarts } from '../../../api/CartsApi';
import { addOrders } from '../../../api/OrdersApi';

const CartPage = () => {
    // Dummy data for demonstration
    const [cartItems, setCartItems] = useState([]);

    const [Selected, setSelected] = useState([])

    useEffect(() => {
        getCartsByIdUsers(window.localStorage.getItem("user"))
            .then((res) => {
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
                const price = record.productsDto.price;
                return '$' + price;
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
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
        {
            title: 'Select',
            dataIndex: 'select',
            key: 'select',
            render: (_, record) => (
                <Checkbox onChange={(e) => handleSelectChange(record, e)} />
            ),
        },
    ];

    const handleQuantityChange = (record, quantity) => {
        if (quantity > 0) {
            let temp = { ...record }
            temp.amount = quantity

            updateCarts(temp)
                .then((res) => {
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
        deleteCarts(id)
            .then((res) => {
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
                console.log(res)
                message.success("Remove success")
            })
            .catch((e) => {
                console.log(e)
                message.error("Remove error")
            })
    };

    const handleSelectChange = (record, e) => {
        // Handle checkbox change
        console.log("Selected: ", e.target.checked, "for record: ", record);

        if (e.target.checked === false) {
            setSelected((prevSelected) =>
                prevSelected.filter((selected) => selected.id !== record.id))
        }
        else {
            let temp = [...Selected]
            temp.push(record)
            setSelected(temp)
        }
    };

    const handleCheckout = () => {
        const data = {
            idUser: window.localStorage.getItem("user"),
            status: false,
            orders_ProductsDtos: Selected,
        }

        console.log(data)

        addOrders(data).then((res) => {

            console.log(res)
            for (let i in Selected) {

                deleteCarts(Selected[i].id).then(
                    (res) => {
                        setCartItems((prevItems) => prevItems.filter((item) => item.id !== Selected[i].id))
                    }
                )
            }
            message.success("Check out success")
        })
            .catch((e) => {
                console.log(e)
                message.error("Check out failed")
            })

    }

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
                        <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            <div className="mt-4 flex justify-end">
                <Space>
                    <Button type="primary" onClick={() => { handleCheckout() }}>Checkout</Button>
                    <Button >Continue Shopping</Button>
                </Space>
            </div>
        </div>
    );
};

export default CartPage;
