import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AuthData } from "../../autenticacion/AuthComponent";
import { nav } from "./navigation";

const AccessDenied = () => {
  return <div className="noacceso">DEBE INICIAR SESIÓN PARA VER ESTA PÁGINA</div>;
};

export const RenderRoutes = () => {
  const { user } = AuthData();
  
  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isPrivate && !user.isAuthenticated) {
          return <Route key={i} path={r.path} element={<AccessDenied />} />;
        } else {
          return <Route key={i} path={r.path} element={r.element} />;
        }
      })}
    </Routes>
  );
};

export const RenderMenu = () => {
  const { user, logout } = AuthData();

  const MenuItem = ({ r }) => {
    return (
      <div className="menuItem">
        <Link to={r.path}>{r.name}</Link>
      </div>
    );
  };

  return (
    <div className="menu">
      {nav.map((r, i) => {
        if ((!r.isPrivate && r.isMenu) || (user.isAuthenticated && r.isMenu)) {
          return <MenuItem key={i} r={r} />;
        } else {
          return null;
        }
      })}
      {user.isAuthenticated ? (
        <div className="menuItem">
          <Link to="/login" onClick={logout}>
            Cerrar Sesión
          </Link>
        </div>
      ) : (
        <div className="menuItem">
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      )}
    </div>
  );
};

