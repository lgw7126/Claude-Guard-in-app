"use client";
import { useState } from "react";
import NewPostModal from "@/components/NewPostModal";

type Tag = "안전" | "제보" | "정보" | "후기";

interface Post {
  id: number;
  user: string;
  avatarChar: string;
  location: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  tag: Tag;
  liked: boolean;
}

const tagStyle: Record<Tag, string> = {
  안전: "bg-red-900/30 text-red-300 border-red-800/40",
  제보: "bg-orange-900/30 text-orange-300 border-orange-800/40",
  정보: "bg-blue-900/30 text-blue-300 border-blue-800/40",
  후기: "bg-[#7AA884]/15 text-[#7AA884] border-[#7AA884]/30",
};

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: "역삼동 주민 A",
    avatarChar: "A",
    location: "역삼동",
    time: "12분 전",
    content:
      "오늘 역삼역 2번 출구 근처에서 수상한 오토바이가 여러 번 지나다니고 있어요. 늦은 시간대 혼자 귀가하시는 분들 주의하세요.",
    likes: 24,
    comments: 8,
    tag: "제보",
    liked: false,
  },
  {
    id: 2,
    user: "도화동 주민 B",
    avatarChar: "B",
    location: "도화동",
    time: "1시간 전",
    content:
      "가드인 긴급 약 배달 써봤는데 정말 편했어요! 몸이 아파서 나갈 수가 없었는데 20분 만에 약이 도착했어요. 헬퍼 분이 신원 인증된 분이셔서 마음이 놓였습니다.",
    likes: 47,
    comments: 12,
    tag: "후기",
    liked: true,
  },
  {
    id: 3,
    user: "서초동 주민 C",
    avatarChar: "C",
    location: "서초동",
    time: "3시간 전",
    content:
      "안심 홈가드 박서연 전문가님 너무 좋으세요. 배관 수리인데 꼼꼼하고 여성이셔서 집에 혼자 있어도 전혀 무섭지 않았어요. 강추!",
    likes: 31,
    comments: 5,
    tag: "후기",
    liked: false,
  },
  {
    id: 4,
    user: "강남구 안전 정보",
    avatarChar: "S",
    location: "강남구",
    time: "5시간 전",
    content:
      "💡 안전 팁: 혼자 귀가할 때 경찰청 안심귀가 서비스를 함께 활용해보세요. 안전드림 앱에서 신청 가능합니다.",
    likes: 89,
    comments: 3,
    tag: "정보",
    liked: false,
  },
];

type Filter = "전체" | Tag;
const FILTERS: Filter[] = ["전체", "제보", "후기", "정보", "안전"];

let nextPostId = INITIAL_POSTS.length + 1;

export default function FeedTab() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState<Filter>("전체");
  const [showNewPost, setShowNewPost] = useState(false);

  const handleNewPost = (content: string, tag: Tag) => {
    const newPost: Post = {
      id: nextPostId++,
      user: "나 (역삼동)",
      avatarChar: "나",
      location: "역삼동",
      time: "방금",
      content,
      likes: 0,
      comments: 0,
      tag,
      liked: false,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const displayed = activeFilter === "전체" ? posts : posts.filter((p) => p.tag === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-[1.6rem] font-bold tracking-tight text-white">동네 피드</h1>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7AA884] opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7AA884]" />
            </span>
            <span className="text-[#7AA884] text-[10px] font-bold tracking-widest uppercase">
              GPS 인증
            </span>
          </div>
        </div>
        <p className="text-[#A0A0A0] text-sm tracking-tight">
          역삼동 반경 2km 이내 이웃 소식
        </p>
      </div>

      {/* Filter chips */}
      <div className="px-5 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 min-h-[48px] ${
              activeFilter === f
                ? "bg-[#7AA884]/15 text-[#7AA884] border-[#7AA884]/40"
                : "bg-[#1E1E1E] text-[#A0A0A0] border-[#2A2A2A]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-5 space-y-3 pb-8">
        {displayed.map((post) => (
          <div
            key={post.id}
            className="bg-[#1E1E1E] rounded-2xl border border-[#2A2A2A] p-4"
          >
            {/* Post header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#7AA884]/10 border border-[#7AA884]/15 flex items-center justify-center flex-shrink-0">
                <span className="text-[#7AA884] text-sm font-black">{post.avatarChar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white text-sm font-semibold">{post.user}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${tagStyle[post.tag]}`}
                  >
                    {post.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#7AA884] text-[10px]">📍</span>
                  <span className="text-[#A0A0A0] text-[10px]">{post.location}</span>
                  <span className="text-[#3A3A3A] text-[10px]">·</span>
                  <span className="text-[#A0A0A0] text-[10px]">{post.time}</span>
                </div>
              </div>
            </div>

            <p className="text-white/85 text-sm leading-relaxed mb-3">{post.content}</p>

            {/* Interactions */}
            <div className="flex items-center gap-4 pt-2.5 border-t border-[#2A2A2A]">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-all active:scale-95 min-h-[48px] min-w-[48px] ${
                  post.liked ? "text-[#7AA884]" : "text-[#A0A0A0]"
                }`}
                aria-label={post.liked ? "좋아요 취소" : "좋아요"}
              >
                <svg
                  className="w-4 h-4"
                  fill={post.liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{post.likes}</span>
              </button>

              <button
                className="flex items-center gap-1.5 text-[#A0A0A0] text-sm active:scale-95 min-h-[48px] min-w-[48px]"
                aria-label="댓글"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{post.comments}</span>
              </button>

              <button
                className="ml-auto text-[#A0A0A0] active:scale-95 min-h-[48px] min-w-[48px] flex items-center justify-center"
                aria-label="공유"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating write button — clipped to the max-w-md container */}
      <button
        onClick={() => setShowNewPost(true)}
        className="fixed bottom-24 w-14 h-14 bg-[#7AA884] rounded-full flex items-center justify-center shadow-lg shadow-[#7AA884]/20 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#7AA884]/30 z-30"
        aria-label="새 게시물 작성"
        style={{ right: "max(1rem, calc(50vw - 208px))" }}
      >
        <svg className="w-6 h-6 text-[#121212]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {showNewPost && (
        <NewPostModal
          onClose={() => setShowNewPost(false)}
          onSubmit={handleNewPost}
        />
      )}
    </div>
  );
}
