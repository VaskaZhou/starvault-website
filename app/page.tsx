'use client';

import { useEffect, useRef } from "react";
import HeroOverlay from "./components/HeroOverlay";
import ImageTextCTASection from "./components/ImageTextCTASection";
import MediaWithFade from "./components/MediaWithFade";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let retryTimer: number | undefined;

    const attemptPlay = () => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          retryTimer = window.setTimeout(() => {
            attemptPlay();
          }, 300);
        });
      }
    };

    const handleReady = () => {
      attemptPlay();
    };

    retryTimer = window.setTimeout(() => {
      handleReady();
    }, 300);

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer);
      }
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
    };
  }, []);

  return (
    <main className="flex w-full flex-1 flex-col justify-center px-0 py-0">
      <section className="w-full space-y-2">
        <div className="relative">
          <MediaWithFade topFade={false} bottomFade={true} bottomFadeHeight="h-[800px]">
            <video
              ref={videoRef}
              className="block w-full"
              src="https://storage.googleapis.com/videos4web/SVTrailer2026.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </MediaWithFade>

          <HeroOverlay
            title="THE FIRST FULL-SCALE VR MOBA ON META QUEST"
            buttons={[
              {
                label: "Play Free Now",
                href: "https://www.meta.com/experiences/starvault/7535945739825988/?click_session_id=2398449090643742&utm_source=www.starvaultvr.com&utm_medium=oculusredirect",
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "text-xl border border-white/80 bg-black/25 text-white shadow-[0_0_18px_rgba(0,0,0,0.45)] hover:bg-white hover:text-black",
              },
              {
                label: "Join Our Discord",
                href: "https://discord.com/invite/starvaultvr",
                target: "_blank",
                rel: "noopener noreferrer",
                className:
                  "text-xl border border-white/80 bg-black/25 text-white shadow-[0_0_18px_rgba(0,0,0,0.45)] hover:bg-white hover:text-black",
              },
            ]}
          />
        </div>

        <ImageTextCTASection
          imageSrc="/mainpage/image/TitanArena.jpg"
          imageAlt="Titan Arena"
          title="Calm Before the Chaos"
          description="Discover the latest tournament highlights, game updates, and the stories shaping the Starvault community."
          buttonLabel="See What's New"
          buttonHref="/news"
        />

        <ImageTextCTASection
          imageSrc="/mainpage/image/Heroes.png"
          imageAlt="Heroes"
          title="Who Will You Choose?"
          description="Choose your hero. Squad up. Push lanes. Farm creeps. Clear jungle camps. Upgrade your abilities mid-match. And dominate the map in intense 5v5 team fights."
          buttonLabel="View All Heroes"
          buttonHref="/heroes"
        />
      </section>
    </main>
  );
}
