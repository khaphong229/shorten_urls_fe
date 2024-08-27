import React, { useState } from "react";
import {
  DesktopOutlined,
  GlobalOutlined,
  LinkOutlined,
  SendOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

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
  getItem("Tạo liên kết nhanh", "1", <SendOutlined />),
  getItem(<Link to='/dashboard'>Bảng điều khiển</Link>, "2", <DesktopOutlined />),
  getItem(<Link to='/link'>Website rút gọn</Link>, "3", <GlobalOutlined />),
  getItem(<Link to='/shortlink'>Quản lý liên kết</Link>, "4", <LinkOutlined />),
  getItem(<Link to='/quick'>Quick link</Link>, "5", <ThunderboltOutlined />),
  getItem("Người dùng", "sub1", <UserOutlined />, [
    getItem(<Link to='/change-password'>Đổi mật khẩu</Link>, "6"),
    getItem(<Link to='/change-password'>Thông tin</Link>, "7"),
    getItem("Đăng xuất", "8"),
  ]),
];

const App = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div className="demo-logo-vertical text-white text-center my-10 text-xl"></div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ paddingLeft: 30, color: 'white'}}>
          Bảng điều khiển
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
                <Link to='/dashboard'>Dashboard</Link>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
        ProLink.vip ©{new Date().getFullYear()} Quản lý mọi liên kết, kết
        trái từ Share Link.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
