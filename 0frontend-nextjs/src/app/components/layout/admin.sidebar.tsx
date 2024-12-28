"use client";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";

const AdminSideBar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "User",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "Employee",
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: "Books",
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSideBar;
