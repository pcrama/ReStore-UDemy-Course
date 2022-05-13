import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setupInterceptors } from "../../api/agent";
import AboutPage from "../../features/about/AboutPage";
import BasketPage from "../../features/basket/BasketPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import Catalog from "./../../features/catalog/catalog";
import Header from "./Header";

function App() {
    const navigate = useNavigate();
    setupInterceptors(navigate);
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: darkMode ? {} : { 'default': '#eaeaea' }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Container>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/catalog/:id' element={<ProductDetails />} />
                    <Route path='/basket' element={<BasketPage />} />
                    <Route path='/server-error' element={<ServerError />} />
                    <Route path='/*' element={<NotFound />} />
                </Routes>
            </Container>
            <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        </ThemeProvider>
    );
}

export default App;
