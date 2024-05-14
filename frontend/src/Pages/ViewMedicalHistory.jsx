import React, { useContext } from "react";
import { Typography, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const { Title } = Typography;

const ViewMedicalHistory = () => {
  const { patientInfo } = useContext(PatientContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Медицинская история пациента</Title>
      <List>
        <List.Item>ФИО: {patientInfo.fullName}</List.Item>
        <List.Item>Пол: {patientInfo.gender}</List.Item>
        <List.Item>СНИЛС: {patientInfo.snils}</List.Item>
        <List.Item>Аллергии: {patientInfo.allergies}</List.Item>
      </List>
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

export default ViewMedicalHistory;
