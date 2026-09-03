import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Client service_role, réservé au serveur (jamais importé côté client).
// Nécessite SUPABASE_SERVICE_ROLE_KEY : utilisé uniquement pour les opérations
// hors RLS, comme la gestion des deux comptes fondateurs (Auth Admin API).
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) return null;

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
