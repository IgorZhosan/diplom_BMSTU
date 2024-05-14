import React, { useContext } from "react";
import { Typography, Collapse, Button, List, Empty } from "antd";
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

const { Title, Text } = Typography;
const { Panel } = Collapse;

const ViewFVDResults = () => {
  const { analysisHistory } = useContext(PatientContext);
  const navigate = useNavigate();

  const generateChartData = (itemData) => {
    let data = [];
    for (let i = 0; i <= 100; i++) {
      const time = i / 10;
      const expVolume = Math.exp(-time / 2) * 20 * Math.sin(time);
      const flowRate =
        -Math.exp(-time / 2) * (2 * Math.sin(time) + (20 * Math.cos(time)) / 2);
      data.push({ time, expVolume, flowRate });
    }
    return data;
  };

  if (analysisHistory.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <Title level={2}>История анализов ФВД</Title>
        <Empty description="Список пуст" />
        <Button
          type="primary"
          onClick={() => navigate("/doctor")}
          style={{ marginTop: 20 }}
        >
          Вернуться к меню врача
        </Button>
      </div>
    );
  }

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
                    {value.toFixed(2)}
                  </Text>
                </List.Item>
              )}
            />
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={generateChartData(item.data)}>
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
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>
        ))}
      </Collapse>
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

function getNormalRange(parameter) {
  const ranges = {
    FVC: [3.0, 5.0],
    FEVL: [2.5, 4.0],
    PEF: [4.0, 10.0],
    ELA: [1.5, 3.5],
    FEW25: [2.0, 4.0],
    FEW50: [2.5, 5.0],
    FEW75: [3.0, 6.0],
    FET: [1.0, 3.0],
    EVol: [1.0, 4.0],
    FIVc: [2.0, 4.5],
  };
  return ranges[parameter] || [0, 100];
}

function getColor(value, normalRange) {
  if (value < normalRange[0]) return "#ffa39e"; // Красный
  if (value > normalRange[1]) return "#ffec3d"; // Желтый
  return "#b7eb8f"; // Зеленый
}

export default ViewFVDResults;
