import React from "react";
import { Button, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "50px", maxWidth: "600px", margin: "0 auto" }}>
      <Title level={1} style={{ textAlign: "center", color: "#005a8d" }}>
        Добро пожаловать!
      </Title>
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
}

// import React from "react";
// import { Button, Space, Row, Col, Typography, Divider } from "antd";
// import { useNavigate } from "react-router-dom";

// import { useAuth } from "../AuthProvider";

// const { Title, Text } = Typography;

// export default function MainPage() {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <>
//       <Space direction="vertical" size="large" style={{ display: "flex" }}>
//         <Title level={1}>Добро пожаловать!</Title>
//         <Button onClick={() => {navigate("/analysis");}}>Analysis</Button>
//         <Button onClick={() => {navigate("/start_fvd");}}>StartFVD</Button>
//         <Button onClick={() => {navigate("/patient");}}>Patient</Button>
//       </Space>
//     </>
//   );
// }
