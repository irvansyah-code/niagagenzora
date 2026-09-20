import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { Language } from "@/lib/language";

type SearchItem = {
  title: string;
  desc: string;
  to: string;
  category: "Product" | "Artikel" | "Halaman";
};

const searchIndexId: SearchItem[] = [
  {
    title: "Tipe 36/72",
    desc: "Rumah tapak nyaman untuk keluarga kecil, 2 kamar tidur, carport, dan taman depan — mulai Rp 180 juta.",
    to: "/product",
    category: "Product",
  },
  {
    title: "Tipe 45/90",
    desc: "Pilihan paling favorit: ruang keluarga lega, 3 kamar tidur, dan dapur modern — mulai Rp 250 juta.",
    to: "/product",
    category: "Product",
  },
  {
    title: "Tipe 60/120",
    desc: "Hunian premium dengan 4 kamar tidur, mushola cluster, dan area bermain anak — mulai Rp 380 juta.",
    to: "/product",
    category: "Product",
  },
  {
    title: "5 Hal yang Wajib Dicek Sebelum Membeli Rumah Pertama",
    desc: "Dari legalitas sertifikat sampai lokasi pengembangan air — checklist rumah pertama.",
    to: "/artikel",
    category: "Artikel",
  },
  {
    title: "Cara Mengajukan KPR dengan DP Ringan",
    desc: "Syarat dokumen, simulasi cicilan, dan trik negosiasi pengajuan KPR.",
    to: "/artikel",
    category: "Artikel",
  },
  {
    title: "Kenapa Hunian di Setu Menjadi Pilihan Investasi 2026",
    desc: "Pertumbuhan kawasan timur Jakarta dan proyeksi harga properti di Setu.",
    to: "/artikel",
    category: "Artikel",
  },
  {
    title: "Customer",
    desc: "Cerita dan testimoni pemilik rumah di Bumi Pandawa Sejahtera — Setu.",
    to: "/customer",
    category: "Halaman",
  },
  {
    title: "Contact",
    desc: "Kantor pemasaran, jam operasional, telepon, dan formulir pesan.",
    to: "/contact",
    category: "Halaman",
  },
];

const searchIndexEn: SearchItem[] = [
  { title: "Type 36/72", desc: "A comfortable landed home for a small family, with 2 bedrooms, a carport, and front garden — from IDR 180 million.", to: "/product", category: "Product" },
  { title: "Type 45/90", desc: "Our most popular choice: a spacious family room, 3 bedrooms, and a modern kitchen — from IDR 250 million.", to: "/product", category: "Product" },
  { title: "Type 60/120", desc: "A premium home with 4 bedrooms, a community prayer room, and children's play area — from IDR 380 million.", to: "/product", category: "Product" },
  { title: "5 Things to Check Before Buying Your First Home", desc: "A first-home checklist covering legal certificates, water access, and location.", to: "/artikel", category: "Artikel" },
  { title: "How to Apply for a Mortgage with a Low Down Payment", desc: "Documents, payment simulations, and tips for negotiating your mortgage application.", to: "/artikel", category: "Artikel" },
  { title: "Why Setu Homes Are an Investment Choice in 2026", desc: "Growth in eastern Jakarta and property price projections in Setu.", to: "/artikel", category: "Artikel" },
  { title: "Customers", desc: "Stories and testimonials from homeowners at Bumi Pandawa Sejahtera — Setu.", to: "/customer", category: "Halaman" },
  { title: "Contact", desc: "Marketing office, business hours, telephone, and message form.", to: "/contact", category: "Halaman" },
];

function normalize(text: string) {
  return text.toLowerCase();
}

export function SearchDialog({ open, onClose, language }: { open: boolean; onClose: () => void; language: Language }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    const searchIndex = language === "en" ? searchIndexEn : searchIndexId;
    if (!q) return searchIndex;
    return searchIndex.filter(
      (item) => normalize(item.title).includes(q) || normalize(item.desc).includes(q),
    );
  }, [language, query]);

  if (!open) return null;

  const go = (to: string) => {
    onClose();
    void navigate({ to });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/50 px-4 pt-20 sm:pt-28"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label={language === "en" ? "Search" : "Pencarian"}
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === "en" ? "Search homes, articles, pages…" : "Cari rumah, artikel, halaman…"}
            className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label={language === "en" ? "Close search" : "Tutup pencarian"}
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {language === "en"
                ? `No results for "${query}". Try another keyword, such as "home" or "mortgage".`
                : `Tidak ada hasil untuk "${query}". Coba kata kunci lain, misalnya "rumah" atau "KPR".`}
            </p>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.to + item.title}>
                  <button
                    type="button"
                    onClick={() => go(item.to)}
                    className="w-full rounded-xl px-3 py-3 text-left transition-colors hover:bg-secondary"
                  >
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-secondary-foreground">
                        {language === "en" && item.category === "Artikel" ? "Article" : language === "en" && item.category === "Halaman" ? "Page" : item.category}
                      </span>
                      <span className="font-semibold text-foreground">{item.title}</span>
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">
                      {item.desc}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
