import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PatientProvider } from "./Pages/PatientContext"; // Обновлённый путь
import PatientForm from "./Pages/PatientForm";
import PatientInfo from "./Pages/PatientInfo";
import MainPage from "./Pages/MainPage";
import Analysis from "./Pages/Analysis";
import StartFVD from "./Pages/StartFVD";

const App = () => {
  return (
    <PatientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/form" />} />
          <Route path="/form" element={<PatientForm />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/start_fvd" element={<StartFVD />} />
          <Route path="/patient" element={<PatientInfo />} />
        </Routes>
      </Router>
    </PatientProvider>
  );
};

export default App;
