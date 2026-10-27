import React, { useEffect, useRef, useState } from "react";
import { Maximize2, ExternalLink, Loader2 } from "lucide-react";

interface CustomVideoPlayerProps {
  url: string;
  title: string;
  posterSrc?: string | null;
  onOpenDrive?: () => void;
  /** Shape of the recorded video. Default "landscape" (16:9). */
  aspect?: "landscape" | "portrait";
}

/**
 * Drive preview iframe has a ~56px header on wide screens.
 * On narrow (phone portrait) layouts the header is different, so crop is tunable per size.
 * If video top still clipped on phone, keep MOBILE at 0. If Drive header still visible, raise it (try 40-48).
 */
const DESKTOP_CROP_PX = 56;
const MOBILE_CROP_PX = 0;

function useIsWide(query = "(min-width: 640px)") {
  const [wide, setWide] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : true
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setWide(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return wide;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  url,
  title,
  posterSrc,
  onOpenDrive,
  aspect = "landscape",
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const isWide = useIsWide();

  // Extract Google Drive File ID
  const getDriveFileId = (inputUrl?: string) => {
    if (!inputUrl) return null;
    const match =
      inputUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
      inputUrl.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
  const driveFileId = getDriveFileId(url);

  let embedUrl = url;
  let nativePlayerUrl = url;

  if (isYouTube) {
    const ytMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]+)/
    );
    embedUrl = ytMatch
      ? `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&autoplay=0`
      : url;
  } else if (driveFileId) {
    embedUrl = `https://drive.google.com/file/d/${driveFileId}/preview`;
    nativePlayerUrl = `https://drive.google.com/file/d/${driveFileId}/view`;
  }

  // Reset loader when switching walkthrough video
  useEffect(() => {
    setIsIframeLoaded(false);
  }, [embedUrl]);

  // Track fullscreen state, release orientation lock on exit
  useEffect(() => {
    const onChange = () => {
      const fs = document.fullscreenElement === stageRef.current;
      setIsFullscreen(fs);
      if (!fs) {
        try {
          (screen.orientation as any)?.unlock?.();
        } catch {
          /* unsupported */
        }
      }
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Fullscreen the stage itself. On phones in portrait, rotate to landscape where supported.
  // iPhone Safari has no element fullscreen -> fall back to native player in new tab.
  const goFullscreen = async () => {
    const el = stageRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => void })
      | null;
    try {
      if (el?.requestFullscreen) {
        await el.requestFullscreen();
        if (aspect === "landscape") {
          try {
            await (screen.orientation as any)?.lock?.("landscape");
          } catch {
            /* lock unsupported or denied */
          }
        }
        return;
      }
      if (el?.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
        return;
      }
    } catch {
      /* fall through */
    }
    window.open(nativePlayerUrl, "_blank", "noreferrer");
  };

  const cropPx = isYouTube ? 0 : isWide ? DESKTOP_CROP_PX : MOBILE_CROP_PX;

  const stageShape =
    aspect === "portrait"
      ? "aspect-[9/16] max-h-[70dvh] mx-auto"
      : "aspect-[4/3] xs:aspect-[16/11] landscape:aspect-video sm:aspect-video";

  return (
    <div className="space-y-3 w-full min-w-0">
      {/* Stage: ratio-driven (no fixed px height) so it fits any phone width */}
      <div
        ref={stageRef}
        className={`relative w-full ${stageShape} rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#1E2736] shadow-2xl ${
          isFullscreen ? "!aspect-auto !h-full !max-h-none !rounded-none !border-0" : ""
        }`}
      >
        {/* Layer 0: Poster Backdrop */}
        {posterSrc && !isIframeLoaded && (
          <img
            src={posterSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-sm opacity-25 scale-105 pointer-events-none"
          />
        )}

        {/* Layer 1: Loading State */}
        {!isIframeLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-[#080B10]/85 backdrop-blur-sm transition-opacity pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-[#151C27] border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF] shadow-xl">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <p className="mt-2 text-xs font-mono text-[#A4ADBB]">
              Initializing HD Video Stage...
            </p>
          </div>
        )}

        {/* Layer 2: Embedded Video Player */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={`${title} Video Demo`}
            onLoad={() => setIsIframeLoaded(true)}
            className="absolute left-0 w-full border-0"
            style={{
              top: cropPx ? `-${cropPx}px` : 0,
              height: cropPx ? `calc(100% + ${cropPx}px)` : "100%",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Layer 3: Control bar. Stacks on phone portrait, row on sm+ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#0C1017] border border-[#1E2736]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-xs font-mono text-[#F4F6FA] truncate font-medium">
            {title}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={goFullscreen}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-mono font-medium bg-[#4D8DFF] text-[#080B10] hover:bg-[#629BFF] active:scale-95 transition-all shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>

          <a
            href={nativePlayerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-mono text-[#89B2FF] bg-[#151C27] border border-[#4D8DFF]/30 hover:bg-[#4D8DFF]/15 active:scale-95 transition-all"
            title={driveFileId ? "Open in Google Drive" : "Open original"}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{driveFileId ? "Drive" : "Open"}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
