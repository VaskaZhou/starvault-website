'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MediaWithFade from "./MediaWithFade";

type ImageTextCTASectionProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonHref?: string;
  buttons?: Array<{
    label: string;
    href: string;
  }>;
  topFade?: boolean;
  bottomFade?: boolean;
  contentAlign?: "left" | "center" | "right";
  overlayBottomClassName?: string;
  overlayClassName?: string;
};

export default function ImageTextCTASection({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonLabel,
  buttonHref,
  buttons = [],
  topFade = true,
  bottomFade = true,
  contentAlign = "center",
  overlayBottomClassName = "bottom-0 sm:bottom-0 lg:bottom-32",
  overlayClassName = "",
}: ImageTextCTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isImageLoaded) return;

    let observer: IntersectionObserver | undefined;
    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        const node = titleRef.current;
        if (!node) return;

        observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer?.disconnect();
            }
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -8% 0px",
          }
        );

        observer.observe(node);
      });
    }, 120);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [isImageLoaded]);

  const resolvedButtons =
    buttons.length > 0
      ? buttons
      : buttonLabel && buttonHref
      ? [{ label: buttonLabel, href: buttonHref }]
      : [];

  return (
    <section className="relative mt-0">
      <MediaWithFade topFade={topFade} bottomFade={bottomFade}>
        <img
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          className="block w-full"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      </MediaWithFade>

      <div
        className={`absolute inset-x-0 z-20 flex justify-center pb-6 ${overlayBottomClassName} ${overlayClassName}`}
      >
        <div className="w-full max-w-8xl px-3 sm:px-10 lg:px-16">
          <div
            className={`mx-auto max-w-8xl space-y-0 px-4 py-0 sm:space-y-8 sm:px-6 sm:py-6 lg:space-y-10 lg:px-8 lg:py-8 ${
              contentAlign === "left"
                ? "text-left"
                : contentAlign === "right"
                ? "text-right"
                : "text-center"
            } ${isImageLoaded ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <h2
              ref={titleRef}
              className={`text-lg font-semibold uppercase leading-tight tracking-[0.12em] text-white [text-shadow:0_3px_10px_rgba(0,0,0,0.7)] transition-all duration-1000 sm:text-5xl sm:tracking-[0.18em] lg:text-6xl lg:tracking-[0.22em] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {title}
            </h2>
            <p className="mt-2 text-sm leading-4 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] sm:mt-4 sm:text-xl sm:leading-7 lg:text-2xl">{description}</p>
            {resolvedButtons.length > 0 && (
              <div
                className={`mt-3 flex flex-wrap gap-3 sm:mt-6 sm:gap-4 ${
                  contentAlign === "left"
                    ? "justify-start"
                    : contentAlign === "right"
                    ? "justify-end"
                    : "justify-center"
                }`}
              >
                {resolvedButtons.map((button) => (
                  <Link
                    key={`${button.label}-${button.href}`}
                    href={button.href}
                    className="
                      inline-flex items-center justify-center
                      rounded-lg px-4 py-2 text-sm font-semibold text-white
                      [text-shadow:0_2px_6px_rgba(0,0,0,0.75)]
                      border border-white
                      bg-transparent
                      transition duration-300
                      hover:-translate-y-0.5
                      hover:border-blue-200
                      hover:shadow-[0_0_10px_rgba(59,130,246,0.35)]
                      sm:px-6 sm:py-2.5 sm:text-xl lg:px-7 lg:py-3 lg:text-2xl
                    "
                  >
                    {button.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
