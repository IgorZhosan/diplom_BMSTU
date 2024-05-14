import React, { useEffect, useState } from "react";
import { Button, Typography, Space, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const MainPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    const lastname = localStorage.getItem("lastname");
    if (name) {
      setUserName(name);
    }
    if (lastname) {
      setUserLastName(lastname);
    }
  }, []);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Title level={1} style={{ color: "#005a8d" }}>
            Добро пожаловать{userName && `, ${userName} ${userLastName}`}!
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
          onClick={() => navigate("/analysis")}
        >
          Анализы
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/start_fvd")}
        >
          Начать диагностику
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/patient")}
        >
          Информация о пациенте
        </Button>
      </Space>
    </div>
  );
};

export default MainPage;
