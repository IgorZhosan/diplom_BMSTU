import React, { useContext, useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const StartFVD = () => {
  const { addAnalysisResult } = useContext(PatientContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const result = {
        date: new Date().toISOString(),
        data: {
          ЖЕЛ: Math.random() * 2 + 4, // Генерация случайного значения
          ФЖЕЛ: Math.random() * 1 + 3,
          ОФВ1: Math.random() * 1 + 2,
          ПСВ: Math.random() * 2 + 5,
        },
      };
      addAnalysisResult(result);
      message.success("Анализ ФВД завершен");
      navigate("/analysis");
    }, 3000);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Button type="primary" onClick={startAnalysis} disabled={loading}>
        Начать анализ ФВД
      </Button>
    </div>
  );
};

export default StartFVD;
