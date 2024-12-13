import React, { useState } from "react";
import { toast } from "react-toastify";

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
                },
                body: JSON.stringify({ email }),
            };

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
        <div
            style={{
                backgroundColor: "#d3d3d3", // Color de fondo más claro
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                width: "100%",
                maxWidth: "400px",
                textAlign: "left",
                margin: "auto",
                marginTop: "10vh",
            }}
        >
            <h2 style={{ fontSize: "1.5rem", color: "#000", marginBottom: "1rem" }}>
                Restablecer Contraseña
            </h2>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "block", marginBottom: "1rem", textAlign: "left" }}>
                    <span style={{ fontSize: "0.9rem", color: "#000" }}>Correo electrónico:</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ingresa tu correo electrónico"
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
                        backgroundColor: "#6c63ff",
                        color: "#fff",
                        padding: "0.8rem 1.5rem",
                        fontSize: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "1rem",
                    }}
                >
                    Enviar enlace para restablecer
                </button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;
