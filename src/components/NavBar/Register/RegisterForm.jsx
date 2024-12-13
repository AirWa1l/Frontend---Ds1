import React, { useState } from "react";
import './RegisterForm.css';
import useAuth from "@/store/auth";
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register: registrarUsuario } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    dni: "",
    phone_number: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    country: "CO",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validateDNI = (dni) => {
    const regex = /^[0-9]{7,10}$/; // Acepta solo números entre 7 y 10 dígitos
    return regex.test(dni);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, dni} = formData;

    if (!username || !email || !password || !dni) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!validateDNI(dni)) {
        alert("El DNI debe tener entre 7 y 10 números.");
        return;
      }

    setIsLoading(true); // Activar carga
    try {
      await registrarUsuario(formData);
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        dni: "",
        phone_number: "",
        email: "",
        password: "",
        street: "",
        city: "",
        state: "",
        country: "CO",
      });
      navigate("/"); // Redirigir tras el registro exitoso
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
    setIsLoading(false); // Desactivar carga
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div id="rbody">
      <div id="rcontainer">
        <div id="presentation">
          <h2>Welcome to Unizone!</h2>
        </div>
        <form id="rform" onSubmit={handleSubmit}>
          <h1>Register</h1>
          {Object.keys(formData).map((key) =>
            key !== "country" ? (
              <div id="rinput-box" key={key}>
                <input
                  type={key === "password" ? "password" : "text"}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ) : null
          )}
          <div id="rinput-box">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              id="country-dropdown"
              required
            >
              <option value="CO">Colombia</option>
              <option value="US">United States</option>
              <option value="FR">France</option>
              <option value="GE">Germany</option>
            </select>
          </div>
          <div id="login-link">
            <Link to="/login" id="already-have-account">Already have an account?</Link>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <button id="button" type="submit">Send</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;