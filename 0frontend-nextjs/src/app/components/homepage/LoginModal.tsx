"use client";

import { Modal, Form, Input, Button } from "antd";

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
    <Modal title="Login" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
