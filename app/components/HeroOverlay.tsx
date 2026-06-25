type HeroOverlayProps = {
  title: string;
  buttons?: Array<{
    label: string;
    href: string;
    target?: string;
    rel?: string;
    className?: string;
  }>;
};

export default function HeroOverlay({
  title,
  buttons = [],
}: HeroOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center mb-0 sm:mb-8 lg:mb-28">
      <div className="max-w-6xl pl-4 sm:pl-16 md:pl-24 animate-[fadeInLeft_1.9s_ease-out_1.1s_forwards] opacity-0">
        <div className="">
          <h1 className="max-w-4xl text-xl font-semibold uppercase leading-tight tracking-[0.1em] text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.8)] sm:text-3xl sm:tracking-[0.15em] lg:text-4xl lg:tracking-[0.18em]">
            {title}
          </h1>
        </div>

        {buttons.length > 0 && (
          <div className="mt-4 flex flex-row gap-3 sm:mt-8 sm:gap-5">
            {buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                target={button.target}
                rel={button.rel}
                className={[
                  `inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-medium transition duration-300 shadow-[0_0_18px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm`,
                  button.className ??
                    "border border-white/80 bg-black/25 text-white hover:border-white hover:bg-black/45",
                ].join(" ")}
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
