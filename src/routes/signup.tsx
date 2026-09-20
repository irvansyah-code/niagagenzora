import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — NiagaGenzora.com" },
      { name: "description", content: "Daftar akun NiagaGenzora.com untuk mendapat info promo hunian terbaru." },
      { property: "og:title", content: "Sign up — NiagaGenzora.com" },
      { property: "og:description", content: "Daftar akun NiagaGenzora.com untuk mendapat info promo hunian terbaru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { isEnglish } = useLanguage();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("nama") ?? "").trim();
    const whatsapp = String(form.get("whatsapp") ?? "").trim();
    const preference = String(form.get("preference") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/login",
        data: { full_name: fullName, whatsapp, preferences: { propertyInterest: preference } },
      },
    });
    if (signupError) {
      setError(signupError.message);
      setSubmitting(false);
      return;
    }
    setSuccess(true);
    setSubmitting(false);
  }
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <h1 className="text-2xl font-extrabold tracking-tight">{isEnglish ? "Sign up" : "Daftar"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isEnglish ? "Sign up to receive the latest home promotions." : "Daftar agar tidak ketinggalan promo hunian terbaru."}</p>
        {success ? (
          <div className="mt-6 rounded-lg border border-primary/30 bg-secondary p-5 text-sm leading-relaxed">
            <strong className="block text-foreground">{isEnglish ? "Check your email" : "Periksa email Anda"}</strong>
            <span className="text-muted-foreground">{isEnglish ? "Open the confirmation link, then return to log in." : "Buka tautan konfirmasi, lalu kembali untuk masuk."}</span>
          </div>
        ) : <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            {isEnglish ? "Full Name" : "Nama Lengkap"}
            <input
              type="text"
              name="nama"
              required
              placeholder={isEnglish ? "Your name" : "Nama Anda"}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            WhatsApp
            <input type="tel" name="whatsapp" required placeholder="08xx-xxxx-xxxx" className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            {isEnglish ? "Property preference" : "Preferensi hunian"}
            <input type="text" name="preference" placeholder={isEnglish ? "Example: Type 45/90" : "Contoh: Tipe 45/90"} className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Email
            <input
              type="email"
              name="email"
              required
              placeholder="nama@email.com"
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Password
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder={isEnglish ? "At least 8 characters" : "Minimal 8 karakter"}
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <Button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {submitting ? (isEnglish ? "Creating account…" : "Membuat akun…") : (isEnglish ? "Sign up" : "Daftar")}
          </Button>
          {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
        </form>}
        <p className="mt-4 text-sm text-muted-foreground">
          {isEnglish ? "Already have an account?" : "Sudah punya akun?"}{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            {isEnglish ? "Log in" : "Masuk"}
          </Link>
        </p>
      </div>
    </div>
  );
}
