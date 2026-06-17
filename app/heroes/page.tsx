export default function HeroesPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl items-center px-6 py-16">
      <div className="max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
          Heroes
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Meet Our Heroes
        </h1>
        <p className="mt-4 text-lg leading-8 text-gray-300">
          Discover the legendary characters that make StarVault come alive. Each hero brings unique abilities and stories to the game.
        </p>
      </div>
    </div>
  );
}
