"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/use-prefers-reduced-motion";

/*
  Gated on config rather than on a load error: a missing file leaves the element
  stuck in NETWORK_LOADING rather than firing `error`, so the visitor would sit
  looking at an empty box with nothing to tell them why.
*/
const VIDEO_SRC = process.env.NEXT_PUBLIC_VIDEO_URL ?? "";
const POSTER_SRC = process.env.NEXT_PUBLIC_VIDEO_POSTER_URL ?? "";
const CAPTIONS_SRC = process.env.NEXT_PUBLIC_VIDEO_CAPTIONS_URL ?? "";

/** iOS Safari can't fullscreen a container — only the video element itself. */
type VideoWithIosFullscreen = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

function formatTime(seconds: number): string {
  // duration is NaN until metadata lands, and Infinity for live streams.
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

/** Screen readers announce a raw range value of `64` as "64", with no unit. */
function spokenTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0 seconds";
  const whole = Math.floor(seconds);
  const minutes = Math.floor(whole / 60);
  const secs = whole % 60;
  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  parts.push(`${secs} second${secs === 1 ? "" : "s"}`);
  return parts.join(" ");
}

const ICON = {
  play: "M8 5v14l11-7z",
  pause: "M6 5h4v14H6zm8 0h4v14h-4z",
  replay:
    "M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z",
  fullscreen:
    "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z",
} as const;

function Icon({ path }: { path: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5"
    >
      <path d={path} />
    </svg>
  );
}

/**
 * The VSL player. Muted autoplay with a full brand-styled control bar.
 *
 * Controls sit below the video rather than over it: an overlaid bar needs a
 * scrim to stay legible against arbitrary frames, and a scrim is a gradient,
 * which the brand rules out. On solid panel grey, lime hits 13.1:1 and
 * paper/70 hits 7.4:1 with no scrim at all.
 */
export function MechanismVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [sourceFailed, setSourceFailed] = useState(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    // Someone who asked for less motion shouldn't get a video moving at them
    // unprompted — leave the first frame up and let them press play.
    if (!video || prefersReducedMotion) return;

    // Autoplay can still be refused (low power mode, data saver). No fallback
    // needed: the video stays paused and the centre play button is already there.
    video.play().catch(() => undefined);
  }, [prefersReducedMotion]);

  /**
   * Re-reads the element's own state.
   *
   * Media events can fire before React hydrates and attaches its handlers: with
   * preload="metadata" the browser starts fetching as soon as the HTML parses,
   * while the JS bundle is still downloading, so on a server-rendered page
   * `loadedmetadata` is regularly missed outright. When that happens `duration`
   * stays 0, which sets the scrubber's `max` to 0 and leaves the timeline
   * physically unable to move — seeking looks broken while the video plays fine.
   *
   * Reading the element on every event that could carry a duration heals it from
   * whichever one lands first. The functional updaters bail out when nothing has
   * changed, so the frequent callers cost no extra renders.
   */
  function syncFromVideo(video: HTMLVideoElement) {
    setDuration((previous) =>
      Number.isFinite(video.duration) && video.duration !== previous
        ? video.duration
        : previous,
    );
    setIsPlaying((previous) =>
      previous === !video.paused ? previous : !video.paused,
    );
    setIsMuted((previous) =>
      previous === video.muted ? previous : video.muted,
    );
  }

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    // play() on an ended element seeks back to the start itself, so this
    // doubles as replay.
    if (video.paused || video.ended) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    // Unmuting is a deliberate "I want this" — make sure it's actually running.
    if (!nextMuted && video.paused) {
      void video.play().catch(() => undefined);
    }
  }

  function seekTo(seconds: number) {
    const video = videoRef.current;
    setCurrentTime(seconds);
    if (video) video.currentTime = seconds;
  }

  function toggleFullscreen() {
    const container = containerRef.current;
    const video = videoRef.current as VideoWithIosFullscreen | null;

    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined);
    } else if (container?.requestFullscreen) {
      void container.requestFullscreen().catch(() => undefined);
    } else if (video?.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  }

  if (!VIDEO_SRC || sourceFailed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-conduit/60 px-6 text-center">
        <div>
          <p className="font-display text-lg font-bold text-paper">
            Video goes here
          </p>
          <p className="mt-3 text-base text-paper/70">
            Set NEXT_PUBLIC_VIDEO_URL in .env.local.
          </p>
        </div>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} className="overflow-hidden rounded-lg bg-panel">
      <div className="relative">
        <video
          ref={videoRef}
          className="block aspect-video w-full"
          poster={POSTER_SRC || undefined}
          preload="metadata"
          muted
          playsInline
          onPlay={(event) => {
            setHasEnded(false);
            syncFromVideo(event.currentTarget);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasEnded(true);
          }}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            syncFromVideo(video);
            // Skipped mid-drag, or the thumb snaps back to the playhead.
            if (!isScrubbing) setCurrentTime(video.currentTime);
          }}
          onLoadedMetadata={(event) => syncFromVideo(event.currentTarget)}
          onDurationChange={(event) => syncFromVideo(event.currentTarget)}
          onLoadedData={(event) => syncFromVideo(event.currentTarget)}
          onCanPlay={(event) => syncFromVideo(event.currentTarget)}
          onProgress={(event) => syncFromVideo(event.currentTarget)}
          onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
          onError={() => setSourceFailed(true)}
        >
          <source
            src={VIDEO_SRC}
            type="video/mp4"
            onError={() => setSourceFailed(true)}
          />
          {/* TODO: captions unset. When the VTT exists the <video> also needs
              crossOrigin="anonymous" — the media is on a different origin and
              cross-origin text tracks are blocked without it. */}
          {CAPTIONS_SRC && (
            <track
              kind="captions"
              src={CAPTIONS_SRC}
              srcLang="en"
              label="English"
              default
            />
          )}
          Your browser can&rsquo;t play this video.
        </video>

        {/* Click-the-video-to-pause is the convention people expect. Hidden from
            assistive tech and the tab order because the control bar below holds
            the real, labelled play/pause button — this is a mouse convenience,
            not a second control. */}
        <button
          type="button"
          onClick={togglePlay}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 flex cursor-pointer items-center justify-center"
        >
          {!isPlaying && (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dark/90 text-lime">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-8 w-8"
              >
                <path d={hasEnded ? ICON.replay : ICON.play} />
              </svg>
            </span>
          )}
        </button>
      </div>

      <div className="px-3 pb-3">
        {/* A real range input: keyboard seeking (arrows, Home/End) and screen
            reader semantics come free. The row is 44px for thumbs on a phone
            even though the visible track is thin. */}
        <div className="relative flex h-11 items-center">
          {/* Inset by half the thumb width: the thumb's centre travels from 8px
              to width-8px, so a full-bleed track would drift from it at both
              ends. Fill is nested so its percentage resolves against the same
              inset box. */}
          <div className="pointer-events-none absolute inset-x-2 h-1.5 overflow-hidden rounded-full bg-paper/25">
            <div className="h-full bg-lime" style={{ width: `${progress}%` }} />
          </div>
          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 0}
            step={0.01}
            value={currentTime}
            onChange={(event) => seekTo(Number(event.target.value))}
            onPointerDown={() => setIsScrubbing(true)}
            onPointerUp={() => setIsScrubbing(false)}
            // A drag that ends off the element, or is interrupted by a system
            // gesture, never fires pointerup here — without these the flag stays
            // stuck on and the bar freezes for the rest of playback.
            onPointerCancel={() => setIsScrubbing(false)}
            onLostPointerCapture={() => setIsScrubbing(false)}
            onKeyDown={() => setIsScrubbing(true)}
            onKeyUp={() => setIsScrubbing(false)}
            onBlur={() => setIsScrubbing(false)}
            aria-label="Seek"
            aria-valuetext={`${spokenTime(currentTime)} of ${spokenTime(duration)}`}
            /* No gradient fill on the track — the two-tone bar is the layered
               divs above, so this input draws nothing but its thumb. */
            className="relative h-11 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-lime [&::-moz-range-track]:bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-lime"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : hasEnded ? "Replay" : "Play"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-lime"
          >
            <Icon
              path={isPlaying ? ICON.pause : hasEnded ? ICON.replay : ICON.play}
            />
          </button>

          {/* Body font, not Anton — BRAND.md reserves Anton for proof numbers. */}
          <p className="font-body text-sm tabular-nums text-paper/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex min-h-11 items-center rounded-md px-3 font-display text-sm font-bold whitespace-nowrap text-lime"
            >
              {isMuted ? "Enable sound" : "Mute"}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-paper/70"
            >
              <Icon path={ICON.fullscreen} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
