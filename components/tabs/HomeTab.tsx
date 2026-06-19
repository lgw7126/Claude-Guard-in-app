"use client";
import { useState, useCallback } from "react";
import type { ServiceType, AppFlowState, EmergencyContact } from "@/types";
import SOSAlert from "@/components/SOSAlert";
import EmergencyContactsSheet from "@/components/EmergencyContactsSheet";
import MatchingFlow from "@/components/MatchingFlow";

const SERVICES: { id: ServiceType; emoji: string; label: string; sub: string }[] = [
  { id: "medicine", emoji: "💊", label: "긴급 약 배달", sub: "약국 대리 수령" },
  { id: "pet",      emoji: "🐾", label: "펫 응급 돌봄", sub: "긴급 반려동물 케어" },
  { id: "escort",   emoji: "🛡️", label: "안심 동행",    sub: "외출 동반 서비스" },
];

export default function HomeTab() {
  // Emergency SOS
  const [sosActive, setSosActive] = useState(false);
  const [showContactsSheet, setShowContactsSheet] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

  // Service request
  const [flowState, setFlowState] = useState<AppFlowState>("idle");
  const [service, setService] = useState<ServiceType | null>(null);

  const handleServiceTap = useCallback((svc: ServiceType) => {
    setService(svc);
    setFlowState("matching");
  }, []);

  const handleComplete  = useCallback(() => setFlowState("success"),    []);
  const handleEscalate  = useCallback(() => setFlowState("escalation"), []);
  const handleReset     = useCallback(() => { setFlowState("idle"); setService(null); }, []);

  const inServiceFlow = service !== null &&
    (flowState === "matching" || flowState === "success" || flowState === "escalation");

  return (
    <div className="flex flex-col min-h-[calc(100dvh-80px)]">

      {/* ── STATUS BAR ── */}
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AA884] opacity-70" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7AA884]" />
          </span>
          <p className="text-[#A0A0A0] text-sm tracking-tight">
            <span className="text-white font-medium">서울시 강남구 역삼동</span>
            <span className="text-[#7AA884] font-bold text-xs ml-2">LIVE</span>
          </p>
        </div>

        {/* Emergency contacts shortcut */}
        <button
          onClick={() => setShowContactsSheet(true)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border transition-all active:scale-95 min-h-[40px] ${
            contacts.length > 0
              ? "bg-[#7AA884]/10 border-[#7AA884]/30 text-[#7AA884]"
              : "bg-[#1E1E1E] border-[#2A2A2A] text-[#A0A0A0]"
          }`}
          aria-label="비상연락망 설정"
        >
          <span className="text-sm">🆘</span>
          <span className="text-xs font-semibold">
            {contacts.length > 0 ? `연락처 ${contacts.length}명` : "연락처 없음"}
          </span>
        </button>
      </div>

      {/* ── SOS EMERGENCY BUTTON ── */}
      <div className="px-5 pb-5">
        <p className="text-[#A0A0A0] text-[10px] font-bold tracking-widest uppercase mb-3">
          긴급 신고
        </p>

        <button
          onClick={() => setSosActive(true)}
          className="relative w-full rounded-3xl bg-red-950/50 border border-red-800/50 py-7 flex flex-col items-center justify-center gap-3 transition-all active:scale-[0.98] active:bg-red-950/70 focus:outline-none focus:ring-4 focus:ring-red-500/25"
          style={{ boxShadow: "0 0 40px rgba(220,38,38,0.08)" }}
          aria-label="SOS 긴급 신고"
        >
          {/* Rings */}
          <span className="absolute w-28 h-28 rounded-full border border-red-600/12 animate-pulse-ring" style={{ animationDelay: "0s" }} />
          <span className="absolute w-20 h-20 rounded-full border border-red-600/18 animate-pulse-ring" style={{ animationDelay: "0.6s" }} />

          {/* Circle */}
          <div className="relative w-20 h-20 rounded-full bg-red-950/80 border-2 border-red-500/80 flex items-center justify-center"
            style={{ boxShadow: "0 0 24px rgba(220,38,38,0.25)" }}>
            <span className="text-red-400 text-2xl font-black tracking-widest">SOS</span>
          </div>

          <div className="text-center">
            <p className="text-white font-bold text-base tracking-tight">위급 상황 신고</p>
            <p className="text-red-300/60 text-xs mt-0.5 tracking-tight">
              {contacts.length > 0
                ? `연락처 ${contacts.length}명 위치 전송 + 112 / 119`
                : "112 경찰 · 119 응급 · 117 여성긴급전화"}
            </p>
          </div>
        </button>

        {/* Nudge to set up contacts */}
        {contacts.length === 0 && (
          <button
            onClick={() => setShowContactsSheet(true)}
            className="mt-2.5 w-full flex items-center justify-center gap-2 py-2.5 text-[#555] text-xs transition-all hover:text-[#7AA884] active:scale-95"
          >
            <span>⚠️</span>
            가족·친구를 비상연락처로 추가하면 위치가 자동 전송돼요
          </button>
        )}
      </div>

      {/* ── SERVICE REQUEST ── */}
      <div className="px-5 pb-5">
        <p className="text-[#A0A0A0] text-[10px] font-bold tracking-widest uppercase mb-3">
          도움 서비스 요청
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              onClick={() => handleServiceTap(svc.id)}
              className="flex flex-col items-center justify-center gap-2 bg-[#1E1E1E] rounded-2xl py-4 px-2 border border-[#2A2A2A] transition-all active:scale-95 active:bg-[#252525] hover:border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#7AA884]/25 min-h-[96px]"
            >
              <span className="text-2xl leading-none" role="img" aria-hidden>{svc.emoji}</span>
              <div className="text-center">
                <p className="text-white text-[11px] font-bold leading-snug tracking-tight">{svc.label}</p>
                <p className="text-[#555] text-[10px] mt-0.5">{svc.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── RECENT REQUESTS ── */}
      <div className="px-5 pb-8">
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
              <span className="text-white text-sm font-medium">{item.label}</span>
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

      {/* ── OVERLAYS ── */}
      {sosActive && (
        <SOSAlert contacts={contacts} onClose={() => setSosActive(false)} />
      )}
      {showContactsSheet && (
        <EmergencyContactsSheet
          contacts={contacts}
          onSave={setContacts}
          onClose={() => setShowContactsSheet(false)}
        />
      )}
      {inServiceFlow && service && (
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
