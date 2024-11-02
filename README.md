# ielts-app-front-end

## Project Structure
project/
├── public/
│   └── index.html                   # File HTML chính của ứng dụng
│   └── favicon.ico                  # Biểu tượng trang
├── src/
│   ├── assets/                      # Thư mục chứa hình ảnh, font, file media
│   ├── components/                  # Thư mục chứa các thành phần tái sử dụng
│   │   ├── Header.vue               # Header dùng chung
│   │   ├── Footer.vue               # Footer dùng chung
│   │   └── Sidebar.vue              # Sidebar điều hướng, nếu có
│   ├── views/                       # Thư mục chứa các màn hình
│   │   ├── Home.vue                 # Trang chủ
│   │   ├── Login.vue                # Trang đăng nhập
│   │   ├── Dashboard.vue            # Trang bảng điều khiển
│   │   ├── Profile.vue              # Trang thông tin cá nhân
│   │   └── ...                      # Các màn hình khác
│   ├── router/                      # Quản lý định tuyến
│   │   └── index.js                 # Cấu hình Vue Router cho ứng dụng
│   ├── store/                       # Vuex để quản lý state, nếu có
│   │   └── index.js                 # Khởi tạo Vuex store, có thể không sử dụng --> Sử dụng khi các thành phần dùng chung chia sẻ tài nguyên phức tạp
│   ├── App.vue                      # Component chính của ứng dụng
│   └── main.js                      # File JavaScript chính để khởi động ứng dụng
└── package.json                     # Cấu hình dự án và phụ thuộc


## Tech Stack
- **Front-end**:
  - Tìm hiểu trước: **HTML/CSS**, **JavaScript**
  - Tìm hiểu sau: **Bootstrap**, **jQuery**, **AJAX**, **Vue.js**

## Static HTML
- **HTML/CSS**: Tạo cấu trúc và định dạng cho trang web.
- **Bootstrap**: Framework hỗ trợ các template mẫu. Truy cập vào [Bootstrap](https://getbootstrap.com/) để sử dụng, dễ dàng sử dụng nhưng không nắm rõ thì chỉ dùng được các template đơn giản.

## Dynamic HTML
- **JavaScript**: Ngôn ngữ lập trình cho các tính năng tương tác.
- **jQuery**: Thư viện hỗ trợ của JavaScript, giúp việc viết code ngắn gọn hơn. Nó có thể xem như là một framework cổ điển nhưng vẫn được sử dụng rộng rãi.
- **AJAX**: Lập trình bất đồng bộ (Asynchronous) - sẽ bàn luận sau.
- **Vue.js**: Framework giúp quản lý các thành phần của ứng dụng.

## Vue.js
Khi phát triển một ứng dụng web, sẽ có nhiều thành phần như Navigation, Footer, Header... 
- Không thể cứ code đi code lại nếu có nhiều page hoặc copy-paste các thành phần đó (boilerplate).
- Chính vì thế, ta nên tách nó thành các components và tái sử dụng.

Vue.js giúp render và binding các components này. Mặc dù bạn vẫn có thể làm điều này thông qua JavaScript hoặc jQuery nếu không có framework, nhưng sẽ khiến code trở nên dài dòng.

## Route
Để giúp các file biết đường gọi nhau, ta sử dụng router.

## Khả năng sử dụng
- **JavaScript**, **jQuery**, **Bootstrap**, **Vue.js**: Không cần cài môi trường, chỉ cần lấy một link **CDN** (Content Delivery Network - Hệ thống máy chủ phân tán) khả dụng dán vào ứng dụng là có thể sử dụng được.

## Environment
- **VS Code**: IDE sử dụng. Chạy ứng dụng Click chuột phải --> Open with Live Server tại file index.html.
- **Debugging**: Có thể sử dụng trình duyệt với việc đặt các thẻ debugger (không cần quan tâm bây giờ).

---
Tui có làm trang login nhưng version đơn giản nhất thông qua 3 file riêng lẻ index.html, 
styles.css, scripts.js trong public folder mọi người có thể bắt đầu tạo các trang kiểu như vậy trước.

Trên đây là những kiến thức hiện tại của tui về Front-end cho web. Nếu có gì sai sót, mong mọi người góp ý vv!
