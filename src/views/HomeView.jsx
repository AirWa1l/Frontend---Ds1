import Banner from "@/components/Home/Banner/Banner";
import Products from "@/components/Home/Products/Products";
import NoResults from "@/components/NavBar/NoResults/NoResults";
import Deals from "@/components/Home/Products/Deals/Deals";
import TopProducts from "@/components/Home/Products/TopProducts/TopProducts";
import Benefits from "@/components/Home/Benefits/Benefits";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import React, { useState, useEffect } from "react";

function HomeView({ searchTerm }) {
  let { store } = useGlobalContext(); // Acceso al contexto global
  let [filteredProducts, setFilteredProducts] = useState(store.state.products); // Estado local para productos filtrados
  let [noResults, setNoResults] = useState(false); // Estado para manejar el mensaje de "no se encontraron resultados"
  useEffect(() => {
    handleSearch(searchTerm); // Filtra los productos cuando searchTerm cambia
  }, [searchTerm]);
  
  const handleSearch = (searchTerm) => {
    if (searchTerm=="") {
      // Si no hay término de búsqueda, muestra todos los productos
      setFilteredProducts(store.state.products);
      setNoResults(false); // Restablece el estado de no resultados
      return;
    }
    // Filtra los productos según el término de búsqueda
    const filteredProducts = store.state.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredProducts.length === 0) {
      setNoResults(true); // Establece que no se encontraron productos
    } else {
      setNoResults(false); // Restablece el estado de no resultados si se encuentran productos
    }
    setFilteredProducts(filteredProducts);
  };
  
  return (
    <div>
      <main>
        <section className="hero-section">
          <Banner></Banner>
        </section>
        <section className="benefits-section"></section>
        
        {/* <section className="filters-section">
          <Filters></Filters>
        </section> */}
        <section>
          <Benefits></Benefits>
        </section>
        <section className="products-section">
        {noResults ? (
            <NoResults></NoResults>
          ) : (
            <Products products={filteredProducts} />
          )}
        </section>
       
       
      </main>
    </div>
  );
}

export default HomeView;
