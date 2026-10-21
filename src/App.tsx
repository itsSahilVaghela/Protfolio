import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import FictionMechCaseStudy from "./pages/FictionMechCaseStudy";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <BrowserRouter basename="/Protfolio">
    <ScrollToTop />
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project/fiction-mech" element={<FictionMechCaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast renderer */}
      <Toaster />
    </>
  </BrowserRouter>
);

export default App;
