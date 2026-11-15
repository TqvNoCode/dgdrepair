/**
 * GDGRepair - Services Module
 * Quản lý kết xuất danh sách dịch vụ, lọc theo danh mục, tìm kiếm debounced và hiển thị yêu thích
 */

import { $, $$, escapeHTML } from '../core/dom.js';
import { servicesData, categoryTabs } from '../../data/mockData.js';
import { isWishlisted, onWishlistChange } from './wishlist.js';

let currentCategory = 'all';
let searchQuery = '';
let searchDebounceTimer = null;
let unbindWishlistListener = null;

const SERVICE_ICONS = {
  windows: `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  `,
  cleaning: `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path>
      <circle cx="12" cy="12" r="4"></circle>
    </svg>
  `,
  hardware: `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  `,
  software: `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <line x1="14" y1="4" x2="10" y2="20"></line>
    </svg>
  `
};

const HEART_ICON = `
  <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
`;

/**
 * Lọc danh sách dịch vụ theo tab và từ khóa tìm kiếm
 * @returns {Array}
 */
function getFilteredServices() {
  const query = searchQuery.trim().toLowerCase();

  return servicesData.filter((service) => {
    // Lọc theo danh mục
    let matchesCategory = true;
    if (currentCategory === 'favorites') {
      matchesCategory = isWishlisted(service.id);
    } else if (currentCategory !== 'all') {
      matchesCategory = service.category === currentCategory;
    }

    if (!matchesCategory) return false;

    // Lọc theo từ khóa tìm kiếm
    if (!query) return true;

    const matchesName = service.name.toLowerCase().includes(query);
    const matchesDesc = service.shortDescription.toLowerCase().includes(query);
    const matchesCategoryLabel = service.categoryLabel.toLowerCase().includes(query);
    const matchesFeatures = service.features.some((f) => f.toLowerCase().includes(query));

    return matchesName || matchesDesc || matchesCategoryLabel || matchesFeatures;
  });
}

/**
 * Kết xuất danh sách thẻ dịch vụ ra DOM
 */
export function renderServices() {
  const container = $('#services-grid');
  const liveRegion = $('#service-results-count');
  if (!container) return;

  const filtered = getFilteredServices();

  // Thông báo trợ năng qua aria-live
  if (liveRegion) {
    liveRegion.textContent = `Tìm thấy ${filtered.length} dịch vụ phù hợp.`;
  }

  // Trường hợp không có kết quả
  if (filtered.length === 0) {
    if (currentCategory === 'favorites') {
      container.innerHTML = `
        <div class="services-empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 class="empty-title">Chưa có dịch vụ yêu thích</h3>
          <p class="empty-desc">Bạn chưa lưu dịch vụ nào vào mục yêu thích. Hãy nhấn vào biểu tượng trái tim ở góc mỗi thẻ dịch vụ để lưu lại xem sau.</p>
          <button type="button" class="btn btn-outline btn-sm" data-action="reset-category-all">
            Xem tất cả dịch vụ
          </button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="services-empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 class="empty-title">Không tìm thấy dịch vụ</h3>
          <p class="empty-desc">Không có kết quả nào khớp với từ khóa "<strong>${escapeHTML(searchQuery)}</strong>" trong danh mục hiện tại.</p>
          <button type="button" class="btn btn-primary btn-sm" data-action="reset-service-filter">
            Đặt lại bộ lọc
          </button>
        </div>
      `;
    }
    return;
  }

  // Kết xuất các thẻ dịch vụ
  container.innerHTML = filtered
    .map((service) => {
      const isFav = isWishlisted(service.id);
      const iconMarkup = SERVICE_ICONS[service.icon] || SERVICE_ICONS.windows;

      return `
        <article class="service-card" data-service-id="${service.id}">
          <div class="service-card-header">
            <div class="service-card-icon-wrap" aria-hidden="true">
              ${iconMarkup}
            </div>
            <button 
              type="button" 
              class="service-fav-btn ${isFav ? 'is-active' : ''}" 
              data-action="toggle-wishlist"
              data-service-id="${service.id}"
              data-service-name="${escapeHTML(service.name)}"
              aria-label="${isFav ? 'Bỏ khỏi danh sách yêu thích' : 'Lưu vào danh sách yêu thích'}"
              aria-pressed="${isFav ? 'true' : 'false'}"
              title="${isFav ? 'Bỏ yêu thích' : 'Lưu yêu thích'}"
            >
              ${HEART_ICON}
            </button>
          </div>

          <div class="service-card-body">
            <span class="service-card-badge">${escapeHTML(service.categoryLabel)}</span>
            <h3 class="service-card-title">${escapeHTML(service.name)}</h3>
            <p class="service-card-desc">${escapeHTML(service.shortDescription)}</p>

            <div class="service-card-meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${escapeHTML(service.estimatedTime)}
              </span>
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                ${escapeHTML(service.warranty)}
              </span>
            </div>
          </div>

          <div class="service-card-footer">
            <div class="service-card-price">
              <span class="price-val">${escapeHTML(service.priceLabel)}</span>
              <span class="price-note">${escapeHTML(service.priceNote)}</span>
            </div>
            <div class="service-card-actions">
              <button 
                type="button" 
                class="btn btn-outline btn-sm" 
                data-action="open-modal"
                data-service-id="${service.id}"
                aria-haspopup="dialog"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

/**
 * Đặt lại toàn bộ bộ lọc về trạng thái ban đầu
 */
export function resetFilters() {
  currentCategory = 'all';
  searchQuery = '';

  const searchInput = $('#service-search-input');
  if (searchInput) searchInput.value = '';

  updateTabButtons();
  renderServices();
}

/**
 * Cập nhật trạng thái active của các tab danh mục
 */
function updateTabButtons() {
  const tabs = $$('.service-tab-btn');
  tabs.forEach((tab) => {
    const tabCat = tab.dataset.category;
    const isSelected = tabCat === currentCategory;
    tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    tab.classList.toggle('is-active', isSelected);
  });
}

/**
 * Khởi tạo module dịch vụ
 * @returns {() => void} Cleanup function
 */
export function initServices() {
  renderServices();
  updateTabButtons();

  // Đăng ký lắng nghe thay đổi wishlist để đồng bộ giao diện
  unbindWishlistListener = onWishlistChange(() => {
    renderServices();
  });

  // Bắt sự kiện chuyển tab danh mục
  const handleTabClick = (e) => {
    const tabBtn = e.target.closest('.service-tab-btn');
    if (!tabBtn) return;

    e.preventDefault();
    const cat = tabBtn.dataset.category;
    if (cat && cat !== currentCategory) {
      currentCategory = cat;
      updateTabButtons();
      renderServices();
    }
  };

  // Bắt sự kiện tìm kiếm với debounce 200ms
  const searchInput = $('#service-search-input');
  const handleSearchInput = (e) => {
    clearTimeout(searchDebounceTimer);
    const value = e.target.value;
    searchDebounceTimer = setTimeout(() => {
      searchQuery = value;
      renderServices();
    }, 200);
  };

  // Nút xóa nhanh ô tìm kiếm
  const clearSearchBtn = $('#service-search-clear');
  const handleClearSearch = () => {
    if (searchInput) {
      searchInput.value = '';
      searchQuery = '';
      renderServices();
      searchInput.focus();
    }
  };

  // Bắt sự kiện reset từ empty state
  const handleDocumentClick = (e) => {
    if (e.target.closest('[data-action="reset-service-filter"]')) {
      resetFilters();
    } else if (e.target.closest('[data-action="reset-category-all"]')) {
      currentCategory = 'all';
      updateTabButtons();
      renderServices();
    }
  };

  const tabsContainer = $('#service-category-tabs');
  if (tabsContainer) {
    tabsContainer.addEventListener('click', handleTabClick);
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', handleClearSearch);
  }

  document.addEventListener('click', handleDocumentClick);

  return () => {
    if (tabsContainer) tabsContainer.removeEventListener('click', handleTabClick);
    if (searchInput) searchInput.removeEventListener('input', handleSearchInput);
    if (clearSearchBtn) clearSearchBtn.removeEventListener('click', handleClearSearch);
    document.removeEventListener('click', handleDocumentClick);
    if (unbindWishlistListener) unbindWishlistListener();
    clearTimeout(searchDebounceTimer);
  };
}
