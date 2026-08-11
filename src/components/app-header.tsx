import Link from "next/link";
import { siteConfig } from "@/config/site";

export function AppHeader() {
  return (
    <header className="border-b border-charcoal/10 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="ReceitasHub">
          <span className="grid size-11 place-items-center rounded-full bg-tomato-600 text-lg font-bold text-white">
            RH
          </span>
          <span className="font-display text-2xl font-bold">{siteConfig.name}</span>
        </Link>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-charcoal/75">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-tomato-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
