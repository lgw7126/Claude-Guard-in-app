"use client";
import { useState } from "react";
import type { EmergencyContact } from "@/types";
import { showToast } from "@/components/Toast";

interface Props {
  contacts: EmergencyContact[];
  onSave: (contacts: EmergencyContact[]) => void;
  onClose: () => void;
}

export default function EmergencyContactsSheet({ contacts, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<EmergencyContact[]>(contacts);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      showToast("이름과 전화번호를 입력해주세요", "error");
      return;
    }
    if (draft.length >= 3) {
      showToast("최대 3명까지 추가할 수 있어요", "error");
      return;
    }
    setDraft((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newName.trim(), phone: newPhone.trim() },
    ]);
    setNewName("");
    setNewPhone("");
    setAdding(false);
  };

  const remove = (id: string) => setDraft((prev) => prev.filter((c) => c.id !== id));

  const handleSave = () => {
    onSave(draft);
    showToast("비상연락망이 저장되었습니다", "success");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50 animate-fade-in" onClick={onClose} />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 animate-slide-up">
        <div className="bg-[#1A1A1A] rounded-t-3xl border-t border-x border-[#2E2E2E] px-5 pt-4 pb-8">
          <div className="w-10 h-1 bg-[#3A3A3A] rounded-full mx-auto mb-5" />

          <h2 className="text-white font-bold text-xl tracking-tight mb-1">비상연락망 설정</h2>
          <p className="text-[#A0A0A0] text-sm mb-5 tracking-tight">
            SOS 누르는 순간 위치가 즉시 전송됩니다
          </p>

          {/* Fixed emergency numbers */}
          <div className="bg-red-950/30 border border-red-900/40 rounded-xl p-4 mb-5 space-y-2.5">
            <p className="text-red-300/60 text-[10px] font-bold tracking-widest uppercase mb-1">
              항상 포함 (수정 불가)
            </p>
            {[
              { icon: "🚔", name: "112 경찰 신고", desc: "SOS 화면에 즉시 연결" },
              { icon: "🚑", name: "119 응급 구조", desc: "SOS 화면에 즉시 연결" },
              { icon: "👩", name: "117 여성 긴급전화", desc: "SOS 화면에 즉시 연결" },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">{item.name}</p>
                  <p className="text-red-300/50 text-xs">{item.desc}</p>
                </div>
                <span className="text-green-400 text-[10px] font-bold">항상 켜짐</span>
              </div>
            ))}
          </div>

          {/* Custom contacts */}
          <p className="text-[#A0A0A0] text-[10px] font-bold tracking-widest uppercase mb-3">
            내 연락처 ({draft.length}/3)
          </p>
          <div className="space-y-2.5 mb-4">
            {draft.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-[#252525] rounded-xl px-4 py-3 border border-[#333]">
                <div className="w-9 h-9 rounded-lg bg-[#7AA884]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#7AA884] text-sm font-bold">{c.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-[#A0A0A0] text-xs">{c.phone}</p>
                </div>
                <button
                  onClick={() => remove(c.id)}
                  className="text-[#555] hover:text-red-400 transition-colors text-lg leading-none w-8 h-8 flex items-center justify-center"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            ))}

            {adding ? (
              <div className="bg-[#252525] rounded-xl p-4 border border-[#7AA884]/30 space-y-3">
                <input
                  type="text"
                  placeholder="이름 (예: 엄마, 친구 민지)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#1E1E1E] border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#7AA884] min-h-[48px]"
                />
                <input
                  type="tel"
                  placeholder="전화번호 (예: 010-1234-5678)"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#1E1E1E] border border-[#333] rounded-xl px-4 py-3 text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#7AA884] min-h-[48px]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setAdding(false); setNewName(""); setNewPhone(""); }}
                    className="flex-1 border border-[#2A2A2A] text-[#A0A0A0] rounded-xl py-3 text-sm active:scale-95 min-h-[48px]"
                  >
                    취소
                  </button>
                  <button
                    onClick={addContact}
                    className="flex-[2] bg-[#7AA884] text-[#121212] rounded-xl py-3 text-sm font-bold active:scale-95 min-h-[48px]"
                  >
                    추가
                  </button>
                </div>
              </div>
            ) : draft.length < 3 ? (
              <button
                onClick={() => setAdding(true)}
                className="w-full flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl py-3.5 text-[#555] text-sm transition-all hover:border-[#7AA884]/40 hover:text-[#7AA884] active:scale-95 min-h-[48px]"
              >
                + 연락처 추가
              </button>
            ) : null}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 min-h-[56px]"
          >
            저장하기
          </button>
        </div>
      </div>
    </>
  );
}
