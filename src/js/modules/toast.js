/**
 * GDGRepair - Toast Notification Module
 * Hiển thị thông báo nổi thông minh, có thể tái sử dụng cho toàn ứng dụng
 */

import { $, escapeHTML } from '../core/dom.js';

const TOAST_ICONS = {
  success: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  `,
  error: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  `,
  info: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `,
  warning: `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `
};

let toastContainer = null;

/**
 * Đảm bảo container thông báo tồn tại trên DOM
 * @returns {HTMLElement}
 */
function getOrCreateContainer() {
  if (toastContainer && document.body.contains(toastContainer)) {
    return toastContainer;
  }
  toastContainer = $('#toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Hiển thị một toast thông báo
 * @param {Object} options
 * @param {string} options.message Nội dung thông báo
 * @param {'success'|'error'|'info'|'warning'} [options.type='info'] Loại thông báo
 * @param {number} [options.duration=3500] Thời gian hiển thị (ms)
 * @returns {HTMLElement} Phần tử toast
 */
export function showToast({ message, type = 'info', duration = 3500 }) {
  const container = getOrCreateContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const iconMarkup = TOAST_ICONS[type] || TOAST_ICONS.info;

  toast.innerHTML = `
    <div class="toast-icon">${iconMarkup}</div>
    <div class="toast-body">
      <p class="toast-message">${escapeHTML(message)}</p>
    </div>
    <button type="button" class="toast-close" aria-label="Đóng thông báo">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  const removeToast = () => {
    if (toast.classList.contains('is-leaving')) return;
    toast.classList.add('is-leaving');
    toast.addEventListener('animationend', () => {
      toast.remove();
    }, { once: true });
    // Fallback nếu animationend không kích hoạt
    setTimeout(() => {
      if (document.body.contains(toast)) toast.remove();
    }, 400);
  };

  const closeBtn = toast.querySelector('.toast-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', removeToast);
  }

  container.appendChild(toast);

  // Kích hoạt animation xuất hiện
  requestAnimationFrame(() => {
    toast.classList.add('is-active');
  });

  if (duration > 0) {
    setTimeout(removeToast, duration);
  }

  return toast;
}

/**
 * Khởi tạo module toast
 */
export function initToast() {
  getOrCreateContainer();
  return () => {
    if (toastContainer && document.body.contains(toastContainer)) {
      toastContainer.innerHTML = '';
    }
  };
}
