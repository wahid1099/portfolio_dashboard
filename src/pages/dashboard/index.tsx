import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const menuItems = [
    { key: "/about", icon: <UserOutlined />, label: "About" },
    { key: "/projects", icon: <ProjectOutlined />, label: "Projects" },
    { key: "/article", icon: <FileTextOutlined />, label: "Article" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsed={false}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          background: "#2C3E50", // Updated to a darker, modern shade
          paddingTop: 16,
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
            color: "#ECF0F1", // Light text for contrast
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          My Dashboard
        </div>
        <Menu
          theme="dark"
          selectedKeys={[
            location.pathname === "/" ? "/about" : location.pathname,
          ]}
          mode="inline"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: <span style={{ color: "#ECF0F1" }}>{item.icon}</span>,
            label: (
              <Link to={item.key} style={{ color: "#ECF0F1" }}>
                {item.label}
              </Link>
            ),
          }))}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            background: "#F4F6F8", // Softer off-white for the content area
            padding: 24,
            minHeight: "100vh",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              background: "#FFFFFF", // Pure white card for content
              borderRadius: 8,
              padding: 24,
              minHeight: "100%",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)", // Subtle shadow for depth
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
