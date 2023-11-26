import { AuthData } from "../../autenticacion/AuthComponent"

export const Account = () => {

     const { user } = AuthData();

     return (
          <div className="page">
               <h2>Tu cuenta</h2>
               <p>Nombre de usuario: {user.name}</p>
          </div>
     )
}