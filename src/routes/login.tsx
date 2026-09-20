import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — NiagaGenzora.com" },
      { name: "description", content: "Masuk ke akun NiagaGenzora.com Anda." },
      { property: "og:title", content: "Log in — NiagaGenzora.com" },
      { property: "og:description", content: "Masuk ke akun NiagaGenzora.com Anda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { isEnglish } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(isEnglish ? "The email or password is incorrect, or the email has not been confirmed." : "Email atau password salah, atau email belum dikonfirmasi.");
      setSubmitting(false);
      return;
    }
    await navigate({ to: "/account" });
  }
  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
        <h1 className="text-2xl font-extrabold tracking-tight">{isEnglish ? "Log in" : "Masuk"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{isEnglish ? "Log in to view promotions and your account information." : "Masuk untuk melihat promo dan info akun Anda."}</p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
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
              placeholder="••••••••"
              className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <Button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {submitting ? (isEnglish ? "Logging in…" : "Memproses…") : (isEnglish ? "Log in" : "Masuk")}
          </Button>
          {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
        </form>
        <p className="mt-4 text-sm text-muted-foreground">
          {isEnglish ? "Don't have an account?" : "Belum punya akun?"}{" "}
          <Link to="/signup" className="font-bold text-primary hover:underline">
            {isEnglish ? "Sign up" : "Daftar"}
          </Link>
        </p>
      </div>
    </div>
  );
}
