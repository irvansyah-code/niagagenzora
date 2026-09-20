import { useCallback, useEffect, useState } from "react";
import promo1 from "@/assets/promo-1.jpg";
import promo2 from "@/assets/promo-2.jpg";
import promo3 from "@/assets/promo-3.jpg";
import { useLanguage } from "@/lib/language";

const slides = [
  { src: promo1, alt: "Promo rumah murah, rumah modern lokasi strategis harga terjangkau" },
  { src: promo2, alt: "Cicilan mulai 2 juta per bulan, rumah impian keluarga Indonesia" },
  { src: promo3, alt: "DP ringan langsung milik, hunian asri dan aman" },
];

export function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const { isEnglish } = useLanguage();

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <figure className="flex h-full flex-col gap-3">
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <div
          className="flex aspect-video transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={1280}
              height={720}
              loading="lazy"
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={isEnglish ? "Previous promotion" : "Promo sebelumnya"}
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition hover:bg-background"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={isEnglish ? "Next promotion" : "Promo berikutnya"}
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow-md backdrop-blur transition hover:bg-background"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2" role="tablist" aria-label={isEnglish ? "Choose promotion" : "Pilih promo"}>
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${isEnglish ? "Promotion" : "Promo"} ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
