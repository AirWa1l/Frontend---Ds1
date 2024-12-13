import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link ,useNavigate} from 'react-router-dom';
import useAuth from "@/store/auth";
const NavBar = ({ onSearch }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { state } = useAuth();
    const username = state.user?.username;
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            // Si el término está vacío, realiza alguna acción (opcional)
            onSearch(""); // Envía una cadena vacía para indicar que no hay búsqueda
            return;
        }
        onSearch(searchTerm); // Llama a la función proporcionada desde HomeView
        scrollToProducts();
    };
    const scrollToProducts = () => {
        const productsSection = document.querySelector("#products");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    // Función para manejar el evento de presionar 'Enter'
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    useEffect(() => {
        document.title = "Unizone";
    }, []);

    return (
        <>
            {/* Encabezado principal */}
            <header className="main-nav">
                <Link className="brand" to="/">UNIZONE</Link>
                <button className="menu-button" onClick={toggleMenu}>Menú</button>
                <div className="search-bar">
                <input
                        type="text"
                        placeholder="Busca un producto en unizone.com"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}  // Escucha la tecla 'Enter'
                    />
                    <button className="search-button" onClick={handleSearch}>🔍</button>
                </div>
                <div className="nav-icons">
                    <Link to="/login">{username ? `👤 ${username}` : "👤 Invitado"}</Link>
                    <Link to="/cart">🛒 Carrito</Link>
                </div>
            </header>

            {/* Menú desplegable */}
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
                                <li><Link to="/login">Iniciar sesión</Link></li>
                                <li><Link to="/checkout">Pagar</Link></li>
                                <li><Link to="/cart">Carrito de compras</Link></li>
                                <li><Link to="/confirmacion">Confirmación</Link></li>
                                <li><Link to="/elementos">Elementos</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default NavBar;