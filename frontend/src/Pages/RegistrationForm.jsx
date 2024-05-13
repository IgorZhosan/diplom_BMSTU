import React, { useContext, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserContext } from './UserContext'; 

const { Option } = Select;

const RegistrationForm = () => {
  const { registerUser } = useContext(UserContext);
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    login: "",
    specialty: "",
    allergies: "",
    age: "",
    weight: "",
    height: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      message.error(
        "Пожалуйста, заполните все обязательные поля: ФИО, email и пароль."
      );
      return;
    }
    registerUser({ ...formData, userType });
    message.success("Регистрация прошла успешно!");
    setFormData({
      // Сброс полей формы после успешной регистрации
      fullName: "",
      email: "",
      password: "",
      login: "",
      specialty: "",
      allergies: "",
      age: "",
      weight: "",
      height: "",
    });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Тип пользователя"
        name="userType"
        rules={[{ required: true, message: "Выберите тип пользователя!" }]}
      >
        <Select
          defaultValue="patient"
          onChange={(value) => {
            setUserType(value);
            setFormData((prev) => ({ ...prev, userType: value })); // Обновление типа пользователя в состоянии
          }}
        >
          <Option value="doctor">Врач</Option>
          <Option value="patient">Пациент</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="ФИО"
        name="fullName"
        rules={[{ required: true, message: "Введите ваше ФИО!" }]}
      >
        <Input
          onChange={handleInputChange}
          name="fullName"
          value={formData.fullName}
        />
      </Form.Item>
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Введите корректный email!",
          },
        ]}
      >
        <Input
          onChange={handleInputChange}
          name="email"
          value={formData.email}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введите пароль!" }]}
      >
        <Input.Password
          onChange={handleInputChange}
          name="password"
          value={formData.password}
        />
      </Form.Item>
      {userType === "doctor" && (
        <>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Введите логин!" }]}
          >
            <Input
              onChange={handleInputChange}
              name="login"
              value={formData.login}
            />
          </Form.Item>
          <Form.Item
            label="Специальность"
            name="specialty"
            rules={[{ required: true, message: "Укажите вашу специальность!" }]}
          >
            <Input
              onChange={handleInputChange}
              name="specialty"
              value={formData.specialty}
            />
          </Form.Item>
        </>
      )}
      {userType === "patient" && (
        <>
          <Form.Item label="Аллергии" name="allergies">
            <Input
              onChange={handleInputChange}
              name="allergies"
              value={formData.allergies}
            />
          </Form.Item>
          <Form.Item label="Возраст" name="age">
            <Input
              type="number"
              onChange={handleInputChange}
              name="age"
              value={formData.age}
            />
          </Form.Item>
          <Form.Item label="Вес" name="weight">
            <Input
              type="number"
              onChange={handleInputChange}
              name="weight"
              value={formData.weight}
            />
          </Form.Item>
          <Form.Item label="Рост" name="height">
            <Input
              type="number"
              onChange={handleInputChange}
              name="height"
              value={formData.height}
            />
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;

