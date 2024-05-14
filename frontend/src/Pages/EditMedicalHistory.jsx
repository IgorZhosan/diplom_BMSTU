import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const EditMedicalHistory = () => {
  const { patientInfo, savePatientInfo } = useContext(PatientContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(patientInfo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    savePatientInfo(formData);
    navigate("/doctor");
  };

  return (
    <div style={{ padding: 20 }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ФИО" name="fullName">
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Пол" name="gender">
          <Input
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="СНИЛС" name="snils">
          <Input
            name="snils"
            value={formData.snils}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Аллергии" name="allergies">
          <Input
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Form.Item>
        <Button
          type="default"
          onClick={() => navigate("/doctor")}
          style={{ marginTop: 20 }}
        >
          Отмена
        </Button>
      </Form>
    </div>
  );
};

export default EditMedicalHistory;
