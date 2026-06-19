"use client";
import { useState } from "react";
import { showToast } from "@/components/Toast";

type Tag = "제보" | "후기" | "정보" | "안전";

interface Props {
  onClose: () => void;
  onSubmit: (content: string, tag: Tag) => void;
}

const TAGS: Tag[] = ["제보", "후기", "정보", "안전"];

const tagStyle: Record<Tag, string> = {
  안전: "bg-red-900/40 text-red-300 border-red-800/50",
  제보: "bg-orange-900/40 text-orange-300 border-orange-800/50",
  정보: "bg-blue-900/40 text-blue-300 border-blue-800/50",
  후기: "bg-[#7AA884]/20 text-[#7AA884] border-[#7AA884]/40",
};

const MIN_CHARS = 10;

export default function NewPostModal({ onClose, onSubmit }: Props) {
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<Tag>("후기");

  const canSubmit = content.trim().length >= MIN_CHARS;

  const handleSubmit = () => {
    if (!canSubmit) {
      showToast(`최소 ${MIN_CHARS}자 이상 입력해주세요`, "error");
      return;
    }
    onSubmit(content.trim(), tag);
    showToast("게시물이 등록되었습니다", "success");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50 animate-fade-in" onClick={onClose} />

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 animate-slide-up">
        <div className="bg-[#1A1A1A] rounded-t-3xl border-t border-x border-[#2E2E2E] px-5 pt-4 pb-8">
          <div className="w-10 h-1 bg-[#3A3A3A] rounded-full mx-auto mb-5" />

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-xl tracking-tight">동네에 알리기</h2>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AA884] opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AA884]" />
              </span>
              <span className="text-[#7AA884] text-[10px] font-bold">역삼동 인증</span>
            </div>
          </div>

          {/* Tag selector */}
          <div className="flex gap-2 mb-4">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 min-h-[44px] ${
                  tag === t ? tagStyle[t] : "bg-[#252525] text-[#A0A0A0] border-[#333333]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Text area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="이웃에게 알리고 싶은 내용을 입력해주세요..."
            maxLength={300}
            rows={5}
            className="w-full bg-[#252525] border border-[#333333] rounded-2xl p-4 text-white text-sm placeholder-[#555] resize-none focus:outline-none focus:border-[#7AA884] transition-colors leading-relaxed"
            style={{ WebkitUserSelect: "text", userSelect: "text" }}
          />

          <div className="flex justify-between items-center mt-1 mb-5">
            <span className={`text-xs transition-colors ${content.trim().length < MIN_CHARS && content.length > 0 ? "text-red-400" : "text-[#A0A0A0]"}`}>
              {content.trim().length < MIN_CHARS && content.length > 0
                ? `${MIN_CHARS - content.trim().length}자 더 입력해주세요`
                : ""}
            </span>
            <span className="text-[#A0A0A0] text-xs">{content.length}/300</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-[#2A2A2A] text-[#A0A0A0] rounded-2xl py-4 text-sm transition-all active:scale-95 min-h-[56px]"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="flex-[2] bg-[#7AA884] text-[#121212] rounded-2xl py-4 font-bold text-sm transition-all active:scale-95 disabled:opacity-30 min-h-[56px]"
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
