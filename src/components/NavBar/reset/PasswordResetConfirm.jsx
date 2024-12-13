import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordResetConfirm = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("user"); // Obtiene el usuario desde la URL
    const token = searchParams.get("token"); // Obtiene el token desde la URL
    const [newPassword, setNewPassword] = useState(""); // Estado para la nueva contraseña
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !token || !newPassword) {
            toast.error("Faltan datos para completar la solicitud.");
            return;
        }

        const body = { username, token, new_password: newPassword }; // Datos a enviar

        try {
            console.log("Cuerpo de la solicitud:", body); // Depuración del cuerpo de la solicitud

            const requestData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), // Convertir el cuerpo a JSON
            };

            const response = await fetch("https://unizone-backend-server.onrender.com/api/password-reset/confirm/", requestData);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                toast.error(errorData.detail || "Ocurrió un error inesperado.");
            } else {
                toast.success("Tu contraseña ha sido restablecida con éxito.");
                navigate("/login"); // Redirige a la página de inicio de sesión
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Hubo un problema al restablecer tu contraseña.");
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nueva contraseña:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Ingresa tu nueva contraseña"
                    />
                </label>
                <button type="submit">Restablecer contraseña</button>
            </form>
        </div>
    );
};

export default PasswordResetConfirm;
