import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SettingsForm } from "@/components/admin/settings-form";
import { InviteUserForm } from "@/components/admin/invite-user-form";
import { AdminCard } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function initialsFrom(name: string) {
  return name
    .split(/[\s.@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).single();

  const admin = createAdminClient();
  const users = admin ? (await admin.auth.admin.listUsers()).data.users : [];

  return (
    <div>
      <SettingsForm settings={settings} />

      <div className="mt-6 max-w-md">
        <AdminCard title="Utilisateurs">
          {!admin ? (
            <p className="text-[13px] text-cool">
              Ajoutez <span className="font-mono text-signal/70">SUPABASE_SERVICE_ROLE_KEY</span>{" "}
              aux variables d&apos;environnement pour gérer les comptes depuis cette page.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {users.map((u) => {
                const name = (u.user_metadata?.full_name as string | undefined) ?? u.email ?? "";
                return (
                  <div key={u.id} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/20 text-[12px] font-semibold text-signal">
                      {initialsFrom(name) || "?"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] text-bone">{name}</p>
                      <p className="truncate text-[12px] text-cool">{u.email}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-bone">
                      Admin
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <InviteUserForm />
        </AdminCard>
      </div>
    </div>
  );
}
