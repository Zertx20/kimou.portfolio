import { motion } from "framer-motion";

const services = [
  {
    icon: "◆",
    title: "Short-Form Editing",
    desc: "Reels, TikToks, Shorts — fast hooks, tight pacing, scroll-stopping cuts built for the algorithm.",
  },
  {
    icon: "▲",
    title: "Long-Form Editing",
    desc: "YouTube, vlogs, documentaries — story-first edits that hold attention from open to outro.",
  },
  {
    icon: "●",
    title: "Motion & Color",
    desc: "Transitions, grading, sound design — cinematic polish that makes every frame feel intentional.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{ padding: "128px 24px", background: "#080808" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 672, marginBottom: 64 }}
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
            Services
          </p>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: "clamp(36px, 5vw, 56px)",
              color: "#F0EDE8",
              margin: 0,
            }}
          >
            What I do.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: "#161616",
                padding: "32px 40px",
                border: "1px solid transparent",
                cursor: "default",
              }}
            >
              <div style={{ color: "#C8FF00", fontSize: 28, marginBottom: 32 }}>{s.icon}</div>
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "#F0EDE8",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "#888888",
                  fontSize: 14,
                  lineHeight: 1.625,
                  margin: 0,
                }}
              >
                {s.desc}
              </p>
              <div
                style={{
                  marginTop: 32,
                  color: "#C8FF00",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                }}
              >
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
