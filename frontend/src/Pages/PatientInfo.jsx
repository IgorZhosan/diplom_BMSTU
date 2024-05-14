import React, { useContext } from "react";
import { List, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const { Title } = Typography;

const PatientInfo = () => {
  const { patientInfo, setIsFilled } = useContext(PatientContext);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsFilled(false);
    navigate("/form");
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Информация о пациенте</Title>
      <List>
        <List.Item>ФИО: {patientInfo.fullName}</List.Item>
        <List.Item>Пол: {patientInfo.gender}</List.Item>
        <List.Item>СНИЛС: {patientInfo.snils}</List.Item>
        <List.Item>Аллергии: {patientInfo.allergies}</List.Item>
      </List>
      <Button type="primary" onClick={handleEdit} style={{ marginTop: 20 }}>
        Изменить данные
      </Button>
      <Button
        type="primary"
        onClick={() => navigate("/main")}
        style={{ marginTop: 20 }}
      >
        Вернуть в главное меню
      </Button>
    </div>
  );
};

export default PatientInfo;
