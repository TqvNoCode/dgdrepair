import React, { useState } from 'react';
import { services, serviceCategories } from '../../data/services';
import ServiceModal from './ServiceModal';

export default function Services({ onBookService }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeServiceModal, setActiveServiceModal] = useState(null);

  // Dynamic filtering based on search query and category
  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      service.title.toLowerCase().includes(query) ||
      service.shortDescription.toLowerCase().includes(query) ||
      service.categoryLabel.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  // Render SVG Icon based on service ID
  const renderServiceIcon = (id) => {
    switch (id) {
      case 'cai-dat-windows':
        return (
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
            <rect x="13" y="3" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
            <rect x="3" y="13" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
            <rect x="13" y="13" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
          </svg>
        );
      case 've-sinh-laptop':
        return (
          <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M12 3v4M12 17v4M3 12h4M17 12h4" />
            <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
          </svg>
        );
      case 'nang-cap-phan-cung':
        return (
          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" fill="currentColor" fillOpacity="0.2" />
            <path strokeLinecap="round" d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
          </svg>
        );
      case 'sua-loi-phan-mem':
      default:
        return (
          <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
    }
  };

  return (
    <section id="dich-vu" className="py-20 sm:py-24 bg-darkBg dark:bg-[#0D1117] bg-gray-50 border-t border-darkBorder dark:border-[#30363D] border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Dịch vụ chuyên nghiệp
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-darkText dark:text-[#F3F4F6] text-gray-900 tracking-tight">
            Giải pháp toàn diện cho máy tính của bạn
          </h2>
          <p className="mt-4 text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            Từ bảo trì phần cứng định kỳ đến xử lý sự cố hệ điều hành, đội ngũ kỹ thuật GDGRepair mang đến dịch vụ chu đáo với chất lượng kỹ thuật cao.
          </p>
        </div>

        {/* Filter Controls: Search & Category Tabs */}
        <div className="mb-10 space-y-5">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <label htmlFor="service-search" className="sr-only">
              Tìm kiếm dịch vụ
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-darkMuted dark:text-[#9CA3AF] text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                id="service-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm dịch vụ (ví dụ: Windows, vệ sinh, RAM...)"
                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-300 text-darkText dark:text-[#F3F4F6] text-gray-900 placeholder-darkMuted dark:placeholder-[#9CA3AF] placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label="Xóa từ khóa tìm kiếm"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-darkMuted dark:text-[#9CA3AF] hover:text-darkText dark:hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {serviceCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                      : 'bg-darkSurface dark:bg-[#161B22] bg-white text-darkMuted dark:text-[#9CA3AF] text-gray-700 border-darkBorder dark:border-[#30363D] border-gray-200 hover:border-primary/50 hover:text-darkText dark:hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-500 px-1">
          <span>
            Hiển thị <strong className="text-darkText dark:text-[#F3F4F6] text-gray-800">{filteredServices.length}</strong> dịch vụ
          </span>
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-primary hover:underline font-medium"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Services Grid (Mapped with Array.map) */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 p-6 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Top Card Bar: Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {renderServiceIcon(service.id)}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-100 text-darkMuted dark:text-[#9CA3AF] text-gray-600 border border-darkBorder dark:border-[#30363D] border-gray-200">
                      {service.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-darkText dark:text-[#F3F4F6] text-gray-900 group-hover:text-primary transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-600 line-clamp-3 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="mt-6 pt-5 border-t border-darkBorder dark:border-[#30363D] border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-darkMuted dark:text-[#9CA3AF] text-gray-500 uppercase tracking-wider">
                      Mức giá
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {service.priceLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveServiceModal(service)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-darkText dark:text-[#F3F4F6] text-gray-800 hover:text-primary group-hover:translate-x-0.5 transition-all focus:outline-none"
                  >
                    <span>Xem chi tiết</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Results State */
          <div className="text-center py-16 px-4 bg-darkSurface dark:bg-[#161B22] bg-white rounded-2xl border border-darkBorder dark:border-[#30363D] border-gray-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-100 flex items-center justify-center text-darkMuted dark:text-[#9CA3AF] text-gray-400 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-darkText dark:text-[#F3F4F6] text-gray-900">
              Không tìm thấy dịch vụ phù hợp
            </h3>
            <p className="mt-2 text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-600 max-w-sm mx-auto">
              Không có kết quả nào khớp với từ khóa "{searchTerm}". Vui lòng thử tìm với từ khóa khác hoặc xóa bộ lọc.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow transition-colors"
            >
              Xóa bộ lọc tìm kiếm
            </button>
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onBookService={onBookService}
      />
    </section>
  );
}
