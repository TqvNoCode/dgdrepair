/**
 * GDGRepair - Navbar & Mobile Drawer Module
 * Quản lý thanh điều hướng phản hồi thao tác cuộn và ngăn kéo menu di động
 */

import { $, $$, lockScroll, unlockScroll } from '../core/dom.js';

let isScrolled = false;
let ticking = false;
let isDrawerOpen = false;

/**
 * Cập nhật giao diện thanh navbar dựa trên vị trí cuộn trang
 */
function updateNavbarScroll() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const shouldBeScrolled = window.scrollY > 50;
  if (shouldBeScrolled !== isScrolled) {
    isScrolled = shouldBeScrolled;
    if (isScrolled) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  ticking = false;
}

/**
 * Mở menu di động
 */
export function openDrawer() {
  const drawer = $('#mobile-drawer');
  const backdrop = $('#drawer-backdrop');
  const toggleBtn = $('#drawer-toggle');

  if (!drawer || isDrawerOpen) return;

  isDrawerOpen = true;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');

  if (backdrop) {
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', 'Đóng menu');
  }

  lockScroll('drawer');

  // Đặt focus vào nút đóng hoặc mục đầu tiên trong drawer
  const closeBtn = $('#drawer-close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Đóng menu di động
 */
export function closeDrawer() {
  const drawer = $('#mobile-drawer');
  const backdrop = $('#drawer-backdrop');
  const toggleBtn = $('#drawer-toggle');

  if (!drawer || !isDrawerOpen) return;

  isDrawerOpen = false;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');

  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', 'Mở menu');
    toggleBtn.focus();
  }

  unlockScroll('drawer');
}

/**
 * Khởi tạo navbar và mobile drawer
 * @returns {() => void} Cleanup function
 */
export function initNavbar() {
  // Lắng nghe sự kiện cuộn với passive listener và requestAnimationFrame
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbarScroll);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Kiểm tra trạng thái ban đầu khi tải trang
  updateNavbarScroll();

  // Bắt sự kiện mở/đóng drawer
  const handleDocumentClick = (e) => {
    const openBtn = e.target.closest('#drawer-toggle');
    if (openBtn) {
      e.preventDefault();
      if (isDrawerOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
      return;
    }

    const closeBtn = e.target.closest('#drawer-close') || e.target.closest('#drawer-backdrop');
    if (closeBtn) {
      e.preventDefault();
      closeDrawer();
      return;
    }

    // Đóng drawer khi người dùng chọn bất kỳ liên kết nào trong drawer
    const navLink = e.target.closest('#mobile-drawer a');
    if (navLink) {
      closeDrawer();
    }
  };

  // Đóng bằng phím Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isDrawerOpen) {
      closeDrawer();
    }
  };

  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleKeyDown);
    if (isDrawerOpen) {
      unlockScroll('drawer');
    }
  };
}
