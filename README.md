# GDGRepair — Landing Page Dịch Vụ Chăm Sóc & Bảo Dưỡng Máy Tính

GDGRepair — dịch vụ kỹ thuật cài đặt hệ điều hành Windows bản quyền, vệ sinh tản nhiệt PTM7950, nâng cấp phần cứng RAM/SSD và xử lý sự cố máy tính.
---

## 1. Công nghệ và kiến trúc

### Công nghệ sử dụng
`HTML5 + CSS3 (CSS Layers & Custom Properties) + Vanilla JavaScript (ES6 Modules) + Fetch API (Dynamic Partials) + LocalStorage API + WAI-ARIA Accessibility`

- **Bảo mật & Trợ năng**: Tích hợp bẫy tiêu điểm (Focus Trap), phím thoát Escape, mã hóa chống lỗ hổng XSS (`escapeHTML`) và vùng thông báo trợ năng `aria-live="polite"` đạt chuẩn quốc tế WAI-ARIA (a11y).

### Kiến trúc hệ thống
1. **Kiến trúc HTML Partials**:
   - Trang chủ [index.html](file:///home/tqv/Desktop/GCD_project/GDGRepair/index.html) đóng vai trò khung gắn kết, chứa các thẻ mount point ngữ nghĩa (`<div data-partial="header"></div>`, `<div data-partial="hero"></div>`,...).
   - Tách biệt 9 phân vùng giao diện độc lập trong thư mục `src/partials/`.
   - Tệp [partialLoader.js](file:///home/tqv/Desktop/GCD_project/GDGRepair/src/js/core/partialLoader.js) sử dụng native `Fetch API` và `Promise.all` nạp động và hoán đổi các mount point thành HTML ngữ nghĩa khi tải trang.
2. **Kiến trúc CSS Layered & Design Tokens**:
   - Sử dụng `@layer` tổ chức kiểu dáng theo các tầng ưu tiên: `reset, tokens, base, layout, components, responsive, utilities`.
   - Hệ thống biến CSS Custom Properties trong `tokens.css` quản lý toàn bộ bảng màu Dark/Light Mode, typography, spacing, và hàm màu hiện đại `oklch()`.
3. **Kiến trúc ES6 Modules**:
   - Tải điểm khởi chạy ứng dụng nguyên bản qua `<script type="module" src="./src/js/main.js"></script>`.
   - Phân tách rành mạch giữa các tiện ích dùng chung (`src/js/core/`) và các module chức năng nghiệp vụ (`src/js/modules/`).
4. **Dữ liệu giả lập tập trung (Centralized Mock Data)**:
   - Toàn bộ nội dung dịch vụ, thông số kỹ thuật, bảng giá, quy trình làm việc và câu hỏi thường gặp được quản lý tại tệp duy nhất [mockData.js](file:///home/tqv/Desktop/GCD_project/GDGRepair/src/data/mockData.js).

---

## 2. Danh sách tính năng trọng tâm

1. **Scroll Event + Cleanup (navbar.js)**: Navbar tự động đổi nền kính mờ (`backdrop-filter: blur`), co hẹp chiều cao khi cuộn trang `scrollY > 50px` với `passive listener` và `requestAnimationFrame`; quản lý đóng/mở Mobile Drawer và cung cấp hàm cleanup gỡ bỏ sự kiện chống rò rỉ bộ nhớ.

2. **Dynamic Filter + Debounce 200ms (services.js)**: Lọc dịch vụ đa chiều theo 6 Tab danh mục (*Tất cả, Cài Windows, Vệ sinh, Nâng cấp, Phần mềm, Yêu thích*) kết hợp ô tìm kiếm từ khóa thời gian thực với kỹ thuật Debounce 200ms; xử lý giao diện rỗng (Empty State) và cập nhật thông báo số lượng kết quả cho trình đọc màn hình qua `aria-live="polite"`.

3. **Overlays State + Keydown Event (serviceModal.js, dom.js)**: Quản lý đóng/mở Modal chi tiết dịch vụ và Mobile Drawer; tích hợp cơ chế Shared Scroll-Lock (`overflow: hidden`) chống kẹt cuộn khi mở đè; hỗ trợ đóng nhanh bằng phím `Escape` / click Backdrop, bẫy tiêu điểm (Focus Trap) và tự động khôi phục con trỏ tiêu điểm (Focus Restoration) về nút bấm ban đầu; nút "Đặt lịch ngay" trong modal tự động cuộn và chọn sẵn dịch vụ trong dropdown.

4. **Single-Open Accordion Pattern (faq.js)**: Danh sách câu hỏi thường gặp nạp động từ `mockData.js`, mở duy nhất 1 câu hỏi tại một thời điểm và tự động thu gọn câu hỏi đang mở khi kích hoạt câu hỏi mới; đồng bộ chính xác các thuộc tính trợ năng `aria-expanded` và `hidden`.

5. **Form Validation + Async Loading Simulation (contactForm.js, toast.js)**: Kiểm tra hợp lệ dữ liệu phía client (Họ tên >= 2 ký tự, Email chuẩn RFC, Số điện thoại 10 số nhà mạng VN, Ngày hẹn không ở quá khứ); giả lập gửi dữ liệu bất đồng bộ qua `setTimeout` 1.5s, khóa nút bấm và hiển thị spinner chống spam/double-submit; kích hoạt Toast thông báo thành công và tự động làm mới form.

6. **State Persistence + LocalStorage API (theme.js, wishlist.js, storage.js)**: Đồng bộ bền vững chế độ Dark/Light Mode (kèm mã Anti-FOUC và nhận diện theme hệ điều hành) cùng danh sách dịch vụ yêu thích (Wishlist) vào `localStorage`; tự động cập nhật số lượng tức thời lên huy hiệu Navbar và khôi phục nguyên vẹn trạng thái khi tải lại trang.

---

## 3. Cấu trúc thư mục

```
GDGRepair/
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions tự động triển khai trang tĩnh lên GitHub Pages
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │       ├── gdg-logo.svg        # Logo chuẩn 4 màu GDG (< >) và chip kỹ thuật
│   │       ├── hero-illustration.svg # Vector minh họa laptop & giao diện chẩn đoán PTM7950
│   │       ├── favicon-16x16.png   # Favicon trình duyệt kích thước nhỏ
│   │       ├── favicon-32x32.png   # Favicon trình duyệt kích thước chuẩn
│   │       ├── favicon-192x192.png # Favicon độ phân giải cao cho thiết bị di động
│   │       └── apple-touch-icon.png# Biểu tượng màn hình chính cho thiết bị iOS
│   │
│   ├── data/
│   │   └── mockData.js             # Dữ liệu tập trung: Dịch vụ, Bảng giá, Quy trình, FAQs
│   │
│   ├── js/
│   │   │
│   │   ├── core/
│   │   │   ├── dom.js              # Tiện ích DOM, XSS Escape, Shared Scroll-Lock & Focus Trap
│   │   │   ├── storage.js          # Xử lý localStorage an toàn, try-catch và giá trị fallback
│   │   │   └── partialLoader.js    # Nạp bất đồng bộ 9 tệp HTML Partials qua Fetch API
│   │   │
│   │   ├── modules/
│   │   │   ├── theme.js            # Chuyển đổi Dark / Light Mode & đồng bộ theme hệ thống
│   │   │   ├── navbar.js           # Cuộn trang đổi kiểu dáng & Ngăn kéo menu di động (Drawer)
│   │   │   ├── services.js         # Lọc danh mục, tìm kiếm Debounce 200ms & kết xuất thẻ dịch vụ
│   │   │   ├── serviceModal.js     # Modal chi tiết dịch vụ, Focus Trap & liên kết form đặt lịch
│   │   │   ├── wishlist.js         # Quản lý danh sách dịch vụ yêu thích & huy hiệu Navbar
│   │   │   ├── faq.js              # Accordion hỏi đáp đơn điểm (Single-Open Model)
│   │   │   ├── contactForm.js      # Kiểm tra hợp lệ form, chống gửi đúp & giả lập gửi 1.5s
│   │   │   └── toast.js            # Hệ thống thông báo nổi (Toast Notification)
│   │   │
│   │   └── main.js                 # Điểm khởi chạy ứng dụng tuần tự (Bootstrap sequence)
│   │
│   ├── partials/
│   │   ├── header.html             # Thanh điều hướng, nhận diện GDGRepair, Theme/Wishlist toggle
│   │   ├── hero.html               # Tiêu đề chính, nút kêu gọi hành động CTA & hình minh họa
│   │   ├── services.html           # Bộ lọc danh mục, thanh tìm kiếm & lưới hiển thị thẻ dịch vụ
│   │   ├── pricing.html            # Bảng giá 4 gói kỹ thuật & cam kết minh bạch
│   │   ├── process.html            # Quy trình phục vụ 4 bước chuẩn hóa
│   │   ├── faq.html                # Khung hiển thị accordion câu hỏi thường gặp
│   │   ├── contact.html            # Biểu mẫu đặt lịch hẹn tư vấn và tiếp nhận thiết bị
│   │   ├── footer.html             # Chân trang thông tin thương hiệu, liên kết & bản quyền
│   │   └── overlays.html           # Các lớp phủ: Mobile Drawer, Service Modal, Toast Container
│   │
│   └── styles/
│       ├── tokens.css              # Hệ thống Design Tokens: biến màu sắc, typography, spacing
│       ├── base.css                # CSS Reset, typography cơ bản, trạng thái focus tiếp cận
│       ├── layout.css              # Bố cục Container, Sticky Header, Hero, Footer
│       ├── components.css          # Kiểu dáng nút, thẻ dịch vụ, bảng giá, modal, accordion, toast
│       ├── responsive.css          # Breakpoints thích ứng (1440px, 1024px, 768px, 390px, 360px)
│       └── main.css                # Tệp CSS đầu vào phân lớp bằng @layer và @import
│
├── index.html                      # Khung tài liệu HTML chính, anti-FOUC & điểm gắn kết partials
├── favicon.ico                     # Multi-size Favicon (16x16, 32x32, 48x48) tại thư mục gốc
├── favicon.png                     # Favicon PNG tiêu chuẩn tại thư mục gốc
├── README.md                       # Tài liệu hướng dẫn dự án chi tiết
├── .gitignore                      # Cấu hình loại trừ các tệp hệ điều hành và IDE
└── .nojekyll                       # Vô hiệu hóa Jekyll Engine trên GitHub Pages
```

---

## 4. Hướng dẫn deploy

### A. Chạy thử nghiệm cục bộ (Local Development)

> [!IMPORTANT]
> Vì dự án sử dụng **Fetch API** nạp động các tệp HTML Partials từ thư mục `src/partials/`, trình duyệt sẽ chặn yêu cầu nếu mở trực tiếp bằng giao thức tệp `file:///` do chính sách bảo mật CORS của trình duyệt. 
> 
> Bạn **cần chạy trang web qua một máy chủ HTTP cục bộ**. Không yêu cầu cài đặt thêm thư viện npm nào:

#### Cách 1: Sử dụng tiện ích Live Server trên VS Code (Khuyên dùng — 1 cú click)
1. Cài đặt Extension **Live Server** (Ritwick Dey) trên Visual Studio Code.
2. Nhấp chuột phải vào tệp [index.html](file:///home/tqv/Desktop/GCD_project/GDGRepair/index.html) và chọn **"Open with Live Server"**.
3. Trang web sẽ tự động mở tại địa chỉ `http://127.0.0.1:5500`.

#### Cách 2: Sử dụng lệnh Python 3 (Có sẵn trên hầu hết máy tính)
Mở Terminal tại thư mục gốc dự án và chạy lệnh:
```bash
python3 -m http.server 8000
```
*(Trên Windows: `python -m http.server 8000`)*  
Truy cập trình duyệt tại: `http://localhost:8000`.

#### Cách 3: Sử dụng Node.js hoặc PHP (Nếu máy đã cài sẵn)
```bash
# Với Node.js
npx serve

# Với PHP
php -S localhost:8000
```

---

