import { Link } from "react-router-dom";
import "../../scss/naav.css";


function Nav() {
  return (
    <header>

    <ul>

        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li> 
        <li><Link to="/register">Register</Link></li> {}
        <li><Link to="/profile">Perfil de Usuario</Link></li>
        <li><Link to= "/comida">Menu semanal</Link></li>      

    </ul>

    </header>
  )
}

export default Nav;