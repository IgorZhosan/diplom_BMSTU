import React, { useContext } from "react";
import { List, Typography } from "antd";
import { PatientContext } from "./PatientContext";

const { Title } = Typography;

const PatientInfo = () => {
  const { patientInfo } = useContext(PatientContext);

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Информация о пациенте</Title>
      <List>
        <List.Item>ФИО: {patientInfo.fullName}</List.Item>
        <List.Item>Пол: {patientInfo.gender}</List.Item>
        <List.Item>СНИЛС: {patientInfo.snils}</List.Item>
        <List.Item>Аллергии: {patientInfo.allergies}</List.Item>
      </List>
    </div>
  );
};

export default PatientInfo;
