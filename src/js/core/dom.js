/**
 * GDGRepair - DOM Utilities
 * Các hàm tiện ích thao tác DOM, bảo vệ an toàn XSS và quản lý scroll lock
 */

/**
 * Chọn một phần tử DOM
 * @param {string} selector
 * @param {ParentNode} [context=document]
 * @returns {Element|null}
 */
export const $ = (selector, context = document) => {
  return context.querySelector(selector);
};

/**
 * Chọn danh sách các phần tử DOM dưới dạng mảng
 * @param {string} selector
 * @param {ParentNode} [context=document]
 * @returns {Element[]}
 */
export const $$ = (selector, context = document) => {
  return Array.from(context.querySelectorAll(selector));
};

/**
 * Đăng ký sự kiện an toàn và trả về hàm cleanup
 * @param {EventTarget} target
 * @param {string} event
 * @param {EventListener} handler
 * @param {boolean|AddEventListenerOptions} [options]
 * @returns {() => void}
 */
export const on = (target, event, handler, options = false) => {
  if (!target) return () => {};
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
};

/**
 * Thoát ký tự HTML chống lỗ hổng XSS
 * @param {string} str
 * @returns {string}
 */
export const escapeHTML = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Cơ chế khóa cuộn trang dùng chung (Shared Scroll Lock)
 * Sử dụng Set để lưu trữ các định danh khóa đang hoạt động.
 * Tránh trường hợp Modal và Drawer cùng mở, đóng một cái làm mở khóa cuộn của cái còn lại.
 */
const activeLocks = new Set();
let previousBodyOverflow = '';
let previousBodyPaddingRight = '';

export const lockScroll = (lockId = 'default') => {
  if (activeLocks.size === 0) {
    // Tính toán độ rộng scrollbar để tránh giật giao diện (layout shift)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  activeLocks.add(lockId);
};

export const unlockScroll = (lockId = 'default') => {
  activeLocks.delete(lockId);
  if (activeLocks.size === 0) {
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.paddingRight = previousBodyPaddingRight;
  }
};

/**
 * Bẫy tiêu điểm bàn phím bên trong một phần tử hộp thoại (Focus Trap)
 * @param {HTMLElement} element
 * @returns {() => void} Cleanup function
 */
export const setupFocusTrap = (element) => {
  if (!element) return () => {};

  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    const focusables = Array.from(element.querySelectorAll(focusableSelectors));
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const firstItem = focusables[0];
    const lastItem = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      }
    } else {
      if (document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);
  return () => element.removeEventListener('keydown', handleKeyDown);
};
