// components/AttendanceForm/AttendanceForm.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Fade, Zoom } from "@mui/material";
import {
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  Send as SendIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

/* ─────────────────── palette ─────────────────── */
const T = {
  parchment: "#fdf5e8",
  gold:      "#b8843a",
  goldLight: "#d4a96a",
  goldDark:  "#7a5220",
  rose:      "#c2616e",
  roseDark:  "#8b3a44",
  pink:      "#d94d6a",
  green:     "#4caf50",
  greenDark: "#388e3c",
  text:      "#2e0f1a",
  textMid:   "#7a3550",
  textFaint: "#b09070",
  border:    "rgba(180,130,80,0.22)",
  borderPink:"rgba(217,77,106,0.25)",
  shadow:    "rgba(100,60,20,0.13)",
};

const scriptFont = "'Pinyon Script', cursive";
const serifFont  = "'Cormorant Garamond', serif";

/* ─────────────────── styles ─────────────────── */
const formStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Pinyon+Script&display=swap');

  @keyframes af-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
  @keyframes af-heartbeat { 0%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.3)} 70%{transform:scale(1)} }
  @keyframes af-reveal { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes af-shake  { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-4px)} 40%{transform:translateX(4px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }

  .af-reveal   { animation: af-reveal 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .af-reveal-1 { animation-delay: 0.05s; }
  .af-reveal-2 { animation-delay: 0.15s; }
  .af-reveal-3 { animation-delay: 0.25s; }
  .af-reveal-4 { animation-delay: 0.35s; }
  .af-reveal-5 { animation-delay: 0.45s; }
  .af-reveal-6 { animation-delay: 0.55s; }

  .af-field input,
  .af-field textarea {
    font-family: ${serifFont};
    font-size: 16px;
    color: ${T.text};
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    resize: none;
    padding: 0;
    line-height: 1.6;
  }

  .af-field input::placeholder,
  .af-field textarea::placeholder {
    font-family: ${serifFont};
    font-style: italic;
    color: ${T.textFaint};
    font-size: 15px;
  }

  .af-confirm-card {
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34,1.2,0.64,1);
  }
  .af-confirm-card:hover { transform: translateY(-4px) scale(1.02); }
  .af-confirm-card:active { transform: scale(0.98); }

  .af-submit:hover:not(:disabled) {
    transform: translateY(-2px) !important;
    box-shadow: 0 14px 36px rgba(217,77,106,0.40) !important;
  }
  .af-submit:active:not(:disabled) { transform: scale(0.98) !important; }
  .af-submit:disabled { opacity: 0.45 !important; cursor: not-allowed; }
`;

/* ─────────── Field wrapper ─────────── */
const Field: React.FC<{
  label: string;
  emoji: string;
  children: React.ReactNode;
  error?: boolean;
}> = ({ label, emoji, children, error }) => (
  <Box sx={{
    background: "linear-gradient(145deg, #fffdf9, #fdf8f2)",
    border: `1px solid ${error ? T.rose : T.border}`,
    borderRadius: "16px",
    px: 2.5, py: 2,
    transition: "all 0.25s",
    boxShadow: error ? `0 0 0 2px ${T.rose}22` : `0 4px 14px ${T.shadow}`,
    "&:focus-within": {
      borderColor: error ? T.rose : T.goldLight,
      boxShadow: error ? `0 0 0 2px ${T.rose}22` : `0 0 0 2px ${T.gold}18, 0 6px 20px ${T.shadow}`,
      transform: "translateY(-1px)",
    },
  }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
      <Box sx={{ fontSize: 14 }}>{emoji}</Box>
      <Typography sx={{ fontFamily: serifFont, fontSize: 10, letterSpacing: "0.22em", color: T.textFaint, textTransform: "uppercase" }}>
        {label}
      </Typography>
    </Box>
    <Box className="af-field">{children}</Box>
  </Box>
);

/* ─────────── Ornament ─────────── */
const Ornament = () => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, my: 0.5 }}>
    <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${T.goldLight}80)` }} />
    <Box sx={{ fontSize: 10, color: T.goldLight, letterSpacing: 5, opacity: 0.7 }}>✦ ✦ ✦</Box>
    <Box sx={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${T.goldLight}80, transparent)` }} />
  </Box>
);

/* ══════════════════════════════════════════════════════ */
interface AttendanceFormProps {
  novio: string;
  novia: string;
  fechaBoda?: string;
  lugarBoda?: string;
  numeroNovio?: string;
  onClose?: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  novio,
  novia,
  numeroNovio = "3931023952",
  onClose,
}) => {
  const [form, setForm] = useState({
    nombre:       "",
    telefono:     "",
    acompanantes: "0",
    confirmacion: "si" as "si" | "no",
    mensaje:      "",
    autorizado:   false,
  });
  const [enviado,  setEnviado]  = useState(false);
  const [error,    setError]    = useState("");
  const [shakeErr, setShakeErr] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  const set = (key: string, val: string | boolean) =>
    setForm(p => ({ ...p, [key]: val }));

  const triggerError = (msg: string) => {
    setError(msg);
    setShakeErr(true);
    setTimeout(() => setShakeErr(false), 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim())    return triggerError("Por favor, dinos tu nombre completo ✨");
    if (!form.telefono.trim())  return triggerError("Ingresa tu número de WhatsApp 📱");
    if (!form.autorizado)       return triggerError("Confirma que deseas enviar tu mensaje 💕");

    const txt = form.confirmacion === "si"
      ? `🎉 *¡CONFIRMO ASISTENCIA!* 🎉\n\nQueridos ${novia} y ${novio}, ¡qué emoción! 💖\n\n✅ Asistiré: ¡SÍ!\n👥 Acompañantes: ${form.acompanantes}\n${form.mensaje ? `\n💌 "${form.mensaje}"\n` : ""}\n¡Nos vemos pronto! 🎊\nCon cariño, ${form.nombre} 💫`
      : `💔 *NO PODRÉ ASISTIR* 💔\n\nQueridos ${novia} y ${novio},\n\n❌ Lamentablemente no podré acompañarlos.\n${form.mensaje ? `\n💌 "${form.mensaje}"\n` : ""}\n¡Que tengan el día más hermoso! 🌟\nCon cariño, ${form.nombre} 💕`;

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxPyvVCB710e4eYZfrc5vLty3baPFxVsCt-vgcTXZKOUvyIUDnBuG_-qlJ8A89fEZexBA/exec",
        { method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: form.nombre, telefono: form.telefono, acompanantes: form.acompanantes, confirmacion: form.confirmacion, mensaje: form.mensaje }),
          mode: "no-cors" },
      );
    } catch { /* silent */ }

    window.open(`https://wa.me/${numeroNovio}?text=${encodeURIComponent(txt)}`, "_blank");
    setEnviado(true);
    setError("");

    setTimeout(() => {
      setEnviado(false);
      setForm({ nombre: "", telefono: "", acompanantes: "0", confirmacion: "si", mensaje: "", autorizado: false });
      if (onClose) onClose();
    }, 4000);
  };

  /* ── render ── */
  if (enviado) {
    return (
      <Zoom in>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Box sx={{
            width: 72, height: 72, borderRadius: "50%",
            background: `linear-gradient(135deg, ${T.rose}, ${T.roseDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            mx: "auto", mb: 2,
            boxShadow: `0 0 0 8px ${T.rose}18, 0 8px 24px ${T.shadow}`,
          }}>
            <CheckIcon sx={{ color: "#fff", fontSize: 34 }} />
          </Box>
          <Typography sx={{ fontFamily: scriptFont, fontSize: 42, color: T.roseDark, lineHeight: 1, mb: 1 }}>
            ¡Gracias!
          </Typography>
          <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 15, color: T.textMid, lineHeight: 1.7 }}>
            Tu mensaje ha llegado a los novios.<br />¡Nos vemos pronto! 💖
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
            {[0,1,2,3,4].map(i => (
              <HeartIcon key={i} sx={{ color: T.rose, fontSize: 10 + i * 2 - Math.abs(i-2)*2, opacity: 0.5, animation: `af-pulse ${1.4+i*0.15}s infinite`, animationDelay: `${i*0.12}s` }} />
            ))}
          </Box>
        </Box>
      </Zoom>
    );
  }

  return (
    <>
      <style>{formStyles}</style>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

          {/* Error banner */}
          {error && (
            <Box sx={{
              background: `${T.rose}12`,
              border: `1px solid ${T.rose}40`,
              borderRadius: "14px", px: 2.5, py: 1.5,
              display: "flex", alignItems: "center", gap: 1,
              animation: shakeErr ? "af-shake 0.5s" : "none",
            }}>
              <HeartBorderIcon sx={{ fontSize: 16, color: T.rose, flexShrink: 0 }} />
              <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 14, color: T.roseDark }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* Nombre */}
          <Box className="af-reveal af-reveal-1">
            <Field label="Tu nombre completo" emoji="🌸">
              <input
                name="nombre" value={form.nombre} placeholder="¿Cómo te llamas? 💫"
                onChange={e => set("nombre", e.target.value)}
              />
            </Field>
          </Box>

          {/* Teléfono */}
          <Box className="af-reveal af-reveal-2">
            <Field label="WhatsApp" emoji="📱">
              <input
                name="telefono" value={form.telefono} placeholder="+52 123 456 7890"
                onChange={e => set("telefono", e.target.value)}
              />
            </Field>
          </Box>

          <Ornament />

          {/* Confirmación */}
          <Box className="af-reveal af-reveal-3">
            <Typography sx={{ fontFamily: serifFont, fontSize: 11, letterSpacing: "0.24em", color: T.textFaint, textTransform: "uppercase", textAlign: "center", mb: 1.5 }}>
              ¿Acompañarás a los novios?
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              {/* SÍ */}
              <Box
                className="af-confirm-card"
                onClick={() => set("confirmacion", "si")}
                sx={{
                  borderRadius: "18px",
                  border: `2px solid ${form.confirmacion === "si" ? T.green : T.border}`,
                  background: form.confirmacion === "si"
                    ? `linear-gradient(145deg, #f0fff4, #e8f5e9)`
                    : "linear-gradient(145deg, #fffdf9, #fdf8f2)",
                  p: 2.5, textAlign: "center",
                  boxShadow: form.confirmacion === "si"
                    ? `0 8px 24px rgba(76,175,80,0.2)`
                    : `0 4px 14px ${T.shadow}`,
                }}>
                <Box sx={{ fontSize: 32, mb: 0.5, animation: form.confirmacion === "si" ? "af-heartbeat 1.5s infinite" : "none" }}>💖</Box>
                <Typography sx={{ fontFamily: serifFont, fontWeight: 500, fontSize: 15, color: form.confirmacion === "si" ? T.greenDark : T.text }}>
                  ¡Sí, confirmo!
                </Typography>
                <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 12, color: T.textFaint, mt: 0.3 }}>
                  Estaré allí 🎊
                </Typography>
              </Box>

              {/* NO */}
              <Box
                className="af-confirm-card"
                onClick={() => set("confirmacion", "no")}
                sx={{
                  borderRadius: "18px",
                  border: `2px solid ${form.confirmacion === "no" ? T.rose : T.border}`,
                  background: form.confirmacion === "no"
                    ? `linear-gradient(145deg, #fff5f7, #fdeef2)`
                    : "linear-gradient(145deg, #fffdf9, #fdf8f2)",
                  p: 2.5, textAlign: "center",
                  boxShadow: form.confirmacion === "no"
                    ? `0 8px 24px rgba(194,97,110,0.2)`
                    : `0 4px 14px ${T.shadow}`,
                }}>
                <Box sx={{ fontSize: 32, mb: 0.5 }}>💔</Box>
                <Typography sx={{ fontFamily: serifFont, fontWeight: 500, fontSize: 15, color: form.confirmacion === "no" ? T.roseDark : T.text }}>
                  No podré ir
                </Typography>
                <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 12, color: T.textFaint, mt: 0.3 }}>
                  Lo siento mucho 😔
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Acompañantes */}
          {form.confirmacion === "si" && (
            <Fade in>
              <Box className="af-reveal af-reveal-4">
                <Field label="¿Cuántos te acompañarán?" emoji="👥">
                  <input
                    name="acompanantes" type="number" min={0} max={10}
                    value={form.acompanantes}
                    onChange={e => set("acompanantes", e.target.value)}
                    placeholder="0"
                    style={{ width: 80 }}
                  />
                </Field>
              </Box>
            </Fade>
          )}

          {/* Mensaje */}
          <Box className="af-reveal af-reveal-4">
            <Field label="Un mensaje para los novios" emoji="💌">
              <textarea
                name="mensaje" rows={3} value={form.mensaje}
                placeholder={form.confirmacion === "si"
                  ? "Escribe algo especial para ellos… una felicitación, un recuerdo 💕"
                  : "Aunque no puedas ir, déjales un mensaje 💕"}
                onChange={e => set("mensaje", e.target.value)}
              />
            </Field>
          </Box>

          <Ornament />

          {/* Autorización */}
          <Box
            className="af-reveal af-reveal-5"
            onClick={() => set("autorizado", !form.autorizado)}
            sx={{
              display: "flex", alignItems: "flex-start", gap: 2,
              background: form.autorizado ? `linear-gradient(145deg, #fff5f8, #fdeef3)` : "linear-gradient(145deg, #fffdf9, #fdf8f2)",
              border: `1.5px solid ${form.autorizado ? T.borderPink : T.border}`,
              borderRadius: "16px", p: 2.5,
              cursor: "pointer",
              transition: "all 0.28s",
              boxShadow: form.autorizado ? `0 6px 20px rgba(217,77,106,0.14)` : `0 4px 14px ${T.shadow}`,
              "&:hover": { borderColor: T.goldLight },
            }}
          >
            <Box sx={{
              width: 28, height: 28, borderRadius: "50%",
              border: `1.5px solid ${form.autorizado ? T.rose : T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, mt: 0.3,
              background: form.autorizado ? `linear-gradient(135deg, ${T.rose}, ${T.roseDark})` : "transparent",
              transition: "all 0.25s",
            }}>
              {form.autorizado
                ? <HeartIcon sx={{ fontSize: 15, color: "#fff" }} />
                : <HeartBorderIcon sx={{ fontSize: 15, color: T.textFaint }} />}
            </Box>
            <Box>
              <Typography sx={{ fontFamily: serifFont, fontSize: 14, fontWeight: 500, color: form.autorizado ? T.roseDark : T.text, lineHeight: 1.4 }}>
                Confirmo que quiero enviar este mensaje a los novios
              </Typography>
              <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 12, color: T.textFaint, mt: 0.4 }}>
                Se abrirá WhatsApp para compartir tu confirmación directamente con ellos 💕
              </Typography>
            </Box>
          </Box>

          {/* Submit */}
          <Box className="af-reveal af-reveal-6">
            <Box
              component="button"
              type="submit"
              className="af-submit"
              disabled={!form.autorizado}
              sx={{
                width: "100%",
                fontFamily: serifFont,
                fontSize: 16,
                letterSpacing: "0.14em",
                color: "#fff",
                background: form.autorizado
                  ? `linear-gradient(135deg, ${T.pink} 0%, ${T.roseDark} 100%)`
                  : "rgba(180,130,80,0.2)",
                border: "none",
                borderRadius: "32px",
                py: 1.8,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5,
                cursor: form.autorizado ? "pointer" : "not-allowed",
                boxShadow: form.autorizado ? `0 10px 30px rgba(217,77,106,0.30)` : "none",
                transition: "all 0.3s",
                mt: 1,
              }}
            >
              <SendIcon sx={{ fontSize: 18 }} />
              Enviar confirmación
              <HeartIcon sx={{ fontSize: 16, animation: form.autorizado ? "af-pulse 2s infinite" : "none" }} />
            </Box>
          </Box>

          <Typography sx={{ fontFamily: serifFont, fontStyle: "italic", fontSize: 12, color: T.textFaint, textAlign: "center", mt: 0.5 }}>
            Tu mensaje llegará directo a los novios 💌
          </Typography>

        </Box>
      </form>
    </>
  );
};

export default AttendanceForm;