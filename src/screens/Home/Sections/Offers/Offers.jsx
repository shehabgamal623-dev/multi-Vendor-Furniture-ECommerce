import React from "react";
import { Card, CardContent } from "../../../../components/ui/ProductsCard";
import { Button } from "../../../../components/ui/button";
import { HeartIcon, StarIcon, ShoppingCartIcon } from "lucide-react";

const Offers = () => {
  // Example offers data
  const offers = [
    {
      id: 1,
      shop: "هوم سنتر",
      rating: 4.5,
      title: "سرير",
      description:
        "سرير بتصميم أنيق ومريح، مصنوع من خامات عالية الجودة لضمان نوم هادئ ومتانة تدوم.",
      image: "/image 4.png",
      saleImage: "004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
      price: 30000,
      oldPrice: 320000,
    },
    {
      id: 2,
      shop: "ايكيا",
      rating: 4.7,
      title: "كرسي",
      description: "كرسي فاخر بتصميم عصري ومريح يناسب جميع الغرف.",
      image: "/image 4.png",
      saleImage: "004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
      price: 15000,
      oldPrice: 18000,
    },
    {
      id: 3,
      shop: "هوم سنتر",
      rating: 4.9,
      title: "طاولة",
      description: "طاولة طعام خشبية فاخرة تضيف لمسة من الأناقة لمنزلك.",
      image: "/image 4.png",
      saleImage: "004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
      price: 22000,
      oldPrice: 25000,
    },
    {
      id: 4,
      shop: "هوم سنتر",
      rating: 4.5,
      title: "سرير",
      description:
        "سرير بتصميم أنيق ومريح، مصنوع من خامات عالية الجودة لضمان نوم هادئ ومتانة تدوم.",
      image: "/image 4.png",
      saleImage: "004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
      price: 30000,
      oldPrice: 320000,
    },
  ];

  return (
    <section
      
      style={{ backgroundImage: "url('/image 37.png')" }}
      
    >
        <header className="flex items-center justify-between  relative   py-12 px-12 bg-cover bg-center">
      <Button
        variant="ghost"
        className="inline-flex items-center gap-3 h-auto p-0 hover:bg-transparent"
      >
        <img
          className="w-6 h-6"
          alt="Line arrow right"
          src="/line-arrow-right.svg"
        />
        <span className="font-[number:var(--18-med-font-weight)] text-[#683800] text-[length:var(--18-med-font-size)] leading-[var(--18-med-line-height)] font-18-med tracking-[var(--18-med-letter-spacing)] whitespace-nowrap [direction:rtl] [font-style:var(--18-med-font-style)]">
          عرض المزيد
        </span>
      </Button>

      <h1 className="font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)] whitespace-nowrap [direction:rtl] [font-style:var(--h2-semiboald-font-style)]">
        العروض و التخفيضات
      </h1>
    </header>

        <div className="flex flex-wrap justify-center gap-8 py-12 px-6 bg-cover bg-center">
             {offers.map((offer) => (
        <Card
          key={offer.id}
          className="flex flex-col justify-between w-[282px] rounded-3xl border border-solid border-[#c3c3c3] overflow-hidden bg-white"
        >
          {/* 🖼️ Image Section */}
          <div className="relative w-full h-[271px] rounded-[24px_24px_0px_0px] overflow-hidden">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt={offer.title}
              src={offer.image}
            />

            <div className="absolute top-4 right-3 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
              >
                <HeartIcon className="w-6 h-6 text-white fill-red-500" />
              </Button>
            </div>

            <img
              className="absolute top-[127px] left-1/2 -translate-x-1/2 w-[194px] h-36 object-cover"
              alt="Sale animation"
              src={offer.saleImage}
            />
          </div>

          {/* 📝 Content */}
          <CardContent className="flex flex-col items-start gap-2 p-4 flex-grow">
            <div className="w-full flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="font-medium text-[#292929] text-sm [font-family:'Cairo',Helvetica] [direction:rtl]">
                  {offer.shop}
                </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <div className="font-bold text-[#1a1713] text-base leading-4">
                    {offer.rating}
                  </div>
                </div>
                <div className="font-bold text-[#1a1713] text-base [font-family:'Cairo',Helvetica] [direction:rtl]">
                  {offer.title}
                </div>
              </div>

              <div className="text-[#292929] text-base leading-6 [font-family:'Cairo',Helvetica] [direction:rtl]">
                {offer.description}
              </div>
            </div>
          </CardContent>

          {/* 💰 Sticky Bottom Section */}
          <div className="mt-auto w-full bg-[#00000033]">
            <div className="w-full h-14 bg-[#ffffff80] flex items-center justify-between px-3 rounded-b-[24px]">
              <Button className="h-auto p-2 bg-[#ffffff80] rounded-[50px] hover:bg-[#ffffffa0]">
                <div className="flex w-[110px] items-center justify-center gap-2">
                  <div className="font-bold text-[#835f40] text-base whitespace-nowrap [direction:rtl] [font-family:'Cairo',Helvetica]">
                    اشتري الآن
                  </div>
                  <ShoppingCartIcon className="w-6 h-6 text-[#835f40]" />
                </div>
              </Button>

              <div className="flex flex-col items-end gap-1">
                <div className="font-bold text-[#835f40] text-lg [direction:rtl]">
                  {offer.price} <span className="font-medium">ر.س</span>
                </div>
                <div className="text-[#1a1713] text-xs line-through [direction:rtl]">
                  {offer.oldPrice} ر.س
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
        </div>
       
     
    </section>
  );
};

export default Offers;
