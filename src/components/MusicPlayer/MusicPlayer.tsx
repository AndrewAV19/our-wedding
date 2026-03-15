// components/MusicPlayer.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Box,
  Paper,
  useTheme,
  alpha,
  Zoom,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
} from "@mui/icons-material";

const MusicPlayer: React.FC = () => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Usar el archivo de música local
  const songUrl = "/musicaboda.mp3";

  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio(songUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Volumen fijo al 50%

    // Manejar eventos del audio
    const handleCanPlay = () => {
      setIsAudioReady(true);
    };

    const handleError = (error: any) => {
      console.error("Error cargando el audio:", error);
      setIsAudioReady(false);
    };

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);

    // Limpiar al desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, [songUrl]);

  // Manejar reproducción automática (intentarlo una vez al cargar)
  useEffect(() => {
    // Intentar reproducir automáticamente (puede ser bloqueado por el navegador)
    const autoplay = async () => {
      if (audioRef.current && isAudioReady) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log("Autoplay bloqueado por el navegador:", error);
        }
      }
    };

    autoplay();
  }, [isAudioReady]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error reproduciendo audio:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Zoom in={true} timeout={800}>
        <Paper
          elevation={8}
          sx={{
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
            color: "white",
            width: 56,
            height: 56,
            backdropFilter: "blur(10px)",
            border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton 
            onClick={togglePlay} 
            sx={{ 
              color: "white",
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
                bgcolor: alpha(theme.palette.common.white, 0.1),
              },
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </IconButton>
        </Paper>
      </Zoom>
    </Box>
  );
};

export default MusicPlayer;