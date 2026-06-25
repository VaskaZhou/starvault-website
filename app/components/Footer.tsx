import Link from "next/link";
import { FaDiscord, FaXTwitter, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-transparent mt-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
            title="Discord"
          >
            <FaDiscord className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <Link
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
            title="X"
          >
            <FaXTwitter className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
            title="YouTube"
          >
            <FaYoutube className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <Link
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
            title="TikTok"
          >
            <FaTiktok className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition hover:text-white"
            title="Instagram"
          >
            <FaInstagram className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>

        <div className="text-right text-xs text-gray-400 sm:text-sm">
          <p>
            Contact:{" "}
            <a
              href="mailto:contact@starvault.com"
              className="font-medium text-white transition hover:underline"
            >
              contact@starvault.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
