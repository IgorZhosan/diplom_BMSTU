import React, { useContext, useMemo } from "react";
import {
  Typography,
  Divider,
  Collapse,
  Button,
  List,
  Empty,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Analysis = () => {
  const { analysisHistory } = useContext(PatientContext);
  const navigate = useNavigate();

  const generateChartData = () => {
    let data = [];
    for (let i = 0; i <= 100; i++) {
      const time = i / 10;
      const expVolume = Math.exp(-time / 2) * 20 * Math.sin(time);
      const flowRate =
        -Math.exp(-time / 2) * (2 * Math.sin(time) + (20 * Math.cos(time)) / 2);
      const MOS25 = expVolume * 0.25;
      const MOS50 = expVolume * 0.5;
      const MOS75 = expVolume * 0.75;
      const SOC = flowRate * 1.5; // Примерная формула для СОС
      data.push({ time, expVolume, flowRate, MOS25, MOS50, MOS75, SOC });
    }
    return data;
  };

  const chartData = useMemo(() => generateChartData(), []);

  if (analysisHistory.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <Title level={2}>История анализов ФВД</Title>
        <Empty description="Список пуст" />
        <Button
          type="primary"
          onClick={() => navigate("/main")}
          style={{ marginTop: 20 }}
        >
          Вернуться в главное меню
        </Button>
      </div>
    );
  }

  const renderMedicalAdvice = (itemData) => {
    const medicalAdvice = getMedicalAdvice(itemData);
    if (medicalAdvice) {
      return (
        <Paragraph>
          <Text type="danger">{medicalAdvice}</Text>
        </Paragraph>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>История анализов ФВД</Title>
      <Collapse accordion>
        {analysisHistory.map((item, index) => (
          <Panel
            header={`Анализ от ${new Date(item.date).toLocaleDateString()} ${new Date(item.date).toLocaleTimeString()}`}
            key={index}
          >
            <List
              dataSource={Object.entries(item.data)}
              renderItem={([key, value]) => (
                <List.Item key={key}>
                  <Text strong>{key}:</Text>{" "}
                  <Text style={{ color: getColor(value, getNormalRange(key)) }}>
                    {typeof value === "number" ? value.toFixed(2) : value}
                  </Text>
                </List.Item>
              )}
            />
            {renderMedicalAdvice(item.data)}
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData}>
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                  dataKey="time"
                  name="Время"
                  unit="с"
                  label={{
                    value: "Время (с)",
                    position: "insideBottomRight",
                    offset: 0,
                  }}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Объем (л)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Скорость потока (л/с)",
                    angle: 90,
                    position: "insideRight",
                  }}
                />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="expVolume"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Экспирационный объем"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="flowRate"
                  stroke="#82ca9d"
                  name="Скорость потока"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="MOS25"
                  stroke="#ffc658"
                  name="МОС25"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="MOS50"
                  stroke="#ff8042"
                  name="МОС50"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="MOS75"
                  stroke="#fa8072"
                  name="МОС75"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="SOC"
                  stroke="#4661EE"
                  name="СОС"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
        ))}
      </Collapse>
      <Button
        type="primary"
        onClick={() => navigate("/main")}
        style={{ marginTop: 20 }}
      >
        Вернуться в главное меню
      </Button>
    </div>
  );
};

function getNormalRange(parameter) {
  const ranges = {
    FVC: [2.5, 5.0],
    FEVL: [1.0, 3.0],
    PEF: [2.5, 7.5],
    ELA: [1.0, 3.0],
    FEW25: [1.0, 4.0],
    FEW50: [1.0, 4.0],
    FEW75: [0.5, 3.0],
    FET: [1.0, 3.5],
    EVOl: [1.0, 4.0],
    FIVc: [1.0, 4.0],
  };
  return ranges[parameter] || [0, 100];
}

function getColor(value, normalRange) {
  if (value < normalRange[0]) return "#ffa39e"; // Красный
  if (value > normalRange[1]) return "#ffec3d"; // Желтый
  return "#b7eb8f"; // Зеленый
}

function getMedicalAdvice(data) {
  const keys = Object.keys(data);
  for (let key of keys) {
    const value = data[key];
    const normalRange = getNormalRange(key);
    if (value < normalRange[0]) {
      return `Значение параметра ${key} ниже нормы`;
    }
    if (value > normalRange[1]) {
      return `Значение параметра ${key} выше нормы`;
    }
  }
  return null;
}

export default Analysis;
