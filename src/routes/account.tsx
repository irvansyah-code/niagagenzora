import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [
    { title: "Profil — NiagaGenzora.com" },
    { name: "description", content: "Kelola profil akun NiagaGenzora.com." },
    { property: "og:title", content: "Profil — NiagaGenzora.com" },
    { property: "og:description", content: "Kelola profil akun NiagaGenzora.com." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading } = useAuth();
  const { isEnglish } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [preference, setPreference] = useState("");
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    void supabase.from("profiles").select("full_name, whatsapp, avatar_path, preferences").eq("user_id", user.id).maybeSingle().then(async ({ data }) => {
      if (!data) return;
      setFullName(data.full_name);
      setWhatsapp(data.whatsapp);
      setAvatarPath(data.avatar_path);
      const prefs = data.preferences as { propertyInterest?: string } | null;
      setPreference(prefs?.propertyInterest ?? "");
      if (data.avatar_path) {
        const { data: signed } = await supabase.storage.from("profile-photos").createSignedUrl(data.avatar_path, 3600);
        setAvatarUrl(signed?.signedUrl ?? null);
      }
    });
  }, [user]);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    setStatus("");
    const file = new FormData(event.currentTarget).get("photo");
    let nextAvatarPath = avatarPath;
    if (file instanceof File && file.size > 0) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      nextAvatarPath = `${user.id}/avatar.${extension}`;
      const { error: uploadError } = await supabase.storage.from("profile-photos").upload(nextAvatarPath, file, { upsert: true });
      if (uploadError) {
        setStatus(uploadError.message);
        setSaving(false);
        return;
      }
      const { data: signed } = await supabase.storage.from("profile-photos").createSignedUrl(nextAvatarPath, 3600);
      setAvatarUrl(signed?.signedUrl ?? null);
      setAvatarPath(nextAvatarPath);
    }
    const { error } = await supabase.from("profiles").upsert({
      user_id: user.id,
      full_name: fullName.trim(),
      whatsapp: whatsapp.trim(),
      avatar_path: nextAvatarPath,
      preferences: { propertyInterest: preference.trim() },
      updated_at: new Date().toISOString(),
    });
    setStatus(error ? error.message : (isEnglish ? "Profile saved." : "Profil berhasil disimpan."));
    setSaving(false);
  }

  if (loading) return <div className="mx-auto max-w-xl px-4 py-16 text-center text-muted-foreground">{isEnglish ? "Loading…" : "Memuat…"}</div>;
  if (!user) return <div className="mx-auto max-w-xl px-4 py-16 text-center"><h1 className="text-2xl font-bold">{isEnglish ? "Please log in" : "Silakan masuk"}</h1><Link to="/login" className="mt-5 inline-flex rounded-lg bg-primary px-5 py-2.5 font-bold text-primary-foreground">{isEnglish ? "Log in" : "Masuk"}</Link></div>;

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold">{isEnglish ? "My Profile" : "Profil Saya"}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
      <form onSubmit={saveProfile} className="mt-7 space-y-5 rounded-lg border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary font-bold text-secondary-foreground">
            {avatarUrl ? <img src={avatarUrl} alt="Foto profil" className="size-full object-cover" /> : (fullName || user.email || "A").slice(0, 1).toUpperCase()}
          </div>
          <label className="text-sm font-semibold">{isEnglish ? "Profile photo" : "Foto profil"}<input name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full text-xs text-muted-foreground" /></label>
        </div>
        <label className="block text-sm font-semibold">{isEnglish ? "Full name" : "Nama lengkap"}<input value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 w-full rounded-lg border bg-background px-3 py-2 font-normal" /></label>
        <label className="block text-sm font-semibold">WhatsApp<input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required type="tel" className="mt-1 w-full rounded-lg border bg-background px-3 py-2 font-normal" /></label>
        <label className="block text-sm font-semibold">{isEnglish ? "Property preference" : "Preferensi hunian"}<input value={preference} onChange={(e) => setPreference(e.target.value)} placeholder={isEnglish ? "Example: Type 45/90" : "Contoh: Tipe 45/90"} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 font-normal" /></label>
        <Button type="submit" disabled={saving} className="w-full">{saving ? (isEnglish ? "Saving…" : "Menyimpan…") : (isEnglish ? "Save profile" : "Simpan profil")}</Button>
        {status && <p role="status" className="text-center text-sm text-muted-foreground">{status}</p>}
      </form>
    </div>
  );
}