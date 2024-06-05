import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Checkbox,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "./PatientContext";

const { Title } = Typography;

const AssignSpirometry = () => {
  const { patientInfo } = useContext(PatientContext);
  const [snils, setSnils] = useState("");
  const [date, setDate] = useState(null);
  const [withBronchodilator, setWithBronchodilator] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSnils(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleCheckboxChange = (e) => {
    setWithBronchodilator(e.target.checked);
  };

  const handleSubmit = () => {
    const storedPatientInfo = localStorage.getItem("patientInfo");
    if (storedPatientInfo) {
      const parsedPatientInfo = JSON.parse(storedPatientInfo);
      if (parsedPatientInfo.snils === snils) {
        // Назначить спирометрию (здесь может быть отправка данных на сервер или сохранение в localStorage)
        message.success("Спирометрия назначена успешно!");
        navigate("/doctor");
      } else {
        message.error("Пациент с таким СНИЛС не найден.");
      }
    } else {
      message.error("Пациент с таким СНИЛС не найден.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Назначить спирометрию</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="СНИЛС пациента" required>
          <Input value={snils} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="Дата проведения" required>
          <DatePicker onChange={handleDateChange} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={withBronchodilator}
            onChange={handleCheckboxChange}
          >
            Анализ с бронхолитиком
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Назначить
          </Button>
        </Form.Item>
        <Button
          type="default"
          onClick={() => navigate("/doctor")}
          style={{ marginTop: 20 }}
        >
          Отмена
        </Button>
      </Form>
    </div>
  );
};

export default AssignSpirometry;
