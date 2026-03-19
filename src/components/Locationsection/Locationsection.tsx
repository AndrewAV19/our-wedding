// components/LocationSection/LocationSection.tsx
import React from "react";
import { Box, Typography, Button, Grow } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const T = {
  cream: "#fdf8f2",
  parchment: "#f9efe3",
  roseGold: "#e8b4b8",
  roseGoldLight: "#f2d4d7",
  roseGoldDark: "#c28186",
  dustyRose: "#d6a2a8",
  blush: "#f7e0e3",
  gold: "#c9a87c",
  goldLight: "#e0c8a8",
  goldDark: "#a8865c",
  text: "#4a3b30",
  textMid: "#7d6b5c",
  textFaint: "#b8a99a",
  border: "rgba(200, 150, 140, 0.15)",
  shadow: "rgba(150, 100, 100, 0.1)",
  glow: "rgba(230, 180, 180, 0.3)",
};

const scriptFont = {
  fontFamily: "'Great Vibes', cursive",
  fontWeight: 400,
  letterSpacing: "0.02em",
};

const serifFont = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  letterSpacing: "0.03em",
};

const romanticFont = {
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 300,
  letterSpacing: "0.05em",
};

const FloralDivider: React.FC<{ variant?: "simple" | "detailed" }> = ({
  variant = "detailed",
}) => {
  if (variant === "simple") {
    return (
      <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", gap:1, my:3 }}>
        <Box sx={{ width:30, height:"1px", background:`linear-gradient(90deg, transparent, ${T.roseGold})` }} />
        <FavoriteIcon sx={{ fontSize:18, color:T.roseGold, opacity:0.6 }} />
        <Box sx={{ width:30, height:"1px", background:`linear-gradient(90deg, ${T.roseGold}, transparent)` }} />
      </Box>
    );
  }
  return (
    <Box sx={{ position:"relative", my:4, textAlign:"center" }}>
      <Box sx={{
        position:"absolute", top:"50%", left:0, right:0, height:"1px",
        background:`linear-gradient(90deg, transparent, ${T.roseGoldLight}, transparent)`,
        transform:"translateY(-50%)",
      }} />
      <Box sx={{ position:"relative", display:"inline-block", background:T.cream, px:3, color:T.roseGoldDark, fontSize:24 }}>
        ✦ ❀ ✦
      </Box>
    </Box>
  );
};

interface LocationSectionProps {
  lugar?: string;
  direccion?: string;
  coordenadasGPS?: { lat: number; lng: number };
}

const LocationSection: React.FC<LocationSectionProps> = ({
  lugar = "Hacienda Los Olivos",
  direccion = "Camino Real #123, Jardines del Valle",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
}) => {
  const openMaps = () => {
    if (coordenadasGPS)
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`,
        "_blank",
      );
  };

  return (
    <Grow in timeout={800}>
      <Box>
        <Box sx={{
          background: "linear-gradient(145deg, #fffcf9, #fff5f0)",
          border: `1px solid ${T.border}`,
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: `0 20px 60px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.5)`,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${T.roseGold}10 0%, transparent 15%),
              radial-gradient(circle at 80% 70%, ${T.roseGold}10 0%, transparent 20%),
              radial-gradient(circle at 40% 80%, ${T.roseGold}10 0%, transparent 25%),
              radial-gradient(circle at 70% 20%, ${T.roseGold}10 0%, transparent 18%)
            `,
            pointerEvents: "none",
          },
        }}>

          {/* Borde superior */}
          <Box sx={{
            height: 16,
            background: `linear-gradient(90deg, ${T.roseGoldLight} 0%, ${T.goldLight} 30%, ${T.roseGoldLight} 70%, ${T.goldLight} 100%)`,
            opacity: 0.4,
          }} />

          <Box sx={{ px:{ xs:3, sm:5 }, py:{ xs:5, sm:6 }, position:"relative", zIndex:1 }}>

            <FloralDivider variant="detailed" />

            {/* Título */}
            <Box sx={{ textAlign:"center", mb:4 }}>
              <Typography sx={{ ...romanticFont, fontSize:11, letterSpacing:"0.28em", color:T.textFaint, textTransform:"uppercase", mb:1 }}>
                El lugar donde diremos sí, acepto
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize:{ xs:48, sm:58 }, color:T.roseGoldDark, lineHeight:1 }}>
                La Ceremonia
              </Typography>
            </Box>

            {/* Tarjeta del lugar */}
            <Box sx={{
              background: "linear-gradient(145deg, #fffcf9, #fff5f0)",
              border: `1px solid ${T.border}`,
              borderRadius: "28px",
              p:{ xs:3, sm:4 },
              textAlign: "center",
              boxShadow: `0 15px 35px ${T.shadow}`,
              mb: 2,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Decoración esquinas */}
              {["topLeft","topRight","bottomLeft","bottomRight"].map((pos) => (
                <Box key={pos} sx={{
                  position: "absolute",
                  top: pos.startsWith("top") ? 10 : "auto",
                  bottom: pos.startsWith("bottom") ? 10 : "auto",
                  left: pos.endsWith("Left") ? 10 : "auto",
                  right: pos.endsWith("Right") ? 10 : "auto",
                  fontSize: 20, opacity: 0.3,
                }}>❀</Box>
              ))}

              <Box sx={{ fontSize:56, mb:2, opacity:0.9 }}>🏛️</Box>

              <Typography sx={{ ...scriptFont, fontSize:42, color:T.goldDark, lineHeight:1, mb:0.5 }}>
                {lugar}
              </Typography>
              <Typography sx={{ ...serifFont, fontSize:16, color:T.textMid, letterSpacing:"0.02em", mb:3, fontStyle:"italic" }}>
                {direccion}
              </Typography>

              {/* Mapa decorativo */}
              <Box sx={{
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${T.border}`,
                mb: 3,
                height: 200,
                background: "linear-gradient(145deg, #f5e8e0, #f0e0d5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                position: "relative",
              }}>
                <Box sx={{
                  position: "absolute", inset: 0,
                  backgroundImage: `
                    radial-gradient(circle at 30% 40%, ${T.roseGold}15 0%, transparent 30%),
                    radial-gradient(circle at 70% 60%, ${T.roseGold}15 0%, transparent 30%)
                  `,
                }} />
                <LocationOnIcon sx={{ fontSize:48, color:T.roseGoldDark, filter:`drop-shadow(0 4px 8px ${T.roseGold}60)`, position:"relative", zIndex:1 }} />
                <Typography sx={{ ...serifFont, fontSize:15, color:T.textMid, fontStyle:"italic", position:"relative", zIndex:1 }}>
                  {lugar}
                </Typography>
              </Box>

              <Button
                onClick={openMaps}
                fullWidth
                sx={{
                  ...romanticFont, fontSize:15, letterSpacing:"0.1em", color:"#fff",
                  background: `linear-gradient(135deg, ${T.roseGold}, ${T.roseGoldDark})`,
                  borderRadius: "40px", py:1.5, textTransform:"none",
                  boxShadow: `0 8px 20px ${T.roseGold}60`,
                  "&:hover": { transform:"translateY(-3px)", boxShadow:`0 15px 30px ${T.roseGold}80`, background:`linear-gradient(135deg, ${T.roseGoldDark}, ${T.roseGold})` },
                  transition: "all 0.3s ease",
                }}
                startIcon={<LocationOnIcon />}
              >
                Cómo llegar
              </Button>
            </Box>

            {/* Mensaje de cierre */}
            <Box sx={{ textAlign:"center", mt:4 }}>
              <FloralDivider variant="simple" />
              <Typography sx={{ ...scriptFont, fontSize:36, color:T.roseGoldDark, mt:2, lineHeight:1.2 }}>
                Con todo nuestro amor
              </Typography>
              <Typography sx={{ ...romanticFont, fontSize:13, color:T.textFaint, mt:1.5, letterSpacing:"0.1em" }}>
                Te esperamos con los brazos abiertos ❤️
              </Typography>
            </Box>

          </Box>

          {/* Borde inferior */}
          <Box sx={{
            height: 16,
            background: `linear-gradient(90deg, ${T.roseGoldLight} 0%, ${T.goldLight} 30%, ${T.roseGoldLight} 70%, ${T.goldLight} 100%)`,
            opacity: 0.4,
          }} />
        </Box>
      </Box>
    </Grow>
  );
};

export default LocationSection;