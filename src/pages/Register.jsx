import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Button, Form, Input, notification } from 'antd';
import { register } from '../services/auth';
import { redirect, useNavigate } from 'react-router-dom';

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

function Register() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { username, email, password, confirm } = values;
        try {
            const userData = {
                username,
                email,
                password,
                confirmPassword: confirm,
            };
            const data = await register(userData);
            const status = data.status;

            if (status < 400) {
                notification.success({
                    message: 'Đăng ký thành công',
                    description: data.data.message,
                });
                return navigate('/login')
            } else {
                notification.warning({
                    message: 'Đăng ký thất bại',
                    description: data.response.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Đăng ký thất bại',
                description:
                    error.message ||
                    'An error occurred while creating your account.',
            });
        }
    };

    return (
        <>
            <HeaderComponent modeTheme="light" selectedPage="3" />
            <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-600">
                <Form
                    {...layout}
                    name="register"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                        boxShadow:
                            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        padding: 40,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                    }}
                    validateMessages={validateMessages}
                >
                    {/* Username field */}
                    <h1 className="text-center mb-5 text-3xl">Đăng ký</h1>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    {/* Email field */}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input a valid email!',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    {/* Password field */}
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>

                    {/* Confirm Password field */}
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue('password') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!',
                                        ),
                                    );
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
