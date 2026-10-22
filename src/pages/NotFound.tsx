import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080B10] px-4 text-[#F4F6FA]">
      <div className="max-w-md rounded-2xl border border-white/[0.08] bg-[#10151D] p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D8DFF]">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#F4F6FA]">
          Route Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#A4ADBB]">
          The requested path <code className="font-mono text-xs text-[#F4F6FA]">{location.pathname}</code> does not exist in this portfolio.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#4D8DFF] px-5 py-2.5 text-sm font-medium text-[#080B10] transition-colors hover:bg-[#629BFF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
