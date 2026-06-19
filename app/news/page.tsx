import Link from "next/link";
import Image from "next/image";
import sql from "@/lib/db";

type NewsRow = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const rows = (await sql`
    SELECT id, title, slug, summary, cover_image, published_at, created_at
    FROM news
    ORDER BY COALESCE(published_at, created_at) DESC
  `) as NewsRow[];

  const featured = rows[0] ?? null;
  const rest = rows.slice(1);

  return (
    <main className="w-full py-0">

      {/* Featured article — full-bleed banner */}
      {featured && (
        <Link href={`/news/${featured.slug}`} className="group block w-full">
          <div className="relative min-h-[420px] w-full overflow-hidden bg-zinc-950 sm:min-h-[540px]">
            {featured.cover_image && (
              <Image
                src={featured.cover_image}
                alt={featured.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
            <div className="absolute inset-0 z-10 flex items-end">
              <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-14">
                <div className="max-w-3xl">
                {featured.published_at && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/60">
                    {formatDate(featured.published_at)}
                  </p>
                )}
                <h2 className="text-3xl font-semibold text-white sm:text-5xl">
                  {featured.title}
                </h2>
                {featured.summary && (
                  <p className="mt-4 text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                    {featured.summary}
                  </p>
                )}
                <span className="mt-6 inline-block text-sm font-semibold text-white underline underline-offset-4 decoration-white/40 transition group-hover:decoration-white">
                  Read more →
                </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Card grid */}
      <div className="mx-auto mt-12 w-full max-w-6xl px-6">
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:border-white/25"
              >
                {article.cover_image && (
                  <div className="relative h-44 w-full shrink-0">
                    <Image
                      src={article.cover_image}
                      alt={article.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  {article.published_at && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
                      {formatDate(article.published_at)}
                    </p>
                  )}
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="mt-2 text-sm leading-6 text-gray-400 line-clamp-3">
                      {article.summary}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {rows.length === 0 && (
          <p className="text-gray-500">No news articles yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}
