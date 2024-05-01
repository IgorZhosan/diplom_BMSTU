import React, { useState, useEffect } from "react";
import { Typography, Divider, Button, Table } from "antd";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Analysis = () => {
  const navigate = useNavigate();
  const [fvdData, setFvdData] = useState([]);
  const [parameters, setParameters] = useState([]);

  useEffect(() => {
    // Симулируем получение данных для анализа форсированного выдоха
    const data = [];
    let volume = 0;
    for (let i = 0; i <= 6; i++) {
      const time = i;
      const flow = i < 3 ? 10 * i : 10 * (6 - i);
      volume += flow;
      data.push({ time, flow, volume });
    }
    setFvdData(data);

    // Данные параметров для таблицы
    setParameters([
      {
        key: "1",
        parameter: "Жизненная емкость легких (ЖЕЛ)",
        value: 5.5,
        normalRange: "4.8 - 6.1 л",
      },
      {
        key: "2",
        parameter: "Форсированная жизненная емкость (ФЖЕЛ)",
        value: 4.5,
        normalRange: "3.9 - 4.9 л",
      },
      {
        key: "3",
        parameter: "Объем форсированного выдоха за первую секунду (ОФВ1)",
        value: 3.2,
        normalRange: "2.5 - 3.5 л",
      },
      {
        key: "4",
        parameter: "Пиковая скорость выдоха (ПСВ)",
        value: 7.0,
        normalRange: "5.5 - 7.5 л/с",
      },
      {
        key: "5",
        parameter:
          "Максимальная мгновенная скорость выдоха при 25% ФЖЕЛ (МОС25)",
        value: 3.2,
        normalRange: "2.0 - 3.4 л/с",
      },
      {
        key: "6",
        parameter:
          "Максимальная мгновенная скорость выдоха при 50% ФЖЕЛ (МОС50)",
        value: 4.0,
        normalRange: "3.2 - 4.8 л/с",
      },
      {
        key: "7",
        parameter:
          "Максимальная мгновенная скорость выдоха при 75% ФЖЕЛ (МОС75)",
        value: 2.5,
        normalRange: "1.8 - 2.8 л/с",
      },
      {
        key: "8",
        parameter: "Средняя скорость выдоха (СОС)",
        value: 6.0,
        normalRange: "4.5 - 6.5 л/с",
      },
    ]);
  }, []);

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
    },
    {
      title: "Норма",
      dataIndex: "normalRange",
      key: "normalRange",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Результаты анализа ФВД</Title>
      <Table columns={columns} dataSource={parameters} pagination={false} />
      <Divider />
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={fvdData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="volume"
            stroke="#8884d8"
            fill="url(#colorVolume)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <Divider />
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={fvdData}
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="flow" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
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

export default Analysis;
