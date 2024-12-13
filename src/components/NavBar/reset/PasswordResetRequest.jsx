import React, { useState } from "react";
import { toast } from "react-toastify";
import "./password_reset.css";

const PasswordResetRequest = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await requestPasswordReset(email); // Llamar a la función al enviar el formulario
    };

    const requestPasswordReset = async (email) => {
        try {
            const requestData = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     // Agregar el token CSRF si es necesario
                },
                body: JSON.stringify({ email }),
            };

            // Agregar console.log para depuración
            console.log("Datos enviados al servidor:", requestData);

            const response = await fetch("https://unizone-backend-server.onrender.com/api/password-reset/", requestData);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                toast.error(errorData.detail || "Ocurrió un error inesperado.");
            } else {
                toast.success(
                    "Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico."
                );
            }
        } catch (error) {
            console.error("Error de la solicitud:", error);
            toast.error("Hubo un problema al solicitar el restablecimiento de la contraseña.");
        }
    };

    return (
        <div>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo electrónico:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ingresa tu correo electrónico"
                    />
                </label>
                <button type="submit">Enviar enlace para restablecer</button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;
