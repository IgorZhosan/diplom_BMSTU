import React from "react";
import { Typography, Button, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const DoctorPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Title level={1} style={{ textAlign: "center", color: "#005a8d" }}>
            Добро пожаловать, Врач!
          </Title>
        </Col>
        <Col>
          <Button type="primary" danger onClick={handleLogout}>
            Выйти
          </Button>
        </Col>
      </Row>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/view-patient-history")}
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
