"use client";
import { useState } from "react";
import type { Expert } from "@/components/ExpertDetail";
import { showToast } from "@/components/Toast";

interface Props {
  expert: Expert;
  onClose: () => void;
}

type Step = "date" | "time" | "confirm" | "success";

const DAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

const TIME_SLOTS = [
  { id: "morning",   label: "오전 09:00 – 11:00", available: true },
  { id: "noon",      label: "오후 12:00 – 14:00", available: true },
  { id: "afternoon", label: "오후 14:00 – 16:00", available: false },
  { id: "evening",   label: "오후 16:00 – 18:00", available: true },
];

function getNext7Days(): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

function formatDate(d: Date): string {
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${DAYS_KO[d.getDay()]})`;
}

export default function BookingModal({ expert, onClose }: Props) {
  const [step, setStep] = useState<Step>("date");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);

  const days = getNext7Days();
  const selectedTimeLabel = TIME_SLOTS.find((t) => t.id === selectedTimeId)?.label ?? "";

  const handleConfirm = () => {
    setStep("success");
    setTimeout(() => showToast(`${expert.name}님 예약 완료!`, "success"), 400);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50 animate-fade-in" onClick={step !== "success" ? onClose : undefined} />

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 animate-slide-up">
        <div className="bg-[#1A1A1A] rounded-t-3xl border-t border-x border-[#2E2E2E] px-5 pt-4 pb-8">
          <div className="w-10 h-1 bg-[#3A3A3A] rounded-full mx-auto mb-5" />

          {/* ─── STEP: DATE ─── */}
          {step === "date" && (
            <>
              <h2 className="text-white font-bold text-xl tracking-tight mb-1">날짜 선택</h2>
              <p className="text-[#A0A0A0] text-sm mb-5 tracking-tight">
                {expert.name} · {expert.specialty}
              </p>

              <div className="grid grid-cols-4 gap-2 mb-6">
                {days.map((d, i) => {
                  const active = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center py-3 rounded-xl border transition-all active:scale-95 min-h-[68px] ${
                        active
                          ? "bg-[#7AA884]/15 border-[#7AA884]/50"
                          : "bg-[#252525] border-[#333333]"
                      }`}
                    >
                      <span className={`text-[10px] font-semibold mb-1 ${active ? "text-[#7AA884]" : "text-[#A0A0A0]"}`}>
                        {DAYS_KO[d.getDay()]}
                      </span>
                      <span className={`text-lg font-bold leading-none ${active ? "text-[#7AA884]" : "text-white"}`}>
                        {d.getDate()}
                      </span>
                      {i === 0 && (
                        <span className="text-[8px] font-semibold text-[#7AA884] mt-1">오늘</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => selectedDate && setStep("time")}
                disabled={!selectedDate}
                className="w-full bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 disabled:opacity-30 min-h-[56px]"
              >
                다음 — 시간 선택
              </button>
            </>
          )}

          {/* ─── STEP: TIME ─── */}
          {step === "time" && selectedDate && (
            <>
              <h2 className="text-white font-bold text-xl tracking-tight mb-1">시간 선택</h2>
              <p className="text-[#A0A0A0] text-sm mb-5 tracking-tight">
                {formatDate(selectedDate)}
              </p>

              <div className="space-y-2.5 mb-6">
                {TIME_SLOTS.map((slot) => {
                  const active = selectedTimeId === slot.id;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedTimeId(slot.id)}
                      disabled={!slot.available}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl border transition-all active:scale-95 min-h-[56px] ${
                        active
                          ? "bg-[#7AA884]/15 border-[#7AA884]/50"
                          : slot.available
                          ? "bg-[#252525] border-[#333333]"
                          : "bg-[#1A1A1A] border-[#222222] opacity-40 cursor-not-allowed"
                      }`}
                    >
                      <span className={`text-sm font-semibold ${active ? "text-[#7AA884]" : slot.available ? "text-white" : "text-[#555]"}`}>
                        {slot.label}
                      </span>
                      {!slot.available && (
                        <span className="text-[#555] text-xs">예약 마감</span>
                      )}
                      {active && (
                        <svg className="w-5 h-5 text-[#7AA884]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("date")}
                  className="flex-1 border border-[#2A2A2A] text-[#A0A0A0] rounded-2xl py-4 text-sm transition-all active:scale-95 min-h-[56px]"
                >
                  이전
                </button>
                <button
                  onClick={() => selectedTimeId && setStep("confirm")}
                  disabled={!selectedTimeId}
                  className="flex-[2] bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 disabled:opacity-30 min-h-[56px]"
                >
                  다음 — 확인
                </button>
              </div>
            </>
          )}

          {/* ─── STEP: CONFIRM ─── */}
          {step === "confirm" && selectedDate && (
            <>
              <h2 className="text-white font-bold text-xl tracking-tight mb-5">예약 확인</h2>

              <div className="bg-[#252525] rounded-2xl p-4 mb-4 space-y-3.5">
                {[
                  { label: "전문가", value: expert.name },
                  { label: "서비스", value: expert.specialty },
                  { label: "날짜", value: formatDate(selectedDate) },
                  { label: "시간", value: selectedTimeLabel },
                  { label: "기본 요금", value: expert.price },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-[#A0A0A0] text-sm">{label}</span>
                    <span className="text-white text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-[#7AA884]/10 rounded-xl p-3 mb-5 border border-[#7AA884]/20">
                <svg className="w-4 h-4 text-[#7AA884] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-[#7AA884] text-xs font-medium">신원 보안 인증 완료된 전문가입니다</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("time")}
                  className="flex-1 border border-[#2A2A2A] text-[#A0A0A0] rounded-2xl py-4 text-sm transition-all active:scale-95 min-h-[56px]"
                >
                  이전
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-[2] bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 min-h-[56px]"
                >
                  예약 확정
                </button>
              </div>
            </>
          )}

          {/* ─── STEP: SUCCESS ─── */}
          {step === "success" && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#7AA884]/15 border-2 border-[#7AA884] flex items-center justify-center mx-auto mb-5">
                <svg className="w-10 h-10 text-[#7AA884]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold tracking-tight mb-2">예약 완료!</h2>
              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6 tracking-tight">
                {expert.name}님께서 방문 전<br />신원 인증 후 연락 드릴 예정입니다
              </p>
              <button
                onClick={onClose}
                className="w-full bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 min-h-[56px]"
              >
                확인
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
