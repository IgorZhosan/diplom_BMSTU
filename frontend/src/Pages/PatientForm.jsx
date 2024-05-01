import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { PatientContext } from "./PatientContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const PatientForm = () => {
  const { patientInfo, savePatientInfo, isFilled } = useContext(PatientContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: patientInfo.fullName || "",
    gender: patientInfo.gender || "",
    snils: patientInfo.snils || "",
    allergies: patientInfo.allergies || "",
  });

  // Эффект для редиректа на главную, если данные уже заполнены
  useEffect(() => {
    if (isFilled) {
      navigate("/main");
    }
  }, [isFilled, navigate]);

  // Обработка изменений в форме
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Обработка отправки формы
  const handleSubmit = () => {
    savePatientInfo(formData);
    navigate("/main");
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="ФИО">
        <Input
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Пол">
        <Select
          value={formData.gender}
          name="gender"
          onChange={(value) => setFormData({ ...formData, gender: value })}
        >
          <Option value="Мужской">Мужской</Option>
          <Option value="Женский">Женский</Option>
        </Select>
      </Form.Item>
      <Form.Item label="СНИЛС">
        <Input
          name="snils"
          value={formData.snils}
          onChange={handleInputChange}
        />
      </Form.Item>
      <Form.Item label="Аллергии">
        <Input
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
        />
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
