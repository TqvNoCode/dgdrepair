import React, { useEffect } from 'react';

export default function ServiceModal({ service, onClose, onBookService }) {
  useEffect(() => {
    if (!service) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll to prevent background scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleBook = () => {
    if (onBookService) {
      onBookService(service.id);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-darkSurface dark:bg-[#161B22] bg-white rounded-2xl border border-darkBorder dark:border-[#30363D] border-gray-200 shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header Bar: Category & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-darkBorder dark:border-[#30363D] border-gray-200">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            {service.categoryLabel}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ chi tiết dịch vụ"
            className="p-2 rounded-lg text-darkMuted dark:text-[#9CA3AF] text-gray-500 hover:text-darkText dark:hover:text-[#F3F4F6] hover:bg-darkSurfaceElevated dark:hover:bg-[#21262D] hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Title & Meta */}
        <div className="mt-4">
          <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-darkText dark:text-[#F3F4F6] text-gray-900">
            {service.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-4 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            <div className="flex items-center gap-1.5 font-medium text-primary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{service.priceLabel}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Thời gian: {service.estimatedTime}</span>
            </div>

            <div className="flex items-center gap-1.5 text-secondary">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{service.warranty}</span>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <p className="mt-4 text-sm sm:text-base text-darkMuted dark:text-[#9CA3AF] text-gray-700 leading-relaxed">
          {service.details}
        </p>

        {/* Included Features Checklist */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-darkText dark:text-[#F3F4F6] text-gray-900 mb-3">
            Nội dung gói dịch vụ bao gồm:
          </h3>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-darkText dark:text-[#F3F4F6] text-gray-700">
                <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations / Notes */}
        {service.recommendations && service.recommendations.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-200">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lưu ý quan trọng từ kỹ thuật viên:
            </h4>
            <ul className="space-y-1.5 text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-600">
              {service.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-darkBorder dark:border-[#30363D] border-gray-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium text-darkMuted dark:text-[#9CA3AF] text-gray-700 hover:text-darkText dark:hover:text-[#F3F4F6] hover:bg-darkSurfaceElevated dark:hover:bg-[#21262D] hover:bg-gray-100 transition-colors"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleBook}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-hover shadow transition-colors"
          >
            Đặt lịch dịch vụ này
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
