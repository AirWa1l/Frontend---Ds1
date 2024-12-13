import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/store/auth";
const NavBar = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { state, logout } = useAuth(); // Usar el método logout del hook
    const username = state.user?.username;
    const isAdmin = state.user?.role === "admin";
    const navigate = useNavigate();
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
      if (!searchTerm.trim()) {
        onSearch("");
        return;
      }
      onSearch(searchTerm);
      scrollToProducts();
    };
  
    const scrollToProducts = () => {
      const productsSection = document.querySelector("#products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };
  
    const handleLogout = async () => {
      await logout(); // Llama al método logout del hook
      navigate("/login"); // Redirigir tras cerrar sesión
    };
  
    useEffect(() => {
      document.title = "Unizone";
    }, []);
  
    return (
      <header className="main-nav">
        <Link className="brand" to="/">UNIZONE</Link>
        <button className="menu-button" onClick={toggleMenu}>Menú</button>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Busca un producto en unizone.com"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>
        <div className="nav-icons">
          {username ? (
            <>
              <span>👤 {username}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">👤 Login</Link>
          )}
          <Link to="/cart">🛒 Carrito</Link>
        </div>
  
        {isMenuOpen && (
          <div className="dropdown-menu">
            <ul className="menu-list">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/about">Acerca de</Link></li>
              <li>Productos
                <ul>
                  <li><Link to="/lista-productos">Lista de productos</Link></li>
                  <li><Link to="/detalle-producto">Detalles del producto</Link></li>
                </ul>
              </li>
              <li>Páginas
                <ul>
                  <li><Link to="/checkout">Pagar</Link></li>
                  <li><Link to="/cart">Carrito de compras</Link></li>
                  <li><Link to="/confirmacion">Confirmación</Link></li>
                </ul>
              </li>
              {isAdmin && (
                <li><Link to="/admin">Panel de Administración</Link></li>
              )}
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
        )}
      </header>
    );
  };
  
  export default NavBar;
  