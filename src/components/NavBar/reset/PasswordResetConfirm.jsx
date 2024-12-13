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
        <div
            style={{
                backgroundColor: "#d3d3d3", // Fondo claro
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
                marginTop: "10vh",
                textAlign: "left",
            }}
        >
            <h2 style={{ fontSize: "1.5rem", color: "#000", marginBottom: "1rem" }}>
                Restablecer Contraseña
            </h2>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", marginBottom: "1rem", textAlign: "left" }}>
                    <span style={{ fontSize: "0.9rem", color: "#000" }}>Nueva contraseña:</span>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="Ingresa tu nueva contraseña"
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "0.8rem",
                            fontSize: "1rem",
                            marginTop: "0.5rem",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                        }}
                    />
                </label>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#6c63ff", // Botón de color llamativo
                        color: "#fff",
                        padding: "0.8rem 1.5rem",
                        fontSize: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "1rem",
                        width: "100%",
                    }}
                >
                    Restablecer contraseña
                </button>
            </form>
        </div>
    );
};

export default PasswordResetConfirm;
