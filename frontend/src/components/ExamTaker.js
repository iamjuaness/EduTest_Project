import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ExamTaker({ exams, onSubmit, user }) {
  const { examId } = useParams();
  const navigate = useNavigate();
  const exam = exams.find((e) => e.id === parseInt(examId));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!exam) return <div className="alert alert-danger">Examen no encontrado.</div>;

  const handleChange = (idx, value) => {
    setAnswers({ ...answers, [idx]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let puntaje = 0;
    exam.preguntas.forEach((q, idx) => {
      if (q.tipo === "opcion_unica" && parseInt(answers[idx]) === q.respuesta) puntaje++;
      if (q.tipo === "verdadero_falso" && (answers[idx] === "true" ? true : false) === q.respuesta) puntaje++;
    });
    setScore(puntaje);
    setSubmitted(true);
    onSubmit(exam.id, answers);
  };

  return (
    <div>
      <h3>{exam.nombre}</h3>
      <p>{exam.descripcion}</p>
      {submitted ? (
        <div className="alert alert-success">
          ¡Examen enviado!<br />
          Puntaje: {score} / {exam.preguntas.length}
          <br />
          <button className="btn btn-link" onClick={() => navigate("/estudiante")}>
            Volver al panel
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {exam.preguntas.map((q, idx) => (
            <div className="card card-body mb-3" key={idx}>
              <b>{idx + 1}. {q.pregunta}</b>
              {q.tipo === "opcion_unica" &&
                q.opciones.map((op, i) => (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q${idx}`}
                      value={i}
                      checked={answers[idx] == i}
                      onChange={e => handleChange(idx, e.target.value)}
                      required
                    />
                    <label className="form-check-label">{op}</label>
                  </div>
                ))}
              {q.tipo === "verdadero_falso" && (
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q${idx}`}
                      value="true"
                      checked={answers[idx] === "true"}
                      onChange={e => handleChange(idx, e.target.value)}
                      required
                    />
                    <label className="form-check-label">Verdadero</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q${idx}`}
                      value="false"
                      checked={answers[idx] === "false"}
                      onChange={e => handleChange(idx, e.target.value)}
                      required
                    />
                    <label className="form-check-label">Falso</label>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-success" type="submit">
            Enviar examen
          </button>
        </form>
      )}
    </div>
  );
}

export default ExamTaker;
