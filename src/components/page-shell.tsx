import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
