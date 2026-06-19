"use client";
import { useState, useEffect } from "react";
import type { TabId } from "@/types";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import CareTab from "@/components/tabs/CareTab";
import FeedTab from "@/components/tabs/FeedTab";
import Onboarding from "@/components/Onboarding";
import { ToastContainer } from "@/components/Toast";

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  // null = loading (checking localStorage), true/false = decided
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("guard-in-onboarded");
      setShowOnboarding(!seen);
    } catch {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    try {
      localStorage.setItem("guard-in-onboarded", "true");
    } catch {}
    setShowOnboarding(false);
  };

  // Loading splash — prevents layout flash
  if (showOnboarding === null) {
    return (
      <div className="min-h-[100dvh] bg-[#121212] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7AA884]/10 border border-[#7AA884]/20 flex items-center justify-center">
            <span className="text-3xl" role="img" aria-hidden>🛡️</span>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-[#7AA884] border-t-transparent animate-spin-slow" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] flex justify-center">
      <div
        className="relative w-full max-w-md bg-[#121212] flex flex-col min-h-[100dvh]"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.9)" }}
      >
        {/* Global toast notifications */}
        <ToastContainer />

        <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          {activeTab === "home" && <HomeTab />}
          {activeTab === "care" && <CareTab />}
          {activeTab === "feed" && <FeedTab />}
        </main>

        <BottomNav activeTab={activeTab} onChange={setActiveTab} />

        {/* Onboarding overlay */}
        {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
      </div>
    </div>
  );
}
