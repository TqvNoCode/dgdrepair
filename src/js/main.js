/**
 * GDGRepair - Main Application Entry Point
 * Điểm khởi chạy ứng dụng chính: Tải HTML partials và khởi tạo các module tương tác
 */

import { loadPartials } from './core/partialLoader.js';
import { initTheme } from './modules/theme.js';
import { initToast } from './modules/toast.js';
import { initNavbar } from './modules/navbar.js';
import { initWishlist } from './modules/wishlist.js';
import { initServices } from './modules/services.js';
import { initServiceModal } from './modules/serviceModal.js';
import { initFaq } from './modules/faq.js';
import { initContactForm } from './modules/contactForm.js';

/**
 * Thiết lập cuộn trang mượt mà cho các liên kết mỏ neo (anchor links)
 */
function setupSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#' || !href) return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.querySelector('#navbar')?.offsetHeight || 70;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });

      // Cập nhật URL hash mà không làm giật trang
      if (history.pushState) {
        history.pushState(null, '', href);
      }
    }
  });
}

/**
 * Khởi động ứng dụng theo thứ tự phụ thuộc chính xác
 */
async function bootstrapApp() {
  try {
    // 1. Tải toàn bộ HTML partials vào các mount points
    const partialsLoaded = await loadPartials();
    if (!partialsLoaded) {
      console.warn('[GDGRepair] Một số partials không thể tải được. Ứng dụng sẽ tiếp tục với các thành phần hiện có.');
    }

    // 2. Khởi tạo theme (Dark/Light mode)
    initTheme();

    // 3. Khởi tạo hệ thống thông báo Toast
    initToast();

    // 4. Khởi tạo thanh điều hướng Navbar và Drawer menu di động
    initNavbar();

    // 5. Khởi tạo Wishlist (Dịch vụ yêu thích)
    initWishlist();

    // 6. Khởi tạo danh sách dịch vụ, bộ lọc danh mục và ô tìm kiếm
    initServices();

    // 7. Khởi tạo modal chi tiết dịch vụ
    initServiceModal();

    // 8. Khởi tạo accordion câu hỏi thường gặp FAQ
    initFaq();

    // 9. Khởi tạo form đặt lịch và xác thực dữ liệu
    initContactForm();

    // 10. Hỗ trợ cuộn mượt cho toàn bộ anchor links
    setupSmoothScrolling();

    console.info('[GDGRepair] Ứng dụng GDGRepair đã khởi động thành công!');
  } catch (error) {
    console.error('[GDGRepair] Lỗi nghiêm trọng khi khởi động ứng dụng:', error);
  }
}

// Chạy ứng dụng khi DOM đã sẵn sàng
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapApp);
} else {
  bootstrapApp();
}
