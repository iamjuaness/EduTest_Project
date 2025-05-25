import React, { useState } from "react";

function ExamBuilder({ onCreateExam, onClose }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [asignados, setAsignados] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [tipo, setTipo] = useState("opcion_unica");
  const [pregunta, setPregunta] = useState("");
  const [opciones, setOpciones] = useState(["", ""]);
  const [respuesta, setRespuesta] = useState("");
  const [error, setError] = useState("");

  // Añadir pregunta al examen
  const handleAddQuestion = () => {
    if (!pregunta) return setError("La pregunta es obligatoria");
    let q = { tipo, pregunta };
    if (tipo === "opcion_unica") {
      if (!opciones[0] || !opciones[1]) return setError("Agrega al menos dos opciones");
      q.opciones = opciones;
      q.respuesta = parseInt(respuesta);
    } else if (tipo === "verdadero_falso") {
      q.respuesta = respuesta === "true";
    }
    setPreguntas([...preguntas, q]);
    setPregunta("");
    setOpciones(["", ""]);
    setRespuesta("");
    setError("");
  };

  // Crear examen
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion || preguntas.length === 0)
      return setError("Completa todos los campos y agrega al menos una pregunta.");
    onCreateExam({
      nombre,
      descripcion,
      preguntas,
      asignados: asignados.split(",").map(x => x.trim()).filter(x => x),
      submissions: []
    });
    onClose();
  };

  return (
    <div className="card card-body mb-4">
      <h5>Nuevo Examen</h5>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nombre</label>
          <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Descripción</label>
          <input className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Correos de estudiantes asignados (separados por coma)</label>
          <input className="form-control" value={asignados} onChange={e => setAsignados(e.target.value)} />
        </div>

        <hr />
        <h6>Agregar pregunta</h6>
        <div className="mb-2">
          <label>Tipo de pregunta</label>
          <select className="form-select" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="opcion_unica">Opción única</option>
            <option value="verdadero_falso">Verdadero/Falso</option>
          </select>
        </div>
        <div className="mb-2">
          <label>Pregunta</label>
          <input className="form-control" value={pregunta} onChange={e => setPregunta(e.target.value)} />
        </div>
        {tipo === "opcion_unica" && (
          <div className="mb-2">
            <label>Opciones</label>
            {opciones.map((op, idx) => (
              <div className="input-group mb-1" key={idx}>
                <input
                  className="form-control"
                  value={op}
                  onChange={e => {
                    let newOps = [...opciones];
                    newOps[idx] = e.target.value;
                    setOpciones(newOps);
                  }}
                />
                {opciones.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setOpciones(opciones.filter((_, i) => i !== idx))}
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setOpciones([...opciones, ""])}
            >
              + Agregar opción
            </button>
            <div className="mt-2">
              <label>Respuesta correcta (número de opción)</label>
              <input
                type="number"
                className="form-control"
                min={0}
                max={opciones.length - 1}
                value={respuesta}
                onChange={e => setRespuesta(e.target.value)}
              />
            </div>
          </div>
        )}
        {tipo === "verdadero_falso" && (
          <div className="mb-2">
            <label>Respuesta correcta</label>
            <select className="form-select" value={respuesta} onChange={e => setRespuesta(e.target.value)}>
              <option value="">Seleccione</option>
              <option value="true">Verdadero</option>
              <option value="false">Falso</option>
            </select>
          </div>
        )}
        <button type="button" className="btn btn-outline-primary" onClick={handleAddQuestion}>
          Agregar pregunta
        </button>
        <div className="mt-3">
          <b>Preguntas agregadas:</b>
          <ul>
            {preguntas.map((q, idx) => (
              <li key={idx}>
                {q.pregunta} <span className="text-muted">({q.tipo})</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="btn btn-success mt-3" type="submit">
          Guardar examen
        </button>
        <button className="btn btn-link mt-3 ms-2" type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ExamBuilder;
