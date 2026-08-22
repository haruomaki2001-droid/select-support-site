"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type CategoryItem = {
  name: string;
  children?: any[];
};

type Props = {
  title: string;
  items: CategoryItem[];
  onCategoryClick: (category: CategoryItem) => void;
  threshold?: number;
};

export default function CategorySection({
  title,
  items,
  onCategoryClick,
  threshold = 7,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const hiddenRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, threshold);
  const hiddenItems = items.slice(threshold);
  const hasHidden = hiddenItems.length > 0;

  return (
    <div>
      <div className="bg-[#E8E8E8] px-4 py-[3px]">
        <p className="text-[18px] font-medium text-[#2A3D4E]">{title}</p>
      </div>

      <div className="flex flex-col gap-[4px] px-4 mt-2">
        {visibleItems.map((category) => (
          <Link
            key={category.name}
            href="#"
            onClick={() => {
              if (category.children) {
                onCategoryClick(category);
              }
            }}
            className="flex min-h-8 w-full cursor-pointer items-center justify-between rounded-md pl-2 pr-0 text-[13px] font-normal leading-tight text-[#2A3D4E] break-keep [@media(hover:hover)]:hover:bg-[#E8E8E8] active:bg-[#E8E8E8]"
          >
            {category.name}
            {category.children && (
              <Image
                src="/icons/icon-chevron-2.svg"
                alt=""
                width={48}
                height={48}
                className="block h-5 w-5 shrink-0"
              />
            )}
          </Link>
        ))}

        {hasHidden && (
          <>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: showAll
                  ? `${hiddenRef.current?.scrollHeight ?? hiddenItems.length * 36}px`
                  : "0px",
              }}
            >
              <div ref={hiddenRef} className="flex flex-col gap-[4px]">
                {hiddenItems.map((category) => (
                  <Link
                    key={category.name}
                    href="#"
                    onClick={() => {
                      if (category.children) {
                        onCategoryClick(category);
                      }
                    }}
                    className="flex min-h-8 w-full cursor-pointer items-center justify-between rounded-md pl-2 pr-0 text-[13px] font-normal leading-tight text-[#2A3D4E] break-keep [@media(hover:hover)]:hover:bg-[#E8E8E8] active:bg-[#E8E8E8]"
                  >
                    {category.name}
                    {category.children && (
                      <Image
                        src="/icons/icon-chevron-2.svg"
                        alt=""
                        width={48}
                        height={48}
                        className="block h-5 w-5 shrink-0"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-[#CBCBCB]" />
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="flex h-8 w-full cursor-pointer items-center justify-center gap-1 text-[12px] text-[#2A3D4E] [@media(hover:hover)]:hover:bg-[#E8E8E8] active:bg-[#E8E8E8]"
            >
              <span>{showAll ? "閉じる" : "すべて表示"}</span>
              <Image
                src="/icons/icon-chevron.svg"
                alt=""
                width={48}
                height={48}
                className={showAll ? "-rotate-90" : "rotate-90"}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}