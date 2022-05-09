import Catalog from "./../../features/catalog/catalog";
import Header from "./Header";
import { createTheme, ThemeProvider, Container, CssBaseline } from "@mui/material";
import { useState } from "react";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const paletteType = darkMode ? 'dark' : 'light';
    const theme = createTheme({
        palette: {
            mode: paletteType,
            background: darkMode ? {} : { 'default': '#eaeaea' } } });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Container>
                <Catalog />
            </Container>
        </ThemeProvider>
    );
}

export default App;
