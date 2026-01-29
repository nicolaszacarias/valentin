import { useState, useRef, useEffect } from "react";
import "./App.css";

const preguntas = [
  "¿Serías mi San Valentín este año?",
  "¿En serio?",
  "¿Segura?",
  "Daleeee…",
  "Ya casi decís que sí 💖",
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [audioStarted, setAudioStarted] = useState(false);

  const audioRef = useRef(null);

  const startAudio = () => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setAudioStarted(true);
    }
  };

  const handleNo = () => {
    startAudio();
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.35);
  };

  const handleYes = () => {
    startAudio();
    setAccepted(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const pregunta =
    preguntas[Math.min(noCount, preguntas.length - 1)];

  return (
    <div className={`container ${accepted ? "accepted" : ""}`} onClick={startAudio}>
      {/* 🎵 AUDIO */}
      <audio ref={audioRef} src="/lover.mp3" autoPlay loop muted />

      {!accepted ? (
        <>
          {/* TEXTO + BOTONES ARRIBA */}
          <div className="content">
            <h1>{pregunta}</h1>

            <div className="botones">
              <button
                className="si"
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYes}
              >
                SÍ 💖
              </button>

              {yesScale < 4 && (
                <button className="no" onClick={handleNo}>
                  NO
                </button>
              )}
            </div>
          </div>

          {/* 🔊 VOLUMEN ABAJO */}
          <div className="volumen">
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </div>
        </>
      ) : (
        <div className="final">
          <h1>Sabía que ibas a decir que sí ❤️</h1>
        </div>
      )}
    </div>
  );
}

export default App;

