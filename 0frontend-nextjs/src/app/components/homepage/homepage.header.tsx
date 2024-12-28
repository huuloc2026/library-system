"use client";

import { useState } from "react";
import { Input, Button } from "antd";
import {
  SearchOutlined,
  LoginOutlined,
  UserAddOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";



const { Search } = Input;

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
          Huu Loc Library <AliwangwangOutlined />
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Search
            placeholder="Search for books..."
            enterButton={<SearchOutlined className="text-blue-600" />}
            size="large"
            className="max-w-md w-full"
            onSearch={(value) => console.log(value)}
          />
          <div className="flex space-x-2">
            <Button
              type="primary"
              icon={<LoginOutlined />}
              size="large"
              className="bg-white text-blue-600 hover:bg-blue-50 border-white"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </Button>
            <Button
              icon={<UserAddOutlined />}
              size="large"
              className="bg-blue-500 text-white hover:bg-blue-400 border-blue-500"
              onClick={() => setIsRegisterModalOpen(true)}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </header>
  );
}
