'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 사진을 섹션별로 분배
  const heroCats = [1, 2, 3]; // 히어로 슬라이드
  const masonryGalleryCats = [4, 5, 6, 7, 8, 9, 10, 11, 12]; // 메이슨리 갤러리
  const circleGalleryCats = [13, 14, 15, 16, 17, 18, 19]; // 원형 갤러리
  const polaroidCats = [20, 21, 22, 23, 24]; // 폴라로이드 스타일
  const spotlightCats = [25, 26, 27, 28]; // 스포트라이트 효과

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setRotation((prev) => (prev + 0.5) % 360);
    };
    const animationFrame = setInterval(animate, 50);
    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50">
      {/* 히어로 섹션 - 슬라이드쇼 */}
      <section className="relative h-screen overflow-hidden">
        {/* 슬라이드 이미지들 */}
        {heroCats.map((num, idx) => (
          <div
            key={num}
            className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
              currentSlide === idx ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={`/images/${num}.jpg`}
              alt={`루디 공주님 ${num}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold mb-4 md:mb-6 animate-fade-in">
            루디 공주님 👑
          </h1>
          <p className="text-lg md:text-3xl mb-2 md:mb-4 animate-fade-in-delay">
            우리집 막내 | 10월 1일생 🎂
          </p>
          <p className="text-base md:text-2xl mb-8 md:mb-12 animate-fade-in-delay text-pink-200">
            최애템: 쥐돌이 장난감 🐭
          </p>
          <div className="flex gap-3 md:gap-4 animate-fade-in-delay-2">
            {[...heroCats].reverse().map((num, idx) => {
              const actualIdx = heroCats.length - 1 - idx;
              return (
                <button
                  key={num}
                  onClick={() => setCurrentSlide(actualIdx)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
                    currentSlide === actualIdx ? 'bg-white w-6 md:w-8' : 'bg-white/50'
                  }`}
                />
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 메이슨리 갤러리 */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-amber-900">
          일상 속 루디 📸
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {masonryGalleryCats.map((num) => (
            <div
              key={num}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onClick={() => setSelectedCat(num)}
            >
              <Image
                src={`/images/${num}.jpg`}
                alt={`루디 사진 ${num}`}
                width={400}
                height={400}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-black/70 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs md:text-sm">루디 #{num}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 원형 회전 갤러리 - 데스크탑 / 가로 스크롤 - 모바일 */}
      <section className="py-12 md:py-20 px-4 bg-amber-100">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-amber-900">
          360° 루디 뷰 🔄
        </h2>
        
        {/* 모바일: 가로 스크롤 */}
        <div className="md:hidden overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
            {circleGalleryCats.map((num) => (
              <div
                key={num}
                className="flex-shrink-0"
                onClick={() => setSelectedCat(num)}
              >
                <Image
                  src={`/images/${num}.jpg`}
                  alt={`루디 사진 ${num}`}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-xl object-cover w-[200px] h-[200px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 데스크탑: 회전 갤러리 */}
        <div className="hidden md:block relative w-full max-w-6xl mx-auto h-[700px]">
          {mounted && circleGalleryCats.map((num, idx) => {
            const angle = (idx * 360) / circleGalleryCats.length;
            const currentRotation = angle + rotation;
            return (
              <div
                key={num}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${currentRotation}deg) translateY(-300px) rotate(-${currentRotation}deg)`,
                  transition: 'transform 0.1s linear',
                }}
                onMouseEnter={() => setHoveredCat(num)}
                onMouseLeave={() => setHoveredCat(null)}
              >
                <div className={`relative transition-all duration-300 ${
                  hoveredCat === num ? 'scale-125 z-10' : 'scale-100'
                }`}>
                  <Image
                    src={`/images/${num}.jpg`}
                    alt={`루디 사진 ${num}`}
                    width={220}
                    height={220}
                    className="rounded-full border-4 border-white shadow-xl object-cover w-[220px] h-[220px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 폴라로이드 스타일 */}
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16 text-amber-900">
          추억의 폴라로이드 📷
        </h2>
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 md:gap-8">
          {polaroidCats.map((num, idx) => {
            const randomRotation = mounted ? (idx % 2 === 0 ? 1 : -1) * (5 + (idx * 3) % 5) : 0;
            return (
              <div
                key={num}
                className="bg-white p-2 md:p-4 shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 md:hover:-translate-y-4 hover:rotate-0"
                style={{
                  transform: `rotate(${randomRotation}deg)`,
                }}
                onClick={() => setSelectedCat(num)}
              >
                <Image
                  src={`/images/${num}.jpg`}
                  alt={`루디 사진 ${num}`}
                  width={300}
                  height={300}
                  className="w-full h-32 md:h-64 object-cover"
                />
                <p className="text-center mt-2 md:mt-4 font-handwriting text-sm md:text-lg text-gray-700">
                  루디의 순간 #{num}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 스포트라이트 인터랙티브 섹션 */}
      <section className="py-12 md:py-20 px-4 bg-black text-white relative overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-16">
          스포트라이트 타임 ✨
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto relative">
          {spotlightCats.map((num) => (
            <div
              key={num}
              className="relative aspect-square cursor-pointer group"
              onMouseEnter={() => setHoveredCat(num)}
              onClick={() => setSelectedCat(num)}
            >
              <Image
                src={`/images/${num}.jpg`}
                alt={`루디 사진 ${num}`}
                fill
                className="object-cover rounded-lg transition-all duration-300 group-hover:brightness-110"
              />
              <div 
                className={`absolute inset-0 bg-white/20 rounded-lg transition-opacity duration-300 ${
                  hoveredCat === num ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
        {/* 마우스 따라다니는 스포트라이트 효과 - 데스크탑만 */}
        <div
          className="hidden md:block fixed pointer-events-none z-50"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: '300px',
            height: '300px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
        />
      </section>

      {/* 풋터 */}
      <footer className="bg-amber-900 text-white py-8 md:py-12 text-center px-4">
        <p className="text-lg md:text-2xl mb-2 md:mb-4">루디💕👑</p>
        <p className="text-sm md:text-base text-amber-200">우리집 막내 | 10월 1일생 | 쥐돌이 러버</p>
        <p className="text-sm md:text-base text-amber-300 mt-2">총 28장의 소중한 순간들</p>
      </footer>

      {/* 모달 - 클릭한 사진 크게 보기 */}
      {selectedCat && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCat(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={`/images/${selectedCat}.jpg`}
              alt={`루디 공주님 사진 ${selectedCat}`}
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-amber-300 transition-colors"
              onClick={() => setSelectedCat(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}