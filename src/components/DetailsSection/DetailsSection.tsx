// components/DetailsSection/DetailsSection.tsx
import React, { useState } from "react";
import { Box, Typography, Button, Grow } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

/* ── palette ── */
const T = {
  cream:     "#f9f3ec",
  parchment: "#f2e8d9",
  gold:      "#b8843a",
  goldLight: "#d4a96a",
  goldDark:  "#7a5220",
  rose:      "#c2616e",
  roseDark:  "#8b3a44",
  text:      "#3a2a1a",
  textMid:   "#7a5c40",
  textFaint: "#b09070",
  border:    "rgba(180,130,80,0.22)",
  shadow:    "rgba(100,60,20,0.14)",
};

const scriptFont = { fontFamily: "'Pinyon Script', cursive" };
const serifFont  = { fontFamily: "'Cormorant Garamond', serif" };

/* ── Ornament divider ── */
const Ornament: React.FC<{ color?: string }> = ({ color = T.goldLight }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 2 }}>
    <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${color}80)` }} />
    <Box sx={{ fontSize: 12, color, letterSpacing: 6, opacity: 0.7 }}>✦ ✦ ✦</Box>
    <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${color}80, transparent)` }} />
  </Box>
);

/* ── Copy-to-clipboard pill ── */
const CopyPill: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };
  return (
    <Box
      onClick={handleCopy}
      sx={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2,
        background: "linear-gradient(145deg, #fffdf9, #fdf5e8)",
        border: `1px solid ${T.border}`,
        borderRadius: "14px", px: 2.5, py: 1.5,
        cursor: "pointer", transition: "all 0.25s",
        "&:hover": { borderColor: `${T.gold}60`, boxShadow: `0 6px 20px ${T.shadow}`, transform: "translateY(-2px)" },
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 10, letterSpacing: "0.24em", color: T.textFaint, textTransform: "uppercase", mb: 0.2 }}>
          {label}
        </Typography>
        <Typography sx={{ ...serifFont, fontSize: 16, color: T.text, letterSpacing: "0.04em" }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: copied ? "linear-gradient(135deg,#4caf50,#388e3c)" : `linear-gradient(135deg,${T.gold},${T.goldDark})`,
        color: "#fff", transition: "background 0.3s", flexShrink: 0,
      }}>
        {copied ? <CheckIcon sx={{ fontSize: 16 }} /> : <ContentCopyIcon sx={{ fontSize: 15 }} />}
      </Box>
    </Box>
  );
};

/* ── Bank card ── */
interface BankAccount {
  banco: string;
  titular: string;
  clabe?: string;
  cuenta?: string;
  emoji?: string;
}

const BankCard: React.FC<BankAccount> = ({ banco, titular, clabe, cuenta, emoji = "🏦" }) => (
  <Box sx={{
    background: "linear-gradient(145deg, #fffdf9, #fdf5e8)",
    border: `1px solid ${T.border}`,
    borderRadius: "20px", p: 3,
    boxShadow: `0 6px 24px ${T.shadow}`,
  }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <Box sx={{
        fontSize: 22, width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: `radial-gradient(circle, ${T.parchment}, #fff8f0)`,
        border: `1px solid ${T.border}`, borderRadius: "12px", flexShrink: 0,
      }}>{emoji}</Box>
      <Box>
        <Typography sx={{ ...serifFont, fontSize: 17, fontWeight: 500, color: T.text }}>{banco}</Typography>
        <Typography sx={{ ...serifFont, fontStyle: "italic", fontSize: 13, color: T.textMid }}>{titular}</Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {clabe  && <CopyPill label="CLABE"  value={clabe} />}
      {cuenta && <CopyPill label="Cuenta" value={cuenta} />}
    </Box>
  </Box>
);

/* ── Gift category card ── */
interface GiftCategory {
  emoji: string;
  title: string;
  subtitle: string;
  items: string[];
  highlight?: boolean;
}

const GiftCategoryCard: React.FC<GiftCategory> = ({ emoji, title, subtitle, items, highlight }) => (
  <Box sx={{
    background: highlight
      ? `linear-gradient(145deg, #fff5f8, #fdeef3)`
      : "linear-gradient(145deg, #fffdf9, #fdf5e8)",
    border: `1px solid ${highlight ? "rgba(194,97,110,0.28)" : T.border}`,
    borderRadius: "20px", p: 3,
    transition: "all 0.3s cubic-bezier(0.34,1.2,0.64,1)",
    boxShadow: `0 6px 20px ${T.shadow}`,
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: `0 22px 44px ${T.shadow}`,
      borderColor: highlight ? "rgba(194,97,110,0.5)" : `${T.gold}50`,
    },
  }}>
    {/* Header */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
      <Box sx={{
        fontSize: 26, width: 50, height: 50,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: highlight
          ? "radial-gradient(circle, #fdeef3, #fff5f8)"
          : `radial-gradient(circle, ${T.parchment}, #fff8f0)`,
        border: `1px solid ${highlight ? "rgba(194,97,110,0.22)" : T.border}`,
        borderRadius: "14px", flexShrink: 0,
      }}>{emoji}</Box>
      <Box>
        <Typography sx={{ ...serifFont, fontSize: 17, fontWeight: 500, color: T.text, lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Typography sx={{ ...serifFont, fontStyle: "italic", fontSize: 13, color: T.textMid }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>

    {/* Items grid */}
    <Box sx={{
      display: "flex", flexWrap: "wrap", gap: 0.8, mt: 1,
    }}>
      {items.map((item) => (
        <Box key={item} sx={{
          background: highlight
            ? "rgba(194,97,110,0.07)"
            : `rgba(184,132,58,0.07)`,
          border: `1px solid ${highlight ? "rgba(194,97,110,0.18)" : "rgba(184,132,58,0.2)"}`,
          borderRadius: "20px",
          px: 1.5, py: 0.4,
          fontSize: 12,
          fontFamily: "'Cormorant Garamond', serif",
          color: highlight ? T.roseDark : T.goldDark,
          letterSpacing: "0.04em",
          fontStyle: "italic",
        }}>
          {item}
        </Box>
      ))}
    </Box>
  </Box>
);

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
interface DetailsSectionProps {
  lugar?: string;
  direccion?: string;
  coordenadasGPS?: { lat: number; lng: number };
  cuentasBancarias?: BankAccount[];
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  lugar = "Hacienda Los Olivos",
  direccion = "Grand Jardín",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
  cuentasBancarias = [
    { banco: "BBVA",    titular: "Andrew Alonso",        clabe: "012345678901234567", emoji: "💙" },
    { banco: "Banorte", titular: "Montserrat Hernández",  clabe: "072345678901234567", cuenta: "1234567890", emoji: "❤️" },
  ],
}) => {
  const openMaps = () => {
    if (coordenadasGPS)
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${coordenadasGPS.lat},${coordenadasGPS.lng}`,
        "_blank",
      );
  };

  const giftCategories: GiftCategory[] = [
    {
      emoji: "🍳",
      title: "Cocina y comedor",
      subtitle: "Lo esencial para nuestro hogar",
      items: [
        "Sartenes", "Cazuelas", "Ollas",
        "Juego de tazas", "Platos y bowls", "Vasos y copas",
        "Juego de cubiertos", "Licuadora",
      ],
    },
    {
      emoji: "🏠",
      title: "Para el hogar",
      subtitle: "Detalles que hacen la diferencia",
      items: [
        "Plancha de ropa", "Aspiradora", "Portarretratos",
        "Juego de toallas", "Ropa de cama", "Almohadas",
        "Escurridor de trastes", "Organizadores",
      ],
    },
    {
      emoji: "🧹",
      title: "Limpieza y orden",
      subtitle: "Para mantener todo en su lugar",
      items: [
        "Set de limpieza", "Cubeta con escurridor", "Mopa",
        "Contenedores herméticos", "Organizador de cajones",
        "Cesto para ropa sucia", "Tapetes de baño",
      ],
    },
    {
      emoji: "✈️",
      title: "Luna de miel",
      subtitle: "Apoya nuestro primer gran viaje",
      items: [
        "Noche de hotel", "Vuelo", "Cena romántica",
        "Tour o excursión",
      ],
      highlight: true,
    },
  ];

  return (
    <Grow in timeout={700}>
      <Box>
        {/* ─── Paper wrapper ─── */}
        <Box sx={{
          background: "linear-gradient(170deg, #fffdf9 0%, #fdf6ec 50%, #faf0e4 100%)",
          border: `1px solid ${T.border}`,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: `0 32px 80px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}>
          {/* Lace top */}
          <Box sx={{ height: 12, background: `repeating-linear-gradient(90deg, ${T.gold}30 0px, ${T.gold}30 4px, transparent 4px, transparent 12px)` }} />

          <Box sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 } }}>

            {/* ════ UBICACIÓN ════ */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography sx={{ ...serifFont, fontSize: 11, letterSpacing: "0.28em", color: T.textFaint, textTransform: "uppercase", mb: 1 }}>
                ✦ Dónde nos encontramos ✦
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize: { xs: 48, sm: 58 }, color: T.roseDark, lineHeight: 1 }}>
                Ubicación
              </Typography>
            </Box>

            <Box sx={{
              background: "#fff8f1", border: `1px solid ${T.border}`,
              borderRadius: "20px", p: { xs: 3, sm: 4 },
              textAlign: "center", boxShadow: `0 12px 32px ${T.shadow}`, mb: 2,
            }}>
              <Box sx={{ fontSize: 48, mb: 1.5 }}>🏛️</Box>
              <Typography sx={{ ...scriptFont, fontSize: 34, color: T.goldDark, lineHeight: 1, mb: 0.5 }}>{lugar}</Typography>
              <Typography sx={{ ...serifFont, fontSize: 15, color: T.textMid, letterSpacing: "0.12em", mb: 3 }}>{direccion}</Typography>

              {/* Map placeholder */}
              <Box sx={{
                borderRadius: "16px", overflow: "hidden",
                border: `1px solid ${T.border}`, mb: 3, height: 180,
                background: "linear-gradient(145deg, #f0e8da, #e8dcc8)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1,
                position: "relative",
              }}>
                <Box sx={{
                  position: "absolute", inset: 0,
                  backgroundImage: `
                    linear-gradient(rgba(180,130,80,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(180,130,80,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }} />
                <LocationOnIcon sx={{ fontSize: 40, color: T.rose, filter: `drop-shadow(0 4px 8px ${T.rose}50)` }} />
                <Typography sx={{ ...serifFont, fontSize: 14, color: T.textMid, fontStyle: "italic" }}>{lugar}</Typography>
              </Box>

              <Button
                onClick={openMaps} fullWidth
                sx={{
                  ...serifFont, fontSize: 15, letterSpacing: "0.14em", color: "#fff",
                  background: `linear-gradient(135deg, ${T.gold}, ${T.goldDark})`,
                  borderRadius: "30px", py: 1.5, textTransform: "none",
                  boxShadow: `0 8px 24px rgba(122,82,32,0.28)`,
                  "&:hover": { transform: "translateY(-2px)", boxShadow: `0 14px 32px rgba(122,82,32,0.36)` },
                  transition: "all 0.3s",
                }}
                startIcon={<LocationOnIcon />}
              >
                Abrir en Google Maps
              </Button>
            </Box>

            <Ornament />

            {/* ════ REGALOS ════ */}
            <Box sx={{ textAlign: "center", my: 4 }}>
              <Typography sx={{ ...serifFont, fontSize: 11, letterSpacing: "0.28em", color: T.textFaint, textTransform: "uppercase", mb: 1 }}>
                ✦ Si deseas hacernos un regalo ✦
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize: { xs: 48, sm: 58 }, color: T.roseDark, lineHeight: 1, mb: 1 }}>
                Regalos
              </Typography>
              <Typography sx={{ ...serifFont, fontStyle: "italic", fontSize: 15, color: T.textMid, lineHeight: 1.7, px: { xs: 0, sm: 2 } }}>
                Tu presencia es lo más importante, pero si deseas obsequiarnos algo,
                aquí te dejamos algunas ideas sencillas y con mucho amor.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
              {giftCategories.map((cat) => (
                <GiftCategoryCard key={cat.title} {...cat} />
              ))}
            </Box>

            <Ornament />

            {/* ════ CUENTAS ════ */}
            <Box sx={{ textAlign: "center", my: 4 }}>
              <Typography sx={{ ...serifFont, fontSize: 11, letterSpacing: "0.28em", color: T.textFaint, textTransform: "uppercase", mb: 1 }}>
                ✦ Para transferencias ✦
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize: { xs: 48, sm: 58 }, color: T.roseDark, lineHeight: 1, mb: 1 }}>
                Cuentas
              </Typography>
              <Typography sx={{ ...serifFont, fontStyle: "italic", fontSize: 15, color: T.textMid, lineHeight: 1.7, mb: 3 }}>
                Toca el ícono de copiar para guardar los datos fácilmente.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {cuentasBancarias.map((cuenta) => (
                <BankCard key={cuenta.banco} {...cuenta} />
              ))}
            </Box>

            {/* Closing */}
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Ornament />
              <Typography sx={{ ...scriptFont, fontSize: 34, color: T.goldDark, mt: 2 }}>
                ¡Gracias por tu amor!
              </Typography>
              <Typography sx={{ ...serifFont, fontStyle: "italic", fontSize: 13, color: T.textFaint, mt: 0.5 }}>
                Cada detalle es un abrazo de tu parte
              </Typography>
            </Box>

          </Box>

          {/* Lace bottom */}
          <Box sx={{ height: 12, background: `repeating-linear-gradient(90deg, ${T.gold}30 0px, ${T.gold}30 4px, transparent 4px, transparent 12px)` }} />
        </Box>
      </Box>
    </Grow>
  );
};

export default DetailsSection;