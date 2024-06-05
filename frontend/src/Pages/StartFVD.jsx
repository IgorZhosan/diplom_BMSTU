import React, { useContext, useState } from "react";
import { Button, Typography, Space, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const { Title, Paragraph } = Typography;

const StartFVD = () => {
  const { patientInfo, addAnalysisResult } = useContext(PatientContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const result = {
        date: new Date().toISOString(),
        data: {
          FVC: Math.random() * 2 + 2,
          FEVL: Math.random() * 1 + 1,
          PEF: Math.random() * 2 + 3,
          ELA: Math.random() * 1 + 1,
          FEW25: Math.random() * 2 + 1,
          FEW50: Math.random() * 2 + 1,
          FEW75: Math.random() * 1 + 1,
          FET: Math.random() * 2 + 1,
          EVOl: Math.random() * 2 + 1,
          FIVc: Math.random() * 2 + 1,
        },
        snils: patientInfo.snils, // Добавляем СНИЛС к результатам анализа
      };
      addAnalysisResult(result);
      message.success("Анализ ФВД завершен");
      navigate("/analysis");
    }, 3000);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        style={{
          marginBottom: "20px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Инструкция для функции внешнего дыхания (ФВД)
        </Title>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
          Пожалуйста, следуйте этой инструкции для проведения анализа функции
          внешнего дыхания:
        </Paragraph>
        <ol
          style={{ fontSize: "16px", lineHeight: "1.6", paddingLeft: "20px" }}
        >
          <li>
            Сядьте удобно и расслабьтесь. Держите спину прямо, а ноги поставьте
            на пол.
          </li>
          <li>
            Вдохните максимально глубоко, заполняя легкие как можно больше.
          </li>
          <li>Плотно обхватите мундштук губами, не допуская утечек воздуха.</li>
          <li>Резко и максимально быстро выдохните весь воздух из легких.</li>
          <li>
            Продолжайте выдыхать до тех пор, пока легкие не будут полностью
            пустыми.
          </li>
          <li>
            Повторите тест по указанию медицинского персонала, чтобы получить
            наиболее точные результаты.
          </li>
        </ol>
        <Paragraph style={{ fontSize: "16px", lineHeight: "1.6" }}>
          Если у вас возникли вопросы или затруднения, обратитесь за помощью к
          медицинскому специалисту.
        </Paragraph>
      </Card>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={startAnalysis}
          disabled={loading}
          style={{ fontSize: "16px", padding: "10px 24px" }}
        >
          Начать анализ ФВД
        </Button>
      </div>
    </div>
  );
};

export default StartFVD;
