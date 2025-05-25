import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ExamTaker from "./components/ExamTaker";
import Navbar from "./components/Navbar";
import { USERS, EXAMS as EXAMS_MOCK } from "./data/mockData";

function App() {
  const [user, setUser] = useState(null);
  const [exams, setExams] = useState(EXAMS_MOCK);

  // Login simulado (usuarios predefinidos)
  const handleLogin = (email, password) => {
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) setUser(found);
    else return false;
    return true;
  };

  // Crear examen (solo profesor)
  const handleCreateExam = (exam) => {
    setExams([...exams, { ...exam, id: exams.length + 1 }]);
  };

  // Guardar respuestas del estudiante
  const handleSubmitExam = (examId, answers) => {
    setExams(
      exams.map((e) =>
        e.id === examId
          ? {
              ...e,
              submissions: [
                ...(e.submissions || []),
                { student: user.email, answers },
              ],
            }
          : e
      )
    );
  };

  // Logout
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                user.role === "teacher" ? (
                  <Navigate to="/teacher" />
                ) : (
                  <Navigate to="/teacher" />
                )
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/teacher"
            element={
              user && user.role === "teacher" ? (
                <TeacherDashboard exams={exams} onCreateExam={handleCreateExam} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/student"
            element={
              user && user.role === "student" ? (
                <StudentDashboard exams={exams} user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/presentar/:examId"
            element={
              user && user.role === "student" ? (
                <ExamTaker exams={exams} onSubmit={handleSubmitExam} user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
