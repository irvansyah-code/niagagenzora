import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { SearchDialog } from "./SearchDialog";
import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { to: "/", id: "Beranda", en: "Home" },
  { to: "/product", id: "Produk", en: "Products" },
  { to: "/customer", id: "Pelanggan", en: "Customers" },
  { to: "/artikel", id: "Artikel", en: "Articles" },
  { to: "/contact", id: "Kontak", en: "Contact" },
] as const;

function LanguageSwitch({ language, setLanguage }: { language: Language; setLanguage: (language: Language) => void }) {
  return (
    <div className="flex shrink-0 rounded-lg border border-primary-foreground/30 p-0.5" aria-label={language === "id" ? "Pilih bahasa" : "Choose language"}>
      {(["id", "en"] as const).map((option) => (
        <Button
          key={option}
          type="button"
          size="sm"
          variant="ghost"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`h-7 px-2 text-[11px] font-extrabold uppercase ${language === option ? "bg-accent text-accent-foreground hover:bg-accent" : "text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"}`}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { language, setLanguage, isEnglish } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const themeButton = (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? (isEnglish ? "Use light mode" : "Gunakan mode terang") : (isEnglish ? "Use dark mode" : "Gunakan mode gelap")}
      title={theme === "dark" ? (isEnglish ? "Light mode" : "Mode terang") : (isEnglish ? "Dark mode" : "Mode gelap")}
      className="size-10 shrink-0 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </Button>
  );

  return (
    <header className="brand-gradient sticky top-0 z-30 shadow-card">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-primary-foreground">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <path d="M9 21v-8h6v8" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-extrabold tracking-tight sm:text-2xl">
              NiagaGenzora<span className="text-accent">.com</span>
            </span>
            <span className="hidden text-xs font-medium opacity-80 sm:block">
              {isEnglish ? "Comfortable Homes, Future Investments" : "Hunian Nyaman, Investasi Masa Depan"}
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <nav aria-label={isEnglish ? "Main menu" : "Menu utama"} className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
            >
              {link[language]}
            </Link>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <button
              type="button"
              aria-label={isEnglish ? "Open search" : "Buka pencarian"}
              onClick={() => setSearchOpen(true)}
              className="grid size-10 place-items-center rounded-lg border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <LanguageSwitch language={language} setLanguage={setLanguage} />
            {themeButton}
            {user ? (
              <>
                <Link to="/account" className="max-w-36 truncate rounded-lg border border-primary-foreground/30 px-3 py-2 text-sm font-semibold text-primary-foreground">
                  {user.user_metadata?.["full_name"] || user.email}
                </Link>
                <Button type="button" variant="ghost" onClick={() => void signOut()} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  {isEnglish ? "Log out" : "Keluar"}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="rounded-lg border border-primary-foreground/30 px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">{isEnglish ? "Log in" : "Masuk"}</Link>
                <Link to="/signup" className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-md transition-transform hover:scale-[1.03]">{isEnglish ? "Sign up" : "Daftar"}</Link>
              </>
            )}
          </div>
        </nav>

        {/* Tombol menu mobile */}
        <button
          type="button"
          aria-label={menuOpen ? (isEnglish ? "Close menu" : "Tutup menu") : (isEnglish ? "Open menu" : "Buka menu")}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-xl border border-primary-foreground/25 text-primary-foreground xl:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav aria-label={isEnglish ? "Main menu" : "Menu utama"} className="border-t border-primary-foreground/15 xl:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground data-[status=active]:bg-primary-foreground/15 data-[status=active]:text-primary-foreground"
              >
                {link[language]}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-primary-foreground/15 pt-3">
              <LanguageSwitch language={language} setLanguage={setLanguage} />
              {themeButton}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary-foreground/30 px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                {isEnglish ? "Search" : "Cari"}
              </button>
              {user ? (
                <>
                  <Link to="/account" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg border border-primary-foreground/30 px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">{isEnglish ? "My profile" : "Profil saya"}</Link>
                  <Button type="button" onClick={() => { setMenuOpen(false); void signOut(); }} className="flex-1 bg-accent text-accent-foreground">{isEnglish ? "Log out" : "Keluar"}</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg border border-primary-foreground/30 px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground">{isEnglish ? "Log in" : "Masuk"}</Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-bold text-accent-foreground shadow-md">{isEnglish ? "Sign up" : "Daftar"}</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} language={language} />
    </header>
  );
}
