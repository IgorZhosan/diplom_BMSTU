import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./Pages/UserContext"; // Подключаем контекст пользователей
import { PatientProvider } from "./Pages/PatientContext";
import PatientForm from "./Pages/PatientForm";
import PatientInfo from "./Pages/PatientInfo";
import MainPage from "./Pages/MainPage";
import Analysis from "./Pages/Analysis";
import StartFVD from "./Pages/StartFVD";
import RegistrationForm from "./Pages/RegistrationForm"; // Убедитесь, что путь корректный
import LoginPage from "./Pages/LoginPage"; // Убедитесь, что путь корректный

const App = () => {
  return (
    <UserProvider>
      {" "}
      {/* Обёртка всего приложения в провайдер пользователей */}
      <PatientProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/form" element={<PatientForm />} />
            <Route path="/patient" element={<PatientInfo />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/start_fvd" element={<StartFVD />} />
          </Routes>
        </Router>
      </PatientProvider>
    </UserProvider>
  );
};

export default App;
