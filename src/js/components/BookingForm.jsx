import React, { useState, useEffect } from 'react';

const initialFormData = {
  fullName: '',
  phoneNumber: '',
  deviceType: '',
  service: '',
  preferredDate: '',
  issueDescription: '',
};

export default function BookingForm({ preselectedService }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  // When a service is selected from Modal or Pricing, update the form field
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        service: preselectedService,
      }));
    }
  }, [preselectedService]);

  // Auto-dismiss toast after 8 seconds with cleanup
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 8000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Field validation logic
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Vui lòng nhập họ và tên của bạn.';
        } else if (value.trim().length < 2) {
          error = 'Họ và tên phải có ít nhất 2 ký tự.';
        }
        break;

      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Vui lòng nhập số điện thoại liên hệ.';
        } else {
          // Standard Vietnamese mobile phone number format (10 digits starting with 03, 05, 07, 08, 09 or +84)
          const phoneRegex = /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
          if (!phoneRegex.test(value.trim().replace(/\s+/g, ''))) {
            error = 'Số điện thoại không hợp lệ (ví dụ: 0905123456 hoặc 0389123456).';
          }
        }
        break;

      case 'deviceType':
        if (!value) {
          error = 'Vui lòng chọn loại thiết bị.';
        }
        break;

      case 'service':
        if (!value) {
          error = 'Vui lòng chọn dịch vụ bạn cần sử dụng.';
        }
        break;

      case 'preferredDate':
        if (!value) {
          error = 'Vui lòng chọn ngày mong muốn mang máy.';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            error = 'Ngày mong muốn không thể là ngày trong quá khứ.';
          }
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const allTouched = {};

    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    // If any validation error exists, show error toast and stop
    if (Object.keys(newErrors).length > 0) {
      setToast({
        type: 'error',
        title: 'Thông tin chưa hợp lệ',
        message: 'Vui lòng kiểm tra và hoàn thiện các trường được đánh dấu màu đỏ.',
      });
      return;
    }

    // Simulate async submission loading state (1.2 seconds)
    setIsSubmitting(true);
    setToast(null);

    setTimeout(() => {
      setIsSubmitting(false);

      // Show success toast with explicit demonstration notice
      setToast({
        type: 'success',
        title: 'Đặt lịch mẫu thành công!',
        message: `Cảm ơn bạn ${formData.fullName}! Yêu cầu dịch vụ đã được ghi nhận trên giao diện.`,
        demoNotice:
          'LƯU Ý MÔ PHỎNG (FRONTEND ONLY): Đây là đồ án bài tập Frontend của sinh viên, không có máy chủ backend và không có bất kỳ dữ liệu thực tế nào được gửi đi hoặc lưu trữ.',
      });

      // Reset form
      setFormData(initialFormData);
      setTouched({});
      setErrors({});
    }, 1200);
  };

  // Today string for input min attribute (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section id="dat-lich" className="py-20 sm:py-24 bg-darkBg dark:bg-[#0D1117] bg-white border-t border-darkBorder dark:border-[#30363D] border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Hỗ trợ nhanh chóng
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-darkText dark:text-[#F3F4F6] text-gray-900 tracking-tight">
            Đặt lịch hẹn chăm sóc thiết bị
          </h2>
          <p className="mt-4 text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            Điền thông tin thiết bị và nhu cầu của bạn. Đội ngũ kỹ thuật viên GDG on Campus - DUT sẽ tiếp nhận và phản hồi hỗ trợ chu đáo.
          </p>
        </div>

        {/* Toast Notification Banner */}
        {toast && (
          <div
            role="alert"
            className={`mb-8 p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative shadow-lg ${
              toast.type === 'success'
                ? 'bg-secondary/10 border-secondary/30 text-darkText dark:text-[#F3F4F6] text-gray-900'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  toast.type === 'success' ? 'bg-secondary text-white' : 'bg-red-500 text-white'
                }`}
              >
                {toast.type === 'success' ? (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              <div className="flex-1 pr-6">
                <h4 className="text-sm font-bold">{toast.title}</h4>
                <p className="mt-1 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-700">
                  {toast.message}
                </p>

                {toast.demoNotice && (
                  <div className="mt-3 p-3 rounded-xl bg-darkSurfaceElevated dark:bg-[#21262D] bg-white border border-secondary/30 text-xs text-secondary font-medium">
                    {toast.demoNotice}
                  </div>
                )}
              </div>

              {/* Close Toast Button */}
              <button
                type="button"
                onClick={() => setToast(null)}
                aria-label="Đóng thông báo"
                className="p-1 rounded-lg text-darkMuted dark:text-[#9CA3AF] text-gray-400 hover:text-darkText dark:hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Booking Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 p-6 sm:p-10 shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field: Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border text-darkText dark:text-[#F3F4F6] text-gray-900 placeholder-darkMuted dark:placeholder-[#9CA3AF] placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                  touched.fullName && errors.fullName
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-darkBorder dark:border-[#30363D] border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                aria-invalid={touched.fullName && !!errors.fullName}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {touched.fullName && errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Field: Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Số điện thoại liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0905123456"
                className={`w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border text-darkText dark:text-[#F3F4F6] text-gray-900 placeholder-darkMuted dark:placeholder-[#9CA3AF] placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                  touched.phoneNumber && errors.phoneNumber
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-darkBorder dark:border-[#30363D] border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                aria-invalid={touched.phoneNumber && !!errors.phoneNumber}
                aria-describedby={errors.phoneNumber ? 'phoneNumber-error' : undefined}
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p id="phoneNumber-error" className="mt-1.5 text-xs text-red-400">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Field: Device Type */}
            <div>
              <label htmlFor="deviceType" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Loại thiết bị <span className="text-red-500">*</span>
              </label>
              <select
                id="deviceType"
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border text-darkText dark:text-[#F3F4F6] text-gray-900 focus:outline-none focus:ring-1 transition-colors ${
                  touched.deviceType && errors.deviceType
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-darkBorder dark:border-[#30363D] border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                aria-invalid={touched.deviceType && !!errors.deviceType}
                aria-describedby={errors.deviceType ? 'deviceType-error' : undefined}
              >
                <option value="">-- Chọn loại thiết bị --</option>
                <option value="Laptop Windows">Laptop Windows (Dell, Asus, Lenovo, HP, Acer...)</option>
                <option value="MacBook / macOS">MacBook (Air / Pro / Mac mini)</option>
                <option value="Máy tính để bàn PC">Máy tính để bàn (PC Desktop)</option>
                <option value="Khác">Thiết bị khác</option>
              </select>
              {touched.deviceType && errors.deviceType && (
                <p id="deviceType-error" className="mt-1.5 text-xs text-red-400">
                  {errors.deviceType}
                </p>
              )}
            </div>

            {/* Field: Service */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Dịch vụ cần sử dụng <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border text-darkText dark:text-[#F3F4F6] text-gray-900 focus:outline-none focus:ring-1 transition-colors ${
                  touched.service && errors.service
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-darkBorder dark:border-[#30363D] border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                aria-invalid={touched.service && !!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
              >
                <option value="">-- Chọn gói dịch vụ --</option>
                <option value="cai-dat-windows">Cài đặt Windows bản quyền (Từ 50.000 VNĐ)</option>
                <option value="ve-sinh-laptop">Vệ sinh laptop chuyên sâu (Từ 80.000 VNĐ)</option>
                <option value="nang-cap-phan-cung">Nâng cấp RAM & SSD (Liên hệ báo giá)</option>
                <option value="sua-loi-phan-mem">Sửa lỗi phần mềm & Diệt virus (Từ 40.000 VNĐ)</option>
                <option value="kiem-tra-tong-quat">Kiểm tra & Chẩn đoán tổng quát (Miễn phí)</option>
              </select>
              {touched.service && errors.service && (
                <p id="service-error" className="mt-1.5 text-xs text-red-400">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Field: Preferred Date */}
            <div className="sm:col-span-2">
              <label htmlFor="preferredDate" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Ngày mong muốn mang máy đến <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                min={todayStr}
                value={formData.preferredDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border text-darkText dark:text-[#F3F4F6] text-gray-900 focus:outline-none focus:ring-1 transition-colors ${
                  touched.preferredDate && errors.preferredDate
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-darkBorder dark:border-[#30363D] border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                aria-invalid={touched.preferredDate && !!errors.preferredDate}
                aria-describedby={errors.preferredDate ? 'preferredDate-error' : undefined}
              />
              {touched.preferredDate && errors.preferredDate && (
                <p id="preferredDate-error" className="mt-1.5 text-xs text-red-400">
                  {errors.preferredDate}
                </p>
              )}
            </div>

            {/* Field: Issue Description */}
            <div className="sm:col-span-2">
              <label htmlFor="issueDescription" className="block text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 mb-2">
                Mô tả tình trạng thiết bị (không bắt buộc)
              </label>
              <textarea
                id="issueDescription"
                name="issueDescription"
                rows={3}
                value={formData.issueDescription}
                onChange={handleChange}
                placeholder="Ví dụ: Máy bị nóng khi mở nhiều tab Chrome, quạt kêu to hoặc bị dump màn hình xanh khi render..."
                className="w-full px-4 py-3 rounded-xl text-sm bg-darkBg dark:bg-[#0D1117] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-300 text-darkText dark:text-[#F3F4F6] text-gray-900 placeholder-darkMuted dark:placeholder-[#9CA3AF] placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-darkBorder dark:border-[#30363D] border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-500">
              <span className="text-red-500">*</span> Các trường bắt buộc phải điền
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary-hover shadow-md transition-all duration-200 active:scale-95 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang ghi nhận yêu cầu...
                </>
              ) : (
                <>
                  Xác nhận đặt lịch
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
