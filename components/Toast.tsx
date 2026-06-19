"use client";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastData {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastData) => void;
const listeners: Listener[] = [];
let nextId = 0;

export function showToast(message: string, type: ToastType = "info") {
  const toast: ToastData = { id: nextId++, message, type };
  listeners.forEach((fn) => fn(toast));
}

const styles: Record<ToastType, string> = {
  success: "bg-[#0F2312] border-[#7AA884]/40 text-[#7AA884]",
  error:   "bg-red-950/80 border-red-700/50 text-red-300",
  info:    "bg-[#1E1E1E] border-[#3A3A3A] text-white",
};

const icons: Record<ToastType, React.ReactNode> = {
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler: Listener = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3200);
    };
    listeners.push(handler);
    return () => {
      const i = listeners.indexOf(handler);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-[200] px-4 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-xl animate-fade-in ${styles[t.type]}`}
        >
          <div className="flex-shrink-0">{icons[t.type]}</div>
          <p className="text-sm font-semibold tracking-tight">{t.message}</p>
        </div>
      ))}
    </div>
  );
}
