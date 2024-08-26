import React, { useState } from 'react';
import {
  DesktopOutlined,
  GlobalOutlined,
  LinkOutlined,
  SendOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

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
  getItem('Bảng điều khiển', '2', <DesktopOutlined />),
  getItem('Website rút gọn', '3', <GlobalOutlined />),
  getItem('Quản lý liên kết ', '4', <LinkOutlined />),
  getItem('Quick link ', '5', <ThunderboltOutlined />),
  getItem('Người dùng', 'sub1', <UserOutlined />, [
    getItem('Đổi mật khẩu', '6'),
    getItem('Thông tin', '7'),
    getItem('Đăng xuất', '8'),
  ]),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
        <div className="demo-logo-vertical text-white text-center my-10 text-xl"></div>
        <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline" items={items}/>
      </Sider>
    </Layout>
  );
};

export default App;
