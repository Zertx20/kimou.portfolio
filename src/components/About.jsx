import { motion } from "framer-motion";

const stats = [
  { n: "50+", l: "Projects" },
  { n: "3+", l: "Years" },
  { n: "100%", l: "Dedicated" },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        padding: "128px 24px",
        overflow: "hidden",
        background: "#080808",
      }}
    >
      <span
        aria-hidden
        style={{
          pointerEvents: "none",
          userSelect: "none",
          position: "absolute",
          top: -40,
          right: 0,
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          color: "rgba(240,237,232,0.03)",
          fontSize: "clamp(220px, 40vw, 480px)",
          lineHeight: 0.8,
        }}
      >
        AK
      </span>

      <div style={{ position: "relative", maxWidth: 1024, margin: "0 auto" }}>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "#C8FF00",
              marginBottom: 24,
            }}
          >
            About
          </p>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "#F0EDE8",
              margin: 0,
            }}
          >
            Abdelkrim Khader
          </h2>
          <div
            style={{
              marginTop: 32,
              maxWidth: 672,
              color: "rgba(240,237,232,0.8)",
              fontSize: 18,
              lineHeight: 1.625,
              fontWeight: 300,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p style={{ margin: 0 }}>
              I'm a clean, minimal video editor based in Algeria, crafting edits that respect
              attention and reward it.
            </p>
            <p style={{ margin: 0 }}>
              My focus is on rhythm, restraint, and retention — every cut earns its place, every
              frame moves the story forward.
            </p>
            <p style={{ margin: 0 }}>
              From short-form social to long-form documentary work, I bring a cinematic eye and a
              sharp sense of timing to every project.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: "24px 40px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  color: "#C8FF00",
                  fontSize: "clamp(28px, 4vw, 48px)",
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  marginTop: 8,
                  color: "#888888",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
