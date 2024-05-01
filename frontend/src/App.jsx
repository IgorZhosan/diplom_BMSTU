import React from "react";
import StartFVD from "./Pages/StartFVD";
import Analysis from "./Pages/Analysis";
import Patient from "./Pages/Patient";
import MainPage from "./Pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/login" element={<LogInPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/start_fvd" element={<StartFVD />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
