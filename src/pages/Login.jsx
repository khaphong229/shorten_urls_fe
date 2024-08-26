import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values;
        const userData = {
            email,
            password,
        };
        try {
            const data = await login(userData);
            console.log(data);
            if (data.status < 400) {
                localStorage.setItem('accessToken', data.data.accessToken);
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: data.data.message,
                });
                setTimeout(() => navigate('/dashboard'), 1000);
            } else {
                notification.warning({
                    message: 'Đăng nhập thất bại',
                    description: data.response.data.message,
                });
            }
        } catch (error) {
            notification.error({
                message: 'Đăng nhập thất bại',
                description:
                    error.message ||
                    'An error occurred while creating your account.',
            });
        }
    };

    return (
        <>
            <HeaderComponent modeTheme="light" selectedPage="2" />
            <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-600">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{
                        maxWidth: 600,
                        boxShadow:
                            '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        padding: 72,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                    }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <h1 className="text-center mb-5 text-3xl">Đăng nhập</h1>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password size="large" />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <FooterComponent />
        </>
    );
}

export default Login;
