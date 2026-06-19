"use client";
import { useEffect } from "react";
import type { ServiceType } from "@/types";

interface Props {
  onSelect: (service: ServiceType) => void;
  onClose: () => void;
}

const services: { id: ServiceType; emoji: string; label: string; sub: string }[] = [
  { id: "medicine", emoji: "💊", label: "긴급 약 배달", sub: "약국 대리 수령" },
  { id: "pet", emoji: "🐾", label: "펫 응급 돌봄", sub: "긴급 반려동물 케어" },
  { id: "escort", emoji: "🛡️", label: "안심 동행", sub: "외출 동반 서비스" },
];

export default function SOSBottomSheet({ onSelect, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 animate-slide-up">
        <div className="bg-[#1A1A1A] rounded-t-3xl border-t border-x border-[#2E2E2E] px-5 pt-4 pb-8">
          {/* Handle */}
          <div className="w-10 h-1 bg-[#3A3A3A] rounded-full mx-auto mb-6" />

          <h2 className="text-white font-bold text-xl tracking-tight mb-1">
            어떤 도움이 필요하신가요?
          </h2>
          <p className="text-[#A0A0A0] text-sm mb-6 tracking-tight">
            반경 1km 내 검증된 헬퍼가 즉시 연결됩니다
          </p>

          {/* Service grid — 3 buttons, each ≥48×48 touch target */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => onSelect(svc.id)}
                className="flex flex-col items-center justify-center gap-2.5 bg-[#252525] rounded-2xl py-5 px-2 min-h-[120px] border border-[#333333] transition-all duration-150 active:scale-95 active:bg-[#7AA884]/10 active:border-[#7AA884]/50 focus:outline-none focus:ring-2 focus:ring-[#7AA884]/50"
              >
                <span className="text-3xl leading-none" role="img" aria-hidden>
                  {svc.emoji}
                </span>
                <div className="text-center">
                  <p className="text-white text-xs font-bold tracking-tight leading-snug">
                    {svc.label}
                  </p>
                  <p className="text-[#A0A0A0] text-[10px] mt-0.5 leading-snug">
                    {svc.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl border border-[#2A2A2A] text-[#A0A0A0] text-sm font-medium transition-all active:scale-95 active:bg-white/5 min-h-[48px]"
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
