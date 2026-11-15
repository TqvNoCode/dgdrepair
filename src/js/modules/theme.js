/**
 * GDGRepair - Theme Module
 * Quản lý chuyển đổi giao diện Sáng / Tối (Dark / Light Mode) và lưu trữ trạng thái vào localStorage
 */

import { getStorage, setStorage, STORAGE_KEYS } from '../core/storage.js';
import { $, $$ } from '../core/dom.js';

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

const SUN_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
`;

const MOON_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`;

let currentTheme = THEMES.DARK;

/**
 * Áp dụng theme lên document và cập nhật các nút toggle
 * @param {'dark'|'light'} theme
 */
export function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.remove(THEMES.DARK, THEMES.LIGHT);
  document.documentElement.classList.add(theme);

  // Cập nhật tất cả các nút đổi theme trên giao diện (desktop và mobile drawer)
  const toggles = $$('[data-action="toggle-theme"]');
  const isDark = theme === THEMES.DARK;
  const nextLabel = isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối';
  const icon = isDark ? SUN_ICON : MOON_ICON;

  toggles.forEach((btn) => {
    btn.setAttribute('aria-label', nextLabel);
    btn.setAttribute('title', nextLabel);
    btn.innerHTML = icon;
  });
}

/**
 * Đổi qua lại giữa dark và light
 */
export function toggleTheme() {
  const nextTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(nextTheme);
  setStorage(STORAGE_KEYS.THEME, nextTheme);
}

/**
 * Khởi tạo theme dựa trên cấu hình lưu trữ hoặc tuỳ chọn hệ thống
 * @returns {() => void} Hàm dọn dẹp sự kiện
 */
export function initTheme() {
  const savedTheme = getStorage(STORAGE_KEYS.THEME, null);

  if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
    applyTheme(savedTheme);
  } else {
    // Tự động kiểm tra cài đặt màu sắc của hệ điều hành người dùng
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? THEMES.DARK : THEMES.LIGHT);
  }

  const handleClick = (e) => {
    const btn = e.target.closest('[data-action="toggle-theme"]');
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  };

  document.addEventListener('click', handleClick);

  // Lắng nghe thay đổi theme từ hệ thống nếu người dùng chưa đặt tùy chọn riêng
  const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const handleMediaChange = (e) => {
    if (!getStorage(STORAGE_KEYS.THEME, null)) {
      applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    }
  };

  if (mediaQuery && mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleMediaChange);
  }

  return () => {
    document.removeEventListener('click', handleClick);
    if (mediaQuery && mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleMediaChange);
    }
  };
}
