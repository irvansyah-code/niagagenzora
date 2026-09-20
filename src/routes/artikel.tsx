import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/artikel")({
  head: () => ({
    meta: [
      { title: "Artikel — NiagaGenzora.com" },
      {
        name: "description",
        content: "Artikel dan tips seputar hunian, KPR, dan investasi properti Bumi Pandawa Sejahtera Setu.",
      },
      { property: "og:title", content: "Artikel — NiagaGenzora.com" },
      { property: "og:description", content: "Tips hunian, KPR, dan investasi properti dari NiagaGenzora.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArtikelPage,
});

const articles = [
  {
    title: "5 Hal yang Wajib Dicek Sebelum Membeli Rumah Pertama",
    excerpt:
      "Dari legalitas sertifikat sampai lokasi pengembangan air — pastikan rumah pertama Anda aman dan nyaman dengan checklist berikut.",
    date: "12 September 2026",
    titleEn: "5 Things to Check Before Buying Your First Home",
    excerptEn: "From legal certificates to water access — use this checklist to make sure your first home is safe and comfortable.",
    dateEn: "September 12, 2026",
  },
  {
    title: "Cara Mengajukan KPR dengan DP Ringan",
    excerpt:
      "Pahami syarat dokumen, simulasi cicilan, dan trik negosiasi agar pengajuan KPR Anda disetujui lebih cepat.",
    date: "5 September 2026",
    titleEn: "How to Apply for a Mortgage with a Low Down Payment",
    excerptEn: "Understand the required documents, payment simulations, and negotiation tips to get your mortgage approved faster.",
    dateEn: "September 5, 2026",
  },
  {
    title: "Kenapa Hunian di Setu Menjadi Pilihan Investasi 2026",
    excerpt:
      "Pertumbuhan kawasan timur Jakarta membuat harga properti di Setu terus naik. Berikut data dan proyeksinya.",
    date: "28 Agustus 2026",
    titleEn: "Why Setu Homes Are an Investment Choice in 2026",
    excerptEn: "Growth in eastern Jakarta continues to increase property prices in Setu. Explore the data and projections.",
    dateEn: "August 28, 2026",
  },
];

function ArtikelPage() {
  const { isEnglish } = useLanguage();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{isEnglish ? "Articles" : "Artikel"}</h1>
        <p className="mt-3 text-muted-foreground">
          {isEnglish ? "Tips and information about homes, mortgages, and property investment." : "Tips dan informasi seputar hunian, KPR, dan investasi properti."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {articles.map((a) => (
          <article key={a.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
            <time className="text-xs font-semibold text-muted-foreground">{isEnglish ? a.dateEn : a.date}</time>
            <h2 className="mt-2 text-lg font-bold leading-snug">{isEnglish ? a.titleEn : a.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{isEnglish ? a.excerptEn : a.excerpt}</p>
            <Link
              to="/contact"
              className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              {isEnglish ? "Ask us" : "Tanya kami"}
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
