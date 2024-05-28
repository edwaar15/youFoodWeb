import { useState, useEffect } from "react";
import "../../scss/profile.css";

function Profile() {
  const [meal1, setMeal1] = useState(localStorage.getItem("meal1") || "");
  const [meal2, setMeal2] = useState(localStorage.getItem("meal2") || "");
  const [meal3, setMeal3] = useState(localStorage.getItem("meal3") || "");

  useEffect(() => {
    localStorage.setItem("meal1", meal1);
    localStorage.setItem("meal2", meal2);
    localStorage.setItem("meal3", meal3);
  }, [meal1, meal2, meal3]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  const handleDeleteMeal = (mealNumber) => {
    if (mealNumber === 1) {
      setMeal1("");
    } else if (mealNumber === 2) {
      setMeal2("");
    } else if (mealNumber === 3) {
      setMeal3("");
    }
  };

  return (
    <div className="profile-container">
    <h2 className="profile-header">Comidas para el Sábado</h2>
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <label htmlFor="meal1">Desayuno:</label>
        <input
          type="text"
          id="meal1"
          value={meal1}
          onChange={(e) => setMeal1(e.target.value)}
          className="profile-input"
        />
        {meal1 && <button type="button" onClick={() => handleDeleteMeal(1)} className="profile-button">Eliminar</button>}
      </div>
      <div>
        <label htmlFor="meal2">Comida :</label>
        <input
          type="text"
          id="meal2"
          value={meal2}
          onChange={(e) => setMeal2(e.target.value)}
          className="profile-input"
        />
        {meal2 && <button type="button" onClick={() => handleDeleteMeal(2)} className="profile-button">Eliminar</button>}
      </div>
      <div>
        <label htmlFor="meal3">Cena:</label>
        <input
          type="text"
          id="meal3"
          value={meal3}
          onChange={(e) => setMeal3(e.target.value)}
          className="profile-input"
        />
        {meal3 && <button type="button" onClick={() => handleDeleteMeal(3)} className="profile-button">Eliminar</button>}
      </div>
      <button type="submit" className="profile-button">Agregar Comidas</button>
    </form>
    <div className="meals-list">
      <h3>Comidas ingresadas:</h3>
      <p>Desayuno: {meal1}</p>
      <p>Comida: {meal2}</p>
      <p>Cena: {meal3}</p>
    </div>
  </div>
  );
}

export default Profile;