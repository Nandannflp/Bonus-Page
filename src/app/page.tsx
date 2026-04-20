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
          <div className="z-10 text-center mb-8">
             <div className="flex justify-center mb-6">
                <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="url(#logo-grad-welcome)" strokeWidth="2.5" fill="none" />
                    <path d="M24 14L14 20V30L24 36L34 30V20L24 14Z" fill="url(#logo-grad-welcome)" opacity="0.3" />
                    <path d="M24 18L18 22V28L24 32L30 28V22L24 18Z" fill="url(#logo-grad-welcome)" />
                    <defs>
                        <linearGradient id="logo-grad-welcome" x1="6" y1="4" x2="42" y2="44">
                            <stop offset="0%" stopColor="#a78bfa" />
                            <stop offset="50%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                    </defs>
                </svg>
             </div>
             <h1 className="text-3xl font-bold text-white mb-2">Welcome to Your Bonuses</h1>
             <p className="text-gray-400">Your exclusive tools, courses, and rewards await.</p>
          </div>
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
