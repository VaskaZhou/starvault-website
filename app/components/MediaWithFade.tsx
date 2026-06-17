type MediaWithFadeProps = {
  children: React.ReactNode;
  topFade?: boolean;
  bottomFade?: boolean;
  topFadeHeight?: string;
  bottomFadeHeight?: string;
};

export default function MediaWithFade({
  children,
  topFade = false,
  bottomFade = false,
  topFadeHeight = "h-[400px]",
  bottomFadeHeight = "h-[400px]",
}: MediaWithFadeProps) {
  return (
    <div className="relative overflow-hidden rounded-none">
      {children}

      {topFade && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 ${topFadeHeight} bg-gradient-to-b from-[var(--background)] via-[var(--background)]/60 to-transparent`}
        />
      )}

      {bottomFade && (
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 ${bottomFadeHeight} bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent`}
        />
      )}
    </div>
  );
}
