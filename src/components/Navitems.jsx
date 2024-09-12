import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { signOutUser } from "../utils/firebase/firebase.utils";

const Navitems = () => {
    const {currentUser} = useContext(UserContext);

    return (
        <ul className="flex space-x-4">
            <li>
                <NavLink to="/products">Productos</NavLink>
            </li>
            <li>
                <NavLink to="/tickets">Tickets</NavLink>
            </li>
            <li>
                <NavLink to="/settings">Configuración</NavLink>
            </li>
            <li>
                <NavLink to="/help">Ayuda</NavLink>
            </li>
            <li>
                {(currentUser != null) ? 
                    <NavLink onClick={signOutUser}>Salir</NavLink>
                    :
                    <NavLink to="/auth">Iniciar sesión</NavLink>
                }
            </li>
        </ul>
    );
};  

export default Navitems;