import React, { useState, useCallback } from 'react';
import {
    DesktopOutlined,
    GlobalOutlined,
    LinkOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SendOutlined,
    ThunderboltOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Content, Footer, Header, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Tạo liên kết nhanh', '1', <SendOutlined />),
    getItem(
        <Link to="/dashboard">Bảng điều khiển</Link>,
        '2',
        <DesktopOutlined />,
    ),
    getItem(<Link to="/link">Website rút gọn</Link>, '3', <GlobalOutlined />),
    getItem(
        <Link to="/shortlink">Quản lý liên kết</Link>,
        '4',
        <LinkOutlined />,
    ),
    getItem(<Link to="/quick">Quick link</Link>, '5', <ThunderboltOutlined />),
    getItem('Người dùng', 'sub1', <UserOutlined />, [
        getItem(<Link to="/change-password">Đổi mật khẩu</Link>, '6'),
        getItem(<Link to="/profile">Thông tin</Link>, '7'),
        getItem(<Link to="/">Đăng xuất</Link>, '8'),
    ]),
];

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [breadcrumb, setBreadcrumb] = useState([]);
    const [currentPageName, setCurrentPageName] = useState('Bảng điều khiển');

    const updateBreadcrumb = useCallback((newBreadcrumbs) => {
        setBreadcrumb([
            {
                route: '/dashboard',
                name: 'Bảng điều khiển',
            },
            ...newBreadcrumbs,
        ]);
        if (newBreadcrumbs.length > 0) {
            setCurrentPageName(newBreadcrumbs[newBreadcrumbs.length - 1].name);
        } else {
            setCurrentPageName('Bảng điều khiển');
        }
    }, []);

    const {
        token: { colorBgContainer, borderRadiusLG, colorBorderBg },
    } = theme.useToken();

    const logo = collapsed ? 'Pro' : 'ProLink.vip';

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={250}
                style={{
                    background: colorBorderBg,
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                }}
            >
                <div className="demo-logo-vertical text-black text-center my-5 text-xl">
                    {logo}
                </div>
                <Menu
                    theme="light"
                    defaultSelectedKeys={['2']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        color: 'black',
                        padding: 0,
                        background: colorBorderBg,
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {currentPageName}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumb.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                <Link to={item.route}>{item.name}</Link>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <Outlet context={{ updateBreadcrumb }} />
                    {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            }}
          >
          </div> */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ProLink.vip ©{new Date().getFullYear()} Quản lý mọi liên
                    kết, kết trái từ Share Link.
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
