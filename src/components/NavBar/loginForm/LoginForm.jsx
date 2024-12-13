import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import useAuth from "@/store/auth"; 

const LoginForm = () => {
    const { login } = useAuth(); // Obtener la función `login` del store o contexto
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            toast.error("Por favor, complete ambos campos.");
            return;
        }

        setIsLoading(true); // Activar estado de carga
        try {
            await login(formData); // Llamar a la función de login que conecta con el backend
            navigate("/");
            window.location.reload();
            navigate("/");
        } catch (error) {
            toast.error("Hubo un problema al iniciar sesión, intenta de nuevo.");
        }
        setIsLoading(false); // Desactivar estado de carga
    };

    return (
        <div id="lbody">
            <div id="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Iniciar Sesión</h1>
                    <div id="input-box">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <FaUser id="icon" />
                    </div>
                    <div id="input-box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <FaLock id="icon" />
                    </div>

                    <div id="remember-pass">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <Link to="/password_reset">Forgot password?</Link>
                    </div>

                    {isLoading ? (
                        <button type="button" disabled>Loading...</button> // Muestra un botón de carga mientras se hace la solicitud
                    ) : (
                        <button type="submit">Login</button>
                    )}

                    <div id="register-link">
                        <p>
                            Don't have an account? <Link to="/register">Registro</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
