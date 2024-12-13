const setExpirationDate = (days) => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return expirationDate.toISOString(); // Esto devuelve la fecha en formato ISO string
};

const isExpired = (expirationDate) => {
  const now = new Date();
  // Convertimos expirationDate a Date si es necesario (en caso de que no sea un objeto Date)
  const expiration = new Date(expirationDate);
  return now.getTime() > expiration.getTime();
};

const getUserFromLocalStorage = () => {
  const userItem = localStorage.getItem("user");
  if (!userItem) {
    return null;
  }

  try {
    const user = JSON.parse(userItem); // Intentamos parsear el string a objeto
    const username = user.username;
    const role= user.role;
    const expirationDate = new Date(user.expirationDate); // Nos aseguramos de que sea un Date
    if (isExpired(expirationDate)) {
      localStorage.removeItem("user"); // Eliminamos el item si ha expirado
      return null;
    }
    return user; // Devolvemos el usuario si no ha expirado
  } catch (error) {
    console.error("Error al parsear el usuario desde localStorage:", error);
    return null; // Devolvemos null en caso de que haya un error con JSON.parse
  }
};

export { setExpirationDate, getUserFromLocalStorage };