import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Fade } from "@mui/material";
import WeddingInvitation from "./WeddingInvitation/WeddingInvitation";
import { useState } from "react";
import EnvelopeOpening from "./components/EnvelopeOpening/EnvelopeOpening";

// Tema personalizado para la boda
const weddingTheme = createTheme({
  palette: {
    primary: {
      main: "#d4b59e", // Beige elegante
      light: "#e8d5c4",
      dark: "#b38b6e",
    },
    secondary: {
      main: "#b76e79", // Rosa vintage
      light: "#dba1aa",
      dark: "#8e4d55",
    },
    info: {
      main: "#9cb3b8", // Azul grisáceo suave
    },
    background: {
      default: "#faf7f2",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontFamily: '"Playfair Display", "Georgia", serif',
    },
  },
});

function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpenInvitation = () => {
    // Primero hacemos fade out del sobre
    setFadeOut(true);

    // Luego mostramos la invitación
    setTimeout(() => {
      setShowInvitation(true);
    }, 1000);
  };

  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {/* Efecto de sobre (solo se muestra si no se ha abierto la invitación) */}
        {!showInvitation && (
          <Fade in={!fadeOut} timeout={1000} unmountOnExit>
            <Box>
              <EnvelopeOpening onOpen={handleOpenInvitation} />
            </Box>
          </Fade>
        )}

        {/* Invitación (se muestra después de abrir el sobre) */}
        {showInvitation && (
          <Fade in={true} timeout={1500}>
            <Box>
              <WeddingInvitation
                novio="Andrew"
                novia="Montserrat"
                fecha="Sábado, 17 de Abril 2027"
                hora="5:00 PM"
                lugar="Grand Jardín"
                direccion="Zalamea 353, 47912 La Barca, Jal."
                mensaje="Hoy nos convertimos en el sueño que soñamos juntos, y queremos que seas parte de este momento tan especial."
              />
            </Box>
          </Fade>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
