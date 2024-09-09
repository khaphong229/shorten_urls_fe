import React from 'react';
import { Button, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom';

function ButtonComponent({ typeButton, content }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 4,
                },
            }}
        >
            <Button type={typeButton}>
                <Link to={content === 'Đăng nhập' ? '/login' : '/register'}>
                    {content}
                </Link>
            </Button>
        </ConfigProvider>
    );
}

export default ButtonComponent;
