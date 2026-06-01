import { motion } from "framer-motion";

export default function Portfolio({ onOpenDrawer }) {
  return (
    <section id="work">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
          width: "100%",
          padding: "40px 24px",
          background: "#0d0d0d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          gap: 16,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8FF00",
          }}
        >
          <span style={{ width: 24, height: 1, background: "rgba(200,255,0,0.3)" }} />
          MORE WORK
          <span style={{ width: 24, height: 1, background: "rgba(200,255,0,0.3)" }} />
        </div>

        <h2
          style={{
            position: "relative",
            zIndex: 10,
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(32px, 8vw, 48px)",
            color: "#F0EDE8",
            lineHeight: 1,
            margin: 0,
          }}
        >
          All Projects.
        </h2>

        <p
          style={{
            position: "relative",
            zIndex: 10,
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: "#888",
            lineHeight: 1.6,
            maxWidth: 260,
            margin: 0,
          }}
        >
          From brand films to short-form reels —
          <br />
          every cut crafted with intention.
        </p>

        <button
          onClick={() => onOpenDrawer?.()}
          style={{
            position: "relative",
            zIndex: 10,
            background: "#C8FF00",
            color: "#000",
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "14px 32px",
            borderRadius: 2,
            border: "none",
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          View All Projects →
        </button>

        <p
          style={{
            position: "relative",
            zIndex: 10,
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
            margin: 0,
            marginTop: 4,
          }}
        >
          Tap to explore ↑
        </p>
      </motion.div>
    </section>
  );
}
