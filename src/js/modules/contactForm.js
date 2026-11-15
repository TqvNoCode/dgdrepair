/**
 * GDGRepair - Contact & Booking Form Module
 * Quản lý xác thực biểu mẫu đặt lịch, thông báo lỗi inline và giả lập gửi yêu cầu bất đồng bộ
 */

import { $ } from '../core/dom.js';
import { showToast } from './toast.js';

let isSubmitting = false;

// Biểu thức chính quy kiểm tra định dạng email và số điện thoại Việt Nam
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Hiển thị thông báo lỗi inline cho từng trường nhập liệu
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} message
 */
function setFieldError(field, message) {
  const formGroup = field.closest('.form-group');
  if (!formGroup) return;

  const errorEl = formGroup.querySelector('.form-field-error');
  if (message) {
    formGroup.classList.add('has-error');
    field.setAttribute('aria-invalid', 'true');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('is-hidden');
    }
  } else {
    formGroup.classList.remove('has-error');
    field.setAttribute('aria-invalid', 'false');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('is-hidden');
    }
  }
}

/**
 * Xóa toàn bộ lỗi trên form
 * @param {HTMLFormElement} form
 */
function clearAllErrors(form) {
  const groups = form.querySelectorAll('.form-group');
  groups.forEach((group) => {
    group.classList.remove('has-error');
    const field = group.querySelector('input, select, textarea');
    if (field) field.setAttribute('aria-invalid', 'false');
    const errorEl = group.querySelector('.form-field-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('is-hidden');
    }
  });
}

/**
 * Kiểm tra hợp lệ cho một trường đơn lẻ
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @returns {boolean}
 */
function validateField(field) {
  const name = field.name;
  const value = field.value.trim();

  switch (name) {
    case 'fullname':
      if (!value) {
        setFieldError(field, 'Vui lòng nhập họ và tên của bạn.');
        return false;
      }
      if (value.length < 2) {
        setFieldError(field, 'Họ và tên cần có ít nhất 2 ký tự.');
        return false;
      }
      setFieldError(field, '');
      return true;

    case 'email':
      if (!value) {
        setFieldError(field, 'Vui lòng cung cấp địa chỉ email liên hệ.');
        return false;
      }
      if (!EMAIL_REGEX.test(value)) {
        setFieldError(field, 'Địa chỉ email không đúng định dạng (ví dụ: name@gmail.com).');
        return false;
      }
      setFieldError(field, '');
      return true;

    case 'phone':
      if (!value) {
        setFieldError(field, 'Vui lòng nhập số điện thoại để kỹ thuật viên liên hệ.');
        return false;
      }
      // Bỏ khoảng trắng nếu có
      const cleanPhone = value.replace(/\s+/g, '');
      if (!PHONE_REGEX.test(cleanPhone)) {
        setFieldError(field, 'Số điện thoại không hợp lệ (cần 10 chữ số, đầu số 03, 05, 07, 08, 09).');
        return false;
      }
      setFieldError(field, '');
      return true;

    case 'deviceType':
      if (!value) {
        setFieldError(field, 'Vui lòng chọn loại thiết bị cần hỗ trợ.');
        return false;
      }
      setFieldError(field, '');
      return true;

    case 'service':
      if (!value) {
        setFieldError(field, 'Vui lòng chọn dịch vụ bạn muốn đặt lịch.');
        return false;
      }
      setFieldError(field, '');
      return true;

    case 'bookingDate':
      if (!value) {
        setFieldError(field, 'Vui lòng chọn ngày mong muốn mang máy đến.');
        return false;
      }
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setFieldError(field, 'Ngày hẹn không thể là một ngày trong quá khứ.');
        return false;
      }
      setFieldError(field, '');
      return true;

    default:
      return true;
  }
}

/**
 * Khởi tạo module Contact Form
 * @returns {() => void} Cleanup function
 */
export function initContactForm() {
  const form = $('#booking-form');
  if (!form) return () => {};

  // Thiết lập thuộc tính min cho trường ngày là ngày hôm nay
  const dateInput = $('#booking-date');
  if (dateInput) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Lắng nghe sự kiện blur để kiểm tra lỗi ngay khi người dùng rời khỏi trường
  const handleBlur = (e) => {
    if (e.target.matches('input, select, textarea')) {
      validateField(e.target);
    }
  };

  // Xóa thông báo lỗi khi người dùng đang nhập lại
  const handleInput = (e) => {
    if (e.target.matches('input, select, textarea')) {
      const group = e.target.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validateField(e.target);
      }
    }
  };

  // Xử lý gửi biểu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Kiểm tra tất cả các trường
    const fieldsToValidate = [
      form.elements.fullname,
      form.elements.email,
      form.elements.phone,
      form.elements.deviceType,
      form.elements.service,
      form.elements.bookingDate
    ];

    let isAllValid = true;
    fieldsToValidate.forEach((field) => {
      if (field) {
        const valid = validateField(field);
        if (!valid && isAllValid) {
          isAllValid = false;
          field.focus();
        }
      }
    });

    if (!isAllValid) {
      showToast({
        type: 'error',
        message: 'Vui lòng kiểm tra lại các trường thông tin chưa hợp lệ.'
      });
      return;
    }

    // Bắt đầu quá trình gửi mô phỏng
    isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.innerHTML = `
        <span class="btn-spinner" aria-hidden="true"></span>
        <span>Đang ghi nhận yêu cầu...</span>
      `;
    }

    // Giả lập gửi API bất đồng bộ sau ~1500ms
    setTimeout(() => {
      isSubmitting = false;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('is-loading');
        submitBtn.innerHTML = originalBtnText;
      }

      // Xóa dữ liệu form
      form.reset();
      clearAllErrors(form);

      // Hiển thị toast thành công
      showToast({
        type: 'success',
        duration: 5000,
        message: 'Đặt lịch thành công! Kỹ thuật viên GDGRepair sẽ liên hệ để xác nhận thời gian hỗ trợ bạn.'
      });

      // Hiển thị thông báo trạng thái dưới form
      const statusBanner = $('#booking-status-banner');
      if (statusBanner) {
        statusBanner.className = 'status-banner is-success';
        statusBanner.innerHTML = `
          <div class="status-banner-content">
            <strong>✓ Đã tiếp nhận yêu cầu đặt lịch thành công!</strong>
            <p>Cảm ơn bạn đã gửi yêu cầu. Kỹ thuật viên GDGRepair sẽ chủ động liên hệ qua số điện thoại hoặc email của bạn để xác nhận lịch hẹn trong thời gian sớm nhất.</p>
          </div>
        `;
        statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1500);
  };

  form.addEventListener('blur', handleBlur, true);
  form.addEventListener('input', handleInput);
  form.addEventListener('submit', handleSubmit);

  return () => {
    form.removeEventListener('blur', handleBlur, true);
    form.removeEventListener('input', handleInput);
    form.removeEventListener('submit', handleSubmit);
  };
}
