/**
 * GDGRepair - Safe Storage Utilities
 * Quản lý đọc/ghi localStorage an toàn, chống crash khi dữ liệu hỏng hoặc duyệt web ẩn danh
 */

export const STORAGE_KEYS = {
  THEME: 'gdgrepair_theme',
  WISHLIST: 'gdgrepair_wishlist'
};

/**
 * Đọc dữ liệu từ localStorage kèm giá trị mặc định an toàn
 * @template T
 * @param {string} key
 * @param {T} defaultValue
 * @returns {T}
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (err) {
    console.warn(`[storage] Lỗi khi đọc key "${key}" từ localStorage:`, err);
    return defaultValue;
  }
};

/**
 * Ghi dữ liệu an toàn vào localStorage
 * @param {string} key
 * @param {any} value
 * @returns {boolean} Kết quả ghi thành công hay thất bại
 */
export const setStorage = (key, value) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (err) {
    console.warn(`[storage] Lỗi khi ghi key "${key}" vào localStorage:`, err);
    return false;
  }
};

/**
 * Xóa một key khỏi localStorage
 * @param {string} key
 * @returns {boolean}
 */
export const removeStorage = (key) => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    window.localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`[storage] Lỗi khi xóa key "${key}" khỏi localStorage:`, err);
    return false;
  }
};
