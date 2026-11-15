import React, { useState, useEffect } from 'react';
import { useScroll } from '../hooks/useScroll';

export default function Navbar({ theme, toggleTheme }) {
  const { isScrolled } = useScroll(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key and manage body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      // Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Trang chủ', href: '#trang-chu' },
    { label: 'Dịch vụ', href: '#dich-vu' },
    { label: 'Bảng giá', href: '#bang-gia' },
    { label: 'Quy trình', href: '#quy-trinh' },
    { label: 'Hỏi đáp', href: '#faq' },
    { label: 'Liên hệ', href: '#dat-lich' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-darkBg/95 dark:bg-[#0D1117]/95 bg-white/95 backdrop-blur-md shadow-md border-b border-darkBorder dark:border-[#30363D] border-gray-200 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo and Title */}
          <a
            href="#trang-chu"
            onClick={(e) => handleLinkClick(e, '#trang-chu')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            {/* Geometric Tech Logo */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-darkSurface dark:bg-[#161B22] bg-gray-100 border border-darkBorder dark:border-[#30363D] border-gray-200 flex items-center justify-center shadow-sm group-hover:border-primary/60 transition-colors">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M16 14L8 24L16 34"
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M32 14L40 24L32 34"
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="24" r="3.5" fill="#3B82F6" />
                <path
                  d="M24 14V17M24 31V34M14 24H17M31 24H34"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Brand Title: 2 lines */}
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-darkText dark:text-[#F3F4F6] text-gray-900 group-hover:text-primary transition-colors leading-none">
                GDGRepair
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-darkMuted dark:text-[#9CA3AF] text-gray-600 mt-1 tracking-wider uppercase">
                GDG on Campus - DUT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-darkMuted dark:text-[#9CA3AF] text-gray-700 hover:text-darkText dark:hover:text-[#F3F4F6] hover:bg-darkSurface dark:hover:bg-[#161B22] hover:bg-gray-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions: Theme Toggle + CTA Button */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              className="p-2.5 rounded-lg border border-darkBorder dark:border-[#30363D] border-gray-200 bg-darkSurface dark:bg-[#161B22] bg-white text-darkMuted dark:text-[#9CA3AF] text-gray-700 hover:text-primary hover:border-primary/50 transition-colors shadow-sm"
            >
              {theme === 'dark' ? (
                // Sun Icon for Dark Mode
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  />
                </svg>
              ) : (
                // Moon Icon for Light Mode
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* CTA Button */}
            <a
              href="#dat-lich"
              onClick={(e) => handleLinkClick(e, '#dat-lich')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              Đặt lịch ngay
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
              className="p-2 rounded-lg border border-darkBorder dark:border-[#30363D] border-gray-200 bg-darkSurface dark:bg-[#161B22] bg-white text-darkMuted dark:text-[#9CA3AF] text-gray-700"
            >
              {theme === 'dark' ? (
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
              aria-expanded={mobileMenuOpen}
              className="p-2.5 rounded-lg border border-darkBorder dark:border-[#30363D] border-gray-200 bg-darkSurface dark:bg-[#161B22] bg-white text-darkText dark:text-[#F3F4F6] text-gray-800"
            >
              {mobileMenuOpen ? (
                // Close X Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Menu Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs h-full bg-darkBg dark:bg-[#0D1117] bg-white border-l border-darkBorder dark:border-[#30363D] border-gray-200 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header inside Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-darkBorder dark:border-[#30363D] border-gray-200 mb-6">
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-darkText dark:text-[#F3F4F6] text-gray-900">
                    GDGRepair
                  </span>
                  <span className="text-[10px] text-darkMuted dark:text-[#9CA3AF] text-gray-600">
                    GDG on Campus - DUT
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Đóng menu"
                  className="p-2 rounded-lg text-darkMuted dark:text-[#9CA3AF] text-gray-600 hover:text-darkText dark:hover:text-[#F3F4F6] hover:bg-darkSurface dark:hover:bg-[#161B22] hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-darkText dark:text-[#F3F4F6] text-gray-800 hover:bg-darkSurface dark:hover:bg-[#161B22] hover:bg-gray-100 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-darkBorder dark:border-[#30363D] border-gray-200 flex flex-col space-y-3">
              <a
                href="#dat-lich"
                onClick={(e) => handleLinkClick(e, '#dat-lich')}
                className="w-full inline-flex items-center justify-center py-3 px-4 rounded-lg text-center font-semibold text-white bg-primary hover:bg-primary-hover shadow transition-colors"
              >
                Đặt lịch ngay
              </a>
              <p className="text-center text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-500">
                Hỗ trợ kỹ thuật sinh viên ĐH Bách Khoa
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
