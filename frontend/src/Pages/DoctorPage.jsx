import React from "react";
import { Typography, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const DoctorPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={1} style={{ textAlign: "center", color: "#005a8d" }}>
        Добро пожаловать, Врач!
      </Title>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/view-medical-history")}
        >
          Посмотреть медицинскую историю пациента
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/edit-medical-history")}
        >
          Изменить медицинскую историю пациента
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/assign-spirometry")}
        >
          Назначить спирометрию
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/view-fvd-results")}
        >
          Просмотреть результаты ФВД пациента
        </Button>
      </Space>
    </div>
  );
};

export default DoctorPage;
