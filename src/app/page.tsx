"use client";

import { useState, useEffect } from "react";
import LegacyLayout from "@/components/LegacyLayout";
import { OpenTheAccessButton } from "@/components/ui/get-started-button";

export default function Home() {
  const [accessGranted, setAccessGranted] = useState(false);

  const handleAccess = () => {
    setAccessGranted(true);
    setTimeout(() => {
      const mainApp = document.getElementById("main-app");
      if (mainApp) {
        mainApp.classList.remove("hidden");
        // Give it a small delay for smooth transition
        setTimeout(() => {
          mainApp.classList.add("visible");
        }, 50);
      }
    }, 100);
  };

  return (
    <main className="relative min-h-screen">
      {!accessGranted && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">

          <div className="z-10">
            <OpenTheAccessButton onClick={handleAccess} />
          </div>
        </div>
      )}
      
      {/* We always maintain the LegacyLayout to keep the app.js running, specifically the background particle canvas, and the main app HTML. */}
      {/* The main-app dive inside LegacyLayout defaults to hidden. When button is clicked, we toggle it above. */}
      <LegacyLayout />
    </main>
  );
}
