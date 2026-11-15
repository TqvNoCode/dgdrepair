# GDGRepair - Dịch vụ Chăm sóc & Bảo dưỡng Máy tính

> **Đơn vị bảo trợ**: GDG on Campus - DUT (Trường Đại học Bách Khoa, Đại học Đà Nẵng)  
> **Dự án**: Đồ án học phần môn Frontend Web Development  
> **Trạng thái**: Frontend Demo (Giao diện người dùng thuần túy, không kết nối cơ sở dữ liệu/máy chủ)

---

## 1. Giới thiệu dự án

**GDGRepair** là landing page hiện đại, tinh gọn và chuẩn nhận diện thương hiệu công nghệ dành cho dịch vụ bảo dưỡng, cài đặt và nâng cấp máy tính/laptop hỗ trợ sinh viên và cán bộ giảng viên tại trường Đại học Bách Khoa - Đại học Đà Nẵng.

Trang web cung cấp 4 nhóm dịch vụ cốt lõi:
- **Cài đặt Windows bản quyền**: Hệ điều hành chính hãng, cài driver đầy đủ, giữ an toàn dữ liệu cá nhân.
- **Vệ sinh laptop chuyên sâu**: Làm sạch quạt tản nhiệt, tra keo tản nhiệt hiệu suất cao (MX-4), hạ nhiệt 10 - 20°C.
- **Nâng cấp phần cứng**: Nâng cấp RAM và SSD NVMe/SATA siêu tốc, tối ưu hiệu năng học tập và đồ họa.
- **Sửa lỗi phần mềm**: Khắc phục lỗi màn hình xanh (BSOD), diệt virus, dọn rác và cài ứng dụng chuyên ngành.

---

## 2. Công nghệ sử dụng (Tech Stack)

Dự án được xây dựng tuân thủ nghiêm ngặt theo yêu cầu của đồ án Frontend:

- **ReactJS 18+ (JSX)**: Thư viện xây dựng giao diện người dùng theo kiến trúc component.
- **Vite 5+**: Công cụ build và bundler siêu tốc với Hot Module Replacement (HMR).
- **Tailwind CSS 3+**: Framework CSS utility-first làm giải pháp tạo kiểu và responsive giao diện chính.
- **React Hooks thuần**: Sử dụng trực tiếp `useState` và `useEffect` cho toàn bộ logic trạng thái ứng dụng.
- **HTML5 & SVG Inline**: Tối ưu khả năng truy cập (Accessibility - a11y), tải trang nhanh, không phụ thuộc thư viện icon bên ngoài.
- **Không sử dụng**: TypeScript, Redux, backend API, database, hay các UI kit cồng kềnh.

---

## 3. Cấu trúc thư mục dự án

```
GDGRepair/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow triển khai tự động lên GitHub Pages
├── public/                     # Thư mục tài nguyên tĩnh công khai
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── gdg-logo.svg            # Logo hình học nhận diện GDGRepair
│   │       └── hero-illustration.svg   # Minh họa vector laptop & dashboard chẩn đoán
│   ├── data/
│   │   ├── services.js         # Dữ liệu 4 nhóm dịch vụ & chi tiết kỹ thuật
│   │   ├── pricing.js          # Dữ liệu bảng giá minh bạch & cam kết chất lượng
│   │   └── faqs.js             # Dữ liệu các câu hỏi thường gặp
│   ├── js/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Thanh điều hướng sticky, đổi nền khi cuộn & mobile drawer
│   │   │   ├── Hero.jsx            # Khu vực tiêu đề, khẩu hiệu & ảnh minh họa
│   │   │   ├── Services.jsx        # Lưới dịch vụ, tìm kiếm & bộ lọc danh mục động
│   │   │   ├── ServiceModal.jsx    # Hộp thoại popup xem chi tiết dịch vụ (Escape + scroll lock)
│   │   │   ├── Pricing.jsx         # Bảng giá dịch vụ, cam kết & chuyển hướng đặt lịch
│   │   │   ├── Process.jsx         # 4 bước quy trình tiếp nhận & bàn giao thiết bị
│   │   │   ├── FAQ.jsx             # Accordion câu hỏi mở/đóng với thuộc tính aria-expanded
│   │   │   ├── BookingForm.jsx     # Form đặt lịch với kiểm tra dữ liệu, loading & toast thông báo
│   │   │   └── Footer.jsx          # Chân trang thông tin liên hệ, bản quyền & liên kết
│   │   ├── hooks/
│   │   │   ├── useScroll.js        # Custom hook theo dõi cuộn trang (scroll listener + cleanup)
│   │   │   └── useTheme.js         # Custom hook quản lý Dark/Light mode và lưu vào localStorage
│   │   └── main.jsx            # Component gốc và điểm gắn kết React DOM
│   ├── partials/               # Thư mục lưu trữ template/partial dự phòng
│   └── styles/
│       ├── main.css            # Chỉ thị Tailwind CSS, cấu hình scrollbar & reduced-motion
│       └── responsive.css      # Tinh chỉnh responsive cho thiết bị di động và tablet
├── index.html                  # File HTML chính, cấu hình phông chữ Inter & script chống flash theme
├── package.json                # Danh sách dependencies và npm scripts
├── postcss.config.js           # Cấu hình PostCSS với Tailwind CSS và Autoprefixer
├── tailwind.config.js          # Cấu hình bảng màu Dark Tech (#0D1117, #161B22, #30363D...)
├── vite.config.js              # Cấu hình Vite với base relative ('./') chuẩn GitHub Pages
└── README.md                   # Tài liệu hướng dẫn đồ án (tiếng Việt)
```

---

## 4. 6 Tính năng React Hooks cốt lõi theo đề bài

| # | Tính năng | React Hooks áp dụng | Mô tả triển khai kỹ thuật |
|---|---|---|---|
| **1** | **Scroll-aware Navbar** | `useEffect`, `useState` | Tách vào custom hook `useScroll`. Lắng nghe sự kiện `scroll` trên `window` với cờ `passive: true`, tự động đổi nền sang kính mờ (`backdrop-blur-md`) khi cuộn quá 20px và dọn dẹp listener trong hàm cleanup. |
| **2** | **Tìm kiếm & Phân loại Dịch vụ** | `useState` | Quản lý chuỗi `searchTerm` và tab danh mục `selectedCategory`. Lọc mảng `services` theo thời gian thực và render kết quả qua `Array.prototype.map()`. Xử lý trạng thái rỗng khi không tìm thấy kết quả. |
| **3** | **Chi tiết Dịch vụ & Mobile Drawer** | `useState`, `useEffect` | Mở xem chi tiết dịch vụ và menu di động. Bắt sự kiện phím `Escape` để đóng modal, khóa cuộn trang (`document.body.style.overflow = 'hidden'`) và hoàn trả thuộc tính cuộn khi đóng/unmount. |
| **4** | **FAQ Accordion** | `useState` | Lưu trữ ID câu hỏi đang mở (`openFaqId`). Đảm bảo khả năng tiếp cận (Accessibility - a11y) với thẻ `<button>`, thuộc tính `aria-expanded` và `aria-controls`. |
| **5** | **Form Đặt Lịch Hẹn & Toast** | `useState`, `useEffect` | Quản lý dữ liệu form, thông báo lỗi kiểm tra trường bắt buộc, regex số điện thoại Việt Nam (10 chữ số) và ngày hẹn không ở quá khứ. Có hiệu ứng loading giả lập và hiển thị toast thông báo rõ ràng đây là **Frontend Demo**. |
| **6** | **Chế độ Sáng / Tối (Dark/Light Mode)** | `useState`, `useEffect` | Custom hook `useTheme` đọc theme đã lưu từ `localStorage` (mặc định là **Dark Tech**), gắn class `dark`/`light` lên thẻ `<html>` và lưu lại khi người dùng chuyển đổi. |

---

## 5. Hướng dẫn cài đặt và chạy thử nghiệm

### 5.1. Yêu cầu môi trường
- **Node.js**: Phiên bản 18 trở lên (khuyên dùng Node 20 LTS hoặc mới hơn).
- **npm**: Phiên bản 9 trở lên.

### 5.2. Cài đặt dependencies
Mở terminal tại thư mục gốc của dự án và chạy:
```bash
npm install
```

### 5.3. Khởi chạy máy chủ phát triển (Development)
```bash
npm run dev
```
Sau khi khởi chạy, truy cập vào đường link hiển thị trên terminal (mặc định là `http://localhost:5173/`).

### 5.4. Đóng gói mã nguồn cho sản xuất (Build)
```bash
npm run build
```
Kết quả build được xuất ra thư mục `dist/`. Tất cả đường dẫn tài sản (`assets`) được xuất theo dạng tương đối (`./assets/...`), tương thích hoàn toàn với việc host tại thư mục con hoặc domain bất kỳ.

### 5.5. Xem trước bản build (Preview)
```bash
npm run preview
```

---

## 6. Hướng dẫn triển khai lên GitHub Pages

Dự án đã được tích hợp sẵn quy trình triển khai tự động qua **GitHub Actions** tại file `.github/workflows/deploy.yml`.

### Các bước kích hoạt trên repository GitHub của bạn:
1. Đẩy toàn bộ mã nguồn lên nhánh `main` hoặc `master`:
   ```bash
   git add .
   git commit -m "feat: hoàn thiện giao diện GDGRepair đầy đủ tính năng"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
2. Trên giao diện GitHub repository:
   - Vào tab **Settings** -> mục **Pages** (ở thanh menu bên trái).
   - Tại mục **Build and deployment** -> **Source**, chọn **GitHub Actions**.
3. Quy trình `Deploy to GitHub Pages` trong tab **Actions** sẽ tự động được kích hoạt:
   - Tự động kiểm tra mã nguồn (`actions/checkout@v4`).
   - Cài đặt môi trường Node.js 20 và thực hiện `npm ci`.
   - Build ứng dụng bằng lệnh `npm run build`.
   - Đẩy thư mục `dist/` lên GitHub Pages qua `actions/deploy-pages@v4`.
4. Sau khi hoàn thành, trang web sẽ được phát hành tại:
   `https://<tai-khoan>.github.io/<ten-repo>/`

---

## 7. Bảng màu giao diện chuẩn (Dark Tech)

- **Màu nền (Background)**: `#0D1117`
- **Bề mặt card (Surface)**: `#161B22`
- **Bề mặt nâng cao (Elevated Surface)**: `#21262D`
- **Đường viền (Border)**: `#30363D`
- **Màu chủ đạo (Primary)**: `#3B82F6` (Xanh công nghệ)
- **Màu bổ trợ (Secondary)**: `#22C55E` (Xanh bảo dưỡng / an toàn)
- **Chữ chính (Main text)**: `#F3F4F6`
- **Chữ phụ (Muted text)**: `#9CA3AF`

---

## 8. Tuyên bố đồ án học tập (Disclaimer)

Trang web này được xây dựng hoàn toàn với mục đích phục vụ bài tập và đồ án học phần **Frontend Web Development**. Không có bất kỳ dữ liệu cá nhân hay yêu cầu dịch vụ thực tế nào được gửi đi hoặc lưu trữ trên máy chủ mạng.
