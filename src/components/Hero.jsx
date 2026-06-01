import { useState, useRef, useEffect, useCallback } from "react";
import PlayIcon from "./PlayIcon.jsx";
import { vimeoBackgroundEmbed, vimeoThumbnail } from "../lib/vimeo.js";

const TRACKS = [
  { top: "18%", dotDur: "7s", dotDelay: "0s", keyframes: [12, 34, 58, 81] },
  { top: "34%", dotDur: "9s", dotDelay: "1.2s", keyframes: [8, 27, 49, 70, 92] },
  { top: "50%", dotDur: "6s", dotDelay: "0.5s", keyframes: [20, 44, 66, 88] },
  { top: "66%", dotDur: "11s", dotDelay: "2s", keyframes: [15, 38, 55, 78, 95] },
  { top: "82%", dotDur: "8s", dotDelay: "0.8s", keyframes: [10, 30, 52, 74] },
];

const projects = [
  { category: "Short-Form", vimeoId: "1197098638", bg: "#1a1a2e" },
  { category: "Short-Form", vimeoId: "1197093636", bg: "#0d1117" },
  { category: "Short-Form", vimeoId: "1197098353", bg: "#1a1000" },
];

const SLIDE_DURATION = 10000;

function HeroVideo({ project, isMobile, isActive, preloadOnly, onReady, initialReady = false }) {
  const [showEmbed, setShowEmbed] = useState(initialReady);
  const [videoReady, setVideoReady] = useState(initialReady);

  useEffect(() => {
    if (!isActive && !preloadOnly) return;
    if (initialReady) {
      setShowEmbed(true);
      setVideoReady(true);
      return;
    }
    setShowEmbed(false);
    setVideoReady(false);
    const delay = preloadOnly ? 0 : isMobile ? 300 : 150;
    const timer = window.setTimeout(() => setShowEmbed(true), delay);
    return () => window.clearTimeout(timer);
  }, [project.vimeoId, isMobile, isActive, preloadOnly, initialReady]);

  const handleIframeLoad = useCallback(() => {
    setVideoReady(true);
    onReady?.(project.vimeoId);
  }, [onReady, project.vimeoId]);

  if (preloadOnly) {
    if (!showEmbed) return null;
    return (
      <iframe
        key={`preload-${project.vimeoId}`}
        src={vimeoBackgroundEmbed(project.vimeoId, { mobile: isMobile })}
        title=""
        tabIndex={-1}
        aria-hidden
        onLoad={handleIframeLoad}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          border: "none",
        }}
      />
    );
  }

  return (
    <>
      <img
        src={vimeoThumbnail(project.vimeoId)}
        alt=""
        decoding="async"
        fetchPriority={isActive ? "high" : "low"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 2,
          opacity: videoReady ? 0 : 1,
          transition: videoReady ? "opacity 0.4s ease" : "none",
          pointerEvents: "none",
        }}
      />
      {showEmbed && (
        <iframe
          key={project.vimeoId}
          src={vimeoBackgroundEmbed(project.vimeoId, { mobile: isMobile })}
          title={project.category}
          onLoad={handleIframeLoad}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: "none",
            display: "block",
            zIndex: 1,
            opacity: videoReady ? 1 : 0,
            transition: videoReady ? "opacity 0.4s ease" : "none",
            background: "transparent",
          }}
          allow="autoplay; fullscreen"
        />
      )}
    </>
  );
}

export default function Hero({ onOpen, paused }) {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [readyIds, setReadyIds] = useState(() => new Set());
  const [currentReady, setCurrentReady] = useState(false);
  const touchX = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const currentProject = safeProjects[index] ?? safeProjects[0];
  const nextIndex = safeProjects.length ? (index + 1) % safeProjects.length : 0;
  const nextProject = safeProjects[nextIndex];

  const markReady = useCallback((vimeoId) => {
    setReadyIds((prev) => {
      if (prev.has(vimeoId)) return prev;
      const next = new Set(prev);
      next.add(vimeoId);
      return next;
    });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setCurrentReady(readyIds.has(currentProject?.vimeoId));
  }, [currentProject?.vimeoId, readyIds]);

  useEffect(() => {
    if (paused || safeProjects.length === 0) return;
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        startTimeRef.current = Date.now();
        setProgress(0);
        setIndex((i) => (i + 1) % safeProjects.length);
      }
    }, 50);
    return () => clearInterval(intervalRef.current);
  }, [paused, index, safeProjects.length]);

  if (!currentProject) return null;

  const go = (dir) => {
    setIndex((i) => (i + dir + safeProjects.length) % safeProjects.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const jump = (i) => {
    setIndex(i);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const onTouchStart = (e) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100dvh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="kivv-timeline"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        {TRACKS.map((t, i) => (
          <div key={i} className="kivv-track" style={{ top: t.top }}>
            {t.keyframes.map((k, j) => (
              <span key={j} className="kivv-keyframe" style={{ left: `${k}%` }} />
            ))}
            <span
              className="kivv-dot"
              style={{ animationDuration: t.dotDur, animationDelay: t.dotDelay }}
            />
          </div>
        ))}
        <div className="kivv-playhead" />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          minHeight: 70,
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(8,8,8,0.7)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              color: "#F0EDE8",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            KIVV<span style={{ color: "#C8FF00" }}>.</span>
          </span>
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              color: "#F0EDE8",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            EDITS
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}
        >
          <span
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", fontWeight: 500, color: "#F0EDE8" }}
          >
            Abdelkrim Khader
          </span>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#888888" }}>
            Video Editor
          </span>
          <a
            href="https://www.instagram.com/kivv.edits/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "12px",
              color: "#C8FF00",
              textDecoration: "none",
            }}
          >
            @kivv.edits
          </a>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, padding: "20px 0", textAlign: "center" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#888",
            margin: 0,
          }}
        >
          SELECTED WORK
        </p>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(28px, 7vw, 40px)",
            color: "#F0EDE8",
            lineHeight: 1,
            marginTop: "6px",
            marginBottom: 0,
          }}
        >
          Latest Projects
        </h2>
        <div style={{ width: 40, height: 2, background: "#C8FF00", margin: "8px auto 0" }} />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          minHeight: 0,
          userSelect: "none",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "9 / 16",
            width: "100%",
            maxWidth: "220px",
            height: "calc(220px * 16 / 9)",
            margin: "0 auto",
            borderRadius: "16px",
            overflow: "hidden",
            background: currentProject.bg,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: currentProject.bg,
              cursor: "pointer",
            }}
            onClick={() => onOpen?.(currentProject)}
          >
            <HeroVideo
              project={currentProject}
              isMobile={isMobile}
              isActive={!paused}
              initialReady={readyIds.has(currentProject.vimeoId)}
              onReady={markReady}
            />
            {currentReady && nextProject && nextProject.vimeoId !== currentProject.vimeoId && (
              <HeroVideo
                project={nextProject}
                isMobile={isMobile}
                isActive={false}
                preloadOnly
                onReady={markReady}
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%)",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                width: 52,
                height: 52,
                borderRadius: "50%",
                border: "2px solid #C8FF00",
                background: "rgba(200,255,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
                pointerEvents: "none",
              }}
            >
              <PlayIcon size={20} color="#C8FF00" style={{ marginLeft: 3 }} />
            </div>
            <div style={{ position: "absolute", left: 12, bottom: 12, zIndex: 10 }}>
              <span
                style={{
                  display: "block",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#C8FF00",
                }}
              >
                {currentProject.category}
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "rgba(0,0,0,0.4)",
                zIndex: 20,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "#C8FF00",
                  transition: "width 75ms linear",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
            flexShrink: 0,
          }}
        >
          {safeProjects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                jump(i);
              }}
              style={{
                height: 5,
                borderRadius: 9999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                width: i === index ? 18 : 5,
                background: i === index ? "#C8FF00" : "rgba(240,237,232,0.3)",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          flexShrink: 0,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          height: 60,
        }}
      >
        <p
          style={{
            color: "#888888",
            fontSize: "11px",
            letterSpacing: "0.1em",
            fontWeight: 300,
            marginBottom: 8,
            marginTop: 0,
          }}
        >
          Clean, Minimal & High-Retention Edits
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <button
            onClick={scrollTo("#work")}
            style={{
              padding: "8px 20px",
              background: "#C8FF00",
              color: "#000",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              border: "none",
              cursor: "pointer",
            }}
          >
            All Projects →
          </button>
          <a
            href="#contact"
            onClick={scrollTo("#contact")}
            style={{
              padding: "8px 20px",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#F0EDE8",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}
