"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../data/categories";
import CategorySection from "./CategorySection";

type CategoryChild = {
  name: string;
};

type SelectedCategory = {
  name: string;
  children?: CategoryChild[];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory | null>(null);
  const [isSecondOpen, setIsSecondOpen] = useState(false);
  

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const menuPanel = document.getElementById("primary-drawer-scroll");
      if (menuPanel) {
        menuPanel.scrollTop = 0;
      }
    }
  }, [isMenuOpen]);

  return (
    <header className="bg-white px-[18px] py-4">
      <div className="mx-auto flex max-w-site items-start justify-between">
        {/* 左：ハンバーガーメニュー */}
        <button
  type="button"
  className="group flex flex-col items-center pt-3 cursor-pointer"
  onClick={() => setIsMenuOpen(true)}
>
  <Image
    src="/icons/icon-hamburger-menu.svg"
    alt="カテゴリ"
    width={28}
    height={28}
  />

  <span className="mt-1 text-[10px] text-[#1D2088] no-underline transition-[text-decoration-color] duration-150 group-active:underline group-active:decoration-[#1D2088] [@media(hover:hover)]:group-hover:underline [@media(hover:hover)]:group-hover:decoration-[#1D2088]">
    カテゴリ
  </span>
</button>

        {/* 中央：ロゴ */}
        <div className="flex flex-1 flex-col items-center -mt-2">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/logo/logo-my-site.svg"
              alt="SupiSho"
              width={105}
              height={26}
            />
            <p className="-mt-1 text-[9px] text-[#2A3D4E]">
              商品セレクトサポート
            </p>
          </Link>
        </div>

        {/* 右：各種アイコン */}
        <div className="flex gap-4">
          <button type="button" className="group flex flex-col items-center  pt-3 cursor-pointer">
            <Image
              src="/icons/fav-star-line.svg"
              alt="お気に入り"
              width={24}
              height={24}
            />
            <span className="-ml-0.5 mt-1  text-[10px] text-[#1D2088] no-underline transition-[text-decoration-color] duration-150 group-active:underline group-active:decoration-[#1D2088] [@media(hover:hover)]:group-hover:underline [@media(hover:hover)]:group-hover:decoration-[#1D2088]">
              お気に入り
            </span>
          </button>

          <button type="button" className="group flex flex-col items-center  pt-3 cursor-pointer -ml-2">
            <Image
              src="/icons/icon-history.svg"
              alt="閲覧履歴"
              width={24}
              height={24}
            />
            <span className="mt-1 text-[10px] text-[#1D2088] no-underline transition-[text-decoration-color] duration-150 group-active:underline group-active:decoration-[#1D2088] [@media(hover:hover)]:group-hover:underline [@media(hover:hover)]:group-hover:decoration-[#1D2088]">
              閲覧履歴
            </span>
          </button>

          <button type="button" className="group flex flex-col items-center  pt-3 cursor-pointer">
            <Image
              src="/icons/icon-info.svg"
              alt="ご案内"
              width={24}
              height={24}
            />
            <span className="mt-1 text-[10px] text-[#1D2088] no-underline transition-[text-decoration-color] duration-150 group-active:underline group-active:decoration-[#1D2088] [@media(hover:hover)]:group-hover:underline [@media(hover:hover)]:group-hover:decoration-[#1D2088]">
              ご案内
            </span>
          </button>
        </div>
      </div>

              {/* 検索窓 */}
      <div className="mx-auto mt-3 max-w-site">
        <div className="flex h-[35px] items-center overflow-hidden rounded-[6px] border border-[#1D2088] bg-white pl-3">
          <input
            type="text"
            placeholder="商品名・型番・JANコードを入力"
            className="flex-1 bg-transparent text-[13px] text-[#2A3D4E] placeholder-[#A0A0A0] outline-none"
          />
          <button
            type="button"
            className="flex h-full w-9 shrink-0 items-center justify-center [@media(hover:hover)]:hover:bg-[#E8E8E8]"
          >
            <Image
              src="/icons/icon-lens-search.svg"
              alt="JANコードをスキャン"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            className="flex h-full w-11 shrink-0 items-center justify-center bg-[#1D2088] [@media(hover:hover)]:hover:bg-[#3C40C0]"
          >
            <Image
              src="/icons/icon-search.svg"
              alt="検索"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* 背景を薄暗くする部分（タップで閉じる） */}
      <div
        onClick={() => {
  setIsMenuOpen(false);
  setIsSecondOpen(false);
}}
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* 左から出てくるメニュー本体 */}
      <div
 className={`fixed left-0 top-0 z-50 flex h-dvh w-72 flex-col bg-white shadow-xl transition-transform duration-300 ${
  isMenuOpen ? "translate-x-0" : "-translate-x-full"
}`}
>
  {/* ドロワー上部の帯 */}
  <div className="w-full">
    <div className="h-11 w-full bg-[#1D2088]" />
    <div className="h-2 w-full bg-[#13AE67]" />
  </div>

<div className="flex items-center justify-between pl-4 pr-6 pt-3 pb-3">
<Link
  href="/"
  className="inline-flex cursor-pointer"
  onClick={() => setIsMenuOpen(false)}
>
  <Image
    src="/icons/icon-home.svg"
    alt="ホーム"
    width={24}
    height={24}
  />
</Link>
<button
    type="button"
    className="inline-flex cursor-pointer"
    onClick={() => setIsMenuOpen(false)}
  >
    <Image
      src="/buttons/btn-close.svg"
      alt="閉じる"
      width={24}
      height={24}
    />
  </button>  
</div>
<div id="primary-drawer-scroll" className="flex flex-1 flex-col gap-2 overflow-y-auto min-h-0">
  {categories.map((group) => (
    <CategorySection
      key={group.title}
      title={group.title}
      items={group.items}
      onCategoryClick={(category) => {
        setSelectedCategory(category);
        setIsSecondOpen(true);
      }}
    />
  ))}
</div>
</div>
{/* ここまで: 一次ドロワー */}
{/* 二次ドロワー */}
{selectedCategory && (
  <div
    className={`fixed left-0 top-0 z-[60] flex h-dvh w-full max-w-[600px] flex-col bg-white shadow-xl transition-transform duration-300 ${
      isSecondOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="w-full">
      <div className="h-11 w-full bg-[#1D2088]" />
      <div className="h-2 w-full bg-[#13AE67]" />
    </div>

    <button
      type="button"
      onClick={() => setIsSecondOpen(false)}
      className="flex items-center gap-0 px-4 py-3 cursor-pointer"
    >
      <Image
        src="/icons/icon-chevron-2.svg"
        alt=""
        width={48}
        height={48}
        className="h-5 w-5 rotate-180"
      />
      <span className="text-[14px] text-[#2A3D4E]">戻る</span>
    </button>

    <div className="border-t border-[#CBCBCB]" />

    <div className="mt-2 grid flex-1 content-start grid-cols-2 gap-[4px] px-4 overflow-y-auto min-h-0 px-4 overflow-y-auto min-h-0">
      {selectedCategory.children?.map((child) => (
        <Link
          key={child.name}
          href="#"
          className="flex min-h-8 w-full cursor-pointer items-center rounded-md pl-2 pr-0 py-1 text-[13px] font-normal leading-snug text-[#2A3D4E] text-balance break-keep [overflow-wrap:break-word] [@media(hover:hover)]:hover:bg-[#E8E8E8] active:bg-[#E8E8E8]"
        >
          {child.name}
        </Link>
      ))}
     
    </div>
  </div>
)}
{/* ここまで: 二次ドロワー */}
    </header>
  );
}