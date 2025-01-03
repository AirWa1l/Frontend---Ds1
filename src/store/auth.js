import { useReducer } from "react";
import { toast } from "react-toastify";
import { setExpirationDate, getUserFromLocalStorage } from "../helpers/checkExpiration";

const initialState = {
  user: getUserFromLocalStorage() || null,
};

const actions = Object.freeze({
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
});

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.user };
    case actions.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userInfo) => {
    try {
      const response = await fetch("https://unizone-backend-server.onrender.com/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.username) {
          toast.error(errorData.username[0]);
        } else if (errorData.email) {
          toast.error(errorData.email[0]);
        } else {
          toast.error("Ocurrió un error inesperado.");
        }
      } else {
        toast.success("Usuario registrado exitosamente.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Hubo un problema al registrar el usuario.");
    }
  };

  const login = async (userInfo) => {
    try {
      const response = await fetch("https://unizone-backend-server.onrender.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Error en la autenticación");
      }

      const data = await response.json();

      if (data.access && data.refresh) {
        const user = {
          username: data.username,
          role: data.role,
          expirationDate: setExpirationDate(7),
        };

        dispatch({ type: actions.SET_USER, user });
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Inicio de sesión exitoso");
      } else {
        toast.error("Hubo un problema al iniciar sesión, intenta de nuevo");
      }
    } catch (error) {
      toast.error(error.message || "Hubo un problema al iniciar sesión, intenta de nuevo");
    }
  };

  const logout = async () => {
    try {
      // Eliminar el usuario del localStorage
      localStorage.removeItem("user");
      console.log("Usuario eliminado de localStorage.");
  
      // Despachar acción para actualizar el estado
      dispatch({ type: actions.LOGOUT });
      toast.success("Sesión cerrada correctamente");
  
      // Verificación del estado después de logout
      console.log("Estado después de cerrar sesión:", state);
  
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };
  
  

  return { state, register, login, logout };
};

export default useAuth;
