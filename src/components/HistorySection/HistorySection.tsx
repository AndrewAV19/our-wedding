// components/HistorySection/HistorySection.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Fade, IconButton, Modal, Grid } from "@mui/material";
import {
  Favorite as HeartIcon,
  Stars as StarsIcon,
  AcUnit as AcUnitIcon,
  FlightTakeoff as FlightIcon,
  Close as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

/* ─────────────────── palette ─────────────────── */
const T = {
  bg: "#fff0f4",
  card: "linear-gradient(170deg, #fffdf9 0%, #fdf6ec 50%, #faf0e4 100%)",
  parchment: "#fdf5e8",
  gold: "#b8843a",
  goldLight: "#d4a96a",
  goldDark: "#7a5220",
  rose: "#c2616e",
  roseDark: "#8b3a44",
  pink: "#d94d6a",
  text: "#2e0f1a",
  textMid: "#7a3550",
  textFaint: "#b09070",
  border: "rgba(180,130,80,0.22)",
  shadow: "rgba(100,60,20,0.14)",
  pinkFaint: "#f9e3ec",
};

const scriptFont = { fontFamily: "'Pinyon Script', cursive" };
const serifFont = { fontFamily: "'Cormorant Garamond', serif" };

/* ─────────────────── global styles ─────────────────── */
const historyStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&display=swap');

  @keyframes hs-pulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  @keyframes hs-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes hs-reveal { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hs-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

  .hs-reveal   { animation: hs-reveal 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .hs-reveal-1 { animation-delay:0.1s }
  .hs-reveal-2 { animation-delay:0.3s }
  .hs-reveal-3 { animation-delay:0.5s }
  .hs-reveal-4 { animation-delay:0.7s }

  .hs-timeline-card:hover {
    transform: translateY(-6px) !important;
  }

  .hs-photo:hover img {
    transform: scale(1.08) !important;
  }

  .hs-photo:hover .hs-overlay {
    opacity: 1 !important;
  }
`;

/* ─────────────────── Ornament ─────────────────── */
const Ornament: React.FC<{ color?: string }> = ({ color = T.goldLight }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 2 }}>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg, transparent, ${color}80)`,
      }}
    />
    <Box sx={{ fontSize: 12, color, letterSpacing: 6, opacity: 0.7 }}>
      ✦ ✦ ✦
    </Box>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg, ${color}80, transparent)`,
      }}
    />
  </Box>
);

/* ─────────────────── Lace band ─────────────────── */
const Lace = () => (
  <Box
    sx={{
      height: 12,
      background: `repeating-linear-gradient(90deg, ${T.gold}30 0px, ${T.gold}30 4px, transparent 4px, transparent 12px)`,
    }}
  />
);

/* ─────────────────── props ─────────────────── */
interface HistorySectionProps {
  novio: string;
  novia: string;
  historia?: string;
}

/* ════════════════════════════════════════════════ */
const HistorySection: React.FC<HistorySectionProps> = ({
  novio = "Andrew",
  novia = "Montserrat",
  historia,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentEventImages, setCurrentEventImages] = useState<string[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const historiaFinal =
    historia ||
    `Todo comenzó en una tarde lluviosa de primavera, cuando nuestros caminos se cruzaron. ${novio} y ${novia} descubrieron que la amistad que habían construido desde la primaria era, en realidad, el primer capítulo de una historia de amor. Con solo una mirada bastó para saber que seríamos tú y yo para siempre.`;

  const timeline = [
    {
      year: "2025",
      title: "Nuestra primera cita",
      event: "Septiembre, 2025",
      description:
        "El día que el destino nos regaló nuestra primera cita y comenzó nuestra historia.",
      icon: StarsIcon,
      accent: "#e8748a",
      images: ["/lt1.jpeg", "/lt2.jpeg"],
    },
    {
      year: "2025",
      title: "Nuestra primera boda de amigos",
      event: "Octubre, 2025",
      description:
        "Bailamos bajo las estrellas y supimos que queríamos esto para siempre.",
      icon: HeartIcon,
      accent: "#b8843a",
      images: ["/lt3.jpeg", "/lt4.jpeg"],
    },
    {
      year: "2025",
      title: "Primera navidad juntos",
      event: "Diciembre, 2025",
      description: "Nuestro primer árbol de navidad, el primero de muchos.",
      icon: AcUnitIcon,
      accent: "#8b3a44",
      images: ["/lt5.jpeg"],
    },
    {
      year: "2026",
      title: "Nuestro primer viaje juntos",
      event: "Enero, 2026",
      description: "Descubriendo el mundo juntos, un destino a la vez.",
      icon: FlightIcon,
      accent: "#c2616e",
      images: ["/lt6.jpeg", "/lt7.jpeg", "/lt8.jpeg"],
    },
  ];

  const handleImageClick = (images: string[], index: number) => {
    setCurrentEventImages(images);
    setCurrentImageIndex(index);
    setSelectedImage(images[index]);
  };
  const handleNext = () => {
    const i = (currentImageIndex + 1) % currentEventImages.length;
    setCurrentImageIndex(i);
    setSelectedImage(currentEventImages[i]);
  };
  const handlePrev = () => {
    const i =
      (currentImageIndex - 1 + currentEventImages.length) %
      currentEventImages.length;
    setCurrentImageIndex(i);
    setSelectedImage(currentEventImages[i]);
  };

  return (
    <>
      <style>{historyStyles}</style>

      <Box
        sx={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: `0 32px 80px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
        }}
      >
        <Lace />

        {/* Corner flourishes */}
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: i < 2 ? 52 : "auto",
              bottom: i >= 2 ? 12 : "auto",
              left: i % 2 === 0 ? 12 : "auto",
              right: i % 2 === 1 ? 12 : "auto",
              width: 52,
              height: 52,
              opacity: 0.14,
              pointerEvents: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'%3E%3Cpath d='M2 2 Q2 26 26 26 Q2 26 2 50' stroke='%23b8843a' fill='none' stroke-width='1.5'/%3E%3Ccircle cx='2' cy='2' r='2' fill='%23b8843a'/%3E%3C/svg%3E")`,
              transform: `rotate(${i * 90}deg)`,
            }}
          />
        ))}

        <Box sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 } }}>
          {/* ── Header ── */}
          <Box
            className="hs-reveal hs-reveal-1"
            sx={{ textAlign: "center", mb: 4 }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `1.5px solid ${T.gold}60`,
                background: `radial-gradient(circle, ${T.parchment}, #fffdf9)`,
                boxShadow: `0 0 0 8px ${T.gold}10, 0 8px 28px ${T.shadow}`,
                mb: 2.5,
                mx: "auto",
              }}
            >
              <HeartIcon
                sx={{
                  fontSize: 34,
                  color: T.rose,
                  animation: "hs-pulse 2.2s infinite",
                }}
              />
            </Box>

            <Typography
              sx={{
                ...serifFont,
                fontSize: 11,
                letterSpacing: "0.3em",
                color: T.textFaint,
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              ✦ Nuestra historia de amor ✦
            </Typography>

            <Typography
              sx={{
                ...scriptFont,
                fontSize: { xs: 52, sm: 66 },
                color: T.roseDark,
                lineHeight: 1,
                textShadow: `2px 4px 14px ${T.rose}28`,
              }}
            >
              {novia}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                my: 0.5,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  height: "0.5px",
                  background: `linear-gradient(90deg, transparent, ${T.gold}80)`,
                }}
              />
              <Typography sx={{ ...scriptFont, fontSize: 26, color: T.gold }}>
                &
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  height: "0.5px",
                  background: `linear-gradient(90deg, ${T.gold}80, transparent)`,
                }}
              />
            </Box>
            <Typography
              sx={{
                ...scriptFont,
                fontSize: { xs: 52, sm: 66 },
                color: T.roseDark,
                lineHeight: 1,
                textShadow: `2px 4px 14px ${T.rose}28`,
              }}
            >
              {novio}
            </Typography>
          </Box>

          <Ornament />

          {/* ── Video ── */}
          <Box className="hs-reveal hs-reveal-2" sx={{ my: 4 }}>
            <Typography
              sx={{
                ...serifFont,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: T.textFaint,
                textTransform: "uppercase",
                textAlign: "center",
                mb: 1,
              }}
            >
              ✦ Un momento en movimiento ✦
            </Typography>
            <Typography
              sx={{
                ...scriptFont,
                fontSize: 36,
                color: T.roseDark,
                textAlign: "center",
                lineHeight: 1,
                mb: 3,
              }}
            >
              Nuestro Video
            </Typography>

            <Box
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${T.border}`,
                boxShadow: `0 16px 48px ${T.shadow}`,
                position: "relative",
              }}
            >
              <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/M6mwt7pfpJo?si=IwpfgMimioXkp6MH&autoplay=0&rel=0"
                  title="Video de la boda"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                  }}
                />
              </Box>
              {/* Bottom caption */}
              <Box
                sx={{
                  textAlign: "center",
                  py: 2.5,
                  background: "linear-gradient(0deg, #fdf5e8, #fffdf9)",
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <Typography
                  sx={{
                    ...serifFont,
                    fontStyle: "italic",
                    fontSize: 14,
                    color: T.textMid,
                    letterSpacing: "0.06em",
                  }}
                >
                  Los momentos más especiales, capturados para siempre
                </Typography>
              </Box>
            </Box>
          </Box>

          <Ornament />

          {/* ── Historia principal ── */}
          <Box className="hs-reveal hs-reveal-2" sx={{ my: 4 }}>
            <Typography
              sx={{
                ...serifFont,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: T.textFaint,
                textTransform: "uppercase",
                textAlign: "center",
                mb: 1,
              }}
            >
              ✦ Cómo comenzó todo ✦
            </Typography>
            <Typography
              sx={{
                ...scriptFont,
                fontSize: 36,
                color: T.roseDark,
                textAlign: "center",
                lineHeight: 1,
                mb: 3,
              }}
            >
              Nuestra Historia
            </Typography>

            <Box
              sx={{
                background: `linear-gradient(155deg, #fffdf9, ${T.parchment})`,
                border: `1px solid ${T.border}`,
                borderRadius: "22px",
                p: { xs: 3, sm: 5 },
                position: "relative",
                boxShadow: `0 12px 36px ${T.shadow}`,
              }}
            >
              {/* Large decorative quote mark */}
              <Typography
                sx={{
                  ...scriptFont,
                  fontSize: 120,
                  color: T.rose,
                  opacity: 0.07,
                  position: "absolute",
                  top: -16,
                  left: 16,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                "
              </Typography>

              <Typography
                sx={{
                  ...serifFont,
                  fontSize: { xs: 16, sm: 18 },
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: T.textMid,
                  lineHeight: 2,
                  textAlign: "center",
                  whiteSpace: "pre-line",
                  px: { xs: 1, sm: 3 },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {historiaFinal}
              </Typography>

              {/* Bottom flourish */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                  gap: 1,
                }}
              >
                {[T.pinkFaint, T.rose, T.roseDark, T.rose, T.pinkFaint].map(
                  (c, i) => (
                    <HeartIcon
                      key={i}
                      sx={{
                        fontSize: 10 + i * 2 - Math.abs(i - 2) * 2,
                        color: c || T.rose,
                        opacity: 0.5 + i * 0.08,
                      }}
                    />
                  ),
                )}
              </Box>
            </Box>
          </Box>

          <Ornament />

          {/* ── Timeline ── */}
          <Box className="hs-reveal hs-reveal-3" sx={{ my: 4 }}>
            <Typography
              sx={{
                ...serifFont,
                fontSize: 11,
                letterSpacing: "0.28em",
                color: T.textFaint,
                textTransform: "uppercase",
                textAlign: "center",
                mb: 1,
              }}
            >
              ✦ Cada capítulo de nuestra historia ✦
            </Typography>
            <Typography
              sx={{
                ...scriptFont,
                fontSize: { xs: 40, sm: 52 },
                color: T.roseDark,
                textAlign: "center",
                lineHeight: 1,
                mb: 4,
              }}
            >
              Momentos Mágicos
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {timeline.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <Fade in key={index} timeout={800 + index * 200}>
                    <Box
                      className="hs-timeline-card"
                      sx={{
                        background:
                          "linear-gradient(160deg, #fffdf9 0%, #fdf8f0 100%)",
                        border: `1px solid ${T.border}`,
                        borderRadius: "22px",
                        overflow: "hidden",
                        boxShadow: `0 8px 28px ${T.shadow}`,
                        transition: "all 0.35s cubic-bezier(0.34,1.1,0.64,1)",
                      }}
                    >
                      {/* Colored accent top bar */}
                      <Box
                        sx={{
                          height: 4,
                          background: `linear-gradient(90deg, ${item.accent}60, ${item.accent}, ${item.accent}60)`,
                        }}
                      />

                      <Box sx={{ p: { xs: 3, sm: 4 } }}>
                        {/* Header row */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3,
                          }}
                        >
                          {/* Icon medallion */}
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: "50%",
                              background: `radial-gradient(circle, ${item.accent}22, ${item.accent}11)`,
                              border: `1.5px solid ${item.accent}50`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              boxShadow: `0 4px 16px ${item.accent}22`,
                            }}
                          >
                            <IconComp
                              sx={{ fontSize: 28, color: item.accent }}
                            />
                          </Box>

                          <Box sx={{ flex: 1 }}>
                            {/* Year pill */}
                            <Box
                              sx={{
                                display: "inline-block",
                                background: `${item.accent}14`,
                                border: `1px solid ${item.accent}30`,
                                borderRadius: "20px",
                                px: 1.5,
                                py: 0.2,
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                sx={{
                                  ...serifFont,
                                  fontSize: 11,
                                  letterSpacing: "0.2em",
                                  color: item.accent,
                                  textTransform: "uppercase",
                                }}
                              >
                                {item.event}
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                ...scriptFont,
                                fontSize: { xs: 28, sm: 36 },
                                color: T.roseDark,
                                lineHeight: 1.1,
                              }}
                            >
                              {item.title}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Description */}
                        <Typography
                          sx={{
                            ...serifFont,
                            fontStyle: "italic",
                            fontSize: { xs: 15, sm: 16 },
                            color: T.textMid,
                            lineHeight: 1.8,
                            borderLeft: `2px solid ${item.accent}40`,
                            pl: 2,
                            mb: 3,
                          }}
                        >
                          {item.description}
                        </Typography>

                        {/* Photo grid */}
                        <Grid container spacing={1.5}>
                          {item.images.map((img, imgIdx) => (
                            <Grid
                              key={imgIdx}
                              size={{
                                xs: 12,
                                sm: item.images.length === 1 ? 12 : 6,
                              }}
                            >
                              <Box
                                className="hs-photo"
                                onClick={() =>
                                  handleImageClick(item.images, imgIdx)
                                }
                                sx={{
                                  position: "relative",
                                  borderRadius: "16px",
                                  overflow: "hidden",
                                  cursor: "pointer",
                                  border: `1px solid ${T.border}`,
                                  boxShadow: `0 6px 20px ${T.shadow}`,
                                  aspectRatio:
                                    item.images.length === 1 ? "16/7" : "4/3",
                                }}
                              >
                                <Box
                                  component="img"
                                  src={img}
                                  alt={`${item.title} - ${imgIdx + 1}`}
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    display: "block",
                                    transition: "transform 0.5s ease",
                                  }}
                                />
                                {/* Hover overlay */}
                                <Box
                                  className="hs-overlay"
                                  sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background: `linear-gradient(to top, ${item.accent}88 0%, transparent 55%)`,
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    pb: 1.5,
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                  }}
                                >
                                  <HeartIcon
                                    sx={{
                                      color: "#fff",
                                      fontSize: 26,
                                      animation: "hs-pulse 1.5s infinite",
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  </Fade>
                );
              })}
            </Box>
          </Box>

          {/* ── Closing ── */}
          <Box
            className="hs-reveal hs-reveal-4"
            sx={{ textAlign: "center", mt: 5 }}
          >
            <Ornament />
            <Typography
              sx={{
                ...scriptFont,
                fontSize: { xs: 38, sm: 48 },
                color: T.roseDark,
                lineHeight: 1,
                mt: 2,
              }}
            >
              Y así seguirá nuestra historia…
            </Typography>
            <Typography
              sx={{
                ...serifFont,
                fontStyle: "italic",
                fontSize: 15,
                color: T.textMid,
                mt: 1.5,
                letterSpacing: "0.04em",
              }}
            >
              El mejor capítulo comienza el 17 de Abril, 2027
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 2,
              }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <HeartIcon
                  key={i}
                  sx={{
                    color: T.rose,
                    fontSize: 12 + i * 3 - Math.abs(i - 2) * 3,
                    opacity: 0.4 + Math.abs(i - 2) * 0.05,
                    animation: `hs-pulse ${1.5 + i * 0.2}s infinite`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Lace />
      </Box>

      {/* ── Lightbox Modal ── */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Fade in={!!selectedImage}>
          <Box
            sx={{
              position: "relative",
              outline: "none",
              maxWidth: "90vw",
              maxHeight: "90vh",
            }}
          >
            {selectedImage && (
              <>
                <IconButton
                  onClick={() => setSelectedImage(null)}
                  sx={{
                    position: "absolute",
                    top: -44,
                    right: 0,
                    color: "#fff",
                    background: "rgba(0,0,0,0.45)",
                    "&:hover": { background: "rgba(0,0,0,0.65)" },
                    zIndex: 2,
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {currentEventImages.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrev}
                      sx={{
                        position: "absolute",
                        left: -44,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#fff",
                        background: "rgba(0,0,0,0.45)",
                        "&:hover": { background: "rgba(0,0,0,0.65)" },
                        zIndex: 2,
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleNext}
                      sx={{
                        position: "absolute",
                        right: -44,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#fff",
                        background: "rgba(0,0,0,0.45)",
                        "&:hover": { background: "rgba(0,0,0,0.65)" },
                        zIndex: 2,
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </>
                )}

                <Box
                  component="img"
                  src={selectedImage}
                  alt="Momento especial"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "85vh",
                    objectFit: "contain",
                    borderRadius: "16px",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                    display: "block",
                  }}
                />

                {currentEventImages.length > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    {currentEventImages.map((_, idx) => (
                      <Box
                        key={idx}
                        onClick={() => {
                          setCurrentImageIndex(idx);
                          setSelectedImage(currentEventImages[idx]);
                        }}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          cursor: "pointer",
                          background:
                            idx === currentImageIndex
                              ? "#fff"
                              : "rgba(255,255,255,0.4)",
                          transition: "all 0.25s",
                        }}
                      />
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HistorySection;
