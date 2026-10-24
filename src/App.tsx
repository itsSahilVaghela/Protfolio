import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer = setTimeout(scrollToTarget, 150);
        return () => clearTimeout(timer);
      }
    } else if (pathname === "/contact") {
      const scrollToContact = () => {
        const el = document.getElementById("contact");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!scrollToContact()) {
        const timer = setTimeout(scrollToContact, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const basename =
  typeof window !== "undefined" && window.location.pathname.startsWith("/Protfolio")
    ? "/Protfolio"
    : "";

const App = () => (
  <BrowserRouter basename={basename}>
    <ScrollToTop />
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/contact" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast renderer */}
      <Toaster />
    </>
  </BrowserRouter>
);

export default App;
