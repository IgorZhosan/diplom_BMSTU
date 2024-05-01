import React, { useState } from "react";
import { Button, Modal, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const StartFVD = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success("Анализ ФВД завершен");
      navigate("/");
    }, 3000); // Имитация загрузки анализа длится 3 секунды
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button type="primary" onClick={startAnalysis} disabled={loading}>
        {loading ? <Spin /> : "Начать анализ ФВД"}
      </Button>
      <Modal
        title="Инструкция по анализу ФВД"
        visible={loading}
        footer={null}
        onCancel={() => setLoading(false)}
      >
        <p>
          Перед началом анализа убедитесь, что сидите ровно, расслаблены, ноги
          не перекрещены.
        </p>
        <p>Прибор для измерения должен быть строго горизонтально удерживаем.</p>
      </Modal>
    </div>
  );
};

export default StartFVD;
