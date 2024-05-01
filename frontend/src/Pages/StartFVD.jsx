import React, { useState } from "react";
import { Button, Modal } from "antd";

const AnalysisPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Button type="primary" onClick={showModal}>
        Начать анализ
      </Button>
      <Modal
        title="Инструкция по анализу ФВД"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Для начала анализа ФВД выполните следующие шаги:</p>
        <ol>
          <li>Убедитесь, что аппаратура подготовлена и исправна.</li>
          <li>Подключите необходимые датчики к пациенту.</li>
          <li>Проинструктируйте пациента о процедуре.</li>
          <li>Начните запись данных и следите за показателями.</li>
          <li>По окончании записи проанализируйте полученные данные.</li>
        </ol>
        <p>Следуйте всем указаниям безопасности и процедурным нормам.</p>
      </Modal>
    </div>
  );
};

export default AnalysisPage;
