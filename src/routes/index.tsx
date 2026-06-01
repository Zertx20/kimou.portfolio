import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import Services from "@/components/Services.jsx";
import Portfolio from "@/components/Portfolio.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";
import Lightbox from "@/components/Lightbox.jsx";
import AllProjectsDrawer from "@/components/AllProjectsDrawer.jsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  /* Keep body scroll in sync — always unlock when no overlay is open */
  useEffect(() => {
    const lockScroll = drawerOpen || activeVideo || active;
    document.body.style.overflow = lockScroll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen, activeVideo, active]);

  return (
    <main
      style={{
        background: "#080808",
        color: "#F0EDE8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Hero onOpen={setActive} paused={!!active} />
      <About />
      <Services />
      <Portfolio onOpenDrawer={() => setDrawerOpen(true)} />
      <Contact />
      <Footer />
      <Lightbox project={active} onClose={() => setActive(null)} />
      <AllProjectsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onVideoSelect={(video) => setActiveVideo(video)}
      />
      <Lightbox project={activeVideo} onClose={() => setActiveVideo(null)} />
    </main>
  );
}
