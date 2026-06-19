"use client";
import { useState } from "react";

interface Props {
  onComplete: () => void;
}

const steps = [
  {
    icon: "🛡️",
    title: "가드인에 오신 것을\n환영합니다",
    desc: "1인 여성 가구를 위한\n하이퍼로컬 안전망 플랫폼입니다",
    accent: "Guard-In (園)",
  },
  {
    icon: "🔍",
    title: "반경 1km 내\n검증된 헬퍼 연결",
    desc: "신원 · 경력 · 범죄경력회보서를\n모두 내부에서 검증합니다",
    accent: "2번의 터치로 즉시 연결",
  },
  {
    icon: "📍",
    title: "GPS 인증으로\n더 안전하게",
    desc: "현재 위치를 기반으로\n주변 안전 정보를 제공합니다",
    accent: "위치 기반 신뢰 커뮤니티",
  },
];

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  const isLast = step === steps.length - 1;
  const current = steps[step];

  const handleNext = () => {
    if (!isLast) {
      setStep((s) => s + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#121212] z-[150] flex flex-col px-8 py-safe animate-fade-in">
      {/* Top — skip */}
      <div className="flex justify-end pt-14 pb-4">
        <button
          onClick={onComplete}
          className="text-[#A0A0A0] text-sm font-medium min-h-[44px] min-w-[44px] flex items-center justify-end active:opacity-60"
        >
          건너뛰기
        </button>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="w-28 h-28 rounded-[2rem] bg-[#7AA884]/10 border border-[#7AA884]/20 flex items-center justify-center mb-8">
          <span className="text-6xl" role="img" aria-hidden>
            {current.icon}
          </span>
        </div>

        {/* Accent chip */}
        <div className="bg-[#7AA884]/10 border border-[#7AA884]/25 text-[#7AA884] text-[11px] font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-6">
          {current.accent}
        </div>

        <h1 className="text-white text-[1.7rem] font-black tracking-tight leading-tight mb-4 whitespace-pre-line">
          {current.title}
        </h1>
        <p className="text-[#A0A0A0] text-sm leading-relaxed whitespace-pre-line">
          {current.desc}
        </p>
      </div>

      {/* Bottom */}
      <div className="pb-12 space-y-5">
        {/* Step indicator */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === step ? "w-7 h-2 bg-[#7AA884]" : "w-2 h-2 bg-[#2A2A2A]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-black text-base transition-all active:scale-95 min-h-[56px]"
        >
          {isLast ? "시작하기" : "다음"}
        </button>
      </div>
    </div>
  );
}
