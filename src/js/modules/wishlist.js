/**
 * GDGRepair - Wishlist Module
 * Quản lý danh sách dịch vụ yêu thích, lưu trữ cục bộ qua localStorage
 */

import { getStorage, setStorage, STORAGE_KEYS } from '../core/storage.js';
import { $, $$ } from '../core/dom.js';
import { showToast } from './toast.js';

let wishlist = new Set();
const listeners = new Set();

/**
 * Đọc dữ liệu yêu thích từ storage
 */
function loadWishlist() {
  const saved = getStorage(STORAGE_KEYS.WISHLIST, []);
  if (Array.isArray(saved)) {
    wishlist = new Set(saved);
  } else {
    wishlist = new Set();
  }
}

/**
 * Lưu wishlist vào storage
 */
function saveWishlist() {
  setStorage(STORAGE_KEYS.WISHLIST, Array.from(wishlist));
}

/**
 * Cập nhật số lượng hiển thị trên huy hiệu (badge) navbar và drawer
 */
export function updateWishlistBadge() {
  const count = wishlist.size;
  const badges = $$('[data-wishlist-count]');
  badges.forEach((badge) => {
    badge.textContent = count.toString();
    if (count > 0) {
      badge.classList.remove('is-hidden');
    } else {
      badge.classList.add('is-hidden');
    }
  });
}

/**
 * Kiểm tra xem một dịch vụ có trong wishlist không
 * @param {string} serviceId
 * @returns {boolean}
 */
export function isWishlisted(serviceId) {
  return wishlist.has(serviceId);
}

/**
 * Lấy danh sách ID dịch vụ yêu thích
 * @returns {string[]}
 */
export function getWishlistIds() {
  return Array.from(wishlist);
}

/**
 * Lấy số lượng dịch vụ yêu thích
 * @returns {number}
 */
export function getWishlistCount() {
  return wishlist.size;
}

/**
 * Đăng ký callback khi wishlist thay đổi
 * @param {Function} callback
 * @returns {() => void} Unsubscribe
 */
export function onWishlistChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function notifyListeners() {
  listeners.forEach((cb) => {
    try {
      cb(Array.from(wishlist));
    } catch (err) {
      console.error('[wishlist] Lỗi listener:', err);
    }
  });
}

/**
 * Bật/tắt trạng thái yêu thích của một dịch vụ
 * @param {string} serviceId
 * @param {string} [serviceName='']
 * @returns {boolean} Trạng thái mới (true: đã thêm, false: đã xóa)
 */
export function toggleWishlist(serviceId, serviceName = '') {
  if (!serviceId) return false;

  const isNowAdded = !wishlist.has(serviceId);
  if (isNowAdded) {
    wishlist.add(serviceId);
    showToast({
      type: 'success',
      message: serviceName ? `Đã lưu "${serviceName}" vào yêu thích` : 'Đã thêm vào danh sách yêu thích'
    });
  } else {
    wishlist.delete(serviceId);
    showToast({
      type: 'info',
      message: serviceName ? `Đã bỏ "${serviceName}" khỏi yêu thích` : 'Đã xóa khỏi danh sách yêu thích'
    });
  }

  saveWishlist();
  updateWishlistBadge();
  notifyListeners();
  return isNowAdded;
}

/**
 * Khởi tạo module wishlist
 * @returns {() => void}
 */
export function initWishlist() {
  loadWishlist();
  updateWishlistBadge();

  // Bắt sự kiện click vào nút yêu thích trên các thẻ dịch vụ
  const handleClick = (e) => {
    const btn = e.target.closest('[data-action="toggle-wishlist"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const serviceId = btn.dataset.serviceId;
    const serviceName = btn.dataset.serviceName || '';
    if (serviceId) {
      toggleWishlist(serviceId, serviceName);
    }
  };

  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
    listeners.clear();
  };
}
