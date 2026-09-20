<div align="center">

  # ⚡ YOUNGFOLIO
  ### *Cinematic Mouse-Scrub Portfolio & 3D Interactive Web Experience*

  [![Typing SVG](https://readme-typing-svg.demolab.com?font=Space+Grotesk&weight=700&size=24&duration=3000&pause=1000&color=38BDF8&center=true&vCenter=true&width=700&lines=%E2%9C%A8+Cinematic+Mouse-Scrub+Hero+Experience;%F0%9F%9A%80+React+19+%E2%80%A2+TypeScript+6+%E2%80%A2+Vite+8;%F0%9F%8E%A8+Tailwind+CSS+v4+%2B+Glassmorphism;%F0%9F%8C%90+Bilingual+English+%2F+Ti%E1%BA%BFng+Vi%E1%BB%87t;%F0%9F%92%BB+Designed+%26+Crafted+by+L%C3%AA+Th%E1%BA%BF+C%C6%B0%E1%BB%9Dng)](https://git.io/typing-svg)

  <p align="center">
    <a href="https://ltcuong24.io.vn">
      <img src="https://img.shields.io/badge/Live%20Demo-ltcuong24.io.vn-0ea5e9?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Live Demo" />
    </a>
    <a href="https://github.com/ekancisme/youngfolio/stargazers">
      <img src="https://img.shields.io/github/stars/ekancisme/youngfolio?style=for-the-badge&color=eab308&logo=star" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/ekancisme/youngfolio/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge" alt="License" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript%206-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6" />
    <img src="https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind 4" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" alt="Nginx" />
  </p>

  ---

  <p align="center">
    <a href="#-nổi-bật--key-highlights">🌟 Tính năng nổi bật</a> •
    <a href="#-kiến-trúc-mouse-scrubbing">🎬 Cơ chế Scrub Video</a> •
    <a href="#-công-nghệ-sử-dụng">🛠 Công nghệ</a> •
    <a href="#-cài-đặt--chạy-dự-án">🚀 Cài đặt</a> •
    <a href="#-triển-khai-production">🐳 Docker & Deploy</a> •
    <a href="#-kết-nối">📬 Liên hệ</a>
  </p>

</div>

<br/>

## 🌟 Nổi bật / Key Highlights

<table>
  <tr>
    <td width="50%">
      <h3>🎬 Cinematic Mouse-Scrub Hero</h3>
      <p>Trải nghiệm Hero video tua mượt mà dựa trên toạ độ con trỏ chuột và độ sâu cuộn trang (Scroll & Cursor Sync), tạo cảm giác 3D không gian chiều sâu chân thực.</p>
    </td>
    <td width="50%">
      <h3>🌐 Đa ngôn ngữ (Tiếng Việt / English)</h3>
      <p>Hệ thống dịch thuật ngữ cảnh <code>LanguageProvider</code> linh hoạt, chuyển đổi ngôn ngữ tức thời không giật lag, lưu cache và đồng bộ toàn trang.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ Hiệu ứng Typewriter & Scroll Reveal</h3>
      <p>Chữ gõ tự động sinh động với con trỏ nhấp nháy, các section tự động hiển thị mượt mà với kỹ thuật tối ưu GPU compositing.</p>
    </td>
    <td width="50%">
      <h3>♿ Accessibility First (a11y)</h3>
      <p>Hỗ trợ đầy đủ tiêu chuẩn <code>prefers-reduced-motion</code>: tự động chuyển sang trải nghiệm tĩnh tinh tế cho người dùng nhạy cảm với chuyển động.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📱 Thiết kế Responsive & Glassmorphism</h3>
      <p>Giao diện siêu hiện đại với tông tối (Dark Futuristic Theme), thanh điều hướng mờ kính (Backdrop Blur), Drawer Menu tối ưu cho thiết bị di động.</p>
    </td>
    <td width="50%">
      <h3>🚀 Tối ưu hoá tài nguyên tối đa</h3>
      <p>Tích hợp sẵn script nén & tối ưu Video keyframe (PowerShell tool), định dạng ảnh WebP nén nhẹ, font Manrope Variable tải siêu nhanh.</p>
    </td>
  </tr>
</table>

---

## 🎬 Kiến trúc Mouse-Scrubbing

Cơ chế điều khiển video tua từng khung hình (Frame-by-Frame Scrubbing) theo chuyển động chuột và quán tính cuộn:

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Người dùng
    participant Window as 🖥️ Trình duyệt (Pointer / Scroll)
    participant Hook as ⚙️ useMouseScrubVideo
    participant Math as 🧮 Interpolation & Smoothing
    participant Video as 📹 HTML5 Video Element

    User->>Window: Di chuyển chuột (PointerMove) / Cuộn trang
    Window->>Hook: Cung cấp toạ độ (clientX, clientY, scrollY)
    Hook->>Math: Chuẩn hóa toạ độ [0.0 -> 1.0]
    Math->>Math: Áp dụng LERP / Exponential Smoothing
    Math->>Video: Cập nhật video.currentTime = duration * progress
    Video-->>User: Phản hồi thị giác tức thì (Frame Synced)
```

<details>
<summary><b>🔍 Xem chi tiết giải thuật tối ưu video tua mượt</b></summary>

- **Keyframe Density**: Video hero được mã hóa đặc biệt với tần suất I-frame (Keyframe) dày đặc qua script [`tools/encode-hero.ps1`](file:///home/youngltc/Documents/Coding/3D/tools/encode-hero.ps1), giúp trình duyệt giải mã khung hình tức thì mà không bị trễ hay giật lag.
- **RequestAnimationFrame**: Toàn bộ thao tác cập nhật `currentTime` được đưa vào `requestAnimationFrame` loop nhằm tránh nghẽn luồng chính và đảm bảo 60fps/120fps.
- **Reduced Motion Fallback**: Khi phát hiện cấu hình hệ thống bật `prefers-reduced-motion`, hook sẽ tự động dừng tua chuột và giữ video ở trạng thái background tĩnh tối ưu.
</details>

---

## 🛠 Công nghệ sử dụng

| Phân loại | Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- | :--- |
| **Frontend Core** | [React](https://react.dev/) | `^19.3.0` | Thư viện UI hiện đại nhất với kiến trúc render tối ưu |
| **Ngôn ngữ** | [TypeScript](https://www.typescriptlang.org/) | `^6.0.3` | Đảm bảo type-safe toàn bộ hook, component và i18n dictionary |
| **Build Tool** | [Vite](https://vitejs.dev/) | `^8.2.2` | Hot Module Replacement (HMR) cực nhanh, đóng gói siêu nhẹ |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.3` | Utility-first CSS Engine v4 mới nhất kết hợp `@tailwindcss/vite` |
| **Typography** | [Manrope](https://fontsource.org/fonts/manrope) | `^5.3.0` | Font chữ biến thiên (Variable Font) hiện đại, sắc nét |
| **Triển khai** | [Docker](https://www.docker.com/) & [Nginx](https://nginx.org/) | Multi-stage | Alpine-based container, bảo mật cao, tải tĩnh cực nhanh |

---

## 📂 Cấu trúc thư mục

```ascii
youngfolio/
├── 📁 public/                  # Tài nguyên tĩnh
│   ├── 🎥 hero-scrub.mp4       # Video hero đã tối ưu cho mouse scrub
│   ├── 📁 projects/            # Ảnh mockup các dự án (WebP/PNG)
│   ├── 📄 Le-The-Cuong-CV.pdf   # File CV cá nhân tải xuống
│   └── 🎨 favicon.svg          # Favicon vector
├── 📁 src/
│   ├── 📁 components/          # Các component giao diện
│   │   ├── 🎬 Hero.tsx         # Hero section chính
│   │   ├── 📹 MouseScrubVideo  # Component canvas/video tua chuột
│   │   ├── 🧭 Navbar.tsx       # Thanh điều hướng Glassmorphism
│   │   ├── 📱 MobileMenu.tsx   # Menu Drawer di động
│   │   ├── ⌨️ TypewriterText   # Hiệu ứng chữ gõ tự động
│   │   ├── 💊 ActionPills.tsx  # Cụm nút CTA thao tác nhanh
│   │   ├── 💼 PortfolioSections# Giới thiệu, Kỹ năng, Liên hệ
│   │   └── 🎴 ProjectCard.tsx  # Thẻ hiển thị dự án tiêu biểu
│   ├── 📁 hooks/               # Custom React Hooks
│   │   ├── 🖱️ useMouseScrubVideo.ts
│   │   ├── 📜 useHeroScrollMotion.ts
│   │   ├── 👁️ useScrollReveal.ts
│   │   └── ⌨️ useTypewriter.ts
│   ├── 📁 i18n/                # Hệ thống đa ngôn ngữ (VI / EN)
│   │   ├── 🗣️ LanguageProvider.tsx
│   │   └── 📖 translations.ts
│   ├── 🎨 index.css            # Custom CSS animations & Tailwind v4
│   └── 🚀 main.tsx             # Điểm khởi chạy React App
├── 📁 tools/                   # Công cụ hỗ trợ
│   └── 🎞️ encode-hero.ps1      # Script nén video keyframe
├── 🐳 Dockerfile               # Docker build 2-stage (Node -> Nginx)
├── ⚙️ nginx.conf.template      # Cấu hình Web Server Nginx
├── 🚢 deploy.ps1               # Script deploy tự động lên máy chủ VPS
└── 📦 package.json             # Danh sách thư viện & scripts
```

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu môi trường
- **Node.js**: `v20.x` trở lên
- **npm** hoặc **pnpm / yarn**

### Các bước khởi chạy

```bash
# 1. Clone repository
git clone https://github.com/ekancisme/youngfolio.git
cd youngfolio

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi chạy môi trường phát triển (Dev Server)
npm run dev
```

Truy cập ngay tại: **`http://localhost:5173`** 🚀

### Kiểm tra & Đóng gói sản phẩm

```bash
# Kiểm tra định dạng code (Linting)
npm run lint

# Build bản sản phẩm (Production Build)
npm run build

# Xem thử bản Build nội bộ
npm run preview
```

---

## 🐳 Triển khai Production

Dự án đã được container hóa hoàn chỉnh bằng **Docker Multi-Stage Build** kết hợp **Nginx Alpine**:

### Chạy bằng Docker cục bộ

```bash
# Build Docker Image
docker build -t youngfolio:latest .

# Khởi chạy container trên cổng 5001
docker run -d -p 5001:5001 --name youngfolio-app youngfolio:latest
```

Truy cập kiểm tra tại: `http://localhost:5001`

### Tự động deploy lên VPS (Bash hoặc PowerShell)

Dự án cung cấp sẵn cả script Bash ([`deploy.sh`](file:///home/youngltc/Documents/Coding/3D/deploy.sh)) cho Linux và PowerShell ([`deploy.ps1`](file:///home/youngltc/Documents/Coding/3D/deploy.ps1)) cho Windows:

**Trên Linux / macOS:**
```bash
./deploy.sh "youngfolio" "ltcuong24.io.vn" 5001 "deploy.env"
```

**Trên Windows (PowerShell):**
```powershell
./deploy.ps1 -AppName "youngfolio" -Domain "ltcuong24.io.vn" -ContainerPort 5001 -EnvFile "deploy.env"
```

---

## 📬 Kết nối & Tác giả

<div align="center">

  **Lê Thế Cường (youngltc)**  
  *Frontend / Fullstack Developer*

  <p>
    <a href="https://ltcuong24.io.vn">
      <img src="https://img.shields.io/badge/Website-ltcuong24.io.vn-38BDF8?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Website" />
    </a>
    <a href="https://github.com/ekancisme">
      <img src="https://img.shields.io/badge/GitHub-ekancisme-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    </a>
    <a href="mailto:lethecuong2k4@gmail.com">
      <img src="https://img.shields.io/badge/Email-lethecuong2k4@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
    </a>
  </p>

  ⭐ Nếu bạn thấy dự án này thú vị, đừng quên để lại một ngôi sao trên [GitHub Repository](https://github.com/ekancisme/youngfolio) nhé!

</div>
