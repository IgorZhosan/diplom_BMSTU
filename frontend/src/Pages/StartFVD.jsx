import React, { useState } from "react";
import { Button, Modal, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const StartFVD = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Анализ ФВД завершен");
      navigate("/main");
    }, 3000);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button type="primary" onClick={startAnalysis} disabled={loading}>
        {loading ? <Spin /> : "Начать анализ ФВД"}
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

export default StartFVD;
