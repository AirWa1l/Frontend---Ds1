import "./OrderSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const setDelivery = (type) => {
    setDeliveryType(type);
  };
  const checkOut = async () => {
    let payload = {
      DeliveryType: deliveryType,
      DeliveryTypeCost: deliveryType == "Standard" ? 5 : 10,
      costAfterDelieveryRate:
        store.state.cartTotal + (deliveryType == "Standard" ? 5 : 10),
      promoCode: "",
      phoneNumber: phone,
      user_id: auth.state.user?.id,
    };

    const response = await store.confirmOrder(payload);
    if (response.showRegisterLogin) {
      modal.openModal();
    }
  };
  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          {/* Resumen de los costos */}
          <div className="total-cost">
            <h4>Total Items({store.state.cartQuantity})</h4>
            <br />
            <h3>SUBTOTAL </h3>
            <h3>
              $&nbsp;
              {new Intl.NumberFormat("es-ES", {
                style: "decimal",
                useGrouping: true,
              }).format(Math.floor(store.state.cartTotal || 0))}
            </h3>
          </div>

          
          {/* Campos de información de contacto */}
          <div className="promo-code">
            <h4>Información de contacto</h4>
            <div>
              <label htmlFor="address">Dirección</label>
              <input
                id="address"
                className="select-dropdown"
                type="text"
                placeholder="Ingrese su dirección"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="city">Ciudad</label>
              <input
                id="city"
                className="select-dropdown"
                type="text"
                placeholder="Ingrese su ciudad"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
             <div>
              <label htmlFor="state">Estado</label>
              <input
                id="state"
                className="select-dropdown"
                type="text"
                placeholder="Ingrese su estado"
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="country">País</label>
              <input
                id="country"
                className="select-dropdown"
                type="text"
                placeholder="Ingrese su país"
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

           

            <div>
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                className="select-dropdown"
                type="text"
                placeholder="Ingrese su número de teléfono"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <small>
              <em style={{ color: "#ff2100" }}>
                Su número será utilizado para verificar la colocación del pedido
              </em>
            </small>
          </div>

          {/* Resumen del costo total */}
          <div className="final-cost">
            <h4>Total Cost</h4>
            <h4>
              $
              {store.state.cart.length > 0
                ? store.state.cartTotal + (deliveryType === "Standard" ? 5 : 10)
                : 0}
            </h4>
          </div>

          {/* Botón de finalización del pedido */}
          <div className="final-checkout">
            <button
              className="flat-button checkout"
              onClick={() => {
                if (
                  address &&
                  city &&
                  country &&
                  state &&
                  phone.length > 0
                ) {
                  checkOut();
                  toast.info("Your order is being processed");
                } else {
                  toast.error("Please complete all the fields");
                }
              }}
              disabled={store.state.cartQuantity > 0 ? false : true}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
