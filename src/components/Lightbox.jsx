import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "./VideoPlayer.jsx";
import { vimeoPlayerEmbed } from "../lib/vimeo.js";

export default function Lightbox({ project, onClose }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const portrait = isMobile;

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
            padding: portrait ? "12px 10px" : "16px 40px",
          }}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            style={{
              position: "absolute",
              top: portrait ? 12 : 20,
              right: portrait ? 12 : 20,
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
              zIndex: 60,
            }}
          >
            ×
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: portrait ? "min(100%, 420px)" : 1024,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: portrait ? "100%" : "100%",
                maxWidth: portrait ? "min(92vw, 380px)" : "100%",
                aspectRatio: portrait ? "9 / 16" : "16 / 9",
                maxHeight: portrait ? "min(82dvh, 720px)" : "none",
                background: "#000",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: portrait ? 12 : 0,
                overflow: "hidden",
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
                  src={vimeoPlayerEmbed(project.vimeoId, { mobile: isMobile })}
                  title={project.category || "Video"}
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
                  title={project.category || "Video"}
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
                marginTop: 16,
                width: "100%",
                maxWidth: portrait ? "min(92vw, 380px)" : "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              {project.category ? (
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
              ) : (
                <span />
              )}
              <p style={{ color: "#888888", fontSize: 12, margin: 0 }}>Tap outside to close</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
