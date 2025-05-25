import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Exámenes Online
        </Link>
        <div>
          {user ? (
            <>
              <span className="navbar-text me-3">
                {user.name} ({user.role})
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                Cerrar sesión
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
