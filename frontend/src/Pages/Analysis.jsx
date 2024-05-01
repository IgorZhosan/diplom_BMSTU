import React, { useContext } from "react";
import { Typography, Divider, Collapse, Button, List, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const Analysis = () => {
  const { analysisHistory } = useContext(PatientContext);
  const navigate = useNavigate();

  const renderChart = (data) => (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={[data]}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const getColor = (value, normalRange) => {
    if (value < normalRange[0]) return "#ffa39e"; // Red
    if (value > normalRange[1]) return "#ffec3d"; // Yellow
    return "#b7eb8f"; // Green
  };

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
          Вернуть в главное меню
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
                <List.Item>
                  <Text strong>{key}:</Text>{" "}
                  <Text style={{ color: getColor(value, getNormalRange(key)) }}>
                    {value.toFixed(2)}
                  </Text>
                </List.Item>
              )}
            />
            {renderChart({ name: "Анализ", value: item.data.ЖЕЛ })}
          </Panel>
        ))}
      </Collapse>
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

function getNormalRange(parameter) {
  const ranges = {
    ЖЕЛ: [4.8, 6.1],
    ФЖЕЛ: [3.9, 4.9],
    ОФВ1: [2.5, 3.5],
    МОС25: [2.0, 3.4],
    МОС50: [3.2, 4.8],
    МОС75: [1.8, 2.8],
    СОС: [4.5, 6.5],
  };
  return ranges[parameter] || [0, 100]; // Default range if not specified
}

export default Analysis;
