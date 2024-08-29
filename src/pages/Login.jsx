import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Button, Checkbox, Flex, Form, Input, notification, Spin } from 'antd';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values;
        const userData = {
            email,
            password,
        };
        try {
            const data = await login(userData);
            if (data.status < 400) {
                localStorage.setItem('accessToken', data.data.accessToken);
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: data.data.message,
                    duration: 2,
                });
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                }, 500);
            } else {
                notification.warning({
                    message: 'Đăng nhập thất bại',
                    description: data.response.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Lỗi trong khi đăng nhập tài khoản',
            });
        }
    };

    return (
        <>
            <HeaderComponent modeTheme="light" selectedPage="2" />
            {loading ? (
                <Spin
                    indicator={
                        <LoadingOutlined style={{ fontSize: 50 }} spin />
                    }
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                />
            ) : (
                <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600">
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        style={{
                            minWidth: 500,
                            backgroundColor: 'white',
                            padding: '70px',
                            borderRadius: '10px',
                        }}
                    >
                        <h1 className="text-center mb-12 text-3xl">
                            Đăng nhập
                        </h1>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid Email!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="">Forgot password</a>
                            </Flex>
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                        <div>
                            or{' '}
                            <Link to="/register" className="pt-4">
                                Register now!
                            </Link>
                        </div>
                    </Form>
                </div>
            )}
            <FooterComponent />
        </>
    );
}

export default Login;
