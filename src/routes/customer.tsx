import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/customer")({
  head: () => ({
    meta: [
      { title: "Customer — NiagaGenzora.com" },
      {
        name: "description",
        content: "Cerita dan testimoni pemilik rumah di Bumi Pandawa Sejahtera Setu.",
      },
      { property: "og:title", content: "Customer — NiagaGenzora.com" },
      { property: "og:description", content: "Testimoni pemilik rumah di Bumi Pandawa Sejahtera Setu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerPage,
});

const testimonials = [
  {
    name: "Bpk. Hendra Wijaya",
    role: "Pemilik Tipe 45/90",
    quote:
      "Proses KPR-nya dibantu dari awal sampai akhir. Tiga bulan kemudian kami sudah menempati rumah. Lingkungannya nyaman dan aman untuk anak-anak.",
    roleEn: "Owner of Type 45/90",
    quoteEn: "The mortgage process was supported from start to finish. Three months later, we had moved in. The neighborhood is comfortable and safe for children.",
  },
  {
    name: "Ibu Ratna Sari",
    role: "Pemilik Tipe 36/72",
    quote:
      "Harga sangat terjangkau untuk rumah pertama kami. Fasilitas cluster terawat dan tetangga semuanya ramah.",
    roleEn: "Owner of Type 36/72",
    quoteEn: "The price was very affordable for our first home. The community facilities are well maintained, and all the neighbors are friendly.",
  },
  {
    name: "Bpk. Agus Prasetyo",
    role: "Pemilik Tipe 60/120",
    quote:
      "Lokasi strategis, dekat sekolah dan pasar. Investasi terbaik keluarga kami selama ini.",
    roleEn: "Owner of Type 60/120",
    quoteEn: "The location is strategic and close to schools and markets. It has been our family's best investment so far.",
  },
];

const faqs = [
  { id: "Apa saja syarat pengajuan KPR?", en: "What are the mortgage application requirements?", answerId: "Dokumen umumnya meliputi KTP, KK, NPWP, slip gaji, dan rekening koran. Tim kami akan membantu pengecekan awal.", answerEn: "Documents generally include an ID card, family card, tax number, payslips, and bank statements. Our team will help with the initial review." },
  { id: "Berapa lama proses pembelian rumah?", en: "How long does the home-buying process take?", answerId: "Waktu proses bergantung pada metode pembayaran dan persetujuan bank. Tim kami akan memberi pembaruan di setiap tahap.", answerEn: "Timing depends on the payment method and bank approval. Our team will provide updates at every stage." },
  { id: "Apakah saya bisa menjadwalkan survei lokasi?", en: "Can I schedule a site visit?", answerId: "Bisa. Pilih tombol Reply untuk mengatur jadwal kunjungan langsung bersama tim marketing.", answerEn: "Yes. Select Reply to arrange a direct site visit with our marketing team." },
  { id: "Apakah harga dan promo dapat berubah?", en: "Can prices and promotions change?", answerId: "Ya, harga dan promo mengikuti ketersediaan unit. Hubungi tim kami untuk penawaran terbaru.", answerEn: "Yes, prices and promotions follow unit availability. Contact our team for the latest offer." },
];

function whatsappUrl(message: string) {
  return `https://wa.me/6281200000000?text=${encodeURIComponent(message)}`;
}

function CustomerPage() {
  const { isEnglish } = useLanguage();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{isEnglish ? "Customers" : "Pelanggan"}</h1>
        <p className="mt-3 text-muted-foreground">
          {isEnglish ? "Stories from homeowners at Bumi Pandawa Sejahtera — Setu." : "Cerita pemilik rumah di Bumi Pandawa Sejahtera — Setu."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
            <svg viewBox="0 0 24 24" className="size-8 text-accent" fill="currentColor" aria-hidden="true">
              <path d="M7.2 6C4.9 7.6 3.5 10 3.5 13.1 3.5 16 5.4 18 7.8 18c2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.4-3.3-3.4-.4 0-.8.1-1 .2.4-1.5 1.6-3 3.1-3.9L7.2 6zm9 0c-2.3 1.6-3.7 4-3.7 7.1 0 2.9 1.9 4.9 4.3 4.9 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.4-3.3-3.4-.4 0-.8.1-1 .2.4-1.5 1.6-3 3.1-3.9L16.2 6z" />
            </svg>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
              “{isEnglish ? t.quoteEn : t.quote}”
            </blockquote>
            <figcaption className="mt-4 border-t border-border pt-3">
              <span className="block text-sm font-bold">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{isEnglish ? t.roleEn : t.role}</span>
            </figcaption>
            <a href={whatsappUrl(`${isEnglish ? "Reply to testimonial from" : "Balas testimoni dari"} ${t.name}: `)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
              {isEnglish ? "Reply in chat" : "Balas lewat chat"}
            </a>
          </figure>
        ))}
      </div>

      <section aria-labelledby="faq-heading" className="mt-14 border-t pt-10">
        <div className="max-w-2xl">
          <h2 id="faq-heading" className="text-2xl font-extrabold tracking-tight">FAQ</h2>
          <p className="mt-2 text-muted-foreground">{isEnglish ? "Answers to common questions about buying a home." : "Jawaban untuk pertanyaan umum seputar pembelian hunian."}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => {
            const question = isEnglish ? faq.en : faq.id;
            return (
              <details key={faq.id} className="group rounded-lg border bg-card p-5 shadow-card">
                <summary className="cursor-pointer list-none font-bold">{question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{isEnglish ? faq.answerEn : faq.answerId}</p>
                <a href={whatsappUrl(`${isEnglish ? "I would like to ask about" : "Saya ingin bertanya tentang"}: ${question}`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  {isEnglish ? "Reply in chat" : "Balas lewat chat"} →
                </a>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
