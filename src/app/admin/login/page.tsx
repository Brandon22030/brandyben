import type { Metadata } from "next";
import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = { title: "Connexion" };

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-[120px]"
      />

      <div className="w-full max-w-sm rounded-[22px] border border-white/10 bg-white/[0.028] p-8">
        <div className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-sans text-[18px] font-bold tracking-[-0.05em] text-bone">
            BRANDYBEN
          </span>
        </div>

        <h1 className="mt-6 font-sans text-[22px] font-bold tracking-[-0.03em] text-bone">
          Espace administration
        </h1>
        <p className="mt-2 text-[13.5px] text-cool">
          Réservé à Brandon et Bennett. Connexion par e-mail et mot de passe.
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
