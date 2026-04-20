import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function OpenTheAccessButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button 
      className="group relative overflow-hidden text-2xl font-semibold px-12 py-8 h-auto rounded-xl" 
      size="lg" 
      onClick={onClick}
    >
      <span className="mr-12 transition-opacity duration-500 group-hover:opacity-0">
        Access your gift
      </span>
      <i className="absolute right-2 top-2 bottom-2 rounded-lg z-10 grid w-[4rem] place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-1rem)] group-active:scale-95 text-white">
        <ChevronRight size={32} strokeWidth={2.5} aria-hidden="true" />
      </i>
    </Button>
  );
}

