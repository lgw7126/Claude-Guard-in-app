"use client";
import { useState } from "react";
import ExpertDetail, { Expert } from "@/components/ExpertDetail";

const experts: Expert[] = [
  {
    id: 1,
    name: "박서연",
    specialty: "배관 · 누수 수리",
    rating: "4.9",
    reviews: 87,
    isWoman: true,
    isVerified: true,
    isCriminalCleared: true,
    availableNow: true,
    price: "₩35,000~",
    experience: "경력 8년",
  },
  {
    id: 2,
    name: "최유나",
    specialty: "전기 · 콘센트 교체",
    rating: "5.0",
    reviews: 124,
    isWoman: true,
    isVerified: true,
    isCriminalCleared: true,
    availableNow: false,
    price: "₩28,000~",
    experience: "경력 12년",
  },
  {
    id: 3,
    name: "이현경",
    specialty: "가전제품 설치 · AS",
    rating: "4.8",
    reviews: 63,
    isWoman: true,
    isVerified: true,
    isCriminalCleared: true,
    availableNow: true,
    price: "₩40,000~",
    experience: "경력 6년",
  },
  {
    id: 4,
    name: "김다은 · 정수진 (2인팀)",
    specialty: "도배 · 인테리어",
    rating: "4.9",
    reviews: 201,
    isWoman: true,
    isVerified: true,
    isCriminalCleared: true,
    availableNow: true,
    price: "₩80,000~",
    experience: "팀 경력 5년",
  },
  {
    id: 5,
    name: "오지현 · 한소희 (2인팀)",
    specialty: "방역 · 청소 전문",
    rating: "4.7",
    reviews: 45,
    isWoman: true,
    isVerified: true,
    isCriminalCleared: true,
    availableNow: false,
    price: "₩60,000~",
    experience: "팀 경력 3년",
  },
];

export default function CareTab() {
  const [womanFirst, setWomanFirst] = useState(false);
  const [duoOnly, setDuoOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Expert | null>(null);

  if (selected) {
    return <ExpertDetail expert={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = experts.filter((e) => {
    if (duoOnly && !e.name.includes("팀")) return false;
    if (query && !e.specialty.includes(query) && !e.name.includes(query)) return false;
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-[1.6rem] font-bold tracking-tight text-white mb-1">
          안심 홈가드
        </h1>
        <p className="text-[#A0A0A0] text-sm tracking-tight">
          자격증 · 범죄경력회보서 검증 완료 전문가
        </p>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="수리 분야 검색 (예: 배관, 전기)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-[#555] text-sm focus:outline-none focus:border-[#7AA884] transition-colors min-h-[48px]"
          />
        </div>
      </div>

      {/* Filter toggles */}
      <div className="px-5 mb-5 flex gap-2.5 flex-wrap">
        {[
          { label: "여성 전문가 우선", icon: "👩", active: womanFirst, toggle: () => setWomanFirst(!womanFirst) },
          { label: "2인 1조 동행", icon: "👥", active: duoOnly, toggle: () => setDuoOnly(!duoOnly) },
        ].map(({ label, icon, active, toggle }) => (
          <button
            key={label}
            onClick={toggle}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 min-h-[48px] ${
              active
                ? "bg-[#7AA884]/15 text-[#7AA884] border-[#7AA884]/40"
                : "bg-[#1E1E1E] text-[#A0A0A0] border-[#2A2A2A]"
            }`}
          >
            <span className="text-base" role="img" aria-hidden>
              {icon}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Expert cards */}
      <div className="px-5 space-y-3 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#A0A0A0] text-sm">조건에 맞는 전문가가 없습니다</p>
          </div>
        ) : (
          filtered.map((expert) => (
            <button
              key={expert.id}
              onClick={() => setSelected(expert)}
              className="w-full text-left bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] p-4 transition-all active:scale-[0.99] active:bg-[#252525] hover:border-[#3A3A3A] focus:outline-none focus:ring-2 focus:ring-[#7AA884]/30"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl bg-[#7AA884]/15 border border-[#7AA884]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#7AA884] text-lg font-black">{expert.name[0]}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <p className="text-white font-bold text-sm tracking-tight">{expert.name}</p>
                    {expert.availableNow && (
                      <span className="text-[9px] font-bold bg-[#7AA884]/15 text-[#7AA884] px-2 py-0.5 rounded-full border border-[#7AA884]/25">
                        즉시 예약
                      </span>
                    )}
                  </div>
                  <p className="text-[#A0A0A0] text-xs mb-2 tracking-tight">{expert.specialty}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {expert.isVerified && (
                      <span className="text-[9px] font-semibold bg-[#7AA884]/10 text-[#7AA884] px-2 py-0.5 rounded-full border border-[#7AA884]/20">
                        ✓ 경력 검증
                      </span>
                    )}
                    {expert.isCriminalCleared && (
                      <span className="text-[9px] font-semibold bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800/30">
                        🔒 신원 인증
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-white text-xs font-semibold">{expert.rating}</span>
                      <span className="text-[#A0A0A0] text-xs">({expert.reviews})</span>
                    </div>
                    <p className="text-[#7AA884] text-xs font-semibold">{expert.price}</p>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
