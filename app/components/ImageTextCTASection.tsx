'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MediaWithFade from "./MediaWithFade";

type ImageTextCTASectionProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  topFade?: boolean;
  bottomFade?: boolean;
  overlayClassName?: string;
};

export default function ImageTextCTASection({
  imageSrc,
  imageAlt,
  title,
  description,
  buttonLabel,
  buttonHref,
  topFade = true,
  bottomFade = true,
  overlayClassName = "",
}: ImageTextCTASectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      requestAnimationFrame(() => {
        const node = titleRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          {
            threshold: 0.2,
            rootMargin: "0px 0px -8% 0px",
          }
        );

        observer.observe(node);
      });
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative mt-8">
      <MediaWithFade topFade={topFade} bottomFade={bottomFade}>
        <img src={imageSrc} alt={imageAlt} className="block w-full" />
      </MediaWithFade>

      <div className={`absolute inset-x-0 bottom-0 z-20 flex justify-center pb-14 ${overlayClassName}`}>
        <div className="w-full max-w-8xl px-6">
          <div className="mx-auto max-w-8xl px-8 py-8 text-center space-y-10">
            <h2
              ref={titleRef}
              className={`text-6xl font-semibold uppercase tracking-[0.22em] text-white transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              {title}
            </h2>
            <p className="mt-4 text-2xl leading-7 text-white">{description}</p>
            <Link
              href={buttonHref}
              className="
                mt-6 inline-flex items-center justify-center
                rounded-lg px-7 py-3 text-2xl font-semibold text-white
                border border-white
                bg-transparent
                transition duration-300
                hover:-translate-y-0.5
                hover:border-blue-200
                hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]
              "
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
