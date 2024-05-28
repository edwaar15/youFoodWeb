import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Nav from "./Nav/Nav";
import Menu from "./Menu/Menu";
import Register from "./Register/Register";
import "../scss/home.css";



function App() {
  const [user, setUser] = useState(null);
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    axios.get("https://6653200c813d78e6d6d747f9.mockapi.io/user")
      .then(response => {
        setListUsers(response.data); 
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return ( 
    <div>
      <Nav />
      <Routes>

        <Route path="/" element={
        <div>
        <p  className="yellow">Es posible comer rico, variado y saludable. 
        <p  className="green"> Para ello es fundamental disponer de un menú semanal. </p>
        <p  className="blue"> Los menús semanales nos ayudan a organizarnos, comer variado y equilibrado. </p>
        <p  className="violet"> Aquí tenéis nuestra selección de recetas e ideas para vuestro menú diario, </p>
 con ideas fáciles para que no os compliquéis en la cocina pero disfrutéis de todo el sabor.</p>
 </div>} />


        
        <Route path="/login" element={<Login setUser={setUser} listUsers={listUsers} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comida" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;