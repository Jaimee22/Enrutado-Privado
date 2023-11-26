import React, { createContext, useContext, useState } from "react";
import { RenderMenu, RenderRoutes } from "../components/router/RenderNavigation";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthComponent = ({ children }) => {
     const storedUser = localStorage.getItem("user");
     const initialUser = storedUser ? JSON.parse(storedUser) : { name: "", isAuthenticated: false };
     const [user, setUser] = useState(initialUser);

     /* Recibe un nombre de usuario y una contraseña, realiza una comprobación simple 
     (compara la contraseña con "password") y, si es correcta, establece el estado 
     del usuario como autenticado (isAuthenticated: true) y almacena la información 
     del usuario en el almacenamiento local (localStorage). De este modo en caso de 
     refrescar la página, el usuario seguirá con la sesión iniciada */
     const login = (userName, password) => {
          return new Promise((resolve, reject) => {
               if (password === "password") {
                    setUser({ name: userName, isAuthenticated: true });
                    localStorage.setItem("user", JSON.stringify({ name: userName, isAuthenticated: true }));
                    resolve("success");
               } else {
                    reject("Incorrect password");
               }
          });
     };


     /* Limpia la información del usuario del estado y del almacenamiento local, de 
     modo que se cierra sesión. Además redirige al componente login (eso esta en el
     RenderNavigation) */
     const logout = () => {
          setUser({ name: "", isAuthenticated: false });
          localStorage.removeItem("user");
     };

     return (
          <AuthContext.Provider value={{ user, login, logout }}>
               <>
                    <RenderMenu />
                    <RenderRoutes />
                    {children}
               </>
          </AuthContext.Provider>
     );
};

