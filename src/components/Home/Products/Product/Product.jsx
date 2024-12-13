import "./Product.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  let {store} = useGlobalContext();
  
 
  const isInCart = product?.addedToCart;
  return (
    <div className="product-container">
      <div className="image">
        <img
          src={product.photo || headphones_pink}
          alt="Product Image"
          width={"100%"}
        />
      </div>
      <div className="product-details">
        <div className="name-add-to-cart"></div>
        <div className="price">
          <div className="name-price-product">
            <h4>{product?.name}</h4>
            <h3>
            <span className="actual-product-price"><>$&nbsp;</>
            {new Intl.NumberFormat("es-ES", { style: "decimal", useGrouping: true }).format(Math.floor(product?.price))}
            </span>

            </h3>
          </div>
          <h5>{product?.description}</h5>
        </div>
        <div>
          {isInCart == false ? (
            <button
              className="add-to-cart"
              onClick={() => {
                if (store.state.cartQuantity > 10) {
                  toast.warning("You can only add 10 items to cart");
                  return;
                }
                store.addToCart(product?.id);
                toast.success("Producto Añadido al carrito", {
                  autoClose: 350, // Tiempo de cierre automático en milisegundos
                  hideProgressBar: true, // Muestra barra de progreso
                });
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => {
                store.removeFromCart(product?.id);
                toast.success("Producto Eliminado del carrito", {
                  autoClose: 350, // Tiempo de cierre automático en milisegundos
                  hideProgressBar: true, // Muestra barra de progreso
                });
              }}
            >
              Remove from cart
            </button>
          )}
        </div>
      </div>
      <div className="heart"></div>
    </div>
  );
};
export default Product;
