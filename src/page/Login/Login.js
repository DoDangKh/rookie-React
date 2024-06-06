import React from 'react';
import { Form, Input, Button } from 'antd';
import { request, setAuthToken } from '../../axios_helper';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        request('POST', '/auth/login', {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response.data);
            setAuthToken(response.data.token);
            window.localStorage.setItem('user', response.data.id);
            window.localStorage.setItem('email', response.data.email);
            console.log('id:', window.localStorage.getItem('user'));
            console.log('id:', window.localStorage.getItem('email'));
            navigate('/');
        }).catch((error) => {
            console.log(error);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onRegister = () => {
        navigate('/register');
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <Form
                    name='login-form'
                    layout='vertical'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Email'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input.Password className='w-full' />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='w-full'>
                            Login
                        </Button>
                        <Button type='primary' onClick={onRegister} className='w-full mt-3'>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
