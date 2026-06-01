import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer.jsx";
import { vimeoPlayerEmbed } from "../lib/vimeo.js";

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 40px",
          }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F0EDE8",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 1024 }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: "#000",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {project.videoSrc ? (
                <VideoPlayer
                  src={project.videoSrc}
                  poster={project.poster}
                  autoPlay
                  controls
                  preload="auto"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              ) : project.vimeoId ? (
                <iframe
                  src={vimeoPlayerEmbed(project.vimeoId)}
                  title={project.title}
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${project.ytId}?autoplay=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              )}
            </div>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.3em",
                    color: "#C8FF00",
                    margin: 0,
                  }}
                >
                  {project.category}
                </p>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(24px, 4vw, 30px)",
                    color: "#F0EDE8",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  {project.title}
                </h3>
              </div>
              <p style={{ color: "#888888", fontSize: 12, margin: 0 }}>ESC to close</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
