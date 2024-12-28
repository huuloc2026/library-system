"use client";

import {
  BookOutlined,
  SolutionOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import React, { useState } from "react";

const AdminSideBar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="min-h-screen bg-gray-800"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900 text-white">
        <span className="text-lg font-bold">{!collapsed && "Admin Panel"}</span>
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className="text-white" />
            ) : (
              <MenuFoldOutlined className="text-white" />
            )
          }
          onClick={toggleCollapsed}
          className="text-white"
        />
      </div>

      {/* Sidebar Menu */}
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
            icon: <SolutionOutlined />,
            label: "Employee",
          },
          {
            key: "3",
            icon: <BookOutlined />,
            label: "Books",
          },
        ]}
        className="bg-gray-800 text-gray-200"
      />
    </Sider>
  );
};

export default AdminSideBar;
