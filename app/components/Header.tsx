import Link from "next/link";
import Image from "next/image";

const leftLinks = [
  { href: "/heroes", label: "Heroes" },
  { href: "/news", label: "News" },
  { href: "/community", label: "Community" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-gray-300 transition-all hover:text-white hover:-translate-y-0.5">
            <Image
              src="/logo/Starvault_MainLogo.png"
              alt="StarVault Logo"
              width={250}
              height={250}
            />
          </Link>

          <nav className="flex items-center gap-6">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-lg font-medium text-gray-300 transition-all hover:text-white hover:-translate-y-0.5"
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
          className="border border-white px-6 py-2 text-md font-medium text-gray-300 rounded-lg transition-all hover:text-white hover:-translate-y-0.5"
        >
          Play Free Now
        </a>
      </div>
    </header>
  );
}
