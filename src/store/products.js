import { useReducer } from "react";
import localforage from "localforage";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  cart: [],
  cartTotal: 0,
  cartQuantity: 0,
  order: [],
};

const actions = Object.freeze({
  ADD_TO_CART: "ADD_TO_CART",
  GET_PRODUCTS: "GET_PRODUCTS",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  ADD_QUANTITY: "ADD_QUANTITY",
  REDUCE_QUANTITY: "REDUCE_QUANTITY",
  PREFILL_CART: "PREFILL_CART",
});

const reducer = (state, action) => {
  // GET PRODUCTS
  if (action.type == actions.GET_PRODUCTS) {
    if (action.backed_up_cart == []) {
      return { ...state, products: action.products };
    }
    // prefil cart
    const cartTotal = action.backed_up_cart.reduce(
      (acc, item) => acc + item.price,
      0
    );
    const cartQuantity = action.backed_up_cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    const updatedProducts = action.products.map((product) => {
      const cartItem = action.backed_up_cart.find(
        (item) => item.id === product.id
      );
      if (cartItem) {
        return { ...cartItem, addedToCart: true };
      } else {
        return product;
      }
    });
    return {
      ...state,
      products: updatedProducts,
      cart: action.backed_up_cart,
      cartQuantity,
      cartTotal,
    };
  }
  // ADD TO CART
  if (action.type == actions.ADD_TO_CART) {
    const product = state.products.find((product) => product.id == action.product);
    product.addedToCart = true;
  
    // Verificar si el producto ya está en el carrito
    const updatedCart = state.cart.reduce((acc, item) => {
      if (item.id === product.id) {
        // Si el producto ya está en el carrito, solo actualizamos la cantidad
        acc.push({ ...item, quantity: item.quantity + 1 });
      } else {
        // Si el producto no está en el carrito, lo agregamos tal cual
        acc.push(item);
      }
      return acc;
    }, []);
  
    // Si el producto no está en el carrito, lo agregamos con cantidad 1
    if (!updatedCart.some((item) => item.id === product.id)) {
      updatedCart.push({ ...product, quantity: 1 });
    }
  
    // Backup con localForage aquí
    localforage.setItem("cartItems", updatedCart);
  
    // Calculamos el total con `reduce`
    const newCartTotal = updatedCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  
    // Calculamos la cantidad total de artículos, sumando las cantidades de cada producto
    const newCartQuantity = updatedCart.reduce(
      (total, product) => total + product.quantity, // Sumamos las cantidades de cada producto
      0
    );
  
    return {
      ...state,
      cart: updatedCart,
      cartQuantity: newCartQuantity, // Total de artículos, considerando la cantidad de cada producto
      cartTotal: newCartTotal, // Total en dinero basado en las cantidades
    };
  }
  
  
// Remove from cart
if (action.type == actions.REMOVE_FROM_CART) {
  // Encuentra el producto por su id
  const product = state.products.find((product) => product.id == action.product);

  // Filtra el producto del carrito
  const newCart = state.cart.filter((item) => item.id != action.product);

  // Crea un nuevo producto con addedToCart como false
  const updatedProduct = { ...product, addedToCart: false };

  // Almacena el carrito actualizado en localStorage
  localforage.setItem("cartItems", newCart);

  // Recalcula el total del carrito
  let newCartTotal = 0;
  newCart.forEach((item) => {
    newCartTotal += item.price * item.quantity;
  });

  // Calcula la cantidad total de artículos
  const newCartQuantity = newCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Retorna el nuevo estado con el carrito actualizado y los productos correctamente mapeados
  return {
    ...state,
    products: state.products.map((p) =>
      p.id === product.id ? updatedProduct : p // Usa 'id' en lugar de '_id'
    ),
    cart: newCart,
    cartQuantity: newCartQuantity, // Se calcula correctamente la cantidad total de artículos
    cartTotal: newCartTotal, // Se actualiza el total correctamente
  };
}
  // add quantity
  if (action.type === actions.ADD_QUANTITY) {
    // Mapeamos los productos del carrito para actualizar el producto objetivo
    const updatedCart = state.cart.map((product) =>
      product.id === action.product
        ? { ...product, quantity: product.quantity + 1 } // Incrementamos la cantidad del producto
        : product // Si no es el producto objetivo, lo dejamos igual
    );
  
    // Calculamos el total actualizado usando `reduce`
    const newCartTotal = updatedCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const newCartQuantity = updatedCart.reduce(
      (total, product) => total + product.quantity, // Sumamos las cantidades de cada producto
      0
    );
  
    return {
      ...state,
      cart: updatedCart, // Actualizamos el carrito con el carrito modificado
      cartQuantity: newCartQuantity,
      cartTotal: newCartTotal, // Usamos el nuevo total calculado
    };
  }
  // reduce quantity
  if (action.type === actions.REDUCE_QUANTITY) {
    const updatedCart = state.cart.map((product) =>
      product.id === action.product && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
  
    // Calcula el total actualizado basado en el carrito modificado
    const newCartTotal = updatedCart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const newCartQuantity = updatedCart.reduce(
      (total, product) => total + product.quantity, // Sumamos las cantidades de cada producto
      0
    );
    return {
      ...state,
      cart: updatedCart,
      cartQuantity: newCartQuantity,
      cartTotal: newCartTotal, // Usa el nuevo total calculado
    };
  }

  // clear cart
  if (action.type == actions.CLEAR_CART) {
    localforage.setItem("cartItems", []);
    
    return {
      ...state,
      cart: [],
      order: [],
      cartTotal: 0,
      cartQuantity: 0,
    };
  }

  return state;
};

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    // TODO: Add logic here and remove modification from dispatch
    dispatch({ type: actions.ADD_TO_CART, product });
  };

  const removeFromCart = (product) => {
    // TODO: Add logic here and remove modification from dispatch
    dispatch({ type: actions.REMOVE_FROM_CART, product });
  };

  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };
  const getProducts = () => {
    fetch(`https://unizone-backend-server.onrender.com/api/products/`)
      .then(async (response) => {
        const data = await response.json();
        let modifiedData = data.map((product) => {
          return { ...product, addedToCart: false };
        });
        let cart = (await localforage.getItem("cartItems")) || [];
        dispatch({
          type: actions.GET_PRODUCTS,
          products: modifiedData,
          backed_up_cart: cart,
        });
      })
      .catch((err) => {
        toast.error(
          "There was a problem fetching products, check your internet connection and try again"
        );
        return [];
      });
  };

  const addQuantity = (product) => {
    dispatch({ type: actions.ADD_QUANTITY, product });
  };

  const reduceQuantity = (product) => {
    dispatch({ type: actions.REDUCE_QUANTITY, product });
  };

  const confirmOrder = async (order) => {
    let payload = {
      items: state.cart,
      totalItemCount: state.cartQuantity,
      delivery_type: order.DeliveryType,
      delivery_type_cost: order.DeliveryTypeCost,
      cost_before_delivery_rate: state.cartTotal,
      cost_after_delivery_rate: order.costAfterDelieveryRate,
      promo_code: order.promo_code || "",
      contact_number: order.phoneNumber,
      user_id: order.user_id,
    };
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/place-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error("You must be logged in to place an order");
      return { showRegisterLogin: true };
    }
    toast.success(data.message);
    clearCart();
    return true;
  };

  return {
    state,
    addToCart,
    removeFromCart,
    clearCart,
    getProducts,
    addQuantity,
    reduceQuantity,
    confirmOrder,
  };
};

export default useStore;
