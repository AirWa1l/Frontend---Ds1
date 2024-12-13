import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import NavBar from "@/components/NavBar/NavBar";
import ShopFooter from "@/components/Footer/ShopFooter";
import Modal from "./components/Modals/Modal";
import CancelOrder from "./components/Modals/CancelOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import PasswordResetRequest from "./components/NavBar/reset/PasswordResetRequest";
import PasswordResetConfirm from "./components/NavBar/reset/PasswordResetConfirm";
import useAuth from "@/store/auth";

// Global components
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

// Views
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ErrorView from "./views/ErrorView";
import CartView from "./views/CartView";
import DeliveryView from "./views/DeliveryView";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { store, modal } = useGlobalContext();
  const { state } = useAuth(); 
  const userRole = state.user?.role;
  

  useEffect(() => {
    if (store.state.products.length > 0) return;
    store.getProducts();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            {/* Topbar and Sidebar */}
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
             
              <header>
                <NavBar onSearch={(term) => setSearchTerm(term)} />
              </header>
              <Routes>
              {userRole === "admin" && (
                  <>
                    <Route path="/adm" element={<Dashboard />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/form" element={<Form />} />
                    <Route path="/bar" element={<Bar />} />
                    <Route path="/pie" element={<Pie />} />
                    <Route path="/line" element={<Line />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/geography" element={<Geography />} />
                  </>
                )}

                {/* Routes for the second app */}
                <Route path="/" element={<HomeView searchTerm={searchTerm} />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/password_reset" element={<PasswordResetRequest />} />
                <Route path="/password-reset/confirm" element={<PasswordResetConfirm />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/delivery" element={<DeliveryView />} />
                <Route path="*" element={<ErrorView />} />
              </Routes>
            </main>
            <footer>
              <ShopFooter />
            </footer>
          </div>
        </BrowserRouter>

        {/* Modals */}
        {modal.opened && (
          <Modal
            header={modal.isRegister ? "Create Account" : "Login"}
            submitAction="/"
            buttonText={modal.isRegister ? "Create Account" : "Login"}
            isRegister={modal.isRegister}
          />
        )}
        {modal.isCancelModal && <CancelOrder />}
        <ToastContainer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;