import React, { useContext, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const { Option } = Select;

const RegistrationForm = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    role: "patient",
    speciality: "",
    experience: "",
    specialization: "",
    age: "",
    policy: "",
    login: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setUserType(value);
    setFormData((prev) => ({ ...prev, role: value }));
    form.setFieldsValue({ role: value });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.role ||
      !formData.login ||
      !formData.password ||
      (userType === "doctor" &&
        (!formData.speciality ||
          !formData.experience ||
          !formData.specialization)) ||
      (userType === "patient" && (!formData.age || !formData.policy))
    ) {
      message.error("Пожалуйста, заполните все обязательные поля.");
      return;
    }
    // Сохранение логина и пароля в localStorage
    localStorage.setItem("login", formData.login);
    localStorage.setItem("password", formData.password);
    registerUser({ ...formData });
    message.success("Регистрация прошла успешно!");
    setFormData({
      name: "",
      lastname: "",
      role: "patient",
      speciality: "",
      experience: "",
      specialization: "",
      age: "",
      policy: "",
      login: "",
      password: "",
    });
    navigate("/login");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "40px", fontSize: "32px" }}
      >
        Регистрация
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ fontSize: "20px" }}
        initialValues={{ role: "patient" }}
      >
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Роль</span>}
          name="role"
          rules={[{ required: true, message: "Выберите роль пользователя!" }]}
        >
          <Select onChange={handleRoleChange} style={{ fontSize: "20px" }}>
            <Option value="doctor" style={{ fontSize: "20px" }}>
              Врач
            </Option>
            <Option value="patient" style={{ fontSize: "20px" }}>
              Пациент
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Имя</span>}
          name="name"
          rules={[{ required: true, message: "Введите ваше имя!" }]}
        >
          <Input
            onChange={handleInputChange}
            name="name"
            value={formData.name}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Фамилия</span>}
          name="lastname"
          rules={[{ required: true, message: "Введите вашу фамилию!" }]}
        >
          <Input
            onChange={handleInputChange}
            name="lastname"
            value={formData.lastname}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Логин</span>}
          name="login"
          rules={[{ required: true, message: "Введите ваш логин!" }]}
        >
          <Input
            onChange={handleInputChange}
            name="login"
            value={formData.login}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        <Form.Item
          label={<span style={{ fontSize: "20px" }}>Пароль</span>}
          name="password"
          rules={[{ required: true, message: "Введите ваш пароль!" }]}
        >
          <Input.Password
            onChange={handleInputChange}
            name="password"
            value={formData.password}
            style={{ fontSize: "20px", padding: "10px" }}
          />
        </Form.Item>
        {userType === "doctor" && (
          <>
            <Form.Item
              label={<span style={{ fontSize: "20px" }}>Специальность</span>}
              name="speciality"
              rules={[
                { required: true, message: "Введите вашу специальность!" },
              ]}
            >
              <Input
                onChange={handleInputChange}
                name="speciality"
                value={formData.speciality}
                style={{ fontSize: "20px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: "20px" }}>Опыт</span>}
              name="experience"
              rules={[{ required: true, message: "Введите ваш опыт!" }]}
            >
              <Input
                type="number"
                onChange={handleInputChange}
                name="experience"
                value={formData.experience}
                style={{ fontSize: "20px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: "20px" }}>Специализация</span>}
              name="specialization"
              rules={[
                { required: true, message: "Введите вашу специализацию!" },
              ]}
            >
              <Input
                onChange={handleInputChange}
                name="specialization"
                value={formData.specialization}
                style={{ fontSize: "20px", padding: "10px" }}
              />
            </Form.Item>
          </>
        )}
        {userType === "patient" && (
          <>
            <Form.Item
              label={<span style={{ fontSize: "20px" }}>Возраст</span>}
              name="age"
              rules={[{ required: true, message: "Введите ваш возраст!" }]}
            >
              <Input
                type="number"
                onChange={handleInputChange}
                name="age"
                value={formData.age}
                style={{ fontSize: "20px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: "20px" }}>Полис</span>}
              name="policy"
              rules={[{ required: true, message: "Введите ваш полис!" }]}
            >
              <Input
                onChange={handleInputChange}
                name="policy"
                value={formData.policy}
                style={{ fontSize: "20px", padding: "10px" }}
              />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
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

export default RegistrationForm;
