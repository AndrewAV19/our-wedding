// components/GiftsSection/GiftsSection.tsx
import React, { useState } from "react";
import { Box, Typography, Grow, Fade } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const T = {
  cream: "#fdf8f2",
  parchment: "#f9efe3",
  roseGold: "#e8b4b8",
  roseGoldLight: "#f2d4d7",
  roseGoldDark: "#c28186",
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

// ─── Shared sub-components ────────────────────────────────────────────────────

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

const CopyButton: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };
  return (
    <Fade in timeout={500}>
      <Box
        onClick={handleCopy}
        sx={{
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:2,
          background:"linear-gradient(135deg, #ffffff, #fff9f5)",
          border:`1px solid ${T.border}`, borderRadius:"40px",
          px:2.5, py:1.2, cursor:"pointer", transition:"all 0.3s ease",
          position:"relative", overflow:"hidden",
          "&::before": {
            content:'""', position:"absolute", top:0, left:"-100%",
            width:"100%", height:"100%",
            background:`linear-gradient(90deg, transparent, ${T.glow}, transparent)`,
            transition:"left 0.5s ease",
          },
          "&:hover::before": { left:"100%" },
          "&:hover": { transform:"translateY(-2px)", borderColor:T.roseGold, boxShadow:`0 10px 20px ${T.shadow}` },
        }}
      >
        <Box>
          <Typography sx={{ fontSize:10, letterSpacing:"0.2em", color:T.textFaint, textTransform:"uppercase", fontFamily:"'Montserrat', sans-serif", fontWeight:300, mb:0.2 }}>
            {label}
          </Typography>
          <Typography sx={{ ...serifFont, fontSize:15, color:T.text, letterSpacing:"0.02em", fontStyle:"italic" }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{
          width:32, height:32, borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center",
          background: copied
            ? "linear-gradient(135deg, #95b8a0, #7fa08a)"
            : `linear-gradient(135deg, ${T.roseGold}, ${T.roseGoldDark})`,
          color:"#fff", transition:"all 0.3s ease", flexShrink:0,
          boxShadow:`0 4px 10px ${T.roseGold}40`,
        }}>
          {copied ? <CheckIcon sx={{ fontSize:16 }} /> : <ContentCopyIcon sx={{ fontSize:14 }} />}
        </Box>
      </Box>
    </Fade>
  );
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface BankAccount {
  banco: string;
  titular: string;
  clabe?: string;
  cuenta?: string;
  emoji?: string;
}

interface GiftCategory {
  emoji: string;
  title: string;
  subtitle: string;
  items: string[];
  highlight?: boolean;
  icon?: React.ReactNode;
}

// ─── BankCard ─────────────────────────────────────────────────────────────────

const BankCard: React.FC<BankAccount> = ({ banco, titular, clabe, cuenta, emoji = "🏦" }) => (
  <Box sx={{
    background:"linear-gradient(145deg, #ffffff, #fff9f5)",
    border:`1px solid ${T.border}`, borderRadius:"24px", p:3,
    boxShadow:`0 10px 30px ${T.shadow}`, transition:"all 0.3s ease",
    "&:hover": { boxShadow:`0 15px 40px ${T.shadow}` },
  }}>
    <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2.5 }}>
      <Box sx={{
        fontSize:24, width:48, height:48,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:`radial-gradient(circle at 30% 30%, ${T.blush}, ${T.cream})`,
        border:`1px solid ${T.roseGoldLight}`, borderRadius:"16px", flexShrink:0,
        boxShadow:`inset 0 2px 4px white, 0 4px 8px ${T.shadow}`,
      }}>
        {emoji}
      </Box>
      <Box>
        <Typography sx={{ ...serifFont, fontSize:18, fontWeight:500, color:T.text, lineHeight:1.2 }}>{banco}</Typography>
        <Typography sx={{ ...romanticFont, fontSize:13, color:T.textMid, fontStyle:"italic", mt:0.2 }}>{titular}</Typography>
      </Box>
    </Box>
    <Box sx={{ display:"flex", flexDirection:"column", gap:1.5 }}>
      {clabe  && <CopyButton label="CLABE"  value={clabe}  />}
      {cuenta && <CopyButton label="Cuenta" value={cuenta} />}
    </Box>
  </Box>
);

// ─── GiftCategoryCard ─────────────────────────────────────────────────────────

const GiftCategoryCard: React.FC<GiftCategory> = ({ emoji, title, subtitle, items, highlight, icon }) => (
  <Box sx={{
    background: highlight ? "linear-gradient(145deg, #fff5f8, #fff0f5)" : "linear-gradient(145deg, #ffffff, #fff9f5)",
    border:`1px solid ${highlight ? T.roseGold : T.border}`,
    borderRadius:"24px", p:3,
    transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: highlight ? `0 10px 30px ${T.roseGold}30` : `0 8px 25px ${T.shadow}`,
    position:"relative", overflow:"hidden",
    "&::after": highlight ? {
      content:'""', position:"absolute", top:0, right:0, width:"80px", height:"80px",
      background:`radial-gradient(circle at top right, ${T.roseGoldLight}40, transparent)`,
      borderRadius:"50%",
    } : {},
    "&:hover": {
      transform:"translateY(-8px)",
      boxShadow: highlight ? `0 20px 40px ${T.roseGold}40` : `0 20px 40px ${T.shadow}`,
    },
  }}>
    <Box sx={{ display:"flex", alignItems:"center", gap:2, mb:2 }}>
      <Box sx={{
        fontSize:28, width:56, height:56,
        display:"flex", alignItems:"center", justifyContent:"center",
        background: highlight ? `radial-gradient(circle at 30% 30%, ${T.blush}, #fff)` : `radial-gradient(circle at 30% 30%, ${T.cream}, #fff)`,
        border:`1px solid ${highlight ? T.roseGold : T.goldLight}`,
        borderRadius:"18px", flexShrink:0,
        boxShadow:`inset 0 2px 4px white, 0 6px 12px ${T.shadow}`,
      }}>
        {icon || emoji}
      </Box>
      <Box>
        <Typography sx={{ ...serifFont, fontSize:18, fontWeight:500, color:T.text, lineHeight:1.2 }}>{title}</Typography>
        <Typography sx={{ ...romanticFont, fontSize:13, color:T.textMid, fontStyle:"italic", mt:0.2 }}>{subtitle}</Typography>
      </Box>
    </Box>
    <Box sx={{ display:"flex", flexWrap:"wrap", gap:1, mt:1.5 }}>
      {items.map((item, index) => (
        <Fade in timeout={500 + index * 100} key={item}>
          <Box sx={{
            background: highlight ? "linear-gradient(135deg, #fff0f5, #ffe8f0)" : "linear-gradient(135deg, #fff9f5, #fff5f0)",
            border:`1px solid ${highlight ? T.roseGoldLight : T.goldLight}`,
            borderRadius:"30px", px:2, py:0.6,
            fontSize:13, fontFamily:"'Cormorant Garamond', serif",
            color: highlight ? T.roseGoldDark : T.goldDark,
            letterSpacing:"0.02em", fontStyle:"italic",
            transition:"all 0.2s ease",
            "&:hover": {
              transform:"scale(1.05)",
              background: highlight ? "linear-gradient(135deg, #ffe8f0, #ffe0e8)" : "linear-gradient(135deg, #fff0e8, #ffe8e0)",
            },
          }}>
            {item}
          </Box>
        </Fade>
      ))}
    </Box>
  </Box>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface GiftsSectionProps {
  cuentasBancarias?: BankAccount[];
}

const GiftsSection: React.FC<GiftsSectionProps> = ({
  cuentasBancarias = [
    { banco:"BBVA",    titular:"Andrew Alonso",         clabe:"012345678901234567", emoji:"💫" },
    { banco:"Banorte", titular:"Montserrat Hernández",  clabe:"072345678901234567", cuenta:"1234567890", emoji:"✨" },
  ],
}) => {
  const giftCategories: GiftCategory[] = [
    {
      emoji:"🍳",
      icon:<WbSunnyIcon sx={{ fontSize:28, color:T.goldDark }} />,
      title:"Cocina y comedor",
      subtitle:"Para crear juntos nuestros primeros platillos",
      items:["Sartenes","Cazuelas","Ollas","Tazas","Platos","Vasos","Cubiertos","Licuadora","Cafetera"],
    },
    {
      emoji:"🏠",
      icon:<FavoriteIcon sx={{ fontSize:26, color:T.roseGoldDark }} />,
      title:"Nuestro hogar",
      subtitle:"Detalles que llenarán de amor nuestro espacio",
      items:["Plancha","Aspiradora","Portarretratos","Toallas","Ropa de cama","Almohadas","Cortinas","Velas aromáticas"],
    },
    {
      emoji:"🧹",
      title:"Limpieza y orden",
      subtitle:"Para mantener nuestro nido siempre acogedor",
      items:["Set de limpieza","Cubeta","Mopa","Contenedores","Organizadores","Cesto para ropa","Tapetes"],
    },
    {
      emoji:"✈️",
      icon:<NightsStayIcon sx={{ fontSize:26, color:T.roseGoldDark }} />,
      title:"Luna de miel",
      subtitle:"Ayúdanos a crear recuerdos inolvidables",
      items:["Noche de hotel","Vuelo","Cena romántica","Tour especial","Experiencia única"],
      highlight: true,
    },
  ];

  return (
    <Grow in timeout={800}>
      <Box>
        <Box sx={{
          background:"linear-gradient(145deg, #fffcf9, #fff5f0)",
          border:`1px solid ${T.border}`, borderRadius:"32px", overflow:"hidden",
          boxShadow:`0 20px 60px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.5)`,
          position:"relative",
          "&::before": {
            content:'""', position:"absolute", top:0, left:0, right:0, bottom:0,
            backgroundImage:`
              radial-gradient(circle at 20% 30%, ${T.roseGold}10 0%, transparent 15%),
              radial-gradient(circle at 80% 70%, ${T.roseGold}10 0%, transparent 20%),
              radial-gradient(circle at 40% 80%, ${T.roseGold}10 0%, transparent 25%),
              radial-gradient(circle at 70% 20%, ${T.roseGold}10 0%, transparent 18%)
            `,
            pointerEvents:"none",
          },
        }}>

          {/* Borde superior */}
          <Box sx={{
            height:16,
            background:`linear-gradient(90deg, ${T.roseGoldLight} 0%, ${T.goldLight} 30%, ${T.roseGoldLight} 70%, ${T.goldLight} 100%)`,
            opacity:0.4,
          }} />

          <Box sx={{ px:{ xs:3, sm:5 }, py:{ xs:5, sm:6 }, position:"relative", zIndex:1 }}>

            <FloralDivider variant="detailed" />

            {/* ── Mesa de regalos ── */}
            <Box sx={{ textAlign:"center", my:4 }}>
              <Typography sx={{ ...romanticFont, fontSize:11, letterSpacing:"0.28em", color:T.textFaint, textTransform:"uppercase", mb:1 }}>
                Tu presencia es nuestro mejor regalo
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize:{ xs:48, sm:58 }, color:T.roseGoldDark, lineHeight:1, mb:2 }}>
                Mesa de Regalos
              </Typography>
              <Typography sx={{ ...serifFont, fontStyle:"italic", fontSize:17, color:T.textMid, lineHeight:1.8, px:{ xs:0, sm:4 }, maxWidth:"600px", mx:"auto" }}>
                Si deseas bendecirnos con un detalle para nuestro hogar o nuestra luna de miel,
                aquí compartimos algunas ideas que nos llenarían de alegría.
              </Typography>
            </Box>

            <Box sx={{ display:"flex", flexDirection:"column", gap:2.5, mb:2 }}>
              {giftCategories.map((cat, index) => (
                <Fade in timeout={500 + index * 200} key={cat.title}>
                  <Box><GiftCategoryCard {...cat} /></Box>
                </Fade>
              ))}
            </Box>

            <FloralDivider variant="detailed" />

            {/* ── Cuentas bancarias ── */}
            <Box sx={{ textAlign:"center", my:4 }}>
              <Typography sx={{ ...romanticFont, fontSize:11, letterSpacing:"0.28em", color:T.textFaint, textTransform:"uppercase", mb:1 }}>
                Para quienes prefieren bendecirnos con un detalle en efectivo
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize:{ xs:48, sm:58 }, color:T.roseGoldDark, lineHeight:1, mb:2 }}>
                Detalle en Efectivo
              </Typography>
              <Typography sx={{ ...serifFont, fontStyle:"italic", fontSize:16, color:T.textMid, lineHeight:1.7, mb:3, maxWidth:"500px", mx:"auto" }}>
                Con amor, aquí están nuestros datos. Solo toca para copiar.
              </Typography>
            </Box>

            <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
              {cuentasBancarias.map((cuenta, index) => (
                <Fade in timeout={500 + index * 200} key={cuenta.banco}>
                  <Box><BankCard {...cuenta} /></Box>
                </Fade>
              ))}
            </Box>

            {/* Mensaje de cierre */}
            <Box sx={{ textAlign:"center", mt:6 }}>
              <FloralDivider variant="simple" />
              <Typography sx={{ ...scriptFont, fontSize:42, color:T.roseGoldDark, mt:2, lineHeight:1.2 }}>
                Gracias por ser parte
              </Typography>
              <Typography sx={{ ...scriptFont, fontSize:36, color:T.goldDark, lineHeight:1, mb:1 }}>
                de nuestra historia
              </Typography>
              <Typography sx={{ ...romanticFont, fontSize:13, color:T.textFaint, mt:2, letterSpacing:"0.1em" }}>
                Con todo nuestro corazón ❤️
              </Typography>
            </Box>

          </Box>

          {/* Borde inferior */}
          <Box sx={{
            height:16,
            background:`linear-gradient(90deg, ${T.roseGoldLight} 0%, ${T.goldLight} 30%, ${T.roseGoldLight} 70%, ${T.goldLight} 100%)`,
            opacity:0.4,
          }} />
        </Box>
      </Box>
    </Grow>
  );
};

export default GiftsSection;