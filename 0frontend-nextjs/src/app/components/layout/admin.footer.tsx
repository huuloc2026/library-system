"use client";
import { Layout } from "antd";
import React from "react";

const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        {" "}
        ©{new Date().getFullYear()} Huu Loc - create by Huuloc2026{" "}
      </Footer>
    </>
  );
};

export default AdminFooter;
