import React from 'react';
import heroIllustration from '../../assets/images/hero-illustration.svg';

export default function Hero() {
  const handleScrollTo = (e, selector) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="trang-chu"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Campus Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-darkSurface dark:bg-[#161B22] bg-blue-50 border border-darkBorder dark:border-[#30363D] border-blue-200 text-primary mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Dự án kỹ thuật GDG on Campus - DUT</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-darkText dark:text-[#F3F4F6] text-gray-900 leading-tight sm:leading-tight">
              Chăm sóc máy tính, an tâm học tập và làm việc.
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-5 text-base sm:text-lg text-darkMuted dark:text-[#9CA3AF] text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Giải pháp cài đặt Windows, vệ sinh, bảo dưỡng và nâng cấp máy tính dành cho bạn.
              Đồng hành cùng sinh viên và giảng viên nâng cao tuổi thọ thiết bị với quy trình minh bạch, an toàn dữ liệu.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#dat-lich"
                onClick={(e) => handleScrollTo(e, '#dat-lich')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 active:scale-95"
              >
                Đặt lịch ngay
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <a
                href="#dich-vu"
                onClick={(e) => handleScrollTo(e, '#dich-vu')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 hover:border-primary/60 hover:bg-darkSurfaceElevated dark:hover:bg-[#21262D] hover:bg-gray-50 transition-all duration-200"
              >
                Khám phá dịch vụ
              </a>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="mt-10 pt-8 border-t border-darkBorder dark:border-[#30363D] border-gray-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-darkText dark:text-[#F3F4F6] text-gray-700">
                  Bản quyền chính hãng
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-darkText dark:text-[#F3F4F6] text-gray-700">
                  Bảo toàn dữ liệu
                </span>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-darkText dark:text-[#F3F4F6] text-gray-700">
                  Hỗ trợ sinh viên
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              <img
                src={heroIllustration}
                alt="Minh họa chẩn đoán và chăm sóc laptop chuyên nghiệp tại GDGRepair"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
