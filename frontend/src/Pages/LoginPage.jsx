import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (values) => {
    const storedLogin = localStorage.getItem("login");
    const storedPassword = localStorage.getItem("password");

    if (values.login === storedLogin && values.password === storedPassword) {
      message.success("Вход выполнен успешно!");
      navigate("/main");
    } else {
      message.error("Неправильный логин или пароль.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px" }}
      >
        Вход
      </h2>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ fontSize: "20px" }}
      >
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Логин</span>}
          name="login"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш логин!",
            },
          ]}
        >
          <Input
            name="login"
            onChange={handleInputChange}
            value={formData.login}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Пароль</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш пароль!",
            },
          ]}
        >
          <Input.Password
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              fontSize: "20px",
              padding: "10px 24px",
              width: "100%",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Войти
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            onClick={() => navigate("/register")}
            style={{
              fontSize: "20px",
              padding: "10px 24px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
