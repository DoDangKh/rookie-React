import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { add } from '../../../../api/CategoryApi';

export default function AddCategories() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await add(values);
      message.success('Category added successfully');
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error('Failed to add category');
    }
  };

  const handleCancel = () => {
    navigate('/Admin/Category');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add Category</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Category's Name"
          name="name"
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item
          label="Category's Description"
          name="description"
          rules={[{ required: true, message: 'Please enter category description' }]}
        >
          <Input.TextArea placeholder="Enter category description" autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-2">
            Submit
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
