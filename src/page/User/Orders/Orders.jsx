import React, { useState, useEffect } from 'react';
import { Table, Space, Image } from 'antd';
import { getOrdersByUserId } from '../../../api/OrdersApi';
import { render } from '@testing-library/react';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // Simulated API call to fetch orders
        // Dummy data for demonstration


        getOrdersByUserId(window.localStorage.getItem("user")).then(
            (res) => {
                console.log(res)
                setOrders(res)
            }
        )
            .catch(
                (e) => {
                    console.log(e)
                }
            )

        const dummyOrders = [
            { orderId: 1, date: '2024-06-01', total: 100, status: 'Delivered', products: [{ id: 1, name: 'Sneaker A', price: 50 }, { id: 2, name: 'Sneaker B', price: 50 }] },
            { orderId: 2, date: '2024-06-02', total: 150, status: 'Shipped', products: [{ id: 3, name: 'Sneaker C', price: 75 }, { id: 4, name: 'Sneaker D', price: 75 }] },
            { orderId: 3, date: '2024-06-03', total: 200, status: 'Processing', products: [{ id: 5, name: 'Sneaker E', price: 100 }] },
        ];
        setLoading(false);
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            className: 'px-4 py-2',
            render: (_, record) => {
                return record.id
            },
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            className: 'px-4 py-2',
            render: (_, record) => {
                return record.date
            }

        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            className: 'px-4 py-2',
            render: (_, record) => {
                let sum = 0;
                for (let i in record.orders_ProductsDtos) {
                    sum = sum + record.orders_ProductsDtos[i].productsDto.price * record.orders_ProductsDtos[i].amount
                }
                return '$' + sum
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            className: 'px-4 py-2',
            render: (_, record) => {
                if (record.status === false)
                    return 'Pending'
                else
                    return 'Delivered'
            }
        },

    ];

    const expandedRowRender = (record) => {
        const productColumns = [
            {
                title: 'Product ID', dataIndex: 'id', key: 'id',
                render: (_, record) => {
                    return record.productsDto.id
                }
            },
            {
                title: 'Product Name', dataIndex: 'name', key: 'name',
                render: (_, record) => {
                    return record.productsDto.name
                }
            },
            {
                title: 'Price', dataIndex: 'price', key: 'price',
                render: (_, record) => {
                    return '$' + record.productsDto.price
                }
            },
            {
                title: 'Amount', dataIndex: 'amount', key: 'amount',
                render: (_, record) => {
                    return record.amount
                }
            },
            {
                title: 'Image', dataIndex: 'image', key: 'image', render: (_, record) => {
                    return < Image src={'http://localhost:8080/images/' + record.productsDto.images[0].url} alt='failed' width={"128px"} ></Image >
                }
            },
        ];

        return (
            <Table
                columns={productColumns}
                dataSource={record.orders_ProductsDtos}
                pagination={false}
                rowKey="id"
            />
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <Table
                columns={columns}
                dataSource={orders}
                loading={loading}
                rowKey={record => record.id}
                className="w-full"
                rowSelection={[]}
                expandable={{ expandedRowRender }}
            />
        </div>
    );
};

export default OrderPage;
