import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlayIcon from "./PlayIcon.jsx";
import { vimeoThumbnail } from "../lib/vimeo.js";

const ALL_PROJECTS = [
  { title: "Project 01", category: "Brand Film", vimeoId: "1197098638", bg: "#1a1a2e" },
  { title: "Project 02", category: "Long-Form", vimeoId: "1197093636", bg: "#0d1117" },
  { title: "Project 03", category: "Short-Form", vimeoId: "1197098353", bg: "#1a1000" },
  { title: "Project 04", category: "Creative", vimeoId: "1197098439", bg: "#0a1a10" },
  { title: "Project 05", category: "E-Commerce", vimeoId: "1197098323", bg: "#1a0a0a" },
  { title: "Project 06", category: "Brand Film", vimeoId: "1197098711", bg: "#0a0a1a" },
  { title: "Project 07", category: "Long-Form", vimeoId: "1197098534", bg: "#0d1a2e" },
  { title: "Project 08", category: "Event", vimeoId: "1197098498", bg: "#1a0d00" },
  { title: "Project 09", category: "Brand Film", vimeoId: "1197098452", bg: "#0a1a1a" },
  { title: "Project 10", category: "Long-Form", vimeoId: "1197098437", bg: "#12100a" },
  { title: "Project 11", category: "Short-Form", vimeoId: "1197098362", bg: "#1a0a1a" },
  { title: "Project 12", category: "Creative", vimeoId: "1197098327", bg: "#0a1210" },
  { title: "Project 13", category: "Long-Form", vimeoId: "1197098262", bg: "#1a1000" },
  { title: "Project 14", category: "Event", vimeoId: "1197098263", bg: "#0d1117" },
  { title: "Project 15", category: "Brand Film", vimeoId: "1197098264", bg: "#1a1a2e" },
  { title: "Project 16", category: "Creative", vimeoId: "1197007851", bg: "#0a1a10" },
  { title: "Project 17", category: "Short-Form", vimeoId: "1197007850", bg: "#1a0a0a" },
];

export default function AllProjectsDrawer({ isOpen, onClose, onVideoSelect }) {
  const startY = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTouchStart = (e) => {
    startY.current = e.changedTouches[0].clientY;
  };
  const handleTouchMove = (e) => {
    if (startY.current == null) return;
    const dy = e.changedTouches[0].clientY - startY.current;
    if (dy > 80) {
      onClose();
      startY.current = null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: isOpen ? "all" : "none",
          }}
        >
          <div
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: "92dvh",
              background: "#0d0d0d",
              borderRadius: "20px 20px 0 0",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "12px auto 0",
                flexShrink: 0,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                flexShrink: 0,
              }}
            >
              <span
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#F0EDE8" }}
              >
                All Projects
              </span>
              <button
                onClick={onClose}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#888",
                  fontSize: 16,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                padding: 12,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 8,
                alignContent: "start",
              }}
            >
              {ALL_PROJECTS.map((project) => (
                <div
                  key={project.vimeoId}
                  onClick={() => onVideoSelect?.(project)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100%",
                    aspectRatio: "9 / 16",
                    borderRadius: 10,
                    background: project.bg,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={vimeoThumbnail(project.vimeoId)}
                    alt={project.category}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                    loading="lazy"
                    decoding="async"
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.3)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "2px solid #C8FF00",
                      background: "rgba(200,255,0,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 3,
                      pointerEvents: "none",
                    }}
                  >
                    <PlayIcon size={16} color="#C8FF00" style={{ marginLeft: 2 }} />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "24px 8px 8px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.92), transparent)",
                      zIndex: 3,
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#C8FF00",
                        lineHeight: 1.3,
                      }}
                    >
                      {project.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
