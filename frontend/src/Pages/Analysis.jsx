import React, { useEffect, useState } from "react";
import { Typography, Divider, Table } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const { Title, Text } = Typography;

const Analysis = () => {
  const [fvdData, setFvdData] = useState([]);

  useEffect(() => {
    // Симулируем получение данных
    setFvdData([
      { time: 0, flow: 0, volume: 0 },
      { time: 1, flow: 10, volume: 10 },
      { time: 2, flow: 15, volume: 15 },
      { time: 3, flow: 5, volume: 20 },
      { time: 4, flow: -5, volume: 15 },
      { time: 5, flow: -10, volume: 5 },
      { time: 6, flow: -15, volume: 0 },
    ]);
  }, []);

  const parameters = [
    { key: "1", parameter: "ЖЕЛ", value: 5.5, normalRange: [4.8, 6.1] },
    { key: "2", parameter: "ФЖЕЛ", value: 4.5, normalRange: [3.9, 4.9] },
    { key: "3", parameter: "ОФВ1", value: 3.2, normalRange: [2.5, 3.5] },
    { key: "4", parameter: "ПОС", value: 7.0, normalRange: [5.5, 7.5] },
    { key: "5", parameter: "МОС25", value: 3.2, normalRange: [2.0, 3.4] },
    { key: "6", parameter: "МОС50", value: 4.0, normalRange: [3.2, 4.8] },
    { key: "7", parameter: "МОС75", value: 2.5, normalRange: [1.8, 2.8] },
    { key: "8", parameter: "СОС", value: 6.0, normalRange: [4.5, 6.5] },
  ];

  const getColor = (value, normalRange) => {
    if (value < normalRange[0]) return "#ffa39e"; // Red
    if (value > normalRange[1]) return "#ffec3d"; // Yellow
    return "#b7eb8f"; // Green
  };

  const columns = [
    {
      title: "Параметр",
      dataIndex: "parameter",
      key: "parameter",
    },
    {
      title: "Значение",
      dataIndex: "value",
      key: "value",
      render: (text, record) => (
        <Text style={{ color: getColor(record.value, record.normalRange) }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Норма",
      dataIndex: "normalRange",
      key: "normalRange",
      render: (text) => `${text[0]} - ${text[1]}`,
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Результаты анализа ФВД</Title>
      <Table columns={columns} dataSource={parameters} pagination={false} />
      <Divider />
      <AreaChart
        width={730}
        height={250}
        data={fvdData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="volume"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorVolume)"
        />
      </AreaChart>
      <LineChart
        width={730}
        height={250}
        data={fvdData}
        margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="flow" stroke="#82ca9d" />
      </LineChart>
      <LineChart
        width={730}
        height={250}
        data={fvdData}
        margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="volume" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="flow" stroke="#ca82d9" />
      </LineChart>
    </div>
  );
};

export default Analysis;
