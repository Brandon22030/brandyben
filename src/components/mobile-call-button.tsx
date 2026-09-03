import { Phone } from "lucide-react";
import { getSettings } from "@/lib/settings";

export async function MobileCallButton() {
  const settings = await getSettings();
  const telephone = settings?.telephone ?? "+229 01 53 72 90 10";

  return (
    <a
      href={`tel:${telephone.replace(/\s+/g, "")}`}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-signal py-3.5 text-[14px] font-semibold text-white shadow-[0_12px_36px_rgba(79,124,255,0.3)] md:hidden"
    >
      <Phone size={16} />
      Appeler {telephone}
    </a>
  );
}
