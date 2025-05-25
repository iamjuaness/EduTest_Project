import React, { useState } from "react";
import ExamBuilder from "./ExamBuilder";

function TeacherDashboard({ exams, onCreateExam }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2>Panel del Profesor</h2>
      <button className="btn btn-success mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancelar" : "Crear Nuevo Examen"}
      </button>
      {showForm && <ExamBuilder onCreateExam={onCreateExam} onClose={() => setShowForm(false)} />}
      <h4>Exámenes creados</h4>
      <ul className="list-group">
        {exams.map((exam) => (
          <li className="list-group-item" key={exam.id}>
            <b>{exam.nombre}</b> - {exam.descripcion}
            <br />
            <span className="text-muted" style={{ fontSize: "0.9em" }}>
              Preguntas: {exam.preguntas.length} | Asignados: {exam.asignados.length}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
