import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ user, component: Component }) {
    
    if (!user) {
        return <Navigate to="/login" />;
    }

    
    return <Component />;
}

export default AuthRoute;