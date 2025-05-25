import React from "react";
import { Link } from "react-router-dom";

function StudentDashboard({ exams, user }) {
  // Exámenes asignados al estudiante
  const assigned = exams.filter((exam) => exam.asignados.includes(user.email));
  return (
    <div>
      <h2>Panel del Estudiante</h2>
      <h4>Exámenes asignados</h4>
      {assigned.length === 0 && <div className="alert alert-info">No tienes exámenes asignados.</div>}
      <ul className="list-group">
        {assigned.map((exam) => {
          const yaPresentado =
            exam.submissions && exam.submissions.some((s) => s.student === user.email);
          return (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={exam.id}>
              <div>
                <b>{exam.nombre}</b> - {exam.descripcion}
              </div>
              <div>
                {yaPresentado ? (
                  <span className="badge bg-success">Completado</span>
                ) : (
                  <Link to={`/presentar/${exam.id}`} className="btn btn-primary btn-sm">
                    Presentar
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StudentDashboard;
