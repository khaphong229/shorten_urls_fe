import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function FooterComponent() {
    return (
        <Footer
            style={{
                textAlign: 'center',
                fontFamily: 'Segoe UI',
                background: '#fff',
            }}
        >
            ProLink.vip ©{new Date().getFullYear()} Quản lý mọi liên kết, kết
            trái từ Share Link.
        </Footer>
    );
}

export default FooterComponent;
