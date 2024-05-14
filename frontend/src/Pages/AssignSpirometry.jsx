import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AssignSpirometry = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Назначить спирометрию</Title>
      <p>Здесь будет функционал для назначения спирометрии.</p>
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

export default AssignSpirometry;
