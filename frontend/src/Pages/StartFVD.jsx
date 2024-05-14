import React, { useContext, useState } from "react";
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const StartFVD = () => {
  const { addAnalysisResult } = useContext(PatientContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const generateRandomValue = (min, max) => {
    return (Math.random() * (max - min) + min).toFixed(2);
  };

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const result = {
        date: new Date().toISOString(),
        data: {
          FVC: generateRandomValue(3.0, 5.0),
          FEVL: generateRandomValue(2.5, 4.0),
          PEF: generateRandomValue(4.0, 10.0),
          ELA: generateRandomValue(1.5, 3.5),
          FEW25: generateRandomValue(2.0, 4.0),
          FEW50: generateRandomValue(2.5, 5.0),
          FEW75: generateRandomValue(3.0, 6.0),
          FET: generateRandomValue(1.0, 3.0),
          EVol: generateRandomValue(1.0, 4.0),
          FIVc: generateRandomValue(2.0, 4.5),
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
