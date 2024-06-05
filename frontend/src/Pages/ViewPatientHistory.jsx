import React, { useState } from "react";
import { Form, Input, Button, Typography, List, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ViewPatientHistory = () => {
  const [snils, setSnils] = useState("");
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate(); // Убедимся, что useNavigate импортирован и используется корректно

  const handleInputChange = (e) => {
    setSnils(e.target.value);
  };

  const handleSearch = () => {
    const storedPatientInfo = localStorage.getItem("patientInfo");

    if (storedPatientInfo) {
      const parsedPatientInfo = JSON.parse(storedPatientInfo);
      if (parsedPatientInfo.snils === snils) {
        setPatientData(parsedPatientInfo);
      } else {
        message.error("Пациент с таким СНИЛС не найден.");
      }
    } else {
      message.error("Пациент с таким СНИЛС не найден.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Просмотр медицинской истории пациента</Title>
      <Form layout="vertical" onFinish={handleSearch}>
        <Form.Item label="СНИЛС пациента" required>
          <Input value={snils} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Найти
          </Button>
        </Form.Item>
      </Form>

      {patientData && (
        <div style={{ marginTop: 20 }}>
          <Title level={3}>Информация о пациенте</Title>
          <List>
            <List.Item>ФИО: {patientData.fullName}</List.Item>
            <List.Item>Пол: {patientData.gender}</List.Item>
            <List.Item>СНИЛС: {patientData.snils}</List.Item>
            <List.Item>Аллергии: {patientData.allergies}</List.Item>
          </List>
        </div>
      )}
      <Button
        type="primary"
        onClick={() => navigate("/doctor")}
        style={{ marginTop: 20 }}
      >
        Вернуться к меню врача
      </Button>
    </div>
  );
};

export default ViewPatientHistory;
