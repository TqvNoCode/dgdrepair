/**
 * GDGRepair - FAQ Accordion Module
 * Quản lý danh sách câu hỏi thường gặp với mô hình Single-Open Accordion chuẩn a11y
 */

import { $, $$, escapeHTML } from '../core/dom.js';
import { faqData } from '../../data/mockData.js';

let activeFaqId = null;

const CHEVRON_ICON = `
  <svg class="faq-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
`;

/**
 * Kết xuất danh sách câu hỏi từ mockData.js vào DOM
 */
export function renderFaq() {
  const container = $('#faq-accordion');
  if (!container) return;

  container.innerHTML = faqData
    .map((item, index) => {
      const isOpen = item.id === activeFaqId;
      const btnId = `faq-btn-${item.id}`;
      const panelId = `faq-panel-${item.id}`;

      return `
        <div class="faq-item ${isOpen ? 'is-expanded' : ''}" data-faq-id="${item.id}">
          <h3 class="faq-heading">
            <button
              type="button"
              id="${btnId}"
              class="faq-trigger"
              aria-expanded="${isOpen ? 'true' : 'false'}"
              aria-controls="${panelId}"
              data-faq-id="${item.id}"
            >
              <span class="faq-question-text">${escapeHTML(item.question)}</span>
              ${CHEVRON_ICON}
            </button>
          </h3>
          <div
            id="${panelId}"
            class="faq-panel"
            role="region"
            aria-labelledby="${btnId}"
            ${isOpen ? '' : 'hidden'}
          >
            <div class="faq-panel-inner">
              <p class="faq-answer-text">${escapeHTML(item.answer)}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

/**
 * Đóng hoặc mở một câu hỏi FAQ (Mô hình Single-Open: chỉ 1 câu mở tại một thời điểm)
 * @param {string} faqId
 */
export function toggleFaq(faqId) {
  if (activeFaqId === faqId) {
    // Nếu đang mở câu này -> đóng lại
    activeFaqId = null;
  } else {
    // Đóng câu cũ và mở câu mới
    activeFaqId = faqId;
  }

  // Cập nhật DOM trực tiếp để tối ưu hiệu năng không phải render lại toàn bộ list
  const allItems = $$('.faq-item');
  allItems.forEach((item) => {
    const id = item.dataset.faqId;
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const isTarget = id === activeFaqId;

    if (isTarget) {
      item.classList.add('is-expanded');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      if (panel) panel.removeAttribute('hidden');
    } else {
      item.classList.remove('is-expanded');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (panel) panel.setAttribute('hidden', '');
    }
  });
}

/**
 * Khởi tạo module FAQ
 * @returns {() => void} Cleanup function
 */
export function initFaq() {
  renderFaq();

  const container = $('#faq-accordion');
  if (!container) return () => {};

  const handleClick = (e) => {
    const trigger = e.target.closest('.faq-trigger');
    if (!trigger) return;

    e.preventDefault();
    const faqId = trigger.dataset.faqId;
    if (faqId) {
      toggleFaq(faqId);
    }
  };

  container.addEventListener('click', handleClick);

  return () => {
    container.removeEventListener('click', handleClick);
  };
}
