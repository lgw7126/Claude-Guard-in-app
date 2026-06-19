"use client";
import { useState, useCallback } from "react";
import type { ServiceType, AppFlowState, EmergencyContact } from "@/types";
import SOSAlert from "@/components/SOSAlert";
import EmergencyContactsSheet from "@/components/EmergencyContactsSheet";
import MatchingFlow from "@/components/MatchingFlow";

const SERVICES: { id: ServiceType; emoji: string; label: string; sub: string }[] = [
  { id: "medicine", emoji: "💊", label: "긴급 약 배달", sub: "약국 대리 수령" },
  { id: "pet",      emoji: "🐾", label: "펫 응급 돌봄", sub: "반려동물 긴급 케어" },
  { id: "escort",   emoji: "🛡️", label: "안심 동행",    sub: "외출 동반 서비스" },
];

export default function HomeTab() {
  const [sosActive, setSosActive] = useState(false);
  const [showContactsSheet, setShowContactsSheet] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);

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
    // Extra bottom padding: 80px (nav) + 72px (SOS bar) + 12px gap
    <div className="flex flex-col pb-[164px]">

      {/* ── HEADER ── */}
      <div className="px-5 pt-12 pb-6">
        {/* App name row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7AA884]/15 border border-[#7AA884]/25 flex items-center justify-center">
              <span className="text-lg" role="img" aria-hidden>🛡️</span>
            </div>
            <span className="text-[#7AA884] font-black text-xl tracking-tight">가드인</span>
          </div>

          {/* Contacts shortcut */}
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

        {/* Greeting */}
        <h1 className="text-[1.7rem] font-bold text-white tracking-tight leading-tight mb-1">
          안녕하세요 👋<br />
          <span className="text-[#7AA884]">오늘도 안전한 하루</span> 되세요
        </h1>
        <p className="text-[#A0A0A0] text-sm mt-1 tracking-tight">
          가드인이 곁에 있을게요
        </p>

        {/* Live location */}
        <div className="flex items-center gap-2 mt-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AA884] opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AA884]" />
          </span>
          <span className="text-[#7AA884] text-xs font-bold tracking-widest">LIVE</span>
          <span className="text-[#A0A0A0] text-xs">서울시 강남구 역삼동</span>
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div className="px-5 pb-6">
        <h2 className="text-white text-xl font-bold tracking-tight mb-1">
          도움 요청하기
        </h2>
        <p className="text-[#A0A0A0] text-sm mb-4 tracking-tight">
          반경 1km 내 검증된 헬퍼가 즉시 연결됩니다
        </p>

        <div className="grid grid-cols-3 gap-3">
          {SERVICES.map((svc) => (
            <button
              key={svc.id}
              onClick={() => handleServiceTap(svc.id)}
              className="flex flex-col items-center justify-center gap-2.5 bg-[#1E1E1E] rounded-2xl py-5 px-2 border border-[#2A2A2A] transition-all active:scale-95 active:bg-[#252525] hover:border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#7AA884]/25 min-h-[108px]"
            >
              <span className="text-3xl leading-none" role="img" aria-hidden>{svc.emoji}</span>
              <div className="text-center">
                <p className="text-white text-xs font-bold leading-snug tracking-tight">{svc.label}</p>
                <p className="text-[#555] text-[10px] mt-0.5">{svc.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── RECENT REQUESTS ── */}
      <div className="px-5">
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

      {/* ── FIXED SOS BAR — sits above bottom nav ── */}
      <div
        className="fixed z-30 w-full max-w-md px-4"
        style={{
          bottom: "calc(80px + env(safe-area-inset-bottom, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button
          onClick={() => setSosActive(true)}
          className="w-full flex items-center justify-between px-5 py-4 bg-red-700 rounded-2xl transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/30"
          style={{ boxShadow: "0 4px 24px rgba(220,38,38,0.35)" }}
          aria-label="SOS 긴급 신고"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm tracking-widest">SOS</span>
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-base leading-tight">위급 상황 신고</p>
              <p className="text-red-200/70 text-xs mt-0.5">
                {contacts.length > 0
                  ? `연락처 ${contacts.length}명 위치 전송 + 112 · 119`
                  : "112 경찰 · 119 응급 · 117 여성긴급전화"}
              </p>
            </div>
          </div>
          <svg className="w-5 h-5 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
