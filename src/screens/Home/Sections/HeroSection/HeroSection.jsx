// HeroSection.tsx
import { AppNavbar } from "../../../../components/Navbar";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// أيقونة نجمة صغيرة
const Star = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-[#F7C948]"
    aria-hidden="true"
  >
    <path d="M12 2l2.9 6.9 7.1.7-5.3 4.9 1.5 7-6.2-3.6L6.8 21l1.5-7L3 9.1l7.1-.7L12 2z" />
  </svg>
);

export const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");
  /* مسارات صور العملاء */
  const avatars = [
    "/Ellipse 32.png",
    "/Ellipse 33.png",
    "/Ellipse 34.png",
    "/Ellipse 35.png",
    "/Ellipse 36.png",
    "/Ellipse 37.png",
  ];

  return (
    <section
      className="
        relative flex flex-col w-full
        bg-[url('/mob2.png')] md:bg-[url('/bg-largeSize.png')]
        bg-cover bg-center bg-no-repeat
        aspect-[375/459] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[1440/1024]
        text-right
      "
    >
      {/* -------- Navbar -------- */}
      <AppNavbar />

      {/* ================= Desktop (lg+) ================= */}
      <div
        className="
          hidden lg:flex flex-col items-center justify-center
          w-full max-w-[885px] mx-auto my-auto
        "
      >
        {/* *** البطاقة الزجاجية *** */}
        <div
          className="
            w-full flex flex-col items-center gap-8
            bg-white/40 backdrop-blur-lg shadow-lg
            rounded-[50px] px-10 py-12
          "
          style={{ fontFamily: "Cairo" }}
        >
          <h1 className="text-[40px] leading-[1.3] text-right font-semibold text-[#110f0d]">
            أكبر تجربة تسوّق أثاث في السعودية
          </h1>

          <p className="text-[18px] text-[#292929] text-center font-medium leading-relaxed max-w-3xl">
            منصة متكاملة تجمع أبرز متاجر الأثاث والعلامات الموثوقة في المملكة،
            حيث تجد كل ما تحتاجه لتأثيث منزلك في مكان واحد. استمتع بآلاف
            الخيارات التي تناسب مختلف الأذواق والميزانيات، مع تجربة تسوّق سهلة،
            وخدمات توصيل مريحة تصل إلى باب منزلك في جميع انحاء المملكة.
          </p>

          {/* حقل البحث */}
          <div className="w-full flex items-center overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative flex-grow flex items-center">
              {/* Custom search icon (hidden when typing) */}
              {!searchValue && (
                <img
                  src="/search-normal.svg"
                  alt="search icon"
                  width={24}
                  height={24}
                  className="absolute right-4 pointer-events-none opacity-80 transition-opacity duration-200"
                />
              )}

              {/* Input */}
              <input
                type="text"
                placeholder="ابحث عن ما تريد"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="
            w-full py-4 pr-10 pl-5
            text-sm text-gray-700 placeholder-gray-400
            focus:outline-none text-right
          "
              />
            </div>
            <button
              className="
                  bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]
                  px-16 rounded-lg text-white text-sm font-medium 
                  flex items-center gap-2 h-full
                   transition-all duration-300 hover:opacity-90
                    "
            >
              بحث
            </button>
          </div>
        </div>

        {/* شريط التقييم */}
        <div
          className="
            flex items-center gap-4 mt-8
            bg-white/60 backdrop-blur-md shadow-md
            rounded-full pr-8 pl-4 py-3
          "
        >
          {/* صور العملاء */}
          <div className="flex -space-x-3">
            {avatars.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            ))}
          </div>

          {/* النجوم */}
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>

          <span className="text-sm text-[#505050] whitespace-nowrap">
            +500 عميل سعيد بخدمتنا
          </span>
        </div>
      </div>

      {/* ================= Mobile / Tablet (<lg) ================= */}
      <div
        className="
          lg:hidden flex flex-col items-center justify-center
          w-[90%] mx-auto mt-[12vh] gap-6
        "
      >
        {/* البطاقة الزجاجية للموبايل */}
        <div className="w-full flex flex-col items-center gap-4 bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-[#110f0d]">
            اختر أثاثك... وجربه في منزلك قبل الشراء
          </h2>

          <p className="text-[14px] text-[#292929] leading-relaxed">
            اكتشف مجموعتنا الواسعة من الأثاث الفاخر، وجرّب كل قطعة في مساحتك
            الخاصة بتقنية الواقع المعزز AR. تجربة تسوّق ذكية وسهلة من أي مكان.
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-col gap-3 w-full">
            <button className="bg-[#a77b5a] text-white py-2 rounded-lg hover:bg-[#916a4f] transition">
              استعرض المنتجات
            </button>
            <button className="border border-[#a77b5a] text-[#a77b5a] py-2 rounded-lg hover:bg-[#a77b5a]/10 transition">
              الأكثر مبيعًا
            </button>
          </div>
        </div>

        {/* شريط التقييم للموبايل */}
        <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md shadow-md rounded-full pr-6 pl-3 py-2">
          <div className="flex -space-x-3">
            {avatars.slice(0, 4).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                width={26}
                height={26}
                className="rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} />
            ))}
          </div>
          <span className="text-xs text-[#505050] whitespace-nowrap">
            +500 عميل سعيد
          </span>
        </div>
      </div>
    </section>
  );
};
