import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/user.context";

const AppLayout = () => {
    const {currentUser} = useContext(UserContext);
    return (
        <div>
            {currentUser != null ? <Navbar /> : null}
            <div className="bg-gray-300 min-h-screen flex flex-colitems-center justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;