/**
 * GDGRepair - Centralized Mock Data
 * Tệp dữ liệu giả lập tập trung cho toàn bộ ứng dụng GDGRepair
 */

export const categoryTabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'windows', label: 'Cài Windows' },
  { id: 'cleaning', label: 'Vệ sinh' },
  { id: 'hardware', label: 'Nâng cấp' },
  { id: 'software', label: 'Phần mềm' },
  { id: 'favorites', label: 'Yêu thích' }
];

export const servicesData = [
  {
    id: 'cai-dat-windows',
    name: 'Cài đặt Windows bản quyền',
    category: 'windows',
    categoryLabel: 'Cài Windows',
    shortDescription: 'Cài đặt Windows 10/11 nguyên gốc, nhận diện bản quyền số, cài đặt đầy đủ driver chuẩn hãng và ứng dụng văn phòng thiết yếu.',
    description: 'Dịch vụ cài đặt hệ điều hành Windows chính hãng sạch 100%, loại bỏ hoàn toàn bloatware và mã độc tiềm ẩn. Kỹ thuật viên hỗ trợ phân vùng an toàn, bảo toàn toàn bộ dữ liệu ở các ổ đĩa cá nhân (ổ D, E...), kích hoạt bản quyền số kỹ thuật số và tối ưu hóa hệ thống giúp máy tính vận hành mượt mà, ổn định nhất.',
    priceLabel: 'Từ 50.000 VNĐ',
    priceNote: 'Trợ giá sinh viên',
    estimatedTime: '45 - 60 phút',
    warranty: 'Bảo hành phần mềm 30 ngày',
    features: [
      'Cài đặt bản Windows 10 / 11 Home/Pro sạch từ Microsoft',
      'Kích hoạt bản quyền số tự động theo phần cứng hoặc giấy phép sinh viên',
      'Cập nhật đầy đủ Driver card hình, âm thanh, Wi-Fi chính hãng mới nhất',
      'Bảo toàn 100% dữ liệu cá nhân tại các phân vùng làm việc',
      'Cài sẵn bộ ứng dụng văn phòng cơ bản, gõ tiếng Việt, đọc PDF và giải nén',
      'Tối ưu các dịch vụ chạy ngầm giúp máy khởi động nhanh'
    ],
    recommendations: [
      'Sao lưu các tệp quan trọng tại màn hình Desktop hoặc mục Downloads trước khi thực hiện',
      'Mang theo dây sạc (Adapter) chính hãng để đảm bảo nguồn điện ổn định trong suốt quá trình cài đặt',
      'Ghi nhớ tài khoản Microsoft cá nhân nếu muốn đồng bộ lại cài đặt trình duyệt'
    ],
    icon: 'windows'
  },
  {
    id: 've-sinh-laptop',
    name: 'Vệ sinh laptop chuyên sâu',
    category: 'cleaning',
    categoryLabel: 'Vệ sinh',
    shortDescription: 'Làm sạch bụi bẩn quạt gió, khe tản nhiệt, tra miếng dán tản nhiệt chuyển pha Honeywell PTM7950 giúp hạ nhiệt độ từ 10 - 20°C và bảo vệ tuổi thọ linh kiện.',
    description: 'Quy trình vệ sinh toàn diện từng bộ phận máy tính: tháo mở và thổi sạch bụi đóng bánh trên cánh quạt và ống đồng tản nhiệt, vệ sinh chân mạch tiếp xúc, thay thế lớp keo tản nhiệt cũ bằng miếng dán tản nhiệt chuyển pha cao cấp Honeywell PTM7950 siêu bền (chống hiện tượng pump-out, hiệu suất truyền nhiệt đỉnh cao) và làm sạch bề mặt vỏ, bàn phím, màn hình.',
    priceLabel: 'Từ 80.000 VNĐ',
    priceNote: 'Pad tản nhiệt Honeywell PTM7950',
    estimatedTime: '30 - 45 phút',
    warranty: 'Bảo hành kiểm tra nhiệt độ 15 ngày',
    features: [
      'Tháo lắp cẩn trọng theo đúng sơ đồ kỹ thuật từng dòng máy',
      'Vệ sinh sạch quạt tản nhiệt, ống dẫn nhiệt và khe thoát khí',
      'Tra miếng dán tản nhiệt chuyển pha Honeywell PTM7950 chính hãng',
      'Lau sạch bề mặt mainboard và chân cắm bằng dung dịch chuyên dụng',
      'Vệ sinh màn hình, bàn phím và toàn bộ vỏ ngoài của máy',
      'Đo kiểm tra nhiệt độ CPU & GPU trước và sau khi hoàn thiện'
    ],
    recommendations: [
      'Nên thực hiện định kỳ 6 đến 9 tháng một lần để tránh tình trạng quá nhiệt và chai pin',
      'Thông báo trước cho kỹ thuật viên nếu máy từng có tiền sử rơi vỡ, nứt bản lề hoặc dính nước'
    ],
    icon: 'cleaning'
  },
  {
    id: 'nang-cap-phan-cung',
    name: 'Nâng cấp RAM & SSD',
    category: 'hardware',
    categoryLabel: 'Nâng cấp',
    shortDescription: 'Tăng tốc độ khởi động và khả năng đa nhiệm với SSD NVMe/SATA siêu tốc và RAM dung lượng cao, hỗ trợ kiểm tra tương thích miễn phí.',
    description: 'Tư vấn lựa chọn giải pháp nâng cấp phần cứng tối ưu nhất cho cấu hình máy và ngân sách của bạn. Hỗ trợ kiểm tra khe cắm, chuẩn bus RAM (DDR4/DDR5) và cổng SSD (M.2 NVMe, PCIe, SATA 3). Hỗ trợ nhân bản hệ điều hành (Clone OS) hoặc chuyển đổi dữ liệu an toàn sang ổ đĩa mới.',
    priceLabel: 'Liên hệ báo giá',
    priceNote: 'Tùy cấu hình thiết bị',
    estimatedTime: '30 - 60 phút',
    warranty: 'Bảo hành chính hãng 12 - 36 tháng',
    features: [
      'Kiểm tra khả năng mở rộng phần cứng và độ tương thích bo mạch chủ hoàn toàn miễn phí',
      'Tư vấn linh kiện từ các thương hiệu hàng đầu: Samsung, Kingston, Crucial, Kioxia',
      'Hỗ trợ chuyển dữ liệu (Clone OS) từ ổ cũ sang ổ mới nhanh chóng, giữ nguyên bản quyền',
      'Lắp ráp cẩn thận, không làm trầy xước vỏ hay ảnh hưởng tem bảo hành khác',
      'Kiểm tra tốc độ đọc/ghi của SSD và benchmark độ ổn định của RAM sau khi lắp'
    ],
    recommendations: [
      'Hãy cung cấp chính xác model máy để kỹ thuật viên kiểm tra sơ đồ chân cắm trước',
      'Bạn có thể giữ lại ổ đĩa HDD/SSD cũ làm ổ lưu trữ di động thông qua box ổ cứng'
    ],
    icon: 'hardware'
  },
  {
    id: 'sua-loi-phan-mem',
    name: 'Xử lý lỗi phần mềm & Virus',
    category: 'software',
    categoryLabel: 'Phần mềm',
    shortDescription: 'Khắc phục triệt để lỗi màn hình xanh (BSOD), xung đột driver, quét sạch virus độc hại và cài đặt phần mềm kỹ thuật theo yêu cầu.',
    description: 'Chẩn đoán và xử lý các sự cố phần mềm phức tạp cản trở quá trình học tập và làm việc: máy tính chạy chậm đột ngột, lỗi không khởi động vào được hệ điều hành, dính mã độc tống tiền hoặc virus ẩn file USB, lỗi crash phần mềm đồ họa hay công cụ lập trình.',
    priceLabel: 'Liên hệ báo giá',
    priceNote: 'Tùy tình trạng máy',
    estimatedTime: '30 - 60 phút',
    warranty: 'Hỗ trợ kỹ thuật 15 ngày',
    features: [
      'Chẩn đoán và phân tích nguyên nhân lỗi miễn phí',
      'Xử lý dứt điểm các lỗi màn hình xanh (Blue Screen of Death)',
      'Quét mã độc, phần mềm gián điệp và phục hồi dữ liệu bị ẩn trên USB/ổ cứng',
      'Cài đặt các bộ phần mềm học tập, kỹ thuật (AutoCAD, MATLAB, VS Code...)',
      'Khắc phục xung đột Driver âm thanh, touchpad và card màn hình rời',
      'Tư vấn giải pháp dọn rác và bảo vệ máy tính an toàn trong quá trình sử dụng'
    ],
    recommendations: [
      'Chụp lại hình ảnh mã lỗi hoặc màn hình xanh (nếu có) để kỹ thuật viên định bệnh nhanh hơn',
      'Chuẩn bị danh sách phần mềm chuyên ngành bạn cần sử dụng trong học kỳ'
    ],
    icon: 'software'
  }
];

export const pricingData = [
  {
    id: 'price-windows',
    serviceId: 'cai-dat-windows',
    title: 'Cài đặt Windows bản quyền',
    badge: 'Phổ biến nhất',
    isPopular: true,
    price: 'Từ 50.000 VNĐ',
    priceNote: 'Trợ giá học tập sinh viên',
    description: 'Giải pháp hoàn hảo khi máy tính bị chậm, lỗi hệ điều hành hoặc muốn bắt đầu học kỳ mới với hệ thống sạch sẽ.',
    features: [
      'Windows 10/11 nguyên gốc từ Microsoft',
      'Nhận diện bản quyền số chính hãng',
      'Đầy đủ Driver mới nhất theo mã máy',
      'Giữ an toàn 100% dữ liệu ổ cá nhân',
      'Bộ ứng dụng văn phòng & gõ tiếng Việt',
      'Bảo hành hệ điều hành 30 ngày'
    ],
    buttonText: 'Đặt lịch cài đặt'
  },
  {
    id: 'price-cleaning',
    serviceId: 've-sinh-laptop',
    title: 'Vệ sinh & Bảo dưỡng',
    badge: 'Khuyên dùng định kỳ',
    isPopular: false,
    price: 'Từ 80.000 VNĐ',
    priceNote: 'Pad tản nhiệt Honeywell PTM7950',
    description: 'Khắc phục hiện tượng quạt kêu to, máy nóng ran, tụt xung khi làm đồ họa hoặc chơi game.',
    features: [
      'Vệ sinh chi tiết quạt gió & khe tản nhiệt',
      'Tra pad tản nhiệt chuyển pha PTM7950',
      'Lau chùi bụi bẩn bề mặt bo mạch',
      'Làm sạch bàn phím & màn hình',
      'Đo kiểm tra nhiệt độ trước & sau',
      'Bảo hành nhiệt độ 15 ngày'
    ],
    buttonText: 'Đặt lịch vệ sinh'
  },
  {
    id: 'price-hardware',
    serviceId: 'nang-cap-phan-cung',
    title: 'Nâng cấp RAM & SSD',
    badge: 'Tăng tốc vượt trội',
    isPopular: false,
    price: 'Liên hệ báo giá',
    priceNote: 'Tùy cấu hình thiết bị & dung lượng',
    description: 'Tăng tốc độ mở máy lên gấp 5-10 lần và thoải mái mở hàng chục tab trình duyệt mà không giật lag.',
    features: [
      'Kiểm tra độ tương thích miễn phí',
      'Linh kiện SSD/RAM chính hãng uy tín',
      'Miễn phí công lắp đặt và Clone dữ liệu',
      'Tối ưu hóa phân vùng ổ đĩa tốc độ cao',
      'Bảo hành linh kiện 12 - 36 tháng',
      'Bàn giao lại linh kiện cũ cho khách'
    ],
    buttonText: 'Tư vấn nâng cấp'
  },
  {
    id: 'price-software',
    serviceId: 'sua-loi-phan-mem',
    title: 'Xử lý sự cố phần mềm',
    badge: 'Khắc phục cấp tốc',
    isPopular: false,
    price: 'Liên hệ báo giá',
    priceNote: 'Tùy tình trạng máy & mức độ lỗi',
    description: 'Xử lý các sự cố phát sinh đột xuất, màn hình xanh chết chóc hoặc nhiễm mã độc nguy hiểm.',
    features: [
      'Miễn phí chẩn đoán & tư vấn ban đầu',
      'Sửa lỗi màn hình xanh (BSOD)',
      'Diệt virus & khôi phục dữ liệu ẩn',
      'Cài đặt công cụ học tập & đồ họa',
      'Tối ưu hóa phân vùng & dọn rác',
      'Hỗ trợ kiểm tra từ xa 15 ngày'
    ],
    buttonText: 'Yêu cầu xử lý lỗi'
  }
];

export const pricingCommitments = [
  {
    id: 'commit-transparent',
    icon: 'shield-check',
    title: 'Minh bạch 100%',
    description: 'Kiểm tra tình trạng thiết bị và tư vấn rõ ràng giải pháp trước khi báo giá. Tuyệt đối không phát sinh chi phí phụ.'
  },
  {
    id: 'commit-student',
    icon: 'heart-handshake',
    title: 'Trợ giá sinh viên',
    description: 'Mức phí hỗ trợ phi lợi nhuận dành riêng cho sinh viên GDG on Campus và toàn thể sinh viên Trường Đại học Bách Khoa - ĐHĐN.'
  },
  {
    id: 'commit-security',
    icon: 'lock',
    title: 'An toàn dữ liệu',
    description: 'Cam kết tôn trọng quyền riêng tư, tuyệt đối không can thiệp, sao chép hay làm rò rỉ dữ liệu cá nhân của người dùng.'
  }
];

export const processData = [
  {
    step: 1,
    number: '01',
    title: 'Tiếp nhận yêu cầu',
    description: 'Ghi nhận thông tin, loại thiết bị và mô tả sơ bộ tình trạng máy từ bạn thông qua website hoặc trực tiếp tại văn phòng GDG.'
  },
  {
    step: 2,
    number: '02',
    title: 'Kiểm tra thiết bị',
    description: 'Kỹ thuật viên chẩn đoán phần cứng, nhiệt độ hoạt động và lỗi hệ điều hành một cách trực tiếp, công khai và hoàn toàn miễn phí.'
  },
  {
    step: 3,
    number: '03',
    title: 'Tư vấn & Báo giá',
    description: 'Giải thích nguyên nhân sự cố, đưa ra các phương án khắc phục phù hợp ngân sách và thống nhất báo giá rõ ràng trước khi thực hiện.'
  },
  {
    step: 4,
    number: '04',
    title: 'Thực hiện & Bàn giao',
    description: 'Tiến hành bảo dưỡng, sửa chữa cẩn trọng. Kiểm tra lại toàn diện trước sự chứng kiến của bạn và bàn giao phiếu hỗ trợ.'
  }
];

export const faqData = [
  {
    id: 'faq-mat-du-lieu',
    question: 'Cài đặt Windows có làm mất dữ liệu không?',
    answer: 'Không. Kỹ thuật viên của GDGRepair luôn thực hiện phân vùng cẩn thận và chỉ can thiệp vào phân vùng hệ điều hành (thường là ổ C:). Tất cả dữ liệu của bạn ở các ổ đĩa dữ liệu cá nhân (ổ D:, E:...) đều được bảo toàn nguyên vẹn 100%. Đối với các tệp tin quan trọng tại Desktop hoặc Downloads, kỹ thuật viên sẽ chủ động hỗ trợ bạn sao lưu sang ổ đĩa khác trước khi thực hiện.'
  },
  {
    id: 'faq-bao-lau-ve-sinh',
    question: 'Bao lâu nên vệ sinh laptop một lần?',
    answer: 'Thời gian lý tưởng để vệ sinh và tra lại keo tản nhiệt cho laptop là từ 6 đến 9 tháng một lần. Nếu bạn thường xuyên sử dụng máy trong môi trường nhiều bụi hoặc chạy các tác vụ nặng (chơi game, dựng hình 3D, lập trình), bạn nên bảo dưỡng sau mỗi 6 tháng để bảo vệ CPU và GPU khỏi tình trạng quá nhiệt gây tụt xung và giảm tuổi thọ bo mạch.'
  },
  {
    id: 'faq-key-ban-quyen',
    question: 'Có cần cung cấp key Windows bản quyền không?',
    answer: 'Đa số các dòng laptop đời mới hiện nay đều có sẵn khóa bản quyền kỹ thuật số (Digital License) gắn liền với bo mạch chủ, hệ thống sẽ tự động kích hoạt sau khi cài đặt lại. Trong trường hợp máy chưa có bản quyền, kỹ thuật viên sẽ hướng dẫn giải pháp bản quyền giáo dục dành cho sinh viên hoặc hỗ trợ kích hoạt giấy phép hợp lệ từ Microsoft.'
  },
  {
    id: 'faq-nang-cap-ram-ssd',
    question: 'Có thể nâng cấp RAM và SSD cho mọi laptop không?',
    answer: 'Hầu hết các mẫu laptop thông dụng đều có khả năng nâng cấp hoặc thay thế RAM và mở rộng ổ cứng SSD chuẩn M.2 NVMe hoặc 2.5 inch SATA. Tuy nhiên, một số dòng ultrabook siêu mỏng nhẹ có thể hàn chết RAM trên bo mạch. Bạn có thể mang máy đến để kỹ thuật viên kiểm tra trực tiếp số khe cắm khả dụng và chuẩn bus tương thích hoàn toàn miễn phí.'
  },
  {
    id: 'faq-kiem-tra-truoc',
    question: 'Có thể kiểm tra thiết bị trước khi sử dụng dịch vụ không?',
    answer: 'Hoàn toàn có thể. Mọi dịch vụ tại GDGRepair đều bắt đầu bằng bước kiểm tra tổng quát miễn phí (từ tình trạng sức khỏe ổ cứng, dung lượng pin, nhiệt độ máy đến bàn phím và màn hình). Sau khi chẩn đoán, kỹ thuật viên sẽ giải thích nguyên nhân và báo giá. Bạn hoàn toàn có quyền quyết định có thực hiện dịch vụ hay không mà không tốn bất kỳ chi phí kiểm tra nào.'
  },
  {
    id: 'faq-thoi-gian-xu-ly',
    question: 'Thời gian tiếp nhận và xử lý dịch vụ mất bao lâu?',
    answer: 'Các dịch vụ phổ biến như vệ sinh laptop hoặc cài đặt Windows thường chỉ mất từ 30 đến 60 phút. Bạn có thể ngồi quan sát trực tiếp toàn bộ quá trình thực hiện. Với các ca cần nâng cấp linh kiện đặc thù hoặc sửa chữa phần cứng phức tạp, kỹ thuật viên sẽ hẹn lịch hoàn thành cụ thể và lập biên nhận bàn giao rõ ràng.'
  }
];
