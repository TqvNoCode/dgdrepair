export const pricingPlans = [
  {
    id: 've-sinh-bao-duong',
    name: 'Vệ sinh & Bảo dưỡng',
    tag: 'Gói chăm sóc định kỳ',
    price: '80.000 VNĐ',
    priceNote: 'Hỗ trợ sinh viên DUT',
    description: 'Thích hợp cho laptop dùng từ 6 tháng trở lên bị nóng, quạt kêu to hoặc giảm hiệu năng.',
    isPopular: false,
    features: [
      'Vệ sinh chi tiết cánh quạt và khe gió tản nhiệt',
      'Tra keo tản nhiệt cao cấp Arctic MX-4 chính hãng',
      'Lau sạch bề mặt bo mạch bằng dung dịch chuyên dụng',
      'Vệ sinh toàn diện màn hình, bàn phím và vỏ ngoài',
      'Đo kiểm tra nhiệt độ CPU/GPU trước & sau khi làm'
    ],
    serviceId: 've-sinh-laptop',
    buttonText: 'Đặt lịch bảo dưỡng'
  },
  {
    id: 'cai-dat-windows',
    name: 'Cài đặt Windows chuẩn',
    tag: 'Phổ biến nhất',
    price: '50.000 VNĐ',
    priceNote: 'Hỗ trợ sinh viên DUT',
    description: 'Cài đặt lại Windows sạch từ gốc Microsoft, bảo toàn dữ liệu và tối ưu hiệu suất máy.',
    isPopular: true,
    features: [
      'Cài Windows 10/11 Home hoặc Pro sạch 100%',
      'Kích hoạt bản quyền số theo quy định',
      'Cập nhật đầy đủ Driver chuẩn nhà sản xuất',
      'Bảo toàn dữ liệu phân vùng ổ D, E an toàn',
      'Cài bộ ứng dụng văn phòng, Unikey, PDF, Chrome',
      'Bảo hành hỗ trợ hệ điều hành trong 30 ngày'
    ],
    serviceId: 'cai-dat-windows',
    buttonText: 'Đặt lịch cài đặt'
  },
  {
    id: 'nang-cap-phan-cung',
    name: 'Nâng cấp RAM & SSD',
    tag: 'Tăng tốc phần cứng',
    price: 'Liên hệ báo giá',
    priceNote: 'Báo giá theo linh kiện thực tế',
    description: 'Tư vấn và lắp đặt linh kiện RAM, SSD chính hãng phù hợp tuyệt đối với cấu hình máy.',
    isPopular: false,
    features: [
      'Kiểm tra khả năng tương thích và khe cắm miễn phí',
      'Linh kiện chính hãng Kingston, Crucial, Samsung',
      'Hỗ trợ nhân bản hệ điều hành (Clone OS) siêu tốc',
      'Công tháo lắp và kiểm tra hoạt động tại chỗ',
      'Bảo hành linh kiện chính hãng từ 12 đến 36 tháng'
    ],
    serviceId: 'nang-cap-phan-cung',
    buttonText: 'Liên hệ tư vấn nâng cấp'
  },
  {
    id: 'khac-phuc-phan-mem',
    name: 'Sửa lỗi & Phần mềm',
    tag: 'Xử lý sự cố',
    price: 'Liên hệ báo giá',
    priceNote: 'Miễn phí kiểm tra ban đầu',
    description: 'Khắc phục các lỗi màn hình xanh, virus phá hoại hoặc cài đặt phần mềm chuyên ngành đại học.',
    isPopular: false,
    features: [
      'Chẩn đoán và phân tích nguyên nhân lỗi miễn phí',
      'Xử lý triệt để lỗi màn hình xanh (BSOD)',
      'Quét virus và khôi phục dữ liệu bị ẩn trên USB',
      'Cài đặt phần mềm kỹ thuật, đồ họa, lập trình theo yêu cầu',
      'Tư vấn tối ưu hóa hệ thống chống phân mảnh'
    ],
    serviceId: 'sua-loi-phan-mem',
    buttonText: 'Yêu cầu kiểm tra lỗi'
  }
];

export const pricingCommitments = [
  {
    icon: 'check-shield',
    title: 'Minh bạch 100%',
    description: 'Kiểm tra tình trạng máy và giải thích rõ nguyên nhân trước khi báo giá, không phát sinh chi phí bất ngờ.'
  },
  {
    icon: 'user-check',
    title: 'Hỗ trợ sinh viên',
    description: 'Mức giá phi lợi nhuận trợ giá tối đa dành riêng cho các bạn sinh viên GDG on Campus và sinh viên DUT.'
  },
  {
    icon: 'shield-lock',
    title: 'An toàn dữ liệu',
    description: 'Cam kết bảo mật tuyệt đối thông tin, hình ảnh và tài liệu cá nhân của người dùng trong suốt quá trình sửa chữa.'
  }
];
