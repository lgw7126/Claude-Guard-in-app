"use client";
import { useState, useCallback } from "react";
import type { ServiceType, AppFlowState } from "@/types";
import SOSBottomSheet from "@/components/SOSBottomSheet";
import MatchingFlow from "@/components/MatchingFlow";

export default function HomeTab() {
  const [flowState, setFlowState] = useState<AppFlowState>("idle");
  const [service, setService] = useState<ServiceType | null>(null);

  const handleSOSPress = () => setFlowState("sheet");
  const handleSheetClose = () => setFlowState("idle");

  const handleServiceSelect = useCallback((svc: ServiceType) => {
    setService(svc);
    setFlowState("matching");
  }, []);

  const handleComplete = useCallback(() => setFlowState("success"), []);
  const handleEscalate = useCallback(() => setFlowState("escalation"), []);
  const handleReset = useCallback(() => {
    setFlowState("idle");
    setService(null);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100dvh-80px)]">
      {/* Status bar */}
      <div className="px-5 pt-12 pb-2 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AA884] opacity-70" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7AA884]" />
          </span>
          <span className="text-[#7AA884] text-xs font-bold tracking-widest uppercase">
            LIVE
          </span>
        </div>
        <p className="text-[#A0A0A0] text-sm tracking-tight">
          현재{" "}
          <span className="text-white font-medium">서울시 강남구 역삼동</span>{" "}
          안전 구역
        </p>
      </div>

      {/* Greeting */}
      <div className="px-5 pb-6 pt-3">
        <h1 className="text-[1.6rem] font-bold tracking-tight text-white leading-tight">
          안녕하세요,
          <br />
          <span className="text-[#7AA884]">도움이 필요하신가요?</span>
        </h1>
        <p className="text-[#A0A0A0] text-sm mt-2 tracking-tight">
          2번의 터치로 반경 1km 내 검증된 헬퍼 연결
        </p>
      </div>

      {/* SOS Button — occupies ~40% of visible height */}
      <div className="flex flex-col items-center justify-center flex-1 pb-4">
        <div className="relative flex items-center justify-center">
          {/* Outer pulse rings */}
          <span
            className="absolute w-60 h-60 rounded-full border border-[#7AA884]/15 animate-pulse-ring"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="absolute w-52 h-52 rounded-full border border-[#7AA884]/20 animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Main SOS button */}
          <button
            onClick={handleSOSPress}
            className="relative w-44 h-44 rounded-full bg-[#7AA884]/10 border-2 border-[#7AA884] flex flex-col items-center justify-center gap-0.5 transition-all duration-150 active:scale-95 active:bg-[#7AA884]/20 focus:outline-none focus:ring-4 focus:ring-[#7AA884]/30"
            style={{
              boxShadow:
                "0 0 50px rgba(122,168,132,0.12), inset 0 0 30px rgba(122,168,132,0.05)",
            }}
            aria-label="SOS 긴급 요청 버튼"
          >
            <span className="text-[#7AA884] text-5xl font-black tracking-widest leading-none">
              SOS
            </span>
            <span className="text-white/50 text-[11px] font-medium tracking-tight text-center leading-snug mt-1">
              눌러서 긴급 요청
            </span>
          </button>
        </div>
      </div>

      {/* Recent requests */}
      <div className="px-5 pb-6">
        <p className="text-[#A0A0A0] text-[10px] font-bold tracking-widest uppercase mb-3">
          최근 요청
        </p>
        <div className="space-y-2.5">
          {[
            { label: "안심 동행", time: "2일 전" },
            { label: "긴급 약 배달", time: "5일 전" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#1E1E1E] rounded-xl px-4 py-3.5 border border-[#2A2A2A]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#7AA884]/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#7AA884]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#A0A0A0] text-xs">{item.time}</span>
                <span className="text-[#7AA884] text-[10px] font-bold bg-[#7AA884]/10 px-2 py-0.5 rounded-full">
                  완료
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sheet overlay */}
      {flowState === "sheet" && (
        <SOSBottomSheet onSelect={handleServiceSelect} onClose={handleSheetClose} />
      )}

      {/* Matching/Success/Escalation fullscreen overlay */}
      {service &&
        (flowState === "matching" ||
          flowState === "success" ||
          flowState === "escalation") && (
          <MatchingFlow
            service={service}
            flowState={flowState}
            onComplete={handleComplete}
            onEscalate={handleEscalate}
            onClose={handleReset}
          />
        )}
    </div>
  );
}
