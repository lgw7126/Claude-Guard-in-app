"use client";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export interface Expert {
  id: number;
  name: string;
  specialty: string;
  rating: string;
  reviews: number;
  isWoman: boolean;
  isVerified: boolean;
  isCriminalCleared: boolean;
  availableNow: boolean;
  price: string;
  experience: string;
}

interface Props {
  expert: Expert;
  onBack: () => void;
}


const mockReviews = [
  {
    user: "김**",
    text: "꼼꼼하고 친절하게 수리해주셨어요. 혼자 있어도 전혀 불안하지 않았습니다.",
    rating: 5,
    date: "2일 전",
  },
  {
    user: "이**",
    text: "여성 전문가라 안심이 됐어요. 작업도 깔끔하고 빠르게 마무리해 주셨습니다.",
    rating: 5,
    date: "1주 전",
  },
  {
    user: "박**",
    text: "신원 확인 뱃지가 있어서 믿고 불렀는데 역시 좋았습니다!",
    rating: 5,
    date: "2주 전",
  },
];

export default function ExpertDetail({ expert, onBack }: Props) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Nav bar */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] text-white transition-all active:scale-95 focus:outline-none flex-shrink-0"
          aria-label="뒤로"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-white font-bold text-lg tracking-tight">전문가 프로필</h2>
      </div>

      <div className="px-5 pb-36">
        {/* Profile card */}
        <div className="bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] p-5 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-[#7AA884]/15 border border-[#7AA884]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[#7AA884] text-3xl font-black">{expert.name[0]}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl tracking-tight">{expert.name}</h3>
              <p className="text-[#A0A0A0] text-sm">{expert.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400">★</span>
                <span className="text-white font-semibold">{expert.rating}</span>
                <span className="text-[#A0A0A0] text-sm">({expert.reviews}개 리뷰)</span>
              </div>
            </div>
          </div>

          {/* Verification badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {expert.isVerified && (
              <span className="text-xs font-semibold bg-[#7AA884]/10 text-[#7AA884] px-3 py-1.5 rounded-full border border-[#7AA884]/25">
                ✓ 경력 검증 완료
              </span>
            )}
            {expert.isCriminalCleared && (
              <span className="text-xs font-semibold bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800/40">
                🔒 신원 보안 인증
              </span>
            )}
            {expert.isWoman && (
              <span className="text-xs font-semibold bg-purple-900/30 text-purple-300 px-3 py-1.5 rounded-full border border-purple-800/40">
                👩 여성 전문가
              </span>
            )}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "경력", value: expert.experience },
              { label: "기본 요금", value: expert.price, green: true },
              { label: "자격증", value: "전문 자격증 보유" },
              { label: "범죄경력회보서", value: "검증 완료", green: true },
            ].map(({ label, value, green }) => (
              <div key={label} className="bg-[#252525] rounded-xl p-3">
                <p className="text-[#A0A0A0] text-[10px] mb-1">{label}</p>
                <p className={`font-semibold text-sm ${green ? "text-[#7AA884]" : "text-white"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <h4 className="text-white font-bold text-base tracking-tight mb-3">
          신뢰 리뷰
        </h4>
        <div className="space-y-3">
          {mockReviews.map((review, i) => (
            <div
              key={i}
              className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-semibold">{review.user}</span>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                </div>
                <span className="text-[#A0A0A0] text-xs">{review.date}</span>
              </div>
              <p className="text-[#A0A0A0] text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#121212]/95 backdrop-blur-sm border-t border-[#2A2A2A] p-4 pb-safe z-40">
        <div className="flex gap-3">
          <button className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl py-4 text-white text-sm font-medium transition-all active:scale-95 min-h-[56px]">
            📞 문의하기
          </button>
          <button
            onClick={() => setShowBooking(true)}
            className="flex-[2] bg-[#7AA884] rounded-2xl py-4 text-[#121212] text-sm font-bold transition-all active:scale-95 min-h-[56px]"
          >
            {expert.availableNow ? "즉시 예약하기" : "예약 문의하기"}
          </button>
        </div>
      </div>

      {showBooking && (
        <BookingModal expert={expert} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
}
