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
  overlayBottomClassName = "bottom-32",
  overlayClassName = "",
}: ImageTextCTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
          src={imageSrc}
          alt={imageAlt}
          className="block w-full"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      </MediaWithFade>

      <div
        className={`absolute inset-x-0 z-20 flex justify-center pb-14 ${overlayBottomClassName} ${overlayClassName}`}
      >
        <div className="w-full max-w-8xl px-16">
          <div
            className={`mx-auto max-w-8xl space-y-10 px-8 py-8 ${
              contentAlign === "left"
                ? "text-left"
                : contentAlign === "right"
                ? "text-right"
                : "text-center"
            }`}
          >
            <h2
              ref={titleRef}
              className={`text-6xl font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_3px_10px_rgba(0,0,0,0.7)] transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 text-2xl leading-7 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">{description}</p>
            {resolvedButtons.length > 0 && (
              <div
                className={`mt-6 flex flex-wrap gap-4 ${
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
                      rounded-lg px-7 py-3 text-2xl font-semibold text-white
                      [text-shadow:0_2px_6px_rgba(0,0,0,0.75)]
                      border border-white
                      bg-transparent
                      transition duration-300
                      hover:-translate-y-0.5
                      hover:border-blue-200
                      hover:shadow-[0_0_10px_rgba(59,130,246,0.35)]
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
