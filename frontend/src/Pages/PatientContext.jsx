import React, { createContext, useState, useEffect } from "react";

export const PatientContext = createContext({});

export const PatientProvider = ({ children }) => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: "",
    gender: "",
    snils: "",
    allergies: "",
  });
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    // При загрузке компонента проверяем localStorage
    const storedInfo = localStorage.getItem("patientInfo");
    if (storedInfo) {
      setPatientInfo(JSON.parse(storedInfo));
      setIsFilled(true);
    }
  }, []);

  const savePatientInfo = (info) => {
    setPatientInfo(info);
    setIsFilled(true);
    localStorage.setItem("patientInfo", JSON.stringify(info)); // Сохраняем в localStorage
  };

  return (
    <PatientContext.Provider
      value={{ patientInfo, savePatientInfo, isFilled, setIsFilled }}
    >
      {children}
    </PatientContext.Provider>
  );
};
