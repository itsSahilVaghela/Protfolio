import React, { useState } from "react";
import { Maximize2, ExternalLink, Loader2 } from "lucide-react";

interface CustomVideoPlayerProps {
  url: string;
  title: string;
  posterSrc?: string | null;
  onOpenDrive?: () => void;
}

export const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  url,
  title,
  posterSrc,
  onOpenDrive,
}) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);

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

  return (
    <div className="space-y-3">
      {/* Precision Video Stage: Pixel-perfect mobile height and 56px header crop */}
      <div className="relative w-full h-[260px] xs:h-[300px] sm:h-auto sm:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#1E2736] shadow-2xl">
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
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center bg-[#080B10]/85 backdrop-blur-sm transition-opacity">
            <div className="w-10 h-10 rounded-full bg-[#151C27] border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF] shadow-xl">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
            <p className="mt-2 text-xs font-mono text-[#A4ADBB]">
              Initializing HD Video Stage...
            </p>
          </div>
        )}

        {/* Layer 2: Embedded Video Player (Cropped 56px to eliminate top gap & align center) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={`${title} Video Demo`}
            onLoad={() => setIsIframeLoaded(true)}
            className="absolute left-0 w-full border-0"
            style={
              isYouTube
                ? { top: 0, height: "100%" }
                : {
                    top: "-56px",
                    height: "calc(100% + 56px)",
                  }
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        </div>
      </div>

      {/* Layer 3: Bottom Control & Fullscreen Playback Bar */}
      <div className="flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-[#0C1017] border border-[#1E2736]">
        <div className="flex items-center gap-2 min-w-0 pr-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <span className="text-xs font-mono text-[#F4F6FA] truncate font-medium">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={nativePlayerUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#4D8DFF] text-[#080B10] hover:bg-[#629BFF] active:scale-95 transition-all shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Fullscreen (Native Scrubber ↗)</span>
            <span className="xs:hidden">Fullscreen ↗</span>
          </a>

          {driveFileId && (
            <a
              href={`https://drive.google.com/file/d/${driveFileId}/view`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#89B2FF] bg-[#151C27] border border-[#4D8DFF]/30 hover:bg-[#4D8DFF]/15 active:scale-95 transition-all"
              title="Open in Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Drive</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
