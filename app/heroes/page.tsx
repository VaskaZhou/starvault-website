'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Hero = {
  id: number;
  name: string;
  faction: string;
  class: string;
  stats: {
    attack_type: string;
    speed: number;
    armor: number;
    damage: number;
  };
};

const classOptions = ["Support", "Damage Dealer", "Tank"] as const;
const attackOptions = ["Energy", "Arcane", "Explosive"] as const;

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

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);

  useEffect(() => {
    fetch("/herodata/herodata.json")
      .then((res) => res.json())
      .then((data) => setHeroes(data.heroes || []))
      .catch(() => setHeroes([]));
  }, []);

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      const matchesClass = !selectedClass || hero.class === selectedClass;
      const matchesAttack = !selectedAttack || hero.stats.attack_type === selectedAttack;
      return matchesClass && matchesAttack;
    });
  }, [heroes, selectedClass, selectedAttack]);

  const toggleFilter = (
    type: "class" | "attack",
    value: string,
    currentValue: string | null
  ) => {
    if (type === "class") {
      setSelectedClass(currentValue === value ? null : value);
    } else {
      setSelectedAttack(currentValue === value ? null : value);
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#070b14] text-white">
      <section className="mx-auto max-w-7xl px-3 pb-10 pt-14 sm:px-6 sm:pb-16 sm:pt-32">
        <div className="text-center">
          <h1 className="text-2xl font-semibold uppercase tracking-[0.12em] text-white sm:text-5xl sm:tracking-[0.2em] lg:text-6xl lg:tracking-[0.24em]">
            Choose Your Hero
          </h1>
          <p className="mt-3 text-sm leading-5 text-white/80 sm:mt-4 sm:text-xl sm:leading-7 lg:text-2xl">
            Unleash incredible abilities and ultimates on your way to victory.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:mt-10 sm:p-4 sm:pl-10">

          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white sm:text-xl sm:tracking-[0.22em]">
                Filter Heroes
                </h2>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 sm:text-sm sm:tracking-[0.22em]">Class</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {classOptions.map((option) => {
                  const active = selectedClass === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleFilter("class", option, selectedClass)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                        active
                          ? "border-white bg-gray-700"
                          : "border-white/15 bg-black/20 hover:border-white/50"
                      }`}
                    >
                      <Image
                        src={classIconPaths[option]}
                        alt={option}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 sm:text-sm sm:tracking-[0.22em]">Attack Type</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {attackOptions.map((option) => {
                  const active = selectedAttack === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleFilter("attack", option, selectedAttack)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
                        active
                          ? "border-white bg-gray-700"
                          : "border-white/15 bg-black/20 hover:border-white/50"
                      }`}
                    >
                      <Image
                        src={attackIconPaths[option]}
                        alt={option}
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:mt-12 sm:grid-cols-3 lg:grid-cols-5">
          {filteredHeroes.map((hero) => (
            <Link
              key={hero.id}
              href={`/heroes/${hero.id}`}
              className="group relative aspect-[1/1] overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/30"
            >
              <Image
                src={`/herodata/heroicon/${hero.id}.png`}
                alt={hero.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-2">
                <div className="flex items-center justify-between rounded-xl bg-black/30 px-3 py-2 backdrop-blur-sm opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="text-sm font-semibold text-white">{hero.name}</span>
                  <span className="text-xs uppercase tracking-[0.18em] text-white/70 text-right">
                    {hero.class}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
