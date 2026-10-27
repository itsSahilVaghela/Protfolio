import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);

  // Extract Google Drive File ID
  const getDriveFileId = (inputUrl?: string) => {
    if (!inputUrl) return null;
    const match =
      inputUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
      inputUrl.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const fileId = getDriveFileId(url);
  const directStreamUrl = fileId
    ? `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`
    : url;

  const iframePreviewUrl = fileId
    ? `https://drive.google.com/file/d/${fileId}/preview`
    : url;

  // Reset states on URL change
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setHasError(false);
    setUseIframeFallback(false);
    setShowControls(true);
  }, [url]);

  // Handle controls auto-hide during playback
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => {
        setIsPlaying(true);
        resetControlsTimeout();
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds <= 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Render iframe fallback if requested or if direct stream fails
  if (useIframeFallback) {
    return (
      <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#1E2736] shadow-2xl">
        <iframe
          src={iframePreviewUrl}
          title={`${title} Video Demo`}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
        <button
          type="button"
          onClick={() => setUseIframeFallback(false)}
          className="absolute top-2 right-2 z-30 px-2 py-1 rounded bg-[#080B10]/80 border border-[#1E2736] text-[10px] font-mono text-[#A4ADBB] hover:text-[#F4F6FA] hover:bg-[#151C27] transition-all"
        >
          Use Native Player
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      onTouchStart={resetControlsTimeout}
      className="group relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#1E2736] shadow-2xl select-none"
    >
      {/* Layer 0: Poster Image (Fades out when playing) */}
      {posterSrc && !isPlaying && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-sm opacity-25 scale-105 pointer-events-none transition-opacity duration-300"
        />
      )}

      {/* Layer 1: Native HTML5 Video Element - Aligned pixel-perfect from top-left (0,0) */}
      <video
        ref={videoRef}
        src={directStreamUrl}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setUseIframeFallback(true);
        }}
        className="absolute inset-0 w-full h-full object-contain bg-black cursor-pointer"
      />

      {/* Layer 2: Buffering Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px] transition-opacity">
          <div className="w-10 h-10 rounded-full bg-[#151C27]/90 border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF] shadow-xl">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <span className="mt-2 text-[11px] font-mono text-[#A4ADBB] tracking-wider uppercase">
            Buffering HD Stream...
          </span>
        </div>
      )}

      {/* Layer 3: Dead-Center Play/Pause HUD Button */}
      <div
        onClick={togglePlay}
        className={`absolute inset-0 z-25 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${
          showControls || !isPlaying
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#10151D]/80 hover:bg-[#151C27] active:scale-95 text-[#F4F6FA] border border-[#4D8DFF]/40 flex items-center justify-center backdrop-blur-md shadow-2xl transition-all group-hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-current text-[#4D8DFF]" />
          ) : (
            <Play className="w-6 h-6 fill-current text-[#4D8DFF] ml-0.5" />
          )}
        </button>
      </div>

      {/* Layer 4: Modern Bottom Playback Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-col gap-1.5 transition-opacity duration-300 ${
          showControls || !isPlaying
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Interactive Seek Bar */}
        <div className="relative w-full flex items-center group/seek">
          {/* Track Background */}
          <div className="w-full h-1.5 sm:h-2 rounded-full bg-[#1E2736] overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#4D8DFF] to-[#89B2FF] rounded-full transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Real Range Input */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek Video"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Control Buttons & Timestamp Row */}
        <div className="flex items-center justify-between text-[#F4F6FA] text-xs font-mono pt-1">
          {/* Left: Play/Pause & Timestamp */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1 rounded text-[#F4F6FA] hover:text-[#4D8DFF] active:scale-95 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                  setIsPlaying(true);
                }
              }}
              className="p-1 rounded text-[#778294] hover:text-[#F4F6FA] active:scale-95 transition-colors"
              title="Restart"
              aria-label="Restart Video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <span className="text-[11px] text-[#A4ADBB]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: Audio, Fullscreen, External */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 rounded text-[#A4ADBB] hover:text-[#F4F6FA] active:scale-95 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-amber-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1 rounded text-[#A4ADBB] hover:text-[#4D8DFF] active:scale-95 transition-colors"
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {onOpenDrive && (
              <button
                type="button"
                onClick={onOpenDrive}
                className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#151C27] text-[#89B2FF] border border-[#4D8DFF]/30 hover:bg-[#4D8DFF]/20 active:scale-95 transition-colors"
                title="Open in Drive"
              >
                <span>Drive</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
