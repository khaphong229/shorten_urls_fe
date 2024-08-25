// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Menu, Layout } from 'antd';

const { Header } = Layout;

const items = [
    {
        key: 1,
        label: 'Trang chủ',
    },
    {
        key: 2,
        label: 'Đăng nhập',
    },
    {
        key: 3,
        label: 'Đăng ký',
    },
];

const HeaderComponent = () => {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                width: '100%',
                zIndex: 1000,
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
                style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
            />
        </Header>
    );
};

export default HeaderComponent;
