// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const items = [
    {
        key: 1,
        label: <Link to="/">Trang chủ</Link>,
    },
    {
        key: 2,
        label: <Link to="/login">Đăng nhập</Link>,
    },
    {
        key: 3,
        label: <Link to="/register">Đăng ký</Link>,
    },
];

const HeaderComponent = ({ modeTheme, selectedPage }) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        //cleanup function 
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    let colorLogo = modeTheme === 'light' ? 'black' : 'white';

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                width: '100%',
                zIndex: 1000,
                background: modeTheme === 'light' ? '#ffffff' : '#000',
                padding: 0,
                boxShadow: scrolled ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
            }}
        >
            <div className={`demo-logo ml-10 text-${colorLogo}`}>
                ProLink.vip
            </div>
            <Menu
                theme={modeTheme}
                mode="horizontal"
                defaultSelectedKeys={[selectedPage]}
                items={items}
                style={{
                    flex: 1,
                    minWidth: 0,
                    justifyContent: 'center',
                    background: modeTheme === 'light' ? '#ffffff' : '#000',
                    borderBottom: 'none',
                }}
            />
        </Header>
    );
};

export default HeaderComponent;
