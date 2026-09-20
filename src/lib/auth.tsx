import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active) {
        setUser(data.user);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED" || event === "INITIAL_SESSION") {
        setUser(session?.user ?? null);
        setLoading(false);
        if (session?.user && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
          const metadata = session.user.user_metadata;
          void supabase.from("profiles").upsert({
            user_id: session.user.id,
            full_name: typeof metadata?.["full_name"] === "string" ? metadata["full_name"] : "",
            whatsapp: typeof metadata?.["whatsapp"] === "string" ? metadata["whatsapp"] : "",
            preferences: typeof metadata?.["preferences"] === "object" && metadata["preferences"] !== null ? metadata["preferences"] : {},
            updated_at: new Date().toISOString(),
          }, { onConflict: "user_id", ignoreDuplicates: true });
        }
      }
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user, loading, signOut: async () => { await supabase.auth.signOut(); } }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}