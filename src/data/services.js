export const serviceCategories = [
  { id: 'all', name: 'Tất cả dịch vụ' },
  { id: 'he-dieu-hanh', name: 'Hệ điều hành' },
  { id: 'bao-duong', name: 'Bảo dưỡng' },
  { id: 'phan-cung', name: 'Phần cứng' },
  { id: 'phan-mem', name: 'Phần mềm' },
];

export const services = [
  {
    id: 'cai-dat-windows',
    title: 'Cài đặt Windows bản quyền',
    category: 'he-dieu-hanh',
    categoryLabel: 'Hệ điều hành',
    shortDescription: 'Cài đặt Windows 10/11 nguyên gốc, kích hoạt bản quyền số chính hãng, cài đủ driver và bộ công cụ học tập cơ bản.',
    priceLabel: 'Từ 50.000 VNĐ',
    estimatedTime: '45 - 60 phút',
    warranty: 'Bảo hành hệ điều hành 30 ngày',
    details: 'Dịch vụ cài đặt hệ điều hành Windows chính hãng sạch 100% không chứa mã độc hay bloatware. Hỗ trợ kích hoạt bản quyền số kỹ thuật số cho sinh viên, phân vùng ổ đĩa an toàn, bảo toàn dữ liệu quan trọng ở các ổ D/E và tối ưu hóa hệ thống để đạt hiệu suất cao nhất.',
    features: [
      'Cài đặt phiên bản Windows 10 hoặc 11 Home/Pro sạch từ Microsoft',
      'Kích hoạt bản quyền số theo giấy phép hợp lệ',
      'Cập nhật đầy đủ Driver phần cứng chính hãng mới nhất',
      'Bảo toàn 100% dữ liệu ở các phân vùng cá nhân',
      'Cài đặt trọn bộ phần mềm văn phòng, giải nén và trình duyệt thiết yếu',
      'Tối ưu hóa khởi động và tắt dịch vụ ngầm gây giật lag'
    ],
    recommendations: [
      'Sao lưu các tài liệu quan trọng trên Desktop và thư mục Downloads trước khi thực hiện',
      'Ghi nhớ tài khoản Microsoft hoặc tài khoản trường học nếu cần đồng bộ',
      'Cung cấp sạc laptop đi kèm để đảm bảo nguồn điện ổn định trong suốt quá trình cài'
    ]
  },
  {
    id: 've-sinh-laptop',
    title: 'Vệ sinh laptop chuyên sâu',
    category: 'bao-duong',
    categoryLabel: 'Bảo dưỡng',
    shortDescription: 'Vệ sinh quạt gió, khe tản nhiệt, tra keo tản nhiệt cao cấp giúp hạ nhiệt độ từ 10 - 20°C và bảo vệ tuổi thọ linh kiện.',
    priceLabel: 'Từ 80.000 VNĐ',
    estimatedTime: '30 - 45 phút',
    warranty: 'Bảo hành kiểm tra nhiệt độ 15 ngày',
    details: 'Vệ sinh tổng thể từ trong ra ngoài: thổi sạch bụi bẩn đóng bánh trong cánh quạt và khe đồng tản nhiệt, vệ sinh mạch bằng cồn chuyên dụng, thay thế keo tản nhiệt chất lượng cao (MX-4 / Thermal Grizzly) và làm sạch bàn phím, màn hình.',
    features: [
      'Tháo lắp cẩn trọng theo đúng quy trình chuẩn của từng dòng máy',
      'Vệ sinh sạch sẽ cánh quạt, ống tản nhiệt đồng và khe gió',
      'Tra keo tản nhiệt hiệu suất cao MX-4 / Kryonaut chính hãng',
      'Lau chùi bụi bẩn bề mặt mainboard bằng dung dịch chuyên dụng',
      'Vệ sinh màn hình, bàn phím và toàn bộ vỏ ngoài thiết bị',
      'Đo kiểm tra nhiệt độ CPU/GPU trước và sau khi thực hiện'
    ],
    recommendations: [
      'Nên thực hiện định kỳ từ 6 đến 9 tháng một lần để tránh chai pin và quá nhiệt',
      'Thông báo trước nếu máy từng bị vào nước hoặc gãy ngàm ốc'
    ]
  },
  {
    id: 'nang-cap-phan-cung',
    title: 'Nâng cấp RAM & SSD',
    category: 'phan-cung',
    categoryLabel: 'Phần cứng',
    shortDescription: 'Tăng tốc độ khởi động và khả năng đa nhiệm với SSD NVMe/SATA siêu tốc và RAM dung lượng cao, hỗ trợ kiểm tra tương thích miễn phí.',
    priceLabel: 'Liên hệ báo giá',
    estimatedTime: '30 - 60 phút',
    warranty: 'Bảo hành linh kiện chính hãng 12 - 36 tháng',
    details: 'Tư vấn lựa chọn linh kiện tương thích tối đa với bo mạch chủ của máy. Hỗ trợ lắp đặt RAM (DDR4/DDR5) và ổ cứng SSD (M.2 NVMe, SATA III), nhân bản (clone) hệ điều hành hoặc cài mới theo yêu cầu mà không làm mất bản quyền hay cấu hình cũ.',
    features: [
      'Kiểm tra khả năng mở rộng và chuẩn bus RAM / khe cắm SSD của máy',
      'Tư vấn dung lượng và thương hiệu uy tín (Kingston, Samsung, Crucial, Kioxia)',
      'Hỗ trợ nhân bản dữ liệu (Clone OS) từ ổ cũ sang ổ mới nhanh chóng',
      'Lắp ráp cẩn thận, không làm ảnh hưởng đến tem bảo hành các linh kiện khác',
      'Tối ưu hóa phân vùng SSD chuẩn GPT/UEFI để tối đa tốc độ đọc/ghi'
    ],
    recommendations: [
      'Giá linh kiện phụ thuộc vào dung lượng và chuẩn kết nối thực tế',
      'Khách hàng có thể tự mang linh kiện đến để kỹ thuật viên hỗ trợ lắp ráp công khai'
    ]
  },
  {
    id: 'sua-loi-phan-mem',
    title: 'Sửa lỗi phần mềm & Diệt virus',
    category: 'phan-mem',
    categoryLabel: 'Phần mềm',
    shortDescription: 'Khắc phục sự cố màn hình xanh (BSOD), xung đột driver, quét sạch mã độc hại và hỗ trợ cài đặt các phần mềm học tập chuyên ngành.',
    priceLabel: 'Từ 40.000 VNĐ',
    estimatedTime: '30 - 50 phút',
    warranty: 'Hỗ trợ từ xa trong 7 ngày',
    details: 'Chẩn đoán và xử lý triệt để các lỗi thường gặp trong quá trình học tập: lỗi dump xanh máy tính, lỗi không nhận máy in/máy chiếu, virus ăn file/ẩn file trên USB, sửa lỗi font chữ tiếng Việt, cấu hình phần mềm giả lập và các công cụ lập trình, kỹ thuật.',
    features: [
      'Phân tích mã lỗi dump màn hình xanh (BSOD) để tìm nguyên nhân gốc rễ',
      'Quét và tiêu diệt virus, spyware, mã độc đào coin chạy ngầm',
      'Sửa lỗi kết nối mạng Wi-Fi, Ethernet, DNS và lỗi proxy trường học',
      'Cài đặt và cấu hình phần mềm đồ họa, lập trình và phần mềm kỹ thuật',
      'Dọn dẹp tệp tin rác, registry lỗi và giải phóng dung lượng ổ cứng C',
      'Hướng dẫn thói quen sử dụng máy tính an toàn, phòng ngừa tái nhiễm'
    ],
    recommendations: [
      'Ghi lại mã lỗi hoặc chụp ảnh màn hình xanh nếu có để kỹ thuật viên chẩn đoán nhanh hơn',
      'Liệt kê danh sách phần mềm chuyên ngành cần hỗ trợ cài đặt'
    ]
  }
];
