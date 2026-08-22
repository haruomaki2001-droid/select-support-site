"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function TopBar() {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showGenericGuide, setShowGenericGuide] = useState(false);
  const [showBar, setShowBar] = useState(false);

  // 表示に使うのは「一時的なhover」または「クリック確定〜案内が閉じるまで」
  const active = hover || clicked;

  useEffect(() => {
    const ua = navigator.userAgent;

    const ios =
      /iPhone|iPad|iPod/i.test(ua) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    setIsIOS(ios);

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // Safari
      (window.navigator as Navigator & { standalone?: boolean })
        .standalone === true;

    if (standalone) {
      setShowBar(false);
      return;
    }

    setShowBar(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  const closeGuideAndReset = () => {
    setShowIOSGuide(false);
    setShowGenericGuide(false);
    setClicked(false);
    setHover(false);
  };

  const handleClick = async () => {
    // クリック確定：ダイアログが閉じるまで見た目を維持する
    setClicked(true);

    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (deferredPrompt) {
      // Android Chrome等: ブラウザ標準のインストールダイアログ
      deferredPrompt.prompt();

      const result = await deferredPrompt.userChoice;

      if (result.outcome === "accepted") {
        setShowBar(false);
      }

      setDeferredPrompt(null);
      setClicked(false);
      setHover(false);
      return;
    }

    // iOSでもなく、beforeinstallpromptも発火していない
    // (Firefox / PC版Safari など非対応ブラウザ) 向けの案内
    setShowGenericGuide(true);
  };

  if (!showBar) return null;

  return (
    <>
      <div className="w-full bg-white">
        <div className="w-full bg-[#1D2088]">
          <button
            type="button"
            onClick={handleClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
            onTouchCancel={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            className="inline-flex items-center gap-2 px-4 py-2 text-left cursor-pointer"
          >
            <Image
              src={
                active
                  ? "/icons/icon-pwa-hover.svg"
                  : "/icons/icon-pwa.svg"
              }
              alt=""
              width={28}
              height={28}
            />

            <span
              className={`text-xs font-normal text-white ${
                active ? "underline underline-offset-4" : ""
              }`}
            >
              ホーム画面に追加
            </span>
          </button>
        </div>

        <div className="h-2 w-full bg-[#13AE67]" />
      </div>

      {/* iOS向け案内ダイアログ */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">
              ホーム画面に追加
            </h2>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
              Safariでは自動でホーム画面へ追加できません。

              {"\n\n"}
              ① Safari下部の「共有」ボタン（□↑）をタップ
              {"\n"}
              ② 「ホーム画面に追加」を選択
              {"\n"}
              ③ 「追加」をタップ
            </p>

            <button
              type="button"
              onClick={closeGuideAndReset}
              className="mt-6 w-full rounded bg-[#1D2088] py-2 text-white transition hover:bg-[#5A61F9]"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* iOS以外の非対応ブラウザ向け案内ダイアログ */}
      {showGenericGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-lg font-bold">
              ホーム画面に追加
            </h2>

            <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
              ブラウザ標準のインストール画面を表示できませんでした。

              {"\n\n"}
              お使いのブラウザのメニューから
              「ホーム画面に追加」または「アプリをインストール」をお試しください。
              {"\n\n"}
              PCでご利用の場合は、ブックマークに追加しておくと便利です。
            </p>

            <button
              type="button"
              onClick={closeGuideAndReset}
              className="mt-6 w-full rounded bg-[#1D2088] py-2 text-white transition hover:bg-[#5A61F9]"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
