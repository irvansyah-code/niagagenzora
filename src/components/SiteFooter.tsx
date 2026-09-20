import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";

type Social = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socials: Social[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@niagaonline",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/niagaonline",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/niagaonline",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/niagaonline",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6a11.5 11.5 0 0 0 7.9-10.9C23.5 5.6 18.4.5 12 .5z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281200000000",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 21.8a9.7 9.7 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6zM12 0A11.9 11.9 0 0 0 1.7 18l-1.6 6 6.1-1.6A11.9 11.9 0 1 0 12 0z" />
      </svg>
    ),
  },
];

export function SiteFooter() {
  const { isEnglish } = useLanguage();
  const storeLinks = isEnglish
    ? [
        { to: "/product" as const, label: "Product List" },
        { to: "/artikel" as const, label: "Articles & Tips" },
        { to: "/contact" as const, label: "Contact Marketing" },
      ]
    : [
        { to: "/product" as const, label: "Daftar Produk" },
        { to: "/artikel" as const, label: "Artikel & Tips" },
        { to: "/contact" as const, label: "Hubungi Marketing" },
      ];
  return (
    <footer className="brand-gradient text-primary-foreground">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8">
        {/* Tentang Niagaonline */}
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground shadow-md">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 21v-8h6v8" />
              </svg>
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              NiagaGenzora<span className="text-accent">.com</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
            {isEnglish ? "NiagaGenzora.com is the official marketing channel for Bumi Pandawa Sejahtera — Setu. Find the right home for your family with affordable payments in a strategic location." : "NiagaGenzora.com adalah kanal pemasaran resmi hunian Bumi Pandawa Sejahtera — Setu. Temukan rumah sesuai kebutuhan keluarga Anda dengan cicilan ringan dan lokasi strategis."}
          </p>
        </div>

        {/* Alamat */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{isEnglish ? "Address" : "Alamat"}</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-primary-foreground/85">
            {isEnglish ? "Bumi Pandawa Sejahtera Marketing Office — Setu" : "Kantor Pemasaran Bumi Pandawa Sejahtera — Setu"}
            <br />
            Bekasi, Jawa Barat
          </address>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/85">
            {isEnglish ? "Monday – Saturday: 08:00 – 17:00 WIB" : "Senin – Sabtu: 08.00 – 17.00 WIB"}
            <br />
            {isEnglish ? "Sunday: 09:00 – 15:00 WIB" : "Minggu: 09.00 – 15.00 WIB"}
          </p>
        </div>

        {/* Informasi toko */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{isEnglish ? "Store Information" : "Informasi Toko"}</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            <li>
              {isEnglish ? "Phone / WhatsApp:" : "Telepon / WhatsApp:"}{" "}
              <a href="tel:+6281200000000" className="font-semibold underline-offset-2 hover:text-accent hover:underline">
                0812-0000-0000
              </a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:info@niagaonline.example" className="font-semibold underline-offset-2 hover:text-accent hover:underline">
                info@niagaonline.example
              </a>
            </li>
          </ul>
          <ul className="mt-4 space-y-2 text-sm">
            {storeLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-primary-foreground/85 underline-offset-2 hover:text-accent hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sosmed */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70">{isEnglish ? "Follow Us" : "Ikuti Kami"}</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                title={social.label}
                className="grid size-11 place-items-center rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/85">
            {isEnglish ? "Get promotion and construction progress updates through our social media." : "Dapatkan update promo dan progres pembangunan lewat media sosial kami."}
          </p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-center text-sm text-primary-foreground/80 sm:px-6">
          © {new Date().getFullYear()} NiagaGenzora.com — Bumi Pandawa Sejahtera, Setu
        </div>
      </div>
    </footer>
  );
}
