"use client";
import { useState, useEffect } from "react";
import type { ServiceType, AppFlowState } from "@/types";

interface Props {
  service: ServiceType;
  flowState: Exclude<AppFlowState, "idle" | "sheet">;
  onComplete: () => void;
  onEscalate: () => void;
  onClose: () => void;
}

const serviceLabels: Record<ServiceType, string> = {
  medicine: "긴급 약 배달",
  pet: "펫 응급 돌봄",
  escort: "안심 동행",
};

const helpers: Record<
  ServiceType,
  { name: string; rating: string; reviewCount: number; badge: string; etaSecs: number; distance: string }
> = {
  medicine: {
    name: "김지은 헬퍼",
    rating: "4.9",
    reviewCount: 124,
    badge: "신원 보안 인증",
    etaSecs: 8 * 60,
    distance: "0.7 km",
  },
  pet: {
    name: "이수민 헬퍼",
    rating: "5.0",
    reviewCount: 88,
    badge: "펫케어 전문 인증",
    etaSecs: 12 * 60,
    distance: "1.0 km",
  },
  escort: {
    name: "박채린 헬퍼",
    rating: "4.8",
    reviewCount: 203,
    badge: "안전 동행 인증",
    etaSecs: 5 * 60,
    distance: "0.4 km",
  },
};

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MatchingFlow({
  service,
  flowState,
  onComplete,
  onEscalate,
  onClose,
}: Props) {
  const helper = helpers[service];
  const [countdown, setCountdown] = useState(helper.etaSecs);

  // Auto-advance timers (demo): pet→escalation @5s, others→success @3s
  useEffect(() => {
    if (flowState !== "matching") return;
    if (service === "pet") {
      const t = setTimeout(onEscalate, 5000);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 3000);
      return () => clearTimeout(t);
    }
  }, [flowState, service, onComplete, onEscalate]);

  // Countdown ticks only in success state
  useEffect(() => {
    if (flowState !== "success") return;
    if (countdown <= 0) return;
    const interval = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(interval);
  }, [flowState, countdown]);

  const serviceLabel = serviceLabels[service];

  return (
    <div className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md">
        {/* ── MATCHING ── */}
        {flowState === "matching" && (
          <div className="text-center">
            {/* Spinner */}
            <div className="relative mx-auto w-20 h-20 mb-8">
              <div className="absolute inset-0 rounded-full border-2 border-[#2A2A2A]" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#7AA884] animate-spin-slow" />
              <div className="absolute inset-2 rounded-full bg-[#7AA884]/10 flex items-center justify-center">
                <span className="text-xl" role="img" aria-label="search">🔍</span>
              </div>
            </div>

            <h2 className="text-white text-2xl font-bold tracking-tight mb-1">
              매칭 중...
            </h2>
            <p className="text-[#7AA884] text-sm font-semibold mb-2">{serviceLabel}</p>
            <p className="text-[#A0A0A0] text-sm leading-relaxed tracking-tight">
              반경 1km 이내 안전 헬퍼<br />매칭 중입니다
            </p>

            <button
              onClick={onClose}
              className="mt-10 px-6 py-3.5 text-[#A0A0A0] text-sm border border-[#2A2A2A] rounded-2xl transition-all active:scale-95 active:bg-white/5 min-h-[48px]"
            >
              요청 취소
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {flowState === "success" && (
          <div className="animate-fade-in">
            {/* Check */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#7AA884]/15 border-2 border-[#7AA884] flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-[#7AA884]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-white text-2xl font-bold tracking-tight">매칭 완료!</h2>
              <p className="text-[#A0A0A0] text-sm mt-1">헬퍼가 이동을 시작했습니다</p>
            </div>

            {/* Helper card */}
            <div className="bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] p-5 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#7AA884]/15 border border-[#7AA884]/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#7AA884] text-2xl font-black">
                    {helper.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold text-base tracking-tight">
                    {helper.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white text-sm font-semibold">{helper.rating}</span>
                    <span className="text-[#A0A0A0] text-xs">· 리뷰 {helper.reviewCount}개</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-semibold bg-[#7AA884]/10 text-[#7AA884] px-2.5 py-1 rounded-full border border-[#7AA884]/25">
                  ✓ 신원 보안 인증
                </span>
                <span className="text-[10px] font-semibold bg-[#7AA884]/10 text-[#7AA884] px-2.5 py-1 rounded-full border border-[#7AA884]/25">
                  ✓ {helper.badge}
                </span>
              </div>

              {/* ETA bar */}
              <div className="flex items-center justify-between bg-[#252525] rounded-xl px-4 py-3">
                <div>
                  <p className="text-[#A0A0A0] text-[10px] tracking-tight">예상 도착까지</p>
                  <p className="text-white font-bold text-2xl tracking-tight font-mono">
                    {formatTime(countdown)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#A0A0A0] text-[10px] tracking-tight">거리</p>
                  <p className="text-white font-semibold text-base">{helper.distance}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-[#252525] rounded-2xl py-4 border border-[#2A2A2A] text-white text-sm font-medium transition-all active:scale-95 min-h-[56px]">
                📞 전화 연결
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-2 bg-[#7AA884]/10 rounded-2xl py-4 border border-[#7AA884]/30 text-[#7AA884] text-sm font-bold transition-all active:scale-95 min-h-[56px]"
              >
                확인 완료
              </button>
            </div>
          </div>
        )}

        {/* ── ESCALATION ── */}
        {flowState === "escalation" && (
          <div className="animate-fade-in text-center">
            <div className="w-20 h-20 rounded-full bg-red-900/30 border border-red-700/60 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h2 className="text-white text-xl font-bold tracking-tight mb-2">
              주변 헬퍼 응답 지연
            </h2>
            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8 tracking-tight">
              인근 헬퍼가 응답하지 않고 있습니다.
              <br />
              24시간 관제 센터에 직통 연결하시겠습니까?
            </p>

            <button className="w-full bg-red-900/50 text-red-300 border border-red-800 rounded-2xl py-4 font-bold text-base mb-3 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[56px]">
              📞 관제 센터 직통 연결
            </button>

            <button
              onClick={onClose}
              className="w-full border border-[#2A2A2A] text-[#A0A0A0] rounded-2xl py-3.5 text-sm transition-all active:scale-95 active:bg-white/5 min-h-[48px]"
            >
              계속 기다리기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
