import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import {
    Button,
    Checkbox,
    Col,
    Flex,
    Form,
    Input,
    notification,
    Row,
} from 'antd';
import { register } from '../services/auth';
import { Link, useNavigate } from 'react-router-dom';

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

function Register() {
    const [form] = Form.useForm();
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
                    message: 'Thành công',
                    description: data.data.message,
                    duration: 2,
                    placement: 'top',
                });
                return navigate('/login');
            } else {
                let message = '';
                if (data.response.data.message !== undefined) {
                    data.response.data.message;
                } else {
                    data.response.data.messages.map((value) => {
                        message += value;
                        message += '\n';
                    });
                }
                notification.warning({
                    message: 'Thất bại',
                    description: message,
                    duration: 2,
                    placement: 'top',
                });
            }
        } catch (error) {
            notification.error({
                message: 'Lỗi',
                description: 'Lỗi trong quá trình đăng ký tài khoản.',
                duration: 2,
                placement: 'top',
            });
        }
    };

    return (
        <>
            <HeaderComponent modeTheme="light" selectedPage="3" />
            <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-600">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    // layout='vertical'
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    style={{
                        minWidth: 500,
                        backgroundColor: 'white',
                        padding: '40px',
                        borderRadius: '10px',
                    }}
                    scrollToFirstError
                >
                    <h1 className="text-center mb-10 text-3xl">Đăng ký</h1>
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
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
                                            'The new password that you entered do not match!',
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item> */}

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Should accept agreement',
                                              ),
                                          ),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <Link to="/">agreement</Link>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
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
