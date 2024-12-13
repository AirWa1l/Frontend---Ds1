import "./OrderDetails.css";

import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const OrderDetails = ({ product }) => {
  let {store} = useGlobalContext();
  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          <img src={product.photo} alt="" />
        </div>
        <div className="right-side">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      <div className="order-price"><h2>
    $&nbsp;
    {new Intl.NumberFormat("es-ES", {
      style: "decimal",
      useGrouping: true,
    }).format(Math.floor(product?.price))}
    </h2>
  </div>
      <div className="quantity">
        <p>Quantity</p>
        <div className="increase-quantity">
          <button
            onClick={() => {
              store.reduceQuantity(product.id);
            }}
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            onClick={() => {
              store.addQuantity(product.id);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="remove">
        <button
          onClick={() => {
            store.removeFromCart(product?.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default OrderDetails;
