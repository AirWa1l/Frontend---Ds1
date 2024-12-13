import React, { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Producto A", sales: 120 },
    { id: 2, name: "Producto B", sales: 80 },
    { id: 3, name: "Producto C", sales: 45 },
  ]);

  const handleAddProduct = () => {
    const newProduct = { id: products.length + 1, name: `Producto ${String.fromCharCode(65 + products.length)}`, sales: 0 };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div id="rbody">
      <div id="rcontainer">
        <div id="presentation">
          <h1>Panel de Administración</h1>
        </div>
        <div id="rform">
          <h1>Gestión de Productos</h1>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <p>{product.name} - Ventas: {product.sales}</p>
                <button onClick={() => handleDeleteProduct(product.id)} className="delete-button">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAddProduct} id="button">
            Agregar Producto
          </button>
        </div>
        <div id="report-section">
          <h1>Reportes Gráficos</h1>
          <div className="chart-placeholder">
            <p>Aquí se mostrarán los gráficos de los productos más vendidos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
