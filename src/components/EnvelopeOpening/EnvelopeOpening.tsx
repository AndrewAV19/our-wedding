// components/EnvelopeOpening.tsx
import React, { useState, useRef, useEffect } from "react";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

interface Petal {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  emoji: string;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const PETAL_EMOJIS = ["🌸", "🌺", "✿", "❀"];
const WEDDING_DATE = "2027-04-17T17:00:00";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Pinyon+Script&display=swap');

  .env-scene {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: radial-gradient(ellipse at 50% 60%, #fff5f7 0%, #fef0f4 40%, #fce8f0 100%);
  }

  .env-star {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #e8a0b4;
    animation: env-twinkle 3s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes env-twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 0.9; transform: scale(1.6); }
  }

  .env-petal {
    position: absolute;
    top: -30px;
    pointer-events: none;
    animation: env-fall linear infinite;
    opacity: 0;
  }

  @keyframes env-fall {
    0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.5; }
    100% { transform: translateY(110vh) rotate(540deg) scale(0.6); opacity: 0; }
  }

  .env-center {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  .env-pretitle {
    font-family: 'Pinyon Script', cursive;
    font-size: 48px;
    color: #b5436a;
    line-height: 1;
    margin-bottom: 6px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .env-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
    letter-spacing: 0.2em;
    color: #c9738a;
    text-transform: uppercase;
    margin-bottom: 32px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .env-fade-out {
    opacity: 0 !important;
    transform: translateY(-12px) !important;
    pointer-events: none;
  }

  .env-wrap {
    width: 320px;
    height: 200px;
    position: relative;
    cursor: pointer;
    animation: env-float 3.5s ease-in-out infinite;
    filter: drop-shadow(0 14px 28px rgba(176, 54, 103, 0.18));
    transition: transform 0.15s;
    user-select: none;
  }

  .env-wrap:hover {
    transform: scale(1.03);
  }

  .env-wrap:active {
    transform: scale(0.97);
  }

  .env-wrap.env-opened {
    animation: none;
    pointer-events: none;
  }

  @keyframes env-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .env-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .env-flap {
    transform-origin: 50% 0%;
    transform-box: fill-box;
  }

  .env-flap.env-opening {
    animation: env-openFlap 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes env-openFlap {
    0% { transform: rotateX(0deg); }
    100% { transform: rotateX(180deg); }
  }

  .env-heart-pulse {
    transform-origin: center;
    animation: env-pulse 1.8s ease-in-out infinite;
  }

  @keyframes env-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.18); }
  }

  /* Letter */
  .env-letter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 60px)) scale(0.92);
    width: 340px;
    background: #fffbf4;
    border: 0.5px solid #f0d0dc;
    border-radius: 14px;
    padding: 34px 30px 28px;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.9s cubic-bezier(0.2, 0, 0.2, 1),
                transform 0.9s cubic-bezier(0.2, 0, 0.2, 1);
    box-shadow: 0 24px 60px rgba(176, 54, 103, 0.15);
    z-index: 10;
  }

  .env-letter.env-letter-visible {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }

  .env-letter-deco {
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #d4769a, transparent);
    border-radius: 2px;
  }

  .env-letter-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 18px;
  }

  .env-letter-line {
    flex: 1;
    height: 0.5px;
    background: #e8bfcc;
  }

  .env-letter-heart-icon {
    color: #d4769a;
    font-size: 12px;
  }

  .env-letter-script {
    font-family: 'Pinyon Script', cursive;
    font-size: 52px;
    color: #b5436a;
    line-height: 1;
    margin-bottom: 6px;
  }

  .env-letter-names {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #6b2040;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
  }

  .env-letter-divider {
    width: 40px;
    height: 0.5px;
    background: #e8bfcc;
    margin: 0 auto 14px;
  }

  .env-letter-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px;
    font-weight: 300;
    color: #8a4560;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  .env-letter-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 400;
    color: #b5436a;
    letter-spacing: 0.14em;
    margin-top: 18px;
  }

  .env-letter-city {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #c9738a;
    margin-top: 4px;
  }

  /* Countdown inside letter */
  .env-countdown {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 20px;
    margin-bottom: 4px;
  }

  .env-countdown-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(160deg, #fff0f4, #fce8ef);
    border: 0.5px solid #f0c4d4;
    border-radius: 10px;
    padding: 8px 4px 6px;
  }

  .env-countdown-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 500;
    color: #b5436a;
    line-height: 1;
  }

  .env-countdown-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #c9738a;
    margin-top: 3px;
  }

  .env-countdown-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c9738a;
    margin-top: 16px;
    margin-bottom: 8px;
  }
`;

const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const calledOnOpen = useRef(false);
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [petals] = useState<Petal[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 10,
      size: 12 + Math.random() * 10,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
    })),
  );

  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })),
  );

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      const diff = new Date(WEDDING_DATE).getTime() - Date.now();
      if (diff > 0) {
        setCountdown({
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff / 3600000) % 24),
          minutes: Math.floor((diff / 60000) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    setTimeout(() => {
      setShowLetter(true);
      setTimeout(() => {
        if (!calledOnOpen.current) {
          calledOnOpen.current = true;
          onOpen();
        }
      }, 10000);
    }, 900);
  };

  const cdItems = [
    { val: countdown.days,    label: "Días"  },
    { val: countdown.hours,   label: "Horas" },
    { val: countdown.minutes, label: "Min"   },
    { val: countdown.seconds, label: "Seg"   },
  ];

  return (
    <>
      <style>{styles}</style>

      <div className="env-scene">
        {/* Stars */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="env-star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}

        {/* Petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="env-petal"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        <div className="env-center">
          {/* Heading */}
          <div className={`env-pretitle${opened ? " env-fade-out" : ""}`}>
            Para ti
          </div>
          <div className={`env-subtitle${opened ? " env-fade-out" : ""}`}>
            Toca el sobre para abrir la invitación
          </div>

          {/* Envelope */}
          <div
            className={`env-wrap${opened ? " env-opened" : ""}`}
            onClick={handleOpen}
            role="button"
            aria-label="Abrir invitación"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleOpen()}
          >
            <svg
              className="env-svg"
              viewBox="0 0 320 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fff6f8" />
                  <stop offset="100%" stopColor="#fce8ef" />
                </linearGradient>
                <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fce8ef" />
                  <stop offset="100%" stopColor="#f9d0de" />
                </linearGradient>
              </defs>

              {/* Envelope body */}
              <rect
                x="0"
                y="60"
                width="320"
                height="140"
                rx="8"
                fill="url(#bodyGrad)"
                stroke="#f0c4d4"
                strokeWidth="0.8"
              />

              {/* Left wing */}
              <polygon
                points="0,65 0,200 138,134"
                fill="#fde0e9"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Right wing */}
              <polygon
                points="320,65 320,200 182,134"
                fill="#fde0e9"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Bottom fold */}
              <polygon
                points="0,200 320,200 160,122"
                fill="#f9d0de"
                stroke="#f0c4d4"
                strokeWidth="0.6"
              />

              {/* Flap */}
              <g className={`env-flap${opened ? " env-opening" : ""}`}>
                <polygon
                  points="0,65 320,65 160,155"
                  fill="url(#flapGrad)"
                  stroke="#f0c4d4"
                  strokeWidth="0.8"
                />
              </g>

              {/* Wax seal circle */}
              <circle
                cx="160"
                cy="122"
                r="24"
                fill="#fff0f4"
                stroke="#f0c4d4"
                strokeWidth="0.8"
              />

              {/* Heart in seal */}
              <path
                className="env-heart-pulse"
                d="M160,131 C157,126 148,120 148,113 C148,108.5 151,105.5 155,105.5 C157,105.5 158.8,106.2 160,108 C161.2,106.2 163,105.5 165,105.5 C169,105.5 172,108.5 172,113 C172,120 163,126 160,131 Z"
                fill="#e8748a"
              />
            </svg>
          </div>

          {/* Letter */}
          <div
            className={`env-letter${showLetter ? " env-letter-visible" : ""}`}
          >
            <div className="env-letter-deco" />

            <div className="env-letter-row">
              <div className="env-letter-line" />
              <span className="env-letter-heart-icon">♥</span>
              <div className="env-letter-line" />
            </div>

            <div className="env-letter-script">Con Amor</div>
            <div className="env-letter-names">Montserrat &amp; Andrew</div>
            <div className="env-letter-divider" />

            <div className="env-letter-body">
              Con todo el amor de nuestros corazones,
              <br />
              te invitamos a celebrar el inicio
              <br />
              de nuestra nueva vida juntos.
            </div>

            <div className="env-letter-date">17 · Abril · 2027</div>
            <div className="env-letter-city">La Barca, Jalisco</div>

            {/* ── Cuenta regresiva ── */}
            <div className="env-countdown-title">Faltan</div>
            <div className="env-countdown">
              {cdItems.map((item) => (
                <div key={item.label} className="env-countdown-item">
                  <span className="env-countdown-number">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="env-countdown-label">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="env-letter-row" style={{ marginTop: 20 }}>
              <div className="env-letter-line" />
              <span className="env-letter-heart-icon">♥</span>
              <div className="env-letter-line" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnvelopeOpening;