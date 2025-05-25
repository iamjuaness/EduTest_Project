import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onLogin(email, password)) {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow">
          <div className="card-body">
            <h3 className="mb-4 text-center">Iniciar sesión</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Ingresar
              </button>
            </form>
            <div className="mt-3 text-muted" style={{ fontSize: "0.9em" }}>
              <b>Profesor:</b> profesor@colegio.edu / 1234<br />
              <b>Estudiante:</b> estudiante@colegio.edu / 1234
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
