"use client";

import { Layout } from "antd";
import React from "react";
const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    const {Content} = Layout
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: "#ccc",
        borderRadius: "#cc1",
      }}
    >
      {children}
    </Content>
  );
};

export default AdminContent;
