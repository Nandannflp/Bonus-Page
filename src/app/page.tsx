import LegacyLayout from "@/components/LegacyLayout";
import SignupModal from "@/components/demo";
import TocDialog from "@/components/terms-conditions";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Absolute overlay to showcase the new shadcn/ui components integration */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex gap-4 p-4 bg-background/80 backdrop-blur-md rounded-2xl border shadow-lg">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium mr-2">New Integrations:</p>
          <SignupModal />
          <TocDialog />
        </div>
      </div>
      
      {/* The previously converted legacy html/css app */}
      <LegacyLayout />
    </main>
  );
}
