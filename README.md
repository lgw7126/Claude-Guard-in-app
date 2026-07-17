# Claude-Guard-in-app

# 🛡️ 가드인 (Guard-In)

### 👉 [앱 바로 실행하기 → claude-guard-in-app.vercel.app](https://claude-guard-in-app.vercel.app)

> 1인 여성 가구를 위한 하이퍼로컬 안전망 플랫폼 — 긴급 SOS, 이웃 안전 피드, 검증된 전문가 매칭을 한 앱에

<img width="386" height="665" alt="스크린샷 2026-07-17 110159" src="https://github.com/user-attachments/assets/b5028daf-5809-4f21-851e-b7c57cb78283" />


---

## 무엇을 해결하려 했나

혼자 사는 여성에게 "집 안팎의 안전"은 흩어져 있는 문제다. 긴급 상황 대응은 경찰 앱, 수리기사 방문은 플랫폼 앱, 동네 위험 정보는 커뮤니티 카페 — 정작 필요한 순간에 어디를 열어야 할지 흩어져 있다.

가드인은 이 셋을 하나의 동선으로 묶는 실험이다:

- 🆘 **SOS** — 홈 화면 고정 버튼으로 긴급연락처에 즉시 알림
- 🔧 **안심 케어 매칭** — 검증된 전문가(수리·방문 서비스) 예약, 방문 전 신원 확인 흐름
- 📢 **동네 안전 피드** — 이웃과 안전 정보·경험 공유

## 주요 화면 흐름

온보딩 → 홈(인사말 + 서비스 센터 + SOS 고정 버튼) → 케어 탭(전문가 상세·예약 모달) → 피드 탭(글 작성)

## 프로젝트 성격

UX와 서비스 구조를 검증하기 위한 프론트엔드 MVP. 전문가 데이터와 매칭은 목업이며, 실서비스화 시 신원 검증·위치 기반 알림 백엔드가 필요하다.

## 기술 스택

- Next.js (App Router) + TypeScript + Tailwind CSS
- 컴포넌트 구조: 탭 3개 + 모달/시트 (BookingModal, SOSBottomSheet, EmergencyContactsSheet 등 15+)
- Vercel 배포 · Claude Code로 바이브 코딩

## 회고

- **만든 것**: 1인 여성 가구의 안전 니즈 3가지를 한 동선으로 묶은 모바일 웹 MVP
- **어려웠던 것**: 여러 모달과 바텀시트가 겹치는 화면에서 상태 관리가 꼬이지 않게 하는 것
- **배운 것**: 안전 서비스는 기능보다 "긴급 버튼이 항상 같은 자리에 있다"는 신뢰가 핵심이라는 것

---

*Made with Claude Code · 2026*<img width="386" height="665" alt="스크린샷 2026-07-17 110159" src="https://github.com/user-attachments/assets/f2b44f0c-825a-47ef-9fed-71cdbc22e902" />
