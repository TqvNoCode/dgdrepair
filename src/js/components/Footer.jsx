import React from 'react';

export default function Footer() {
  const handleScrollTo = (e, selector) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-darkBg dark:bg-[#0D1117] bg-gray-900 text-darkMuted dark:text-[#9CA3AF] text-gray-400 border-t border-darkBorder dark:border-[#30363D] border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (5 columns) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-darkSurface dark:bg-[#161B22] bg-gray-800 border border-darkBorder dark:border-[#30363D] border-gray-700 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 14L8 24L16 34" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M32 14L40 24L32 34" stroke="#22C55E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="24" r="3.5" fill="#3B82F6" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-darkText dark:text-[#F3F4F6] text-white tracking-tight leading-none">
                  GDGRepair
                </span>
                <span className="text-[11px] font-medium text-darkMuted dark:text-[#9CA3AF] text-gray-400 mt-1 uppercase tracking-wider">
                  GDG on Campus - DUT
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-400 max-w-sm leading-relaxed">
              Dịch vụ hỗ trợ chăm sóc, bảo dưỡng máy tính và laptop uy tín dành cho sinh viên và cộng đồng GDG on Campus - Trường Đại học Bách Khoa, Đại học Đà Nẵng.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-secondary font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Dự án hỗ trợ kỹ thuật phi lợi nhuận cho sinh viên</span>
            </div>
          </div>

          {/* Quick Links (2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-darkText dark:text-[#F3F4F6] text-white mb-4">
              Điều hướng
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#trang-chu"
                  onClick={(e) => handleScrollTo(e, '#trang-chu')}
                  className="hover:text-primary transition-colors"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  onClick={(e) => handleScrollTo(e, '#dich-vu')}
                  className="hover:text-primary transition-colors"
                >
                  Dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#bang-gia"
                  onClick={(e) => handleScrollTo(e, '#bang-gia')}
                  className="hover:text-primary transition-colors"
                >
                  Bảng giá
                </a>
              </li>
              <li>
                <a
                  href="#quy-trinh"
                  onClick={(e) => handleScrollTo(e, '#quy-trinh')}
                  className="hover:text-primary transition-colors"
                >
                  Quy trình
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, '#faq')}
                  className="hover:text-primary transition-colors"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="#dat-lich"
                  onClick={(e) => handleScrollTo(e, '#dat-lich')}
                  className="hover:text-primary transition-colors"
                >
                  Đặt lịch ngay
                </a>
              </li>
            </ul>
          </div>

          {/* Dịch vụ tiêu biểu (2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-darkText dark:text-[#F3F4F6] text-white mb-4">
              Dịch vụ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="#dich-vu"
                  onClick={(e) => handleScrollTo(e, '#dich-vu')}
                  className="hover:text-primary transition-colors"
                >
                  Cài đặt Windows
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  onClick={(e) => handleScrollTo(e, '#dich-vu')}
                  className="hover:text-primary transition-colors"
                >
                  Vệ sinh laptop
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  onClick={(e) => handleScrollTo(e, '#dich-vu')}
                  className="hover:text-primary transition-colors"
                >
                  Nâng cấp RAM & SSD
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  onClick={(e) => handleScrollTo(e, '#dich-vu')}
                  className="hover:text-primary transition-colors"
                >
                  Sửa lỗi phần mềm
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Placeholders (3 columns) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-darkText dark:text-[#F3F4F6] text-white mb-4">
              Thông tin liên hệ
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>54 Nguyễn Lương Bằng, Quận Liên Chiểu, TP. Đà Nẵng</span>
              </li>

              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(0236) 3842 xxx (Giờ hành chính)</span>
              </li>

              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>gdgoncampus.dut@gmail.com</span>
              </li>

              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Thứ 2 - Thứ 7: 08:00 - 17:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Notice */}
        <div className="mt-12 pt-8 border-t border-darkBorder dark:border-[#30363D] border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 GDGRepair - GDG on Campus - DUT. Dự án bài tập môn Frontend.</p>
          <p className="text-darkMuted dark:text-[#9CA3AF] text-gray-500">
            Frontend Demo • Xây dựng bằng ReactJS & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
