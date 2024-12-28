"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

const Register = () => {
  type FieldType = {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    phoneNumber?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          {/* Email */}
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          {/* First Name */}
          <Form.Item<FieldType>
            label="First Name"
            name="firstName"
            rules={[{ required: false }]}
          >
            <Input className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          {/* Last Name */}
          <Form.Item<FieldType>
            label="Last Name"
            name="lastName"
            rules={[{ required: false }]}
          >
            <Input className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          {/* Password */}
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          {/* Phone Number */}
          <Form.Item<FieldType>
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]+$/,
                message: "Phone number must contain only digits!",
              },
            ]}
          >
            <Input className="p-2 border border-gray-300 rounded-md" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* "Forgot Password" and "Have an Account?" */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <a
              href="/auth/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
