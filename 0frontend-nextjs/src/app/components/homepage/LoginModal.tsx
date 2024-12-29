"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Button } from "antd";
import Link from "next/link";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Login form values:", values);
    onClose();
  };

  return (
    <>
      <Link href={"/login"}>
        <ArrowLeftOutlined /> Back to homepage
      </Link>
    </>
  );
}
