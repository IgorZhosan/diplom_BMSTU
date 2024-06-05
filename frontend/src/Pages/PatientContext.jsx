import React, { createContext, useState, useEffect } from "react";

export const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    gender: "",
    snils: "",
    allergies: "",
  });
  const [analysisHistory, setAnalysisHistory] = useState([]);

  useEffect(() => {
    const storedPatientInfo = localStorage.getItem("patientInfo");
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    }

    const storedAnalysisHistory = localStorage.getItem("analysisHistory");
    if (storedAnalysisHistory) {
      setAnalysisHistory(JSON.parse(storedAnalysisHistory));
    }
  }, []);

  const savePatientInfo = (info) => {
    setPatientInfo(info);
    localStorage.setItem("patientInfo", JSON.stringify(info));
  };

  const addAnalysisResult = (result) => {
    const newHistory = [
      ...analysisHistory,
      { ...result, snils: patientInfo.snils },
    ];
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
