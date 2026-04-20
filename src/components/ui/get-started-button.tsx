import { ChevronRight, Gift } from "lucide-react";

export function OpenTheAccessButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(167,139,250,0.7)] shadow-[0_0_20px_rgba(167,139,250,0.4)]"
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
      <Gift className="mr-3 h-6 w-6 text-white/90 group-hover:animate-pulse" />
      <span className="text-2xl tracking-wide">Access Your Gift</span>
      <ChevronRight className="ml-3 h-6 w-6 text-white/70 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );
}

