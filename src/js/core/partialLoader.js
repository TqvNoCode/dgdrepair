/**
 * GDGRepair - HTML Partial Loader
 * Tải động các thành phần giao diện HTML bằng native Fetch API
 */

const PARTIAL_MAP = {
  header: './src/partials/header.html',
  hero: './src/partials/hero.html',
  services: './src/partials/services.html',
  pricing: './src/partials/pricing.html',
  process: './src/partials/process.html',
  faq: './src/partials/faq.html',
  contact: './src/partials/contact.html',
  footer: './src/partials/footer.html',
  overlays: './src/partials/overlays.html'
};

const loadedSet = new Set();

/**
 * Tải một partial cụ thể và chèn vào mount point tương ứng
 * @param {string} key
 * @param {string} url
 * @returns {Promise<boolean>}
 */
async function loadSinglePartial(key, url) {
  if (loadedSet.has(key)) {
    return true;
  }

  const mountPoint = document.querySelector(`[data-partial="${key}"]`);
  if (!mountPoint) {
    console.warn(`[partialLoader] Không tìm thấy điểm gắn kết cho partial: "${key}"`);
    return false;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    const html = await response.text();
    // Thay thế mount point bằng nội dung HTML ngữ nghĩa
    mountPoint.outerHTML = html;
    loadedSet.add(key);
    return true;
  } catch (error) {
    console.error(`[partialLoader] Không thể tải partial "${key}" từ ${url}:`, error);
    mountPoint.innerHTML = `
      <div class="partial-load-error" role="alert" style="padding: 1.5rem; text-align: center; color: #ef4444; background: rgba(239, 68, 68, 0.1); border-radius: 8px; margin: 1rem 0;">
        <p><strong>Lỗi tải giao diện:</strong> Không thể tải thành phần <em>${key}</em>.</p>
        <p style="font-size: 0.875rem; color: #9ca3af;">Vui lòng đảm bảo website được chạy qua local HTTP server (ví dụ: python3 -m http.server).</p>
      </div>
    `;
    return false;
  }
}

/**
 * Tải đồng loạt tất cả các HTML partials cần thiết của trang
 * @returns {Promise<boolean>} Trả về true nếu tất cả partials tải thành công
 */
export async function loadPartials() {
  const mountKeys = Object.keys(PARTIAL_MAP);
  const tasks = mountKeys.map((key) => loadSinglePartial(key, PARTIAL_MAP[key]));
  const results = await Promise.all(tasks);
  return results.every(Boolean);
}
