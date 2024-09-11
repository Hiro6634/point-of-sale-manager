import React from "react";
import { Link } from "react-router-dom";
import Navitems from "./Navitems";

const Navbar = () => {
    return (
    <div>
        <nav className="bg-black p-4 text-white flex justify-between">
            <Link to="/">Home</Link>
            <div className="hidden lg:block xl:block">
                <Navitems />
            </div>
            <div className="block lg:hidden xl:hidden">
                <div className="w-5 h-1 bg-white my-1"></div>
                <div className="w-5 h-1 bg-white my-1"></div>
                <div className="w-5 h-1 bg-white my-1"></div>
            </div>
        </nav>    
    </div>
);
};
export default Navbar;