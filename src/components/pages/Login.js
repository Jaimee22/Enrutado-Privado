import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../autenticacion/AuthComponent";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = AuthData();
  const [formData, setFormData] = useReducer((formData, newItem) => ({ ...formData, ...newItem }), {
    userName: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
      navigate("/account");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="page">
      <h2>Página Login</h2>
      <div className="inputs">
        <div className="input">
          <input value={formData.userName} onChange={(e) => setFormData({ userName: e.target.value })} type="text" />
        </div>
        <div className="input">
          <input value={formData.password} onChange={(e) => setFormData({ password: e.target.value })} type="password" />
        </div>
        <div className="button">
          <button onClick={doLogin}>Iniciar Sesión</button>
        </div>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  );
};


