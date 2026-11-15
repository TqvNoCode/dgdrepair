import React from 'react';
import { pricingPlans, pricingCommitments } from '../../data/pricing';

export default function Pricing({ onBookService }) {
  const handleSelectPlan = (serviceId) => {
    if (onBookService) {
      onBookService(serviceId);
    }
    const bookingSection = document.querySelector('#dat-lich');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderCommitmentIcon = (iconName) => {
    switch (iconName) {
      case 'check-shield':
        return (
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'user-check':
        return (
          <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'shield-lock':
      default:
        return (
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
    }
  };

  return (
    <section id="bang-gia" className="py-20 sm:py-24 bg-darkBg dark:bg-[#0D1117] bg-white border-t border-darkBorder dark:border-[#30363D] border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Chi phí minh bạch
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-darkText dark:text-[#F3F4F6] text-gray-900 tracking-tight">
            Bảng giá dịch vụ rõ ràng, hợp lý
          </h2>
          <p className="mt-4 text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            Cam kết không phát sinh phụ phí ẩn. Kiểm tra tình trạng thiết bị hoàn toàn miễn phí trước khi thực hiện dịch vụ.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {pricingPlans.map((plan) => {
            const isFeatured = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 relative ${
                  isFeatured
                    ? 'bg-darkSurface dark:bg-[#161B22] bg-blue-50/40 border-2 border-primary shadow-xl shadow-primary/10'
                    : 'bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 shadow-sm hover:border-primary/40'
                }`}
              >
                {/* Popular Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary text-white shadow-md">
                    Khuyên dùng
                  </div>
                )}

                <div>
                  {/* Tag and Title */}
                  <span className="text-[11px] font-medium text-darkMuted dark:text-[#9CA3AF] text-gray-500 uppercase tracking-wider">
                    {plan.tag}
                  </span>
                  <h3 className="text-lg font-bold text-darkText dark:text-[#F3F4F6] text-gray-900 mt-1">
                    {plan.name}
                  </h3>

                  {/* Price Block */}
                  <div className="mt-4 pb-4 border-b border-darkBorder dark:border-[#30363D] border-gray-100">
                    <div className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                      {plan.price}
                    </div>
                    <div className="text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-500 mt-1">
                      {plan.priceNote}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-600 leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-darkText dark:text-[#F3F4F6] text-gray-700">
                        <svg
                          className="w-4 h-4 text-secondary shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan CTA Button */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan.serviceId)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                      isFeatured
                        ? 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20'
                        : 'bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-100 text-darkText dark:text-[#F3F4F6] text-gray-800 hover:bg-primary hover:text-white border border-darkBorder dark:border-[#30363D] border-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commitments Bar */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-darkBorder dark:border-[#30363D] border-gray-200">
          {pricingCommitments.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-5 rounded-2xl bg-darkSurface dark:bg-[#161B22] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-200"
            >
              <div className="w-10 h-10 rounded-xl bg-darkSurfaceElevated dark:bg-[#21262D] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 flex items-center justify-center shrink-0">
                {renderCommitmentIcon(item.icon)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-darkText dark:text-[#F3F4F6] text-gray-900">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
