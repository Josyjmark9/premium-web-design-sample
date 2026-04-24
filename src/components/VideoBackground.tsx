import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  desaturated?: boolean;
}

export function VideoBackground({ src, poster, className = "", desaturated = false }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    if (videoRef.current) {
      const video = videoRef.current;
      
      const playVideo = () => {
        video.play().catch(error => {
          console.warn("Autoplay was prevented:", error);
        });
      };

      if (src.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, playVideo);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src;
          video.addEventListener('loadedmetadata', playVideo);
        }
      } else {
        video.src = src;
        video.addEventListener('loadedmetadata', playVideo);
      }
    }
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      onLoadedData={(e) => e.currentTarget.play()}
      poster={poster}
      className={`w-full h-full object-cover transition-all duration-700 ${desaturated ? 'saturate-0' : ''} ${className}`}
    />
  );
}
