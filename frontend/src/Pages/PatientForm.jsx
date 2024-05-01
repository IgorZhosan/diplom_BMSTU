import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { PatientContext } from "./PatientContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const PatientForm = () => {
  const { savePatientInfo, isFilled } = useContext(PatientContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    snils: "",
    allergies: "",
  });

  useEffect(() => {
    if (isFilled) {
      navigate("/main"); // Перенаправляем, если форма уже заполнена
    }
  }, [isFilled, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    savePatientInfo(formData);
    navigate("/main");
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="ФИО">
        <Input name="fullName" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label="Пол">
        <Select
          name="gender"
          onChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <Option value="Мужской">Мужской</Option>
          <Option value="Женский">Женский</Option>
        </Select>
      </Form.Item>
      <Form.Item label="СНИЛС">
        <Input name="snils" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item label="Аллергии">
        <Input name="allergies" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
