"use client";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const Login = () => {
  const onFinish = async (values: any) => {
   
    const {email,password} = values;
    const data = await signIn("credentials", {
      email,
      password,
      redirectTo: '/dashboard',
    });
     console.log("check data", data);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="p-5 shadow-md rounded-lg h-full">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
        <Link href={"/"} className="text-blue-500 flex items-center mb-4">
          <ArrowLeftOutlined className="mr-1" /> Back to homepage
        </Link>
        <Divider />
        <p className="text-center">
          Don't have an account?{" "}
          <Link href={"/auth/register"} className="text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
