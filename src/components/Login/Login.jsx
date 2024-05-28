import { useState } from "react";
import "../../scss/login.css";

function Login({ setUser, listUsers }) {
  const [userLogin, setUserLogin] = useState({});

  const handleInput = (ev) => {
    const id = ev.target.id;
    setUserLogin({ ...userLogin, [id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();

    // Verificar si listUsers es una lista válida antes de buscar al usuario
    if (Array.isArray(listUsers)) {
      // Buscar al usuario por email y contraseña
      const findUser = listUsers.find((user) => user.Email === userLogin.email && user.Password === userLogin.password);

      if (findUser) {
        setUser(findUser);
      } else {
        console.error("Usuario no encontrado");
      }
    } else {
      console.error("La respuesta de la API no es una lista válida");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onChange={handleInput}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" className="login-input" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="login-input" />
        <input type="submit" value="Inicia Sesion" onClick={handleClick} className="login-button" />
      </form>
    </div>
  );
}

export default Login;