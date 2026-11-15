/**
 * GDGRepair - Service Detail Modal Module
 * Hiển thị cửa sổ chi tiết dịch vụ, đảm bảo tính tiếp cận (a11y) và quản lý focus
 */

import { $, lockScroll, unlockScroll, setupFocusTrap, escapeHTML } from '../core/dom.js';
import { servicesData } from '../../data/mockData.js';
import { isWishlisted, toggleWishlist } from './wishlist.js';

let isModalOpen = false;
let lastFocusedElement = null;
let cleanupFocusTrap = null;
let currentModalServiceId = null;

/**
 * Mở modal chi tiết dịch vụ theo ID
 * @param {string} serviceId
 * @param {HTMLElement} [triggerElement=null]
 */
export function openServiceModal(serviceId, triggerElement = null) {
  const modal = $('#service-modal');
  const backdrop = $('#modal-backdrop');
  if (!modal || isModalOpen) return;

  const service = servicesData.find((s) => s.id === serviceId);
  if (!service) {
    console.warn(`[serviceModal] Không tìm thấy dữ liệu cho dịch vụ: "${serviceId}"`);
    return;
  }

  currentModalServiceId = service.id;
  lastFocusedElement = triggerElement || document.activeElement;

  // Điền dữ liệu chi tiết vào modal
  const titleEl = $('#modal-service-title');
  const categoryBadgeEl = $('#modal-service-category');
  const priceEl = $('#modal-service-price');
  const timeEl = $('#modal-service-time');
  const warrantyEl = $('#modal-service-warranty');
  const descEl = $('#modal-service-desc');
  const featuresListEl = $('#modal-service-features');
  const recsContainerEl = $('#modal-service-recs-container');
  const recsListEl = $('#modal-service-recs');
  const bookingBtn = $('#modal-booking-btn');
  const wishlistBtn = $('#modal-wishlist-btn');

  if (titleEl) titleEl.textContent = service.name;
  if (categoryBadgeEl) categoryBadgeEl.textContent = service.categoryLabel;
  if (priceEl) priceEl.textContent = service.priceLabel;
  if (timeEl) timeEl.textContent = service.estimatedTime;
  if (warrantyEl) warrantyEl.textContent = service.warranty;
  if (descEl) descEl.textContent = service.description;

  if (featuresListEl) {
    featuresListEl.innerHTML = service.features
      .map((feat) => `
        <li class="modal-feature-item">
          <svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${escapeHTML(feat)}</span>
        </li>
      `)
      .join('');
  }

  if (recsListEl && recsContainerEl) {
    if (service.recommendations && service.recommendations.length > 0) {
      recsContainerEl.style.display = 'block';
      recsListEl.innerHTML = service.recommendations
        .map((rec) => `
          <li class="modal-rec-item">
            <svg class="rec-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>${escapeHTML(rec)}</span>
          </li>
        `)
        .join('');
    } else {
      recsContainerEl.style.display = 'none';
    }
  }

  // Cập nhật trạng thái nút yêu thích trong modal
  if (wishlistBtn) {
    wishlistBtn.dataset.serviceId = service.id;
    wishlistBtn.dataset.serviceName = service.name;
    const isFav = isWishlisted(service.id);
    wishlistBtn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    wishlistBtn.classList.toggle('is-favorited', isFav);
    wishlistBtn.title = isFav ? 'Bỏ khỏi yêu thích' : 'Lưu vào yêu thích';
  }

  // Nút liên kết đặt lịch
  if (bookingBtn) {
    bookingBtn.dataset.serviceTarget = service.name;
  }

  // Hiển thị modal và backdrop
  isModalOpen = true;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');

  if (backdrop) {
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
  }

  lockScroll('modal');

  // Khởi tạo focus trap và focus vào nút đóng
  cleanupFocusTrap = setupFocusTrap(modal);
  const closeBtn = $('#modal-close');
  if (closeBtn) {
    setTimeout(() => closeBtn.focus(), 50);
  }
}

/**
 * Đóng modal chi tiết
 */
export function closeServiceModal() {
  const modal = $('#service-modal');
  const backdrop = $('#modal-backdrop');
  if (!modal || !isModalOpen) return;

  isModalOpen = false;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');

  if (backdrop) {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
  }

  if (cleanupFocusTrap) {
    cleanupFocusTrap();
    cleanupFocusTrap = null;
  }

  unlockScroll('modal');

  // Trả focus về phần tử ban đầu
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

/**
 * Khởi tạo module modal
 * @returns {() => void} Cleanup function
 */
export function initServiceModal() {
  const handleClick = (e) => {
    // Mở modal từ nút "Xem chi tiết"
    const openBtn = e.target.closest('[data-action="open-modal"]');
    if (openBtn) {
      e.preventDefault();
      const serviceId = openBtn.dataset.serviceId;
      if (serviceId) {
        openServiceModal(serviceId, openBtn);
      }
      return;
    }

    // Đóng modal từ nút đóng hoặc backdrop
    const closeBtn = e.target.closest('#modal-close') || e.target.closest('[data-action="close-modal"]');
    if (closeBtn) {
      e.preventDefault();
      closeServiceModal();
      return;
    }

    // Đóng modal khi bấm trực tiếp vào vùng backdrop
    if (e.target.id === 'modal-backdrop') {
      closeServiceModal();
      return;
    }

    // Bấm nút Đặt lịch trong modal
    const bookBtn = e.target.closest('#modal-booking-btn');
    if (bookBtn) {
      e.preventDefault();
      const serviceName = bookBtn.dataset.serviceTarget;
      closeServiceModal();

      // Cuộn mượt đến form đặt lịch
      const contactSection = $('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Tự động chọn dịch vụ trong dropdown form
      const serviceSelect = $('#booking-service');
      if (serviceSelect && serviceName) {
        // Tìm option tương ứng
        const options = Array.from(serviceSelect.options);
        const match = options.find((opt) => opt.text.includes(serviceName) || opt.value.includes(serviceName));
        if (match) {
          serviceSelect.value = match.value;
          // Kích hoạt event change
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closeServiceModal();
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeyDown);
    if (isModalOpen) {
      unlockScroll('modal');
    }
  };
}
