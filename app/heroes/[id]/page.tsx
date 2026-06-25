"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import heroData from "@/public/herodata/herodata.json";

type Hero = {
  id: number;
  name: string;
  faction: string;
  class: string;
  story_short: string;
  story_long: string;
  stats: {
    attack_type: string;
    speed: number;
    armor: number;
    damage: number;
  };
  primary_attack: {
    name: string;
    description: string;
  };
  skills: Array<{
    name: string;
    description: string;
  }>;
  mastery: [string, string][];
};

function getHeroById(id: number): Hero | undefined {
  return (heroData.heroes as Hero[]).find((hero) => hero.id === id);
}

const classIconPaths: Record<string, string> = {
  Support: "/herodata/classicon/support.png",
  "Damage Dealer": "/herodata/classicon/damage.png",
  Tank: "/herodata/classicon/tank.png",
};

const attackIconPaths: Record<string, string> = {
  Energy: "/herodata/dmgicon/Energy.png",
  Arcane: "/herodata/dmgicon/Arcane.png",
  Explosive: "/herodata/dmgicon/Explosive.png",
};

function StatBar({
  label,
  value,
  activeColorClass,
}: {
  label: string;
  value: number;
  activeColorClass: string;
}) {
  const clampedValue = Math.max(0, Math.min(10, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/80">
        <span>{label}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 10 }, (_, index) => {
          const active = index < clampedValue;
          return (
            <span
              key={`${label}-${index}`}
              className={`h-4 w-6 -skew-x-[24deg] border border-white/20 ${
                active ? `${activeColorClass} border-transparent` : "bg-white/10"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function HeroDetailsPage() {
  const params = useParams<{ id: string }>();
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const heroId = Number(params.id);
  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  if (!Number.isFinite(heroId) || !hero) {
    return (
      <main className="min-h-[calc(100vh-73px)] bg-[#070b14] text-white">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 sm:px-10 lg:px-16">
          <h1 className="text-3xl font-semibold uppercase tracking-[0.18em]">Hero Not Found</h1>
          <Link href="/heroes" className="mt-6 inline-block text-blue-300 hover:text-blue-200">
            Back to Heroes
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#070b14] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-2 pt-20 sm:pt-32 sm:px-10 lg:px-16">
        

        <div className="relative overflow-x-clip mt-0 min-h-[640px]">
          <div className="relative left-1/2 w-[min(195vw,1500px)] -translate-x-1/2 overflow-hidden rounded-2xl md:absolute md:left-[70%] md:top-0 md:w-[min(85vw,1500px)]">
            <img
              src={`/herodata/heroportrait/${hero.id}.png`}
              alt={`${hero.name} portrait`}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative z-10 mt-[-120px] max-w-3xl space-y-6 py-2 lg:absolute lg:left-0 lg:top-2 lg:mt-0 lg:w-[58%]  animate-[fadeInLeft_0.9s_ease-out_1.1s_forwards] opacity-0">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] lg:tracking-[0.24em]">
              {hero.name}
            </h1>
            <h2 className="text-lg sm:text-2xl lg:text-3xl text-blue-300 font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] lg:tracking-[0.24em]">
              - {hero.faction} -
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              
              <div>
                <p className="text-white/60">Class</p>
                <div className="mt-1 flex items-center gap-2">
                  <img
                    src={classIconPaths[hero.class] ?? "/herodata/classicon/support.png"}
                    alt={`${hero.class} icon`}
                    className="h-6 w-6 object-contain"
                  />
                  <p className="text-sm sm:text-lg font-medium text-white">{hero.class}</p>
                </div>
              </div>
              <div>
                <p className="text-white/60">Attack Type</p>
                <div className="mt-1 flex items-center gap-2">
                  <img
                    src={attackIconPaths[hero.stats.attack_type] ?? "/herodata/dmgicon/Energy.png"}
                    alt={`${hero.stats.attack_type} icon`}
                    className="h-6 w-6 object-contain"
                  />
                  <p className="text-sm sm:text-lg font-medium text-white">{hero.stats.attack_type}</p>
                </div>
              </div>
            </div>

            

            <div>
              <p className="mt-3 text-sm sm:text-base leading-7 text-white/90">{hero.story_short}</p>
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(true)}
                className="mt-1 text-xs sm:text-sm font-medium text-blue-300 transition hover:text-blue-200"
              >
                Read Full Story
              </button>
            </div>
            <div className="mt-5">
            <p className="text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white/60">Primary Attack</p>
            <p className="mt-2 text-base sm:text-lg font-medium">{hero.primary_attack.name}</p>
            <p className="mt-1 text-sm sm:text-base text-white/85">{hero.primary_attack.description}</p>
          </div>
          </div>
        
        </div>

      </section>

      {/* ── Three-panel combat section — full viewport width ── */}
      <div className="mt-2 overflow-x-clip bg-gradient-to-br from-[#0d1a2e] via-[#0f1628] to-[#0a0f1e]">
        <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0 md:items-stretch">

            {/* Panel 2 — Mastery Tree */}
            <div className="flex flex-col items-center justify-center px-7 py-10">
              <div className="w-full max-w-xl space-y-4">
                {[...hero.mastery].reverse().map((pair, idx) => {
                  const level = idx === 0 ? 15 : idx === 1 ? 10 : 5;
                  return (
                    <div key={`mastery-${idx}`} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs sm:text-sm">
                      <span className="text-center text-[0.85rem] sm:text-[0.95rem] text-amber-100/95">{pair[0]}</span>
                      <span className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full border border-slate-600/70 bg-gradient-to-b from-slate-600 to-slate-800 text-base sm:text-lg font-bold text-amber-200 shadow-[0_0_10px_rgba(0,0,0,0.35)]">
                        {level}
                      </span>
                      <span className="text-center text-[0.85rem] sm:text-[0.95rem] text-amber-100/95">{pair[1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Panel 1 — Skills */}
            <div className="flex flex-col items-center justify-center px-7 py-10 w-full">
              <div className="grid w-full grid-cols-3 gap-3">
                {hero.skills.map((skill, index) => (
                  <div key={skill.name} className="group relative">
                    <button
                      type="button"
                      className="relative aspect-square w-full overflow-hidden rounded-xl ring-1 ring-white/10 transition group-hover:ring-white/40"
                      aria-label={skill.name}
                    >
                      <img
                        src={`/herodata/heroskills/${hero.id}/${index + 1}.png`}
                        alt={skill.name}
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <div className="pointer-events-none absolute left-1/2 top-[calc(100%+10px)] z-20 w-32 sm:w-64 -translate-x-1/2 rounded-xl border border-white/15 bg-[#0e1322] p-2 sm:p-3 text-left opacity-0 shadow-[0_0_20px_rgba(0,0,0,0.6)] transition group-hover:opacity-100">
                      <p className="text-xs sm:text-sm font-semibold text-white">{skill.name}</p>
                      <p className="mt-1 text-[0.7rem] sm:text-xs leading-4 sm:leading-5 text-white/75">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel 3 — Stats */}
            <div className="flex flex-col items-center justify-center px-7 py-10">
              <div className="space-y-3">
                <StatBar label="Speed" value={hero.stats.speed} activeColorClass="bg-cyan-400" />
                <StatBar label="Armor" value={hero.stats.armor} activeColorClass="bg-emerald-400" />
                <StatBar label="Damage" value={hero.stats.damage} activeColorClass="bg-rose-400" />
              </div>
            </div>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-0 sm:px-10 lg:px-16">
        <div className="flex items-center justify-end py-6">
          <Link href="/heroes" className="px-10 py-2 text-sm text-white/85 transition hover:text-white">
            Back to Heroes
          </Link>
        </div>
      </div>

      {isStoryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setIsStoryModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full story"
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl border border-white/15 bg-[#0d1324] p-8 shadow-[0_0_26px_rgba(0,0,0,0.5)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute right-5 top-4 text-xl font-semibold leading-none text-white/90 transition hover:text-white"
              aria-label="Close full story"
            >
              x
            </button>

            <p className="max-h-[62vh] overflow-y-auto pr-2 leading-7 text-white/90">
              {hero.story_long}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
