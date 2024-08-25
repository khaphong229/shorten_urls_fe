import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Button, Form, Input } from 'antd';

// Layout and validation configuration
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

// Handle form submission
const onFinish = (values) => {
  console.log('Form values:', values);
};

function Register() {
  return (
    <>
      <HeaderComponent modeTheme="dark" selectedPage="3" />
      <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-600">
        <Form
          {...layout}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            padding: 40,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}
          validateMessages={validateMessages}
        >
          {/* Username field */}
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" />
          </Form.Item>
          
          {/* Email field */}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', required: true, message: 'Please input a valid email!' }]}
          >
            <Input size="large" />
          </Form.Item>
          
          {/* Password field */}
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          
          {/* Confirm Password field */}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          
          {/* Submit button */}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
            <Button type="primary" htmlType="submit" size="large">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <FooterComponent />
    </>
  );
}

export default Register;
