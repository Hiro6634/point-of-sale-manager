import React from "react";
import { NavLink } from "react-router-dom";

const Navitems = () => {
    const currentUser = null;
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
        </ul>
    );
};  

export default Navitems;