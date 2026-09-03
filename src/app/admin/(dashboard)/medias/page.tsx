import { createClient } from "@/lib/supabase/server";
import { AdminCard } from "@/components/admin/ui";
import { MediaGrid, type MediaItem } from "@/components/admin/media-grid";

export const dynamic = "force-dynamic";

async function listBucket(
  supabase: Awaited<ReturnType<typeof createClient>>,
  bucket: "logos" | "projects"
): Promise<MediaItem[]> {
  const { data } = await supabase.storage.from(bucket).list("", { limit: 100 });
  return (data ?? [])
    .filter((f) => f.id)
    .map((f) => ({
      path: f.name,
      url: supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl,
    }));
}

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const [logos, projects] = await Promise.all([
    listBucket(supabase, "logos"),
    listBucket(supabase, "projects"),
  ]);

  return (
    <div>
      <h1 className="font-sans text-[24px] font-bold tracking-[-0.03em] text-bone">Médias</h1>
      <p className="mt-1 text-[13.5px] text-cool">
        Fichiers envoyés depuis les fiches client, projet, témoignage et article.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        <AdminCard title="Bucket logos">
          <MediaGrid bucket="logos" items={logos} />
        </AdminCard>
        <AdminCard title="Bucket projects">
          <MediaGrid bucket="projects" items={projects} />
        </AdminCard>
      </div>
    </div>
  );
}
