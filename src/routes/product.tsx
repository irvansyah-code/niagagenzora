import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — NiagaGenzora.com" },
      {
        name: "description",
        content: "Jelajahi pilihan hunian Bumi Pandawa Sejahtera Setu: tipe rumah, harga, dan fasilitas.",
      },
      { property: "og:title", content: "Product — NiagaGenzora.com" },
      { property: "og:description", content: "Pilihan hunian Bumi Pandawa Sejahtera Setu: tipe, harga, dan fasilitas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

const products = [
  {
    name: "Tipe 36/72",
    price: "Mulai Rp 180 juta",
    desc: "Rumah tapak nyaman untuk keluarga kecil, 2 kamar tidur, carport, dan taman depan.",
    specs: ["2 Kamar Tidur", "1 Kamar Mandi", "Carport", "Luas 72 m²"],
    descEn: "A comfortable landed home for a small family, with 2 bedrooms, a carport, and front garden.",
    specsEn: ["2 Bedrooms", "1 Bathroom", "Carport", "72 m² Lot"],
  },
  {
    name: "Tipe 45/90",
    price: "Mulai Rp 250 juta",
    desc: "Pilihan paling favorit: ruang keluarga lega, 3 kamar tidur, dan dapur modern.",
    specs: ["3 Kamar Tidur", "2 Kamar Mandi", "Carport", "Luas 90 m²"],
    descEn: "Our most popular choice, with a spacious family room, 3 bedrooms, and a modern kitchen.",
    specsEn: ["3 Bedrooms", "2 Bathrooms", "Carport", "90 m² Lot"],
  },
  {
    name: "Tipe 60/120",
    price: "Mulai Rp 380 juta",
    desc: "Hunian premium dengan 4 kamar tidur, mushola cluster, dan area bermain anak.",
    specs: ["4 Kamar Tidur", "3 Kamar Mandi", "Garasi", "Luas 120 m²"],
    descEn: "A premium home with 4 bedrooms, a community prayer room, and a children's play area.",
    specsEn: ["4 Bedrooms", "3 Bathrooms", "Garage", "120 m² Lot"],
  },
];

function ProductPage() {
  const { isEnglish } = useLanguage();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{isEnglish ? "Products" : "Produk"}</h1>
        <p className="mt-3 text-muted-foreground">
          {isEnglish ? "Explore homes at Bumi Pandawa Sejahtera — Setu. Contact us for availability and mortgage options." : "Pilihan hunian di Bumi Pandawa Sejahtera — Setu. Hubungi kami untuk info ketersediaan dan skema KPR."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <article key={p.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p className="mt-1 text-sm font-semibold text-primary">{isEnglish ? p.price.replace("Mulai", "From").replace("juta", "million") : p.price}</p>
            <p className="mt-3 text-sm text-muted-foreground">{isEnglish ? p.descEn : p.desc}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(isEnglish ? p.specsEn : p.specs).map((s) => (
                <li key={s} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        {isEnglish ? "Specifications and prices may change — contact our marketing team for the latest offer." : "Spesifikasi dan harga dapat berubah — silakan hubungi marketing kami untuk penawaran terbaru."}
      </p>
    </div>
  );
}
