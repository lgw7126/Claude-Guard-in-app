"use client";
import { useState } from "react";
import type { TabId } from "@/types";
import BottomNav from "@/components/BottomNav";
import HomeTab from "@/components/tabs/HomeTab";
import CareTab from "@/components/tabs/CareTab";
import FeedTab from "@/components/tabs/FeedTab";

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] flex justify-center">
      <div
        className="relative w-full max-w-md bg-[#121212] flex flex-col min-h-[100dvh]"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.9)" }}
      >
        <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          {activeTab === "home" && <HomeTab />}
          {activeTab === "care" && <CareTab />}
          {activeTab === "feed" && <FeedTab />}
        </main>
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
