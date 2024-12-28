"use client";

import { Button, Layout } from "antd";

const AdminHeader = () => {
  const { Header } = Layout;

  return (
    <Header className="m-6 p-6 bg-gray-500 rounded-md shadow-md text-center font-serif">
      <div className=" text-white text-2xl justify-between p-4"> Welcome to my Dashboard ! Have a good day</div>
    </Header>
  );
};

export default AdminHeader;
