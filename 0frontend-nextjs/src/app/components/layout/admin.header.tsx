'use client'


import { Button, Layout, theme } from 'antd'

const AdminHeader = () => {

    const {Header} = Layout

  return (
    <Header style={{ margin: "24px 16px",
            padding: 24, background: "#ccc" }}>
      This is Header
    </Header>
  );
}

export default AdminHeader