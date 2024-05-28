import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ user, component: Component }) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, renderiza el componente especificado
    return <Component />;
}

export default AuthRoute;