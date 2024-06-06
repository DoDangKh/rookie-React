import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { request, setAuthToken } from '../../../axios_helper';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        request('POST', '/auth/login', values)
            .then((response) => {
                console.log(response.data);
                if (response.data.role === 'ROLE_ADMIN') {
                    setAuthToken(response.data.token);
                    window.localStorage.setItem('user', response.data.id);
                    window.localStorage.setItem('email', response.data.email);
                    window.localStorage.setItem('role', response.data.role);
                    navigate('/Admin/Category');
                } else {
                    message.error('Your account does not have authority to access this');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onRegister = () => {
        navigate('/register');
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-br from-indigo-300'>
            <Form form={form} name='admin-login-form' className='bg-white rounded-lg shadow-md p-8 w-96' onFinish={onFinish}>
                <h4 className='text-center text-2xl font-bold mb-4'>Login</h4>
                <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input className='w-full' />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className='w-full' />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' className='w-full'>
                        Login
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AdminLogin;
