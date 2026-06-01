import { useState } from "react";
import { motion } from "framer-motion";
import ArrowUpRightIcon from "./ArrowUpRightIcon.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputStyle = {
    background: "#161616",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "16px 20px",
    color: "#F0EDE8",
    fontSize: 14,
    fontFamily: "DM Sans, sans-serif",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
  };

  return (
    <section id="contact" style={{ padding: "128px 24px", background: "#080808" }}>
      <motion.div
        variants={container}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: 1024, margin: "0 auto" }}
      >
        <motion.div
          variants={item}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(200,255,0,0.4)",
          }}
        >
          <span
            className="kivv-pulse"
            style={{
              position: "relative",
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
          <span
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(240,237,232,0.8)",
            }}
          >
            Available for new projects
          </span>
        </motion.div>

        <motion.h2
          variants={item}
          style={{
            marginTop: 32,
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            lineHeight: 1.05,
            fontSize: "clamp(40px, 7vw, 88px)",
            color: "#F0EDE8",
          }}
        >
          Let's work <span style={{ color: "#C8FF00" }}>together.</span>
        </motion.h2>

        <motion.p
          variants={item}
          style={{ marginTop: 24, color: "#888888", fontSize: 18, maxWidth: 576, marginBottom: 0 }}
        >
          Tell me about your project. Most replies within 24 hours.
        </motion.p>

        <div
          style={{
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <motion.a
            variants={item}
            whileHover={{ x: 4 }}
            href="https://www.instagram.com/kivv.edits/"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#161616",
              padding: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "#F0EDE8",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#888888",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                Instagram
              </p>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  margin: 0,
                }}
              >
                @kivv.edits
              </p>
            </div>
            <ArrowUpRightIcon size={20} color="#C8FF00" />
          </motion.a>
          <motion.a
            variants={item}
            whileHover={{ x: 4 }}
            href="https://wa.me/213558041185"
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#161616",
              padding: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              textDecoration: "none",
              color: "#F0EDE8",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#888888",
                  marginBottom: 8,
                  marginTop: 0,
                }}
              >
                WhatsApp
              </p>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(16px, 4.5vw, 20px)",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                +213 558 041 185
              </p>
            </div>
            <ArrowUpRightIcon size={20} color="#C8FF00" />
          </motion.a>
        </div>

        <motion.form
          variants={item}
          onSubmit={submit}
          style={{ marginTop: 48, display: "grid", gap: 16, maxWidth: 672 }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            <input required type="text" placeholder="Your name" style={inputStyle} />
            <input required type="email" placeholder="Email" style={inputStyle} />
          </div>
          <textarea
            required
            rows={5}
            placeholder="Tell me about the project…"
            style={{ ...inputStyle, resize: "none" }}
          />
          <button
            type="submit"
            style={{
              justifySelf: "start",
              padding: "16px 32px",
              background: "#C8FF00",
              color: "#000",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.05em",
              border: "none",
              cursor: "pointer",
            }}
          >
            {sent ? "Message sent" : "Send message"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}
