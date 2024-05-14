import React, { createContext, useState, useEffect } from "react";

export const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState(() => {
    const savedInfo = localStorage.getItem("patientInfo");
    return savedInfo
      ? JSON.parse(savedInfo)
      : {
          fullName: "",
          gender: "",
          snils: "",
          allergies: "",
        };
  });
  const [analysisHistory, setAnalysisHistory] = useState(() => {
    const savedHistory = localStorage.getItem("analysisHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const savePatientInfo = (info) => {
    setPatientInfo(info);
    localStorage.setItem("patientInfo", JSON.stringify(info));
  };

  const addAnalysisResult = (result) => {
    const newHistory = [...analysisHistory, result];
    setAnalysisHistory(newHistory);
    localStorage.setItem("analysisHistory", JSON.stringify(newHistory));
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
