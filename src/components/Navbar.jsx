import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-black/80 backdrop-blur border-b border-[var(--color-border)]">
        <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a
            href="#top"
            onClick={go("#top")}
            className="font-syne font-extrabold text-2xl tracking-tight text-accent"
          >
            KIVV
          </a>
          <ul className="hidden md:flex items-center gap-10 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={go(l.href)}
                  className="text-text/80 hover:text-accent transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="block w-6 h-px bg-text" />
            <span className="block w-6 h-px bg-text" />
            <span className="block w-4 h-px bg-text ml-auto" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-bg md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--color-border)]">
              <span className="font-syne font-extrabold text-2xl text-accent">KIVV</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-text text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <ul className="flex-1 flex flex-col items-center justify-center gap-10">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.08 }}
                >
                  <a
                    href={l.href}
                    onClick={go(l.href)}
                    className="font-syne font-extrabold text-5xl text-text hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
