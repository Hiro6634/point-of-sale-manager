import React, { useContext, useState } from "react";
import {
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineLockClosed,
    HiOutlineMail
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/user.context";
import { getUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../utils/firebase/firebase.utils";
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setCurrentUser } = useContext(UserContext);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if([email, password].includes("")) {
            toast.error("Todos los campos son obligatorios",{
                theme: "dark"
            });
            return;
        }
        if(password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres",{
                theme: "dark"
            });
            return;
        }
        try {
            console.log(email, password);
            const response = await signInAuthUserWithEmailAndPassword( email, password);
            console.log(response);  
            const myUser = await getUserDocumentFromAuth(response.user);    
            setCurrentUser(myUser);
            navigate("/");
            
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    toast.error("Email o contraseña incorrectos", {
                        theme: "dark"
                    });
                    break
                default:    
                    console.log(error);
            }
        }
    }

    return(
        <div className="bg-white p-8 rounded-lg w-full md:w-96 max-w-md h-min mt-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold uppercase text-center">Iniciar Sesión</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                    <HiOutlineMail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="email"
                        className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"
                        placeholder="Correo electrónico"
                        value={email}
                        autoComplete="username"
                        onChange={(event)=> setEmail(event.target.value)}
                    />
                </div>
                <div className="relative">  
                    <HiOutlineLockClosed  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full border border-gray-200 outline-none py-2 px-7 rounded-lg"    
                        placeholder="Contraseña"
                        value={password}
                        autoComplete="current-password"
                        onChange={(event)=> setPassword(event.target.value)}
                    />
                    {showPassword ? (
                        <HiOutlineEyeOff onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
                    ): (
                        <HiOutlineEye onClick={handleShowPassword} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />    
                    )}
                </div>
                <div>
                    <button className="mt-6 bg-sky-600 w-full text-white py-2 px-6 rounded-lg hover:bg-sky-800 transition-colors">Iniciar sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
