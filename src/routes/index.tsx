import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PromoCarousel } from "@/components/PromoCarousel";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NiagaGenzora.com — Bumi Pandawa Sejahtera Setu" },
      {
        name: "description",
        content:
          "NiagaGenzora.com: tonton video profil Bumi Pandawa Sejahtera - Setu dan lihat promo hunian terbaru yang selalu diperbarui.",
      },
      { property: "og:title", content: "NiagaGenzora.com — Bumi Pandawa Sejahtera Setu" },
      {
        property: "og:description",
        content: "Video profil perumahan dan promo hunian terbaru dalam satu halaman.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const advantages: { title: string; description: string; descriptionEn: string; icon: ReactNode }[] = [
  {
    title: "One Solution",
    description:
      "Semua kebutuhan hunian ada di satu tempat — dari pemilihan unit, pengajuan KPR, sampai serah terima kunci.",
    descriptionEn: "Everything you need is in one place — from choosing a unit and applying for a mortgage to receiving your keys.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Integritas",
    description:
      "Jujur dan transparan dalam setiap penawaran — tanpa biaya tersembunyi, sesuai brosur dan kontrak.",
    descriptionEn: "Honest and transparent in every offer — no hidden fees, with every detail matching the brochure and contract.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "On Time",
    description:
      "Pembangunan sesuai jadwal yang disepakati — progres rutin dilaporkan sampai kunci di tangan.",
    descriptionEn: "Construction follows the agreed schedule, with regular progress updates until the keys are in your hands.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Customer",
    description:
      "Melayani dengan tulus sebelum dan sesudah pembelian — purna jual dan perawatan rumah tetap kami dampingi.",
    descriptionEn: "Sincere service before and after purchase, including continued support for after-sales care and home maintenance.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
];

function Index() {
  const { isEnglish } = useLanguage();
  return (
    <div>
      {/* Dua bagian: video kiri, promo kanan */}
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Kiri: YouTube */}
          <section aria-labelledby="video-heading" className="flex flex-col gap-3">
            <h2 id="video-heading" className="text-lg font-bold tracking-tight sm:text-xl">
              {isEnglish ? "Residential Profile Video" : "Video Profil Perumahan"}
            </h2>
            <div className="overflow-hidden rounded-2xl bg-foreground shadow-card">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube-nocookie.com/embed/OrOUGKW9bdw?rel=0"
                title="Bumi Pandawa Sejahtera - Setu | Animation 3D Project"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          {/* Kanan: Banner promo berganti-ganti */}
          <section aria-labelledby="promo-heading" className="flex flex-col gap-3">
            <h2 id="promo-heading" className="text-lg font-bold tracking-tight sm:text-xl">
              {isEnglish ? "Latest Promotions" : "Promo Terbaru"}
            </h2>
            <PromoCarousel />
          </section>
        </div>
      </div>

      {/* Keunggulan produk kami */}
      <section aria-labelledby="keunggulan-heading" className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
        <h2
          id="keunggulan-heading"
          className="text-center text-xl font-bold tracking-tight sm:text-2xl"
        >
          {isEnglish ? "Why Choose Our Products" : "Keunggulan Produk Kami"}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground sm:text-base">
          {isEnglish ? "Four core values we uphold in every home we build." : "Empat nilai utama yang selalu kami pegang dalam setiap hunian yang kami bangun."}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full brand-gradient text-primary-foreground">
                {item.icon}
              </div>
              <h3 className="text-base font-bold tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{isEnglish ? item.descriptionEn : item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="visi-misi-heading" className="bg-secondary/60 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase text-primary">NiagaGenzora.com</p>
            <h2 id="visi-misi-heading" className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {isEnglish ? "Vision & Mission" : "Visi & Misi"}
            </h2>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="border-l-4 border-primary bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold">{isEnglish ? "Vision" : "Visi"}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {isEnglish ? "To become a trusted property partner that helps every family own a comfortable, quality home and a valuable future investment." : "Menjadi mitra properti tepercaya yang membantu setiap keluarga memiliki hunian nyaman, berkualitas, dan bernilai sebagai investasi masa depan."}
              </p>
            </article>
            <article className="border-l-4 border-accent bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3 4 7v5c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V7l-8-4Z" /><path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3 className="text-xl font-bold">{isEnglish ? "Mission" : "Misi"}</h3>
              </div>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                <li>• {isEnglish ? "Provide complete and transparent property solutions." : "Memberikan solusi properti yang lengkap dan transparan."}</li>
                <li>• {isEnglish ? "Maintain quality and timely delivery in every project." : "Menjaga kualitas dan ketepatan waktu dalam setiap proyek."}</li>
                <li>• {isEnglish ? "Deliver responsive service before and after purchase." : "Memberikan pelayanan responsif sebelum dan sesudah pembelian."}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
