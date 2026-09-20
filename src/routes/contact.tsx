import { createFileRoute } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NiagaGenzora.com" },
      {
        name: "description",
        content: "Hubungi marketing NiagaGenzora.com — Bumi Pandawa Sejahtera Setu untuk info hunian dan kunjungan lokasi.",
      },
      { property: "og:title", content: "Contact — NiagaGenzora.com" },
      { property: "og:description", content: "Hubungi marketing NiagaGenzora.com untuk info hunian dan kunjungan lokasi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { isEnglish } = useLanguage();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{isEnglish ? "Contact" : "Kontak"}</h1>
        <p className="mt-3 text-muted-foreground">
          {isEnglish ? "Our marketing team is ready to help with prices, mortgage simulations, and scheduling a site visit." : "Tim marketing kami siap membantu — mulai dari tanya harga, simulasi KPR, sampai jadwal kunjungan lokasi."}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">{isEnglish ? "Marketing Office" : "Kantor Pemasaran"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Bumi Pandawa Sejahtera — Setu
              <br />
              Bekasi, Jawa Barat
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">{isEnglish ? "Business Hours" : "Jam Operasional"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isEnglish ? "Monday – Saturday: 08:00 – 17:00 WIB" : "Senin – Sabtu: 08.00 – 17.00 WIB"}
              <br />
              {isEnglish ? "Sunday: 09:00 – 15:00 WIB" : "Minggu: 09.00 – 15.00 WIB"}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">{isEnglish ? "Contact Us" : "Hubungi Kami"}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isEnglish ? "Phone / WhatsApp" : "Telepon / WhatsApp"}: 0812-0000-0000
              <br />
              Email: info@niagaonline.example
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-lg font-bold">{isEnglish ? "Send a Message" : "Kirim Pesan"}</h2>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            {isEnglish ? "Name" : "Nama"}
            <input
              type="text"
              name="nama"
              placeholder={isEnglish ? "Full name" : "Nama lengkap"}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Nomor WhatsApp
            <input
              type="tel"
              name="whatsapp"
              placeholder="08xx-xxxx-xxxx"
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            {isEnglish ? "Message" : "Pesan"}
            <textarea
              name="pesan"
              rows={4}
              placeholder={isEnglish ? "I am interested in type..." : "Saya tertarik dengan tipe..."}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <Button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isEnglish ? "Send" : "Kirim"}
          </Button>
          <p className="text-xs text-muted-foreground">
            {isEnglish ? "This form is currently a preview and is not yet connected to the marketing team." : "Formulir ini masih tampilan awal — segera kami hubungkan agar pesan langsung masuk ke marketing."}
          </p>
        </form>
      </div>
    </div>
  );
}
