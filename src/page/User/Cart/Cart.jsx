import React, { useState } from 'react';
import { Table, Button, Space, InputNumber } from 'antd';
import './Cart.css';

const CartPage = () => {
    // Dummy data for demonstration
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Nike Air Max', price: 100, quantity: 1 },
        { id: 2, name: 'Adidas Ultraboost', price: 120, quantity: 2 },
    ]);

    const columns = [
        {
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <InputNumber
                    min={1}
                    defaultValue={text}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => `$${record.price * record.quantity}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleRemoveItem(record.id)}>Remove</Button>
            ),
        },
    ];

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
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
