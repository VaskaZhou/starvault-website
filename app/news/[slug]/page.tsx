import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import sql from "@/lib/db";

type ContentBlock =
  | { type: "text"; data: { text: string } }
  | { type: "image"; data: { url: string; alt?: string; caption?: string } }
  | { type: "video"; data: { url: string; poster?: string; caption?: string } }
  | { type: "heading"; data: { text: string; level?: 2 | 3 | 4 } }
  | { type: "quote"; data: { text: string; attribution?: string } }
  | { type: "divider"; data?: Record<string, never> }
  | { type: "list"; data: { items: string[]; ordered?: boolean } };

type RawContentBlock = {
  type?: string;
  data?: {
    text?: unknown;
    url?: unknown;
    alt?: unknown;
    caption?: unknown;
    poster?: unknown;
    level?: unknown;
    items?: unknown;
    ordered?: unknown;
    attribution?: unknown;
  };
};

type NewsRow = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  cover_image: string | null;
  content: ContentBlock[] | string;
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

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "text":
      return (
        <p key={idx} className="text-base leading-8 text-gray-300">
          {block.data.text}
        </p>
      );

    case "heading": {
      const level = block.data.level ?? 2;
      const cls =
        level === 2
          ? "text-2xl font-semibold text-white mt-10 mb-3"
          : level === 3
          ? "text-xl font-semibold text-white mt-8 mb-2"
          : "text-lg font-semibold text-white mt-6 mb-2";
      if (level === 2)
        return (
          <h2 key={idx} className={cls}>
            {block.data.text}
          </h2>
        );
      if (level === 3)
        return (
          <h3 key={idx} className={cls}>
            {block.data.text}
          </h3>
        );
      return (
        <h4 key={idx} className={cls}>
          {block.data.text}
        </h4>
      );
    }

    case "image":
      return (
        <figure key={idx} className="my-8">
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={block.data.url}
              alt={block.data.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {block.data.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case "video":
      return (
        <figure key={idx} className="my-8">
          <div className="overflow-hidden rounded-xl bg-black">
            <video
              controls
              playsInline
              preload="metadata"
              poster={block.data.poster}
              className="block w-full"
            >
              <source src={block.data.url} />
            </video>
          </div>
          {block.data.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {block.data.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-6 border-l-4 border-white/20 pl-6"
        >
          <p className="text-lg italic text-gray-300">{block.data.text}</p>
          {block.data.attribution && (
            <cite className="mt-2 block text-sm text-gray-500 not-italic">
              — {block.data.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "divider":
      return <hr key={idx} className="my-8 border-white/10" />;

    case "list": {
      const Tag = block.data.ordered ? "ol" : "ul";
      const listCls = block.data.ordered
        ? "list-decimal list-outside ml-6 space-y-2 text-gray-300"
        : "list-disc list-outside ml-6 space-y-2 text-gray-300";
      return (
        <Tag key={idx} className={listCls}>
          {block.data.items.map((item, i) => (
            <li key={i} className="text-base leading-7">
              {item}
            </li>
          ))}
        </Tag>
      );
    }

    default:
      return null;
  }
}

function normalizeContent(content: unknown): ContentBlock[] {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.flatMap((item): ContentBlock[] => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const block = item as RawContentBlock;
    const data = block.data ?? {};

    switch (block.type) {
      case "text":
        return typeof data.text === "string"
          ? [{ type: "text", data: { text: data.text } }]
          : [];

      case "image":
        return typeof data.url === "string"
          ? [
              {
                type: "image",
                data: {
                  url: data.url,
                  alt: typeof data.alt === "string" ? data.alt : undefined,
                  caption:
                    typeof data.caption === "string" ? data.caption : undefined,
                },
              },
            ]
          : [];

      case "video":
        return typeof data.url === "string"
          ? [
              {
                type: "video",
                data: {
                  url: data.url,
                  poster: typeof data.poster === "string" ? data.poster : undefined,
                  caption:
                    typeof data.caption === "string" ? data.caption : undefined,
                },
              },
            ]
          : [];

      case "heading":
        return typeof data.text === "string"
          ? [
              {
                type: "heading",
                data: {
                  text: data.text,
                  level:
                    data.level === 2 || data.level === 3 || data.level === 4
                      ? data.level
                      : undefined,
                },
              },
            ]
          : [];

      case "quote":
        return typeof data.text === "string"
          ? [
              {
                type: "quote",
                data: {
                  text: data.text,
                  attribution:
                    typeof data.attribution === "string"
                      ? data.attribution
                      : undefined,
                },
              },
            ]
          : [];

      case "divider":
        return [{ type: "divider" }];

      case "list":
        return Array.isArray(data.items) && data.items.every((value) => typeof value === "string")
          ? [
              {
                type: "list",
                data: {
                  items: data.items,
                  ordered: data.ordered === true,
                },
              },
            ]
          : [];

      default:
        return [];
    }
  });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rows = (await sql`
    SELECT id, title, slug, summary, cover_image, content, published_at, created_at
    FROM news
    WHERE slug = ${slug}
    LIMIT 1
  `) as NewsRow[];

  if (rows.length === 0) notFound();

  const article = rows[0];

  const rawContent =
    typeof article.content === "string"
      ? (JSON.parse(article.content) as unknown)
      : (article.content as unknown);

  const blocks = normalizeContent(rawContent);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-26">
      
      {/* Date */}
      {article.published_at && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
          {formatDate(article.published_at)}
        </p>
      )}

      {/* Title */}
      <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl leading-tight">
        {article.title}
      </h1>

      {/* Summary */}
      {article.summary && (
        <p className="mt-4 text-lg leading-8 text-gray-400">{article.summary}</p>
      )}


      {/* Divider */}
      <hr className="my-5 border-white/20" />

      {/* Content blocks */}
      <div className="space-y-5">
        {blocks.map((block, idx) => renderBlock(block, idx))}
      </div>

      {/* Back link */}
      <Link
        href="/news"
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-white transition"
      >
        ← Back to News
      </Link>

    </main>
  );
}
