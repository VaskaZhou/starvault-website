import Link from "next/link";
import Image from "next/image";

const leftLinks = [
  { href: "/heroes", label: "Heroes" },
  { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-hidden border-b border-white/10 bg-transparent backdrop-blur-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2 py-1.5 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-12">
          <Link href="/" className="flex items-center gap-2 text-gray-300 transition-all hover:text-white hover:-translate-y-0.5">
            <Image
              src="/logo/Starvault_MainLogo.png"
              alt="StarVault Logo"
              width={250}
              height={250}
              className="h-auto w-[96px] sm:w-[250px]"
            />
          </Link>

          <nav className="flex items-center gap-0.5 sm:gap-6">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-1 py-0.5 text-xs font-medium text-gray-300 transition-all hover:text-white hover:-translate-y-0.5 sm:px-3 sm:py-2 sm:text-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <a
          href="https://www.meta.com/experiences/starvault/7535945739825988/?click_session_id=2398449090643742&utm_source=www.starvaultvr.com&utm_medium=oculusredirect"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 whitespace-nowrap rounded-lg border border-white px-2 py-0.5 text-[9px] font-medium text-gray-300 transition-all hover:text-white hover:-translate-y-0.5 sm:px-6 sm:py-2 sm:text-base"
        >
          Play Free Now
        </a>
      </div>
    </header>
  );
}
