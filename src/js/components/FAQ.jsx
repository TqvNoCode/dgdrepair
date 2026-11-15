import React, { useState } from 'react';
import { faqs } from '../../data/faqs';

export default function FAQ() {
  // useState to manage currently open accordion item (null = all collapsed)
  const [openFaqId, setOpenFaqId] = useState('mat-du-lieu');

  const toggleFaq = (id) => {
    setOpenFaqId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-darkBg dark:bg-[#0D1117] bg-white border-t border-darkBorder dark:border-[#30363D] border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Giải đáp thắc mắc
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-darkText dark:text-[#F3F4F6] text-gray-900 tracking-tight">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-4 text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600">
            Tổng hợp những câu hỏi và thắc mắc phổ biến nhất của các bạn sinh viên khi sử dụng dịch vụ tại GDGRepair.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-darkSurface dark:bg-[#161B22] bg-blue-50/30 border-primary/40 shadow-md'
                    : 'bg-darkSurface dark:bg-[#161B22] bg-white border-darkBorder dark:border-[#30363D] border-gray-200 hover:border-primary/30'
                }`}
              >
                {/* Accordion Question Button */}
                <button
                  type="button"
                  id={`faq-question-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                >
                  <span className="text-base sm:text-lg font-semibold text-darkText dark:text-[#F3F4F6] text-gray-900">
                    {faq.question}
                  </span>

                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 bg-primary text-white'
                        : 'bg-darkSurfaceElevated dark:bg-[#21262D] bg-gray-100 text-darkMuted dark:text-[#9CA3AF] text-gray-500'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Answer Region */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={`px-6 pb-5 pt-1 text-sm sm:text-base text-darkMuted dark:text-[#9CA3AF] text-gray-600 leading-relaxed border-t border-darkBorder/40 dark:border-[#30363D]/40 border-gray-100 ${
                    isOpen ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-darkSurface dark:bg-[#161B22] bg-gray-50 border border-darkBorder dark:border-[#30363D] border-gray-200">
          <p className="text-sm text-darkText dark:text-[#F3F4F6] text-gray-800 font-medium">
            Bạn vẫn còn câu hỏi chưa được giải đáp?
          </p>
          <p className="mt-1 text-xs text-darkMuted dark:text-[#9CA3AF] text-gray-500">
            Liên hệ trực tiếp qua form đặt lịch bên dưới hoặc gửi tin nhắn cho fanpage GDG on Campus - DUT để được hỗ trợ nhanh nhất.
          </p>
        </div>
      </div>
    </section>
  );
}
