import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../scss/menu.css";

function Menu() {
    const [newFood, setNewFood] = useState('');
    const [foods, setFoods] = useState(() => {
        const storedFoods = localStorage.getItem('foods');
        return storedFoods ? JSON.parse(storedFoods) : [];
    });
    const [menus, setMenus] = useState([]);
    const [filterDay, setFilterDay] = useState(''); 

    useEffect(() => {
       
        axios.get('https://6653200c813d78e6d6d747f9.mockapi.io/menu')
            .then(response => {
                console.log('Datos recibidos de MockAPI:', response.data); 
               
                setMenus(response.data);
            })
            .catch(error => {
                console.error('Error fetching menus:', error);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('foods', JSON.stringify(foods));
    }, [foods]);

    const handleInputChange = (event) => {
        setNewFood(event.target.value);
    };

    const handleAddFood = () => {
        if (newFood.trim() !== '') {
           
            const updatedMenus = menus.map(menu => {
                if (menu.day === "Sabado") {
                    return {
                        ...menu,
                        additionalFoods: menu.additionalFoods ? `${menu.additionalFoods}, ${newFood}` : newFood
                    };
                }
                return menu;
            });
            setMenus(updatedMenus);
            setNewFood('');
        }
    };

    const handleDeleteFood = (day, index) => {
      
        const updatedMenus = menus.map(menu => {
            if (menu.day === day) {
                
                const foods = menu.additionalFoods.split(',').map(food => food.trim());
                foods.splice(index, 1);
                return {
                    ...menu,
                    additionalFoods: foods.join(', ')
                };
            }
            return menu;
        });

        
        setMenus(updatedMenus);
    };

    const handleDeleteMenu = (id) => {
        axios.delete(`https://6653200c813d78e6d6d747f9.mockapi.io/menu/${id}`)
            .then(() => {
                setMenus(menus.filter(menu => menu.id !== id));
            })
            .catch(error => {
                console.error('Error deleting menu:', error);
            });
    };

    const filteredMenus = filterDay
        ? menus.filter(menu => menu.day.toLowerCase() === filterDay.toLowerCase())
        : menus;

    return (
        <div className="menu-container">
            <h2>Menu Semanal</h2>
            <div>
                <label htmlFor="dayFilter">Filtrar por día: </label>
                <input
                    type="text"
                    id="dayFilter"
                    placeholder="Ingrese el día"
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                />
            </div>
            {filteredMenus.length === 0 ? (
                <p>Cargando menús...</p>
            ) : (
                <div className="grid-container">
                {filteredMenus.map(menu => (
    <div className="grid-item" key={menu.id}>
        <h3>{menu.day}</h3>
        <p>{menu.description}</p>
        <p>{menu.desayuno}</p>
        <p>{menu.comida}</p>
        <p>{menu.cena}</p>
        <p>{menu.additionalFoods}</p>
        <button className="delete-button" onClick={() => handleDeleteMenu(menu.id)}>Eliminar</button>
        {menu.day === 'Sabado' && (
            <ul className="food-list">
                {menu.additionalFoods.split(',').map((food, index) => (
                    <li key={index} className="food-item">
                        {food.trim()}
                        <button className="delete-button" onClick={() => handleDeleteFood(menu.day, index)}>🗑️</button>
                    </li>
                ))}
            </ul>
        )}
    </div>
))}




                </div>
            )}
            <input
                type="text"
                placeholder="Nueva comida"
                value={newFood}
                onChange={handleInputChange}
            />
            <button onClick={handleAddFood}>➕</button>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>
                        {food}
                        <button onClick={() => handleDeleteFood('Sabado', index)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;