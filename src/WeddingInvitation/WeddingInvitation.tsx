// components/WeddingInvitation.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Fade,
  Grow,
  Zoom,
  Modal,
  Backdrop,
  Chip,
  Stack,
} from "@mui/material";
import {
  Favorite as HeartIcon,
  History as HistoryIcon,
  ChevronLeft as LeftIcon,
  Close as CloseIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  CardGiftcard as GiftIcon,
} from "@mui/icons-material";
import HistorySection from "../components/HistorySection/HistorySection";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import AttendanceForm from "../components/AttendanceForm/AttendanceForm";
import DetailsSection from "../components/DetailsSection/DetailsSection";

interface TimelineEvent {
  time: string;
  event: string;
  description: string;
  icon: React.ElementType;
}

interface WeddingInvitationProps {
  novio?: string;
  novia?: string;
  fecha?: string;
  hora?: string;
  lugar?: string;
  direccion?: string;
  mensaje?: string;
  historia?: string;
  fotos?: string[];
  codigoVestimenta?: string;
  frasePersonal?: string;
  coordenadasGPS?: { lat: number; lng: number };
  codigoDresscode?: string;
  notasAdicionales?: string;
  horarioEventos?: TimelineEvent[];
}

// ─── Romantic Carousel ────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = Array.from(
  { length: 8 },
  (_, i) => `/imgGaleria${i + 1}.jpeg`,
);

const carouselStyles = `
  .rc-root {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    user-select: none;
  }

  /* Film-grain overlay */
  .rc-root::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    border-radius: 20px;
    pointer-events: none;
    z-index: 4;
  }

  .rc-track {
    display: flex;
    transition: transform 0.75s cubic-bezier(0.77, 0, 0.175, 1);
    will-change: transform;
  }

  .rc-slide {
    flex: 0 0 100%;
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
  }

  .rc-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 8s ease;
  }

  .rc-slide.rc-active img {
    transform: scale(1.06);
  }

  /* Vignette */
  .rc-slide::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(30,5,10,0.45) 100%);
    z-index: 1;
  }

  /* Top + bottom fade */
  .rc-fade-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255,245,248,0.55), transparent);
    z-index: 2;
    pointer-events: none;
    border-radius: 20px 20px 0 0;
  }
  .rc-fade-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(255,240,244,0.65), transparent);
    z-index: 2;
    pointer-events: none;
    border-radius: 0 0 20px 20px;
  }

  /* Caption */
  .rc-caption {
    position: absolute;
    bottom: 18px;
    left: 0; right: 0;
    text-align: center;
    z-index: 3;
    pointer-events: none;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .rc-caption.rc-caption-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .rc-caption-text {
    font-family: 'Pinyon Script', cursive;
    font-size: 22px;
    color: rgba(255,255,255,0.92);
    text-shadow: 0 2px 12px rgba(0,0,0,0.5), 0 0 30px rgba(180,60,90,0.4);
    letter-spacing: 0.04em;
  }

  /* Arrows */
  .rc-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,245,248,0.82);
    border: 1px solid rgba(210,120,150,0.35);
    box-shadow: 0 4px 16px rgba(140,40,70,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.22s;
    backdrop-filter: blur(4px);
  }
  .rc-arrow:hover {
    background: rgba(255,255,255,0.96);
    box-shadow: 0 6px 22px rgba(140,40,70,0.28);
    transform: translateY(-50%) scale(1.08);
  }
  .rc-arrow-left  { left: 12px; }
  .rc-arrow-right { right: 12px; }

  /* Dots */
  .rc-dots {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 5;
  }
  .rc-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255,255,255,0.45);
    transition: all 0.3s;
    cursor: pointer;
  }
  .rc-dot.rc-dot-active {
    background: rgba(255,255,255,0.95);
    transform: scale(1.4);
    box-shadow: 0 0 6px rgba(255,200,210,0.8);
  }

  /* Heart counter badge */
  .rc-counter {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(255,245,248,0.75);
    backdrop-filter: blur(6px);
    border: 0.5px solid rgba(210,120,150,0.3);
    border-radius: 20px;
    padding: 3px 10px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    color: #b5436a;
    letter-spacing: 0.1em;
  }

  /* Section header */
  .rc-header {
    text-align: center;
    margin-bottom: 14px;
  }
  .rc-header-script {
    font-family: 'Pinyon Script', cursive;
    font-size: 38px;
    color: #b5436a;
    line-height: 1;
    display: block;
    text-shadow: 0 3px 15px rgba(255,255,240,1), 2px 4px 8px rgba(0,0,0,0.08);
  }
  .rc-header-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #c9738a;
    margin-top: 2px;
    display: block;
  }

  @keyframes rc-heartbeat {
    0%,100% { transform: scale(1); }
    30%     { transform: scale(1.25); }
    60%     { transform: scale(1); }
    80%     { transform: scale(1.1); }
  }
  .rc-heart-anim {
    display: inline-block;
    animation: rc-heartbeat 2.4s ease-in-out infinite;
    color: #d4769a;
    font-size: 11px;
  }
`;

const CAPTIONS = [
  "Nuestro primer capítulo",
  "Donde todo comenzó",
  "Momentos que guardamos",
  "El amor en cada mirada",
  "Juntos para siempre",
  "Nuestra historia",
  "Lo mejor está por venir",
  "Dos almas, un camino",
  "El día que lo supimos",
];

const RomanticCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [captionVisible, setCaptionVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = CAROUSEL_IMAGES.length;

  const goTo = useCallback(
    (idx: number) => {
      setCaptionVisible(false);
      setTimeout(() => {
        setCurrent((idx + total) % total);
        setCaptionVisible(true);
      }, 120);
    },
    [total],
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => goTo(current + 1), 4500);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [current, goTo]);

  // Show caption on mount
  useEffect(() => {
    const t = setTimeout(() => setCaptionVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Touch / drag
  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    const dx = e.clientX - dragStartX.current;

    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <>
      <style>{carouselStyles}</style>
      <div className="rc-header">
        <span className="rc-header-script">Nuestra Historia</span>
        <span className="rc-header-sub">
          <span className="rc-heart-anim">♥</span> momentos que atesoramos{" "}
          <span className="rc-heart-anim">♥</span>
        </span>
      </div>

      <div
        className="rc-root"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={() => setIsDragging(false)}
      >
        {/* Track */}
        <div
          className="rc-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {CAROUSEL_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`rc-slide${i === current ? " rc-active" : ""}`}
            >
              <img src={src} alt={`Foto ${i + 1}`} draggable={false} />
            </div>
          ))}
        </div>

        {/* Overlays */}
        <div className="rc-fade-top" />
        <div className="rc-fade-bottom" />

        {/* Caption */}
        <div
          className={`rc-caption${captionVisible ? " rc-caption-visible" : ""}`}
        >
          <span className="rc-caption-text">{CAPTIONS[current]}</span>
        </div>

        {/* Counter */}
        <div className="rc-counter">
          <span className="rc-heart-anim">♥</span>
          {current + 1} / {total}
        </div>

        {/* Arrows */}
        <button
          className="rc-arrow rc-arrow-left"
          onClick={prev}
          aria-label="Anterior"
        >
          <ChevronLeft style={{ fontSize: 18, color: "#b5436a" }} />
        </button>
        <button
          className="rc-arrow rc-arrow-right"
          onClick={next}
          aria-label="Siguiente"
        >
          <ChevronRight style={{ fontSize: 18, color: "#b5436a" }} />
        </button>

        {/* Dots */}
        <div className="rc-dots">
          {CAROUSEL_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`rc-dot${i === current ? " rc-dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Tiny local aliases to avoid import conflict with ChevronLeft from MUI
const { ChevronLeft, ChevronRight } = {
  ChevronLeft: (
    props: React.SVGProps<SVGSVGElement> & { style?: React.CSSProperties },
  ) => (
    <svg
      viewBox="0 0 24 24"
      width={props.style?.fontSize ?? 18}
      height={props.style?.fontSize ?? 18}
      fill={props.style?.color ?? "currentColor"}
    >
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  ),
  ChevronRight: (
    props: React.SVGProps<SVGSVGElement> & { style?: React.CSSProperties },
  ) => (
    <svg
      viewBox="0 0 24 24"
      width={props.style?.fontSize ?? 18}
      height={props.style?.fontSize ?? 18}
      fill={props.style?.color ?? "currentColor"}
    >
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </svg>
  ),
};

// ─── Main Component ────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

  * { box-sizing: border-box; }
  body { background: #ffd6e3; min-height: 100vh; }

  @keyframes wi-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.12); opacity: 0.9; }
  }
  @keyframes wi-petal-fall {
    0% { transform: translateY(-60px) rotate(0deg) scale(1); opacity: 0; }
    8% { opacity: 0.8; }
    92% { opacity: 0.6; }
    100% { transform: translateY(105vh) rotate(480deg) scale(0.5); opacity: 0; }
  }
  @keyframes wi-twinkle {
    0%,100% { opacity: 0.1; transform: scale(0.7); }
    50% { opacity: 0.6; transform: scale(1.3); }
  }
  @keyframes wi-reveal {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .wi-reveal   { animation: wi-reveal 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .wi-reveal-1 { animation-delay: 0.1s; }
  .wi-reveal-2 { animation-delay: 0.3s; }
  .wi-reveal-3 { animation-delay: 0.5s; }
  .wi-reveal-4 { animation-delay: 0.7s; }
  .wi-reveal-5 { animation-delay: 0.9s; }
  .wi-reveal-6 { animation-delay: 1.1s; }

  .wi-card-detail:hover {
    transform: translateY(-6px) !important;
    box-shadow: 0 28px 56px rgba(139,90,60,0.18) !important;
    border-color: rgba(180,130,90,0.4) !important;
  }
  .wi-nav-btn:hover {
    background: rgba(139,90,60,0.08) !important;
    border-color: rgba(139,90,60,0.5) !important;
  }
  .wi-primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(194,97,110,0.40) !important;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(139,90,60,0.3); border-radius: 2px; }
`;

interface Particle {
  id: number;
  left: number;
  top?: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
  type: "petal" | "star";
}
const PETALS = ["🌸", "✿", "❀", "🌺"];

function useParticles() {
  const [particles] = useState<Particle[]>(() => {
    const arr: Particle[] = [];
    for (let i = 0; i < 18; i++)
      arr.push({
        id: i,
        left: Math.random() * 100,
        duration: 9 + Math.random() * 9,
        delay: Math.random() * 12,
        size: 11 + Math.random() * 9,
        emoji: PETALS[i % PETALS.length],
        type: "petal",
      });
    for (let i = 18; i < 34; i++)
      arr.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 5,
        size: 4,
        emoji: "",
        type: "star",
      });
    return arr;
  });
  return particles;
}

const Ornament: React.FC<{ color: string }> = ({ color }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg,transparent,${color}80)`,
      }}
    />
    <Box sx={{ fontSize: 13, color, letterSpacing: 6, opacity: 0.7 }}>
      ✦ ✦ ✦
    </Box>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg,${color}80,transparent)`,
      }}
    />
  </Box>
);

export const WeddingInvitation: React.FC<WeddingInvitationProps> = ({
  novio = "Andrew",
  novia = "Montserrat",
  fecha = "17 de Abril, 2027",
  hora = "5:00 PM",
  lugar = "Hacienda Los Olivos",
  direccion = "Grand Jardín",
  mensaje = "Con la bendición de Dios y nuestros padres, nos unimos en matrimonio y queremos compartir esta alegría contigo.",
  historia = `Quién diría que 13 años después terminaríamos juntos. Dios hizo que nos conociéramos por primera vez en la primaria y desde ahí surgiera una amistad que, años después, se convertiría en una hermosa pareja.`,
  codigoVestimenta = "Formal",
  frasePersonal = "Y en un beso, supimos que era para siempre",
  coordenadasGPS = { lat: 20.301798, lng: -102.539874 },
  codigoDresscode = "Nos reservamos el blanco",
  notasAdicionales = "No olvides traer tu mejor sonrisa y muchas ganas de celebrar",
}) => {
  const [activeSection, setActiveSection] = useState<
    "invitation" | "history" | "details"
  >("invitation");
  const [openModal, setOpenModal] = useState(false);
  const particles = useParticles();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const T = {
    cream: "#fff0f4",
    parchment: "#fce0ea",
    gold: "#96651e",
    goldLight: "#b8843a",
    goldDark: "#5c3a0e",
    rose: "#a03040",
    roseDark: "#6b1e2a",
    text: "#1a0a08",
    textMid: "#4a2010",
    textFaint: "#6b4020",
    border: "rgba(150,100,30,0.30)",
    shadow: "rgba(80,30,10,0.18)",
    ts: "0 2px 10px rgba(255,255,240,0.95), 2px 2px 4px rgba(0,0,0,0.05)",
    tsScript: "0 3px 15px rgba(255,255,240,1), 2px 4px 8px rgba(0,0,0,0.08)",
    tsFaint: "0 1px 8px rgba(255,255,240,0.95), 1px 1px 3px rgba(0,0,0,0.03)",
    tsStrong: "0 2px 12px rgba(255,250,240,0.98), 2px 2px 6px rgba(0,0,0,0.12)",
    tsStronger: "0 3px 18px rgba(255,250,240,1), 3px 4px 8px rgba(0,0,0,0.15)",
  };

  const scriptFont = { fontFamily: "'Pinyon Script',cursive" };
  const serifFont = { fontFamily: "'Cormorant Garamond',serif" };

  const navItems = [
    {
      label: "Nuestra historia",
      icon: <HistoryIcon sx={{ fontSize: 15 }} />,
      section: "history" as const,
    },
    {
      label: "Mesa de Regalos",
      icon: <GiftIcon sx={{ fontSize: 15 }} />,
      section: "details" as const,
    },
  ];

  const renderInvitation = () => (
    <Grow in timeout={900}>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "relative",
            border: `1px solid ${T.border}`,
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: `0 32px 80px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
          }}
        >
          {/* Background image */}
          <Box
            component="img"
            src="/imgFondo.jpeg"
            aria-hidden="true"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.28,
              filter: "saturate(0.6) brightness(1.15)",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
          />

          {/* White veil */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom,
              rgba(255,253,249,0.65) 0%,
              rgba(253,246,236,0.55) 30%,
              rgba(250,240,228,0.48) 60%,
              rgba(250,240,228,0.52) 100%)`,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Blur layer */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,248,240,0.15)",
              backdropFilter: "blur(1px)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 2 }}>
            {/* Lace top */}
            <Box
              sx={{
                height: 12,
                background: `repeating-linear-gradient(90deg,${T.gold}30 0px,${T.gold}30 4px,transparent 4px,transparent 12px)`,
              }}
            />

            {/* Corner flourishes */}
            {[0, 1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  position: "absolute",
                  top: i < 2 ? 12 : "auto",
                  bottom: i >= 2 ? 12 : "auto",
                  left: i % 2 === 0 ? 12 : "auto",
                  right: i % 2 === 1 ? 12 : "auto",
                  width: 52,
                  height: 52,
                  opacity: 0.18,
                  pointerEvents: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'%3E%3Cpath d='M2 2 Q2 26 26 26 Q2 26 2 50' stroke='%23b8843a' fill='none' stroke-width='1.5'/%3E%3Ccircle cx='2' cy='2' r='2' fill='%23b8843a'/%3E%3C/svg%3E")`,
                  transform: `rotate(${i * 90}deg)`,
                }}
              />
            ))}

            <Box sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 } }}>
              {/* Monogram */}
              <Box
                className="wi-reveal wi-reveal-1"
                sx={{ textAlign: "center", mb: 3 }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    border: `1.5px solid ${T.gold}60`,
                    background: `radial-gradient(circle,${T.parchment},#fffdf9)`,
                    boxShadow: `0 0 0 6px ${T.gold}14,0 8px 24px ${T.shadow}`,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <HeartIcon
                    sx={{
                      fontSize: 32,
                      color: T.rose,
                      animation: "wi-pulse 2.2s infinite",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    ...serifFont,
                    fontSize: 12,
                    letterSpacing: "0.3em",
                    color: T.textFaint,
                    textTransform: "uppercase",
                    textShadow: T.tsFaint,
                    fontWeight: 500,
                  }}
                >
                  ✦ Invitación de Boda ✦
                </Typography>
              </Box>

              {/* Names */}
              <Box
                className="wi-reveal wi-reveal-2"
                sx={{ textAlign: "center", mb: 2 }}
              >
                <Typography
                  sx={{
                    ...scriptFont,
                    fontSize: { xs: 58, sm: 74 },
                    color: T.roseDark,
                    lineHeight: 1,
                    mb: 0.5,
                    textShadow: `2px 4px 20px ${T.rose}60, 0 2px 10px rgba(255,255,240,1)`,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {novio}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    my: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      background: `linear-gradient(90deg,transparent,${T.gold}80)`,
                    }}
                  />
                  <Typography
                    sx={{
                      ...scriptFont,
                      fontSize: 32,
                      color: T.gold,
                      textShadow: T.tsScript,
                    }}
                  >
                    &
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      height: "1px",
                      background: `linear-gradient(90deg,${T.gold}80,transparent)`,
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    ...scriptFont,
                    fontSize: { xs: 58, sm: 74 },
                    color: T.roseDark,
                    lineHeight: 1,
                    textShadow: `2px 4px 20px ${T.rose}60, 0 2px 10px rgba(255,255,240,1)`,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                  }}
                >
                  {novia}
                </Typography>
              </Box>

              {/* Quote */}
              <Box
                className="wi-reveal wi-reveal-3"
                sx={{ textAlign: "center", mb: 4 }}
              >
                <Typography
                  sx={{
                    ...serifFont,
                    fontStyle: "italic",
                    fontSize: { xs: 17, sm: 19 },
                    color: T.textMid,
                    letterSpacing: "0.04em",
                    textShadow: T.tsStrong,
                    fontWeight: 500,
                    px: 2,
                  }}
                >
                  "{frasePersonal}"
                </Typography>
              </Box>

              <Ornament color={T.goldLight} />

              {/* Parents */}
              <Box
                className="wi-reveal wi-reveal-3"
                sx={{ textAlign: "center", my: 4 }}
              >
                <Typography
                  sx={{
                    ...serifFont,
                    fontSize: 12,
                    letterSpacing: "0.28em",
                    color: T.textFaint,
                    textTransform: "uppercase",
                    mb: 2.5,
                    textShadow: T.tsFaint,
                    fontWeight: 500,
                  }}
                >
                  Con la bendición de nuestros padres
                </Typography>
                {[
                  "Sra. Yolanda Valenzuela Trujillo",
                  "Sr. Adrian Alonso Díaz",
                ].map((p) => (
                  <Typography
                    key={p}
                    sx={{
                      ...serifFont,
                      fontSize: 17,
                      color: T.text,
                      lineHeight: 1.9,
                      textShadow: T.tsStrong,
                      fontWeight: 500,
                    }}
                  >
                    {p}
                  </Typography>
                ))}
                <Box
                  sx={{
                    my: 1.5,
                    color: T.goldLight,
                    fontSize: 18,
                    letterSpacing: 8,
                  }}
                >
                  ✦ ✦ ✦
                </Box>
                {[
                  "Sra. Isis del Carmen Marquez",
                  "Sr. Francisco Hernandez",
                ].map((p) => (
                  <Typography
                    key={p}
                    sx={{
                      ...serifFont,
                      fontSize: 17,
                      color: T.text,
                      lineHeight: 1.9,
                      textShadow: T.tsStrong,
                      fontWeight: 500,
                    }}
                  >
                    {p}
                  </Typography>
                ))}
              </Box>

              <Ornament color={T.goldLight} />

              {/* Mensaje */}
              <Box
                className="wi-reveal wi-reveal-4"
                sx={{ textAlign: "center", my: 4, px: { xs: 1, sm: 3 } }}
              >
                <Typography
                  sx={{
                    ...serifFont,
                    fontStyle: "italic",
                    fontSize: { xs: 17, sm: 19 },
                    color: T.text,
                    lineHeight: 1.9,
                    textShadow: T.tsStronger,
                    fontWeight: 500,
                  }}
                >
                  "{mensaje}"
                </Typography>
              </Box>

              {/* ── Romantic Carousel (replaces countdown) ── */}
              <Box className="wi-reveal wi-reveal-4" sx={{ mb: 4 }}>
                <RomanticCarousel />
              </Box>

              {/* Event details */}
              <Box className="wi-reveal wi-reveal-5" sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    ...scriptFont,
                    fontSize: 42,
                    color: T.roseDark,
                    textAlign: "center",
                    mb: 3,
                    textShadow: T.tsScript,
                    fontWeight: 500,
                  }}
                >
                  Detalles del Evento
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  {[
                    {
                      emoji: "📅",
                      title: "Fecha",
                      value: fecha,
                      sub: "Viernes",
                    },
                    {
                      emoji: "🕔",
                      title: "Ceremonia",
                      value: hora,
                      sub: "En punto",
                    },
                    {
                      emoji: "🏛️",
                      title: "Lugar",
                      value: lugar,
                      sub: direccion,
                    },
                    {
                      emoji: "👗",
                      title: "Vestimenta",
                      value: codigoVestimenta,
                      sub: codigoDresscode,
                    },
                  ].map((item) => (
                    <Box
                      key={item.title}
                      className="wi-card-detail"
                      sx={{
                        background: "linear-gradient(145deg,#fffdf9,#fdf5e8)",
                        border: `1px solid ${T.border}`,
                        borderRadius: "18px",
                        p: 2.5,
                        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
                        boxShadow: `0 6px 20px ${T.shadow}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 28,
                            width: 54,
                            height: 54,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `radial-gradient(circle,${T.parchment},#fff8f0)`,
                            border: `1px solid ${T.border}`,
                            borderRadius: "14px",
                            flexShrink: 0,
                          }}
                        >
                          {item.emoji}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 11,
                              letterSpacing: "0.26em",
                              color: T.textFaint,
                              textTransform: "uppercase",
                              mb: 0.3,
                              fontWeight: 500,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              ...serifFont,
                              fontSize: 19,
                              fontWeight: 600,
                              color: T.text,
                              lineHeight: 1.2,
                              mb: 0.2,
                              textShadow: T.ts,
                            }}
                          >
                            {item.value}
                          </Typography>
                          {item.sub && (
                            <Typography
                              sx={{
                                ...serifFont,
                                fontStyle: "italic",
                                fontSize: 14,
                                color: T.textMid,
                                fontWeight: 500,
                              }}
                            >
                              {item.sub}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Nav + CTA */}
              <Box className="wi-reveal wi-reveal-6">
                <Ornament color={T.goldLight} />
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  flexWrap="wrap"
                  sx={{ mt: 3.5, mb: 2.5, gap: 1 }}
                >
                  {navItems.map((btn) => (
                    <Button
                      key={btn.label}
                      className="wi-nav-btn"
                      startIcon={btn.icon}
                      onClick={() => setActiveSection(btn.section)}
                      sx={{
                        ...serifFont,
                        fontSize: 14,
                        letterSpacing: "0.1em",
                        color: T.goldDark,
                        background: "transparent",
                        border: `1px solid ${T.border}`,
                        borderRadius: "24px",
                        px: 2.5,
                        py: 0.8,
                        textTransform: "none",
                        transition: "all 0.25s",
                        fontWeight: 500,
                        "&:hover": { background: "rgba(150,100,30,0.08)" },
                      }}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </Stack>

                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Button
                    className="wi-primary-btn"
                    onClick={() => setOpenModal(true)}
                    endIcon={<ConfirmationNumberIcon />}
                    sx={{
                      ...serifFont,
                      fontSize: 16,
                      letterSpacing: "0.14em",
                      color: "#fff",
                      background: `linear-gradient(135deg,${T.rose} 0%,${T.roseDark} 100%)`,
                      borderRadius: "32px",
                      px: 5,
                      py: 1.4,
                      textTransform: "none",
                      boxShadow: `0 10px 30px rgba(194,97,110,0.30)`,
                      transition: "all 0.3s",
                      fontWeight: 600,
                    }}
                  >
                    Confirmar Asistencia
                  </Button>
                </Box>

                <Typography
                  sx={{
                    ...serifFont,
                    fontStyle: "italic",
                    fontSize: 14,
                    color: T.textMid,
                    textAlign: "center",
                    display: "block",
                    textShadow: T.tsFaint,
                    fontWeight: 500,
                  }}
                >
                  {notasAdicionales}
                </Typography>
              </Box>
            </Box>

            {/* Lace bottom */}
            <Box
              sx={{
                height: 12,
                background: `repeating-linear-gradient(90deg,${T.gold}30 0px,${T.gold}30 4px,transparent 4px,transparent 12px)`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Grow>
  );

  return (
    <>
      <style>{globalStyles}</style>

      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: `
          radial-gradient(ellipse at 20% 30%,rgba(255,245,247,0.7) 0%,transparent 45%),
          radial-gradient(ellipse at 80% 70%,rgba(254,240,244,0.5) 0%,transparent 45%),
          radial-gradient(ellipse at 50% 100%,rgba(252,232,240,0.8) 0%,transparent 50%),
          radial-gradient(ellipse at 50% 60%,#fff5f7 0%,#fef0f4 40%,#fce8f0 100%)
        `,
        }}
      />

      {particles
        .filter((p) => p.type === "petal")
        .map((p) => (
          <Box
            key={p.id}
            sx={{
              position: "fixed",
              left: `${p.left}%`,
              top: -30,
              fontSize: p.size,
              zIndex: 0,
              pointerEvents: "none",
              opacity: 0,
              animation: `wi-petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            {p.emoji}
          </Box>
        ))}
      {particles
        .filter((p) => p.type === "star")
        .map((p) => (
          <Box
            key={p.id}
            sx={{
              position: "fixed",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#ff85aa",
              zIndex: 0,
              pointerEvents: "none",
              animation: `wi-twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

      <MusicPlayer />

      {activeSection !== "invitation" && (
        <Zoom in>
          <IconButton
            onClick={() => setActiveSection("invitation")}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 1000,
              background: `linear-gradient(135deg,${T.gold},${T.goldDark})`,
              color: "#fff",
              boxShadow: `0 6px 20px rgba(122,82,32,0.35)`,
              "&:hover": { transform: "scale(1.1)" },
              transition: "all 0.3s",
            }}
          >
            <LeftIcon />
          </IconButton>
        </Zoom>
      )}

      <Container maxWidth="sm" sx={{ py: 4, position: "relative", zIndex: 1 }}>
        {activeSection === "invitation" && renderInvitation()}
        {activeSection === "history" && (
          <HistorySection novio={novio} novia={novia} historia={historia} />
        )}
        {activeSection === "details" && (
          <DetailsSection
            lugar={lugar}
            direccion={direccion}
            coordenadasGPS={coordenadasGPS}
          />
        )}
      </Container>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: {
            backdropFilter: "blur(10px)",
            background: "rgba(40,20,5,0.55)",
          },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: { xs: "95%", sm: 500 },
              maxHeight: "90vh",
              overflow: "auto",
              background: "linear-gradient(160deg,#fffdf9,#fdf5e8)",
              border: `1px solid rgba(180,130,80,0.28)`,
              borderRadius: "24px",
              boxShadow: `0 40px 80px rgba(80,40,0,0.25)`,
              p: { xs: 3, sm: 4 },
              outline: "none",
            }}
          >
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: T.textFaint,
                "&:hover": { color: T.rose, transform: "rotate(90deg)" },
                transition: "all 0.3s",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <HeartIcon
                sx={{
                  fontSize: 44,
                  color: T.rose,
                  animation: "wi-pulse 2s infinite",
                  mb: 1,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "'Pinyon Script',cursive",
                  fontSize: 42,
                  color: T.roseDark,
                  lineHeight: 1,
                }}
              >
                Confirma tu asistencia
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 15,
                  color: T.textMid,
                  mt: 1,
                  mb: 2,
                }}
              >
                ¡Nos encantaría que nos acompañes en este día tan especial!
              </Typography>
              <Chip
                label={`${novio} & ${novia}`}
                sx={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 14,
                  background: `linear-gradient(135deg,${T.rose}20,${T.rose}10)`,
                  color: T.roseDark,
                  border: `1px solid ${T.rose}40`,
                }}
              />
            </Box>
            <AttendanceForm
              novio={novio}
              novia={novia}
              onClose={() => setOpenModal(false)}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default WeddingInvitation;
