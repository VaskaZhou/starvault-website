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
    <div className="absolute inset-0 z-10 flex items-center mb-30">
      <div className="max-w-6xl pl-4 sm:pl-16 md:pl-24 animate-[fadeInLeft_1.9s_ease-out_1.1s_forwards] opacity-0">
        <div className="">
          <h1 className="max-w-4xl text-4xl font-semibold uppercase leading-tight tracking-[0.18em] text-white drop-shadow-[0_0_18px_rgba(0,0,0,0.8)]">
            {title}
          </h1>
        </div>

        {buttons.length > 0 && (
          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            {buttons.map((button, index) => (
              <a
                key={button.label}
                href={button.href}
                target={button.target}
                rel={button.rel}
                className={[
                  `inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition duration-300 shadow-[0_0_18px_rgba(0,0,0,0.55)] backdrop-blur-sm`,
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
