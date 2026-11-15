import React from 'react';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Tiếp nhận yêu cầu',
      shortDesc: 'Đặt lịch hoặc mang máy trực tiếp',
      description: 'Đăng ký thông tin và tình trạng máy qua biểu mẫu đặt lịch trực tuyến hoặc mang máy trực tiếp đến văn phòng hỗ trợ kỹ thuật của GDG.',
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Kiểm tra thiết bị',
      shortDesc: 'Chẩn đoán toàn diện miễn phí',
      description: 'Kỹ thuật viên đo kiểm tra nhiệt độ CPU/GPU, đánh giá sức khỏe ổ cứng, kiểm tra bàn phím, cổng kết nối và phân tích mã lỗi hệ thống.',
      icon: (
        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Tư vấn và báo giá',
      shortDesc: 'Minh bạch, không phụ phí ẩn',
      description: 'Giải thích rõ nguyên nhân cốt lõi, đề xuất phương án xử lý tối ưu về cả hiệu năng lẫn chi phí. Chỉ tiến hành khi khách hàng đồng thuận.',
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      number: '04',
      title: 'Thực hiện và bàn giao',
      shortDesc: 'Nhanh chóng & bảo hành chu đáo',
      description: 'Tiến hành thao tác tỉ mỉ, kiểm thử độ ổn định (stress test). Khách hàng trực tiếp kiểm tra và nghiệm thu thiết bị trước khi nhận lại.',
      icon: (
        <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="quy-trinh" className="py-20 sm:py-24 bg-darkBg dark:bg-[#0D1117] bg-gray-50 border-t border-darkBorder dark:border-[#30363D] border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Quy trình làm việc
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-darkText dark:text-[#F3F4F6] text-gray-900 tracking-tight">
            4 bước chăm sóc máy tính chuyên nghiệp
          </h2>
          <p className="mt-4 text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            Quy trình được chuẩn hóa giúp tiết kiệm thời gian, bảo đảm an toàn dữ liệu và đem lại trải nghiệm yên tâm tuyệt đối cho khách hàng.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="flex flex-col justify-between rounded-2xl bg-darkSurface dark:bg-[#161B22] bg-white border border-darkBorder dark:border-[#30363D] border-gray-200 p-6 shadow-sm hover:border-primary/50 transition-all duration-300 relative group"
            >
              <div>
                {/* Step Top: Number and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-darkBorder dark:text-[#30363D] text-gray-200 group-hover:text-primary/40 transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-200 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="text-lg font-bold text-darkText dark:text-[#F3F4F6] text-gray-900 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <span className="inline-block text-xs font-medium text-primary mt-1">
                  {step.shortDesc}
                </span>

                {/* Step Detailed Description */}
                <p className="mt-3 text-xs sm:text-sm text-darkMuted dark:text-[#9CA3AF] text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress pill indicator at bottom */}
              <div className="mt-6 pt-4 border-t border-darkBorder dark:border-[#30363D] border-gray-100 flex items-center justify-between text-[11px] text-darkMuted dark:text-[#9CA3AF] text-gray-500">
                <span>Bước {idx + 1} / 4</span>
                <span className="font-semibold text-secondary">Hoàn thành nhanh</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
