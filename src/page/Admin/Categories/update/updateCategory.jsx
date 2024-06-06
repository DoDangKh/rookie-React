import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { update } from '../../../../api/CategoryApi';
import { request } from '../../../../axios_helper';


const UpdateCategory = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState(null);



    const onFinish = async (values) => {
        try {
            if (!values.name) values.name = categories.name;
            if (!values.description) values.description = categories.description;
            await update({ id, ...values, status: true });
            message.success('Update success')
        } catch (error) {
            console.log(error);
            message.error('Update Error')
        }
    };

    useEffect(() => {
        request('GET', `/category/${id}`)
            .then((res) => {
                setCategories(res.data);
                form.setFieldsValue({
                    name: res.data.name,
                    description: res.data.description,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [form, id]);

    if (!categories) {
        return <CircularProgress className="justify-self-center w-10" />;
    }

    return (
        <div className="p-10  w-100">
            <h2 className="text-center">Update Category</h2>
            <Form form={form} onFinish={onFinish}>
                <p>Category ID: {categories.id}</p>
                <Form.Item
                    label="Category's Name"
                    name="name"
                    className="mb-6"
                    rules={[{ required: true, message: "Please input category's name!" }]}
                >
                    <Input className="w-full" />
                </Form.Item>
                <Form.Item
                    label="Category's Description"
                    name="description"
                    className="mb-6"
                    rules={[{ required: true, message: "Please input category's description!" }]}
                >
                    <Input className="w-full" />
                </Form.Item>
                <div className="flex gap-10 justify-center">
                    <Button type="primary" htmlType="submit" className="w-full">
                        Submit
                    </Button>
                    <Button type="button" onClick={() => navigate('/Admin/Category')} className="w-full">
                        Quit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UpdateCategory;
