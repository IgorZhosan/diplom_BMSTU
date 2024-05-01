import React, { createContext, useState } from "react";

export const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    gender: "",
    snils: "",
    allergies: "",
  });
  const [analysisHistory, setAnalysisHistory] = useState([]); // Для хранения истории анализов

  const savePatientInfo = (info) => {
    setPatientInfo(info);
    localStorage.setItem("patientInfo", JSON.stringify(info));
  };

  const addAnalysisResult = (result) => {
    const newHistory = [...analysisHistory, result];
    setAnalysisHistory(newHistory);
    localStorage.setItem("analysisHistory", JSON.stringify(newHistory)); // Сохраняем историю в localStorage
  };

  return (
    <PatientContext.Provider
      value={{
        patientInfo,
        savePatientInfo,
        analysisHistory,
        addAnalysisResult,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
