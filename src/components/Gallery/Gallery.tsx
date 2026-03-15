// components/Gallery/Gallery.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Grow, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteIcon from "@mui/icons-material/Favorite";

/* ─────────────────── palette ─────────────────── */
const T = {
  parchment: "#fdf5e8",
  gold: "#b8843a",
  goldLight: "#d4a96a",
  goldDark: "#7a5220",
  rose: "#c2616e",
  roseDark: "#8b3a44",
  text: "#2e0f1a",
  textMid: "#7a3550",
  textFaint: "#b09070",
  border: "rgba(180,130,80,0.22)",
  shadow: "rgba(100,60,20,0.14)",
};

const scriptFont = { fontFamily: "'Pinyon Script', cursive" };
const serifFont = { fontFamily: "'Cormorant Garamond', serif" };

/* ─────────────────── styles ─────────────────── */
const galleryStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Pinyon+Script&display=swap');

  @keyframes gl-reveal {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes gl-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

  .gl-photo {
    position: relative;
    cursor: pointer;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(180,130,80,0.20);
    box-shadow: 0 6px 24px rgba(100,60,20,0.13);
    animation: gl-reveal 0.7s cubic-bezier(0.16,1,0.3,1) both;
    transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1),
                box-shadow 0.35s ease,
                border-color 0.35s ease;
  }

  .gl-photo:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 22px 44px rgba(100,60,20,0.22);
    border-color: rgba(180,130,80,0.50);
  }

  .gl-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  .gl-photo:hover img { transform: scale(1.06); }

  .gl-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(139,58,68,0.55) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 12px;
  }

  .gl-photo:hover .gl-overlay { opacity: 1; }

  .gl-nav-btn {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.5);
    background: rgba(0,0,0,0.38);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .gl-nav-btn:hover { background: rgba(0,0,0,0.62); transform: scale(1.08); }

  .gl-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.25s;
    border: 1.5px solid rgba(255,255,255,0.6);
  }
`;

/* ── Ornament ── */
const Ornament = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 1 }}>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg,transparent,${T.goldLight}80)`,
      }}
    />
    <Box
      sx={{ fontSize: 11, color: T.goldLight, letterSpacing: 6, opacity: 0.7 }}
    >
      ✦ ✦ ✦
    </Box>
    <Box
      sx={{
        flex: 1,
        height: "0.5px",
        background: `linear-gradient(90deg,${T.goldLight}80,transparent)`,
      }}
    />
  </Box>
);

/* ════════════════════════════════════════════════ */
interface GalleryProps {
  fotos?: string[];
}

const Gallery: React.FC<GalleryProps> = ({ fotos }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const localImages = Array.from(
    { length: 9 },
    (_, i) => `/imgGaleria${i + 1}.jpeg`,
  );
  const images = fotos && fotos.length > 0 ? fotos : localImages;
  const [imgLoaded, setImgLoaded] = useState<boolean[]>(() =>
    new Array(images.length).fill(false),
  );
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleOpen = (i: number) => {
    setSelected(i);
    setOpen(true);
  };
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handlePrev = React.useCallback(() => {
    setSelected((p) => (p > 0 ? p - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = React.useCallback(() => {
    setSelected((p) => (p < images.length - 1 ? p + 1 : 0));
  }, [images.length]);

  const markLoaded = (i: number) =>
    setImgLoaded((prev) => {
      const n = [...prev];
      n[i] = true;
      return n;
    });

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, images.length, handlePrev, handleNext, handleClose]);

  // Masonry-style: split into 2 columns, alternating
  const col1 = images.filter((_, i) => i % 2 === 0);
  const col2 = images.filter((_, i) => i % 2 === 1);
  const col1Indices = images.map((_, i) => i).filter((i) => i % 2 === 0);
  const col2Indices = images.map((_, i) => i).filter((i) => i % 2 === 1);

  return (
    <>
      <style>{galleryStyles}</style>

      <Grow in timeout={700}>
        <Box>
          {/* ── Paper card ── */}
          <Box
            sx={{
              background:
                "linear-gradient(170deg, #fffdf9 0%, #fdf6ec 50%, #faf0e4 100%)",
              border: `1px solid ${T.border}`,
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: `0 32px 80px ${T.shadow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
            }}
          >
            {/* Lace top */}
            <Box
              sx={{
                height: 12,
                background: `repeating-linear-gradient(90deg,${T.gold}30 0px,${T.gold}30 4px,transparent 4px,transparent 12px)`,
              }}
            />

            <Box sx={{ px: { xs: 3, sm: 5 }, py: { xs: 4, sm: 5 } }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    border: `1.5px solid ${T.gold}60`,
                    background: `radial-gradient(circle,${T.parchment},#fffdf9)`,
                    boxShadow: `0 0 0 6px ${T.gold}12, 0 8px 24px ${T.shadow}`,
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  <FavoriteIcon
                    sx={{
                      fontSize: 28,
                      color: T.rose,
                      animation: "gl-pulse 2.2s infinite",
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
                    mb: 0.5,
                  }}
                >
                  ✦ Momentos capturados ✦
                </Typography>
                <Typography
                  sx={{
                    ...scriptFont,
                    fontSize: { xs: 48, sm: 58 },
                    color: T.roseDark,
                    lineHeight: 1,
                  }}
                >
                  Nuestra Galería
                </Typography>
              </Box>

              <Ornament />

              {/* Masonry grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 1.5,
                  mt: 3,
                }}
              >
                {/* Column 1 */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {col1.map((img, idx) => {
                    const realIdx = col1Indices[idx];
                    return (
                      <Box
                        key={realIdx}
                        className="gl-photo"
                        onClick={() => handleOpen(realIdx)}
                        style={{ animationDelay: `${realIdx * 0.07}s` }}
                        sx={{
                          aspectRatio:
                            idx % 3 === 0
                              ? "3/4"
                              : idx % 3 === 1
                                ? "1/1"
                                : "4/5",
                        }}
                      >
                        {!imgLoaded[realIdx] && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background: `linear-gradient(145deg,${T.parchment},#fff8f0)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FavoriteIcon
                              sx={{
                                fontSize: 20,
                                color: T.goldLight,
                                opacity: 0.4,
                                animation: "gl-pulse 2s infinite",
                              }}
                            />
                          </Box>
                        )}
                        <img
                          src={img}
                          alt={`Momento ${realIdx + 1}`}
                          loading="lazy"
                          onLoad={() => markLoaded(realIdx)}
                          style={{
                            opacity: imgLoaded[realIdx] ? 1 : 0,
                            transition: "opacity 0.4s",
                          }}
                        />
                        <div className="gl-overlay">
                          <FavoriteIcon
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              animation: "gl-pulse 1.8s infinite",
                            }}
                          />
                        </div>
                      </Box>
                    );
                  })}
                </Box>

                {/* Column 2 — starts slightly lower for masonry feel */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: 4,
                  }}
                >
                  {col2.map((img, idx) => {
                    const realIdx = col2Indices[idx];
                    return (
                      <Box
                        key={realIdx}
                        className="gl-photo"
                        onClick={() => handleOpen(realIdx)}
                        style={{ animationDelay: `${realIdx * 0.07}s` }}
                        sx={{
                          aspectRatio:
                            idx % 3 === 0
                              ? "1/1"
                              : idx % 3 === 1
                                ? "3/4"
                                : "4/5",
                        }}
                      >
                        {!imgLoaded[realIdx] && (
                          <Box
                            sx={{
                              position: "absolute",
                              inset: 0,
                              background: `linear-gradient(145deg,${T.parchment},#fff8f0)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FavoriteIcon
                              sx={{
                                fontSize: 20,
                                color: T.goldLight,
                                opacity: 0.4,
                                animation: "gl-pulse 2s infinite",
                              }}
                            />
                          </Box>
                        )}
                        <img
                          src={img}
                          alt={`Momento ${realIdx + 1}`}
                          loading="lazy"
                          onLoad={() => markLoaded(realIdx)}
                          style={{
                            opacity: imgLoaded[realIdx] ? 1 : 0,
                            transition: "opacity 0.4s",
                          }}
                        />
                        <div className="gl-overlay">
                          <FavoriteIcon
                            style={{
                              color: "#fff",
                              fontSize: 18,
                              animation: "gl-pulse 1.8s infinite",
                            }}
                          />
                        </div>
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* Footer */}
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Ornament />
                <Typography
                  sx={{
                    ...scriptFont,
                    fontSize: 30,
                    color: T.goldDark,
                    mt: 1.5,
                  }}
                >
                  Cada foto, un recuerdo eterno
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <FavoriteIcon
                      key={i}
                      sx={{
                        color: T.rose,
                        fontSize: 10 + i * 2 - Math.abs(i - 2) * 2,
                        opacity: 0.4 + Math.abs(i - 2) * 0.05,
                        animation: `gl-pulse ${1.5 + i * 0.15}s infinite`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </Box>
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
      </Grow>

      {/* ── Lightbox ── */}
      {open && (
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: 1400,
            background: "rgba(20,5,10,0.88)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={open}>
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "relative",
                maxWidth: "88vw",
                maxHeight: "88vh",
                outline: "none",
              }}
            >
              {/* Close */}
              <Box
                className="gl-nav-btn"
                onClick={handleClose}
                sx={{ position: "absolute", top: -50, right: 0, zIndex: 2 }}
              >
                <CloseIcon sx={{ fontSize: 20 }} />
              </Box>

              {/* Image */}
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={images[selected]}
                  alt={`Momento ${selected + 1}`}
                  style={{
                    maxWidth: "88vw",
                    maxHeight: "78vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>

              {/* Caption */}
              <Box sx={{ textAlign: "center", mt: 1.5 }}>
                <Typography
                  sx={{
                    ...serifFont,
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {selected + 1} / {images.length}
                </Typography>
              </Box>

              {/* Dot indicators */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 0.8,
                  mt: 1,
                }}
              >
                {images.map((_, i) => (
                  <Box
                    key={i}
                    className="gl-dot"
                    onClick={() => setSelected(i)}
                    sx={{
                      background:
                        i === selected ? "#fff" : "rgba(255,255,255,0.3)",
                      transform: i === selected ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </Box>

              {/* Prev / Next */}
              <Box
                className="gl-nav-btn"
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: -56,
                  top: "45%",
                  transform: "translateY(-50%)",
                }}
              >
                <NavigateBeforeIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box
                className="gl-nav-btn"
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: -56,
                  top: "45%",
                  transform: "translateY(-50%)",
                }}
              >
                <NavigateNextIcon sx={{ fontSize: 22 }} />
              </Box>
            </Box>
          </Fade>
        </Box>
      )}
    </>
  );
};

export default Gallery;
