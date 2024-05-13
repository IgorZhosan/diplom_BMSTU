import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Просто переход на страницу "/main" без аутентификации
    navigate("/main");
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш email!",
            type: "email",
          },
        ]}
      >
        <Input name="email" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш пароль!",
            min: 6,
          },
        ]}
      >
        <Input.Password name="password" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
