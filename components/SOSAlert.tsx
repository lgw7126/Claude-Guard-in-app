"use client";
import { useEffect, useState } from "react";
import type { EmergencyContact } from "@/types";

interface Props {
  contacts: EmergencyContact[];
  onClose: () => void;
}

export default function SOSAlert({ contacts, onClose }: Props) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSent(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#120000] z-50 flex flex-col animate-fade-in">
      {/* Top cancel */}
      <div className="flex justify-end px-5 pt-12 pb-4">
        <button
          onClick={onClose}
          className="text-red-300/60 text-sm border border-red-900/40 px-4 py-2 rounded-xl active:scale-95 min-h-[44px]"
        >
          오해였어요 ✕
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Pulsing icon */}
        <div className="relative mb-8">
          <span className="absolute inset-[-12px] rounded-full bg-red-600/10 animate-ping" style={{ animationDuration: "1.2s" }} />
          <span className="absolute inset-[-6px] rounded-full bg-red-600/15 animate-ping" style={{ animationDuration: "1.2s", animationDelay: "0.3s" }} />
          <div className="relative w-28 h-28 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center"
            style={{ boxShadow: "0 0 40px rgba(220,38,38,0.3)" }}>
            <span className="text-red-400 text-3xl font-black tracking-widest">SOS</span>
          </div>
        </div>

        <h1 className="text-white text-2xl font-bold tracking-tight mb-2">긴급 신고 중</h1>

        {/* Location */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-red-400 text-sm">📍</span>
          <span className="text-red-300/80 text-sm font-medium">서울시 강남구 역삼동</span>
          {!sent ? (
            <span className="w-3 h-3 rounded-full border-2 border-red-400 border-t-transparent animate-spin" />
          ) : (
            <span className="text-green-400 text-sm">✓ 전송됨</span>
          )}
        </div>

        {/* Contacts */}
        {contacts.length > 0 ? (
          <div className="w-full bg-red-950/40 border border-red-900/50 rounded-2xl p-4 mb-6">
            <p className="text-red-300/60 text-[10px] font-bold tracking-widest uppercase mb-3">
              위치 자동 전송 대상
            </p>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-900/50 flex items-center justify-center">
                      <span className="text-red-300 text-sm font-bold">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{c.name}</p>
                      <p className="text-red-300/50 text-xs">{c.phone}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold transition-colors ${sent ? "text-green-400" : "text-red-300/40"}`}>
                    {sent ? "✓ 전송됨" : "전송 중..."}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full bg-red-950/30 border border-red-900/40 rounded-2xl p-4 mb-6 text-center">
            <p className="text-red-300/60 text-sm">비상연락처 미설정 — 홈화면에서 추가하세요</p>
          </div>
        )}
      </div>

      {/* Emergency call buttons */}
      <div className="px-6 pb-10 space-y-3">
        <a
          href="tel:112"
          className="flex items-center justify-center gap-3 w-full bg-red-600 rounded-2xl py-5 text-white font-bold text-lg transition-all active:scale-95 min-h-[64px]"
          style={{ boxShadow: "0 4px 20px rgba(220,38,38,0.35)" }}
        >
          📞 112 경찰 신고
        </a>
        <a
          href="tel:119"
          className="flex items-center justify-center gap-3 w-full bg-[#1E1E1E] border border-red-900/60 rounded-2xl py-4 text-red-300 font-semibold text-sm transition-all active:scale-95 min-h-[56px]"
        >
          🚑 119 응급 구조
        </a>
        <a
          href="tel:117"
          className="flex items-center justify-center gap-3 w-full bg-[#1E1E1E] border border-red-900/40 rounded-2xl py-4 text-red-300/70 font-semibold text-sm transition-all active:scale-95 min-h-[56px]"
        >
          👩 117 여성 긴급전화
        </a>
        <button
          onClick={onClose}
          className="w-full text-red-300/30 text-sm py-3 min-h-[44px] active:scale-95"
        >
          오해였어요 — 신고 취소
        </button>
      </div>
    </div>
  );
}
