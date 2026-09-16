export type Language = "en" | "vi";

export const EMAIL = "lethecuong2k4@gmail.com";

const en = {
  meta: {
    title: "Lê Thế Cường — Full-stack Developer",
    description:
      "Portfolio of Lê Thế Cường, a full-stack developer and final-year Software Engineering student at FPT University Da Nang.",
  },
  nav: {
    primary: "Primary navigation",
    home: "Lê Thế Cường home",
    work: "Work",
    about: "About",
    stack: "Stack",
    contact: "Contact",
    github: "View GitHub",
    githubAria: "View Lê Thế Cường on GitHub, opens in a new tab",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Switch to Vietnamese",
  },
  mobile: {
    menu: "Navigation menu",
    github: "View GitHub",
    cv: "Download CV",
  },
  hero: {
    title: "Lê Thế Cường, Full-stack Developer",
    intro:
      "I’m Lê Thế Cường, a final-year Software Engineering student at FPT University,\nbased in Da Nang with frontend internship experience at FPT Software.",
  },
  typewriter:
    "I build full-stack web products with React, Spring Boot and Node.js, bringing applied AI and interactive 3D into experiences where they create real value.",
  actions: {
    lexigrow: "Explore LexiGrow",
    drivon: "Explore Drivon",
    github: "View my GitHub",
    resume: "Download résumé",
    reach: `Reach me: ${EMAIL}`,
    copied: "Email copied",
    copiedSr: "Email address copied to clipboard",
  },
  project: {
    view: "View project",
    openLinks: "Open {title} links",
    alt: "{title} live website interface",
    choose: "Choose a destination",
    live: "Live website",
    repo: "GitHub repository",
    close: "Close project links",
  },
  about: {
    kicker: "About",
    location: "Da Nang, Vietnam",
    titleBefore: "I build ideas into ",
    titleEm: "useful",
    titleAfter: " digital experiences.",
    p1: "I’m a final-year Software Engineering student at FPT University, focused on full-stack products that feel clear, fast and human.",
    p2: "My work moves between polished React interfaces, Spring Boot and Node.js systems, applied AI and experimental 3D interactions.",
    resume: "Read the full résumé",
    availability: "Available for full-stack opportunities",
  },
  experience: {
    kicker: "Experience",
    kickerRight: "Selected work",
    title: "Experience built in real product teams.",
    internDate: "Aug - Dec 2025",
    internCompany: "FPT Software",
    internRole: "Frontend Developer Intern",
    internDetail1:
      "Built responsive interfaces for a Japanese government agricultural management system from Figma designs.",
    internDetail2:
      "Created 15+ reusable React UI components and integrated REST APIs in an Agile/Scrum team.",
    eduDate: "2022 - 2026",
    eduSchool: "FPT University Da Nang",
    eduMajor: "Software Engineering",
    eduDetail:
      "Final-year student exploring scalable full-stack systems, applied AI and creative interaction design.",
  },
  work: {
    kicker: "Featured work",
    kickerRight: "2025 - Now",
    title: "Selected projects",
  },
  stack: {
    kicker: "Stack",
    kickerRight: "Tools I work with",
    title: "Across the interface and underneath it.",
  },
  skills: [
    ["Frontend", "React", "Next.js", "TypeScript", "Tailwind CSS", "Interactive 3D"],
    ["Backend", "Java", "Spring Boot", "Node.js", "Express", "REST APIs"],
    ["Data & AI", "MySQL", "MongoDB", "Gemini AI", "NLP integration", "Analytics"],
    ["Workflow", "Git", "Postman", "Docker basics", "Agile / Scrum", "Figma"],
  ],
  projects: {
    lexigrow: {
      kind: "AI learning platform",
      description:
        "An AI-powered English learning platform with essay assessment, lexical diversity insights, smart vocabulary recommendations and interactive 3D flashcards.",
    },
    drivon: {
      kind: "Car rental system",
      description:
        "A role-based rental platform for admins, owners and customers, with real-time messaging, automated contract PDFs and revenue analytics.",
    },
  },
  contact: {
    kicker: "Contact",
    kickerRight: "Let’s make something",
    prompt: "Have a project, an opportunity, or an idea worth exploring?",
    cta: "LET’S TALK",
  },
  footer: {
    rights: "© 2026 Lê Thế Cường",
    github: "GitHub",
    resume: "Résumé",
    top: "Back to top ↑",
  },
};

export type Translation = typeof en;

const vi: Translation = {
  meta: {
    title: "Lê Thế Cường — Lập trình viên Full-stack",
    description:
      "Hồ sơ năng lực của Lê Thế Cường, lập trình viên full-stack và sinh viên năm cuối ngành Kỹ thuật Phần mềm tại Đại học FPT Đà Nẵng.",
  },
  nav: {
    primary: "Điều hướng chính",
    home: "Trang chủ Lê Thế Cường",
    work: "Dự án",
    about: "Giới thiệu",
    stack: "Kỹ năng",
    contact: "Liên hệ",
    github: "Xem GitHub",
    githubAria: "Xem Lê Thế Cường trên GitHub, mở trong tab mới",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
    language: "Chuyển sang tiếng Anh",
  },
  mobile: {
    menu: "Menu điều hướng",
    github: "Xem GitHub",
    cv: "Tải CV",
  },
  hero: {
    title: "Lê Thế Cường, Lập trình viên Full-stack",
    intro:
      "Tôi là Lê Thế Cường, sinh viên năm cuối ngành Kỹ thuật Phần mềm tại Đại học FPT,\nhiện sống tại Đà Nẵng với kinh nghiệm thực tập frontend tại FPT Software.",
  },
  typewriter:
    "Tôi xây dựng sản phẩm web full-stack với React, Spring Boot và Node.js, đưa AI ứng dụng và 3D tương tác vào những trải nghiệm tạo ra giá trị thực.",
  actions: {
    lexigrow: "Khám phá LexiGrow",
    drivon: "Khám phá Drivon",
    github: "Xem GitHub của tôi",
    resume: "Tải CV",
    reach: `Liên hệ: ${EMAIL}`,
    copied: "Đã copy email",
    copiedSr: "Đã copy địa chỉ email vào clipboard",
  },
  project: {
    view: "Xem dự án",
    openLinks: "Mở liên kết {title}",
    alt: "Giao diện website {title}",
    choose: "Chọn điểm đến",
    live: "Website chính thức",
    repo: "Kho GitHub",
    close: "Đóng liên kết dự án",
  },
  about: {
    kicker: "Giới thiệu",
    location: "Đà Nẵng, Việt Nam",
    titleBefore: "Tôi biến ý tưởng thành những trải nghiệm số ",
    titleEm: "hữu ích",
    titleAfter: ".",
    p1: "Tôi là sinh viên năm cuối ngành Kỹ thuật Phần mềm tại Đại học FPT, tập trung vào các sản phẩm full-stack rõ ràng, nhanh và thân thiện.",
    p2: "Công việc của tôi xoay quanh giao diện React chỉn chu, hệ thống Spring Boot và Node.js, AI ứng dụng và những tương tác 3D mang tính thử nghiệm.",
    resume: "Đọc toàn bộ CV",
    availability: "Sẵn sàng cho cơ hội full-stack",
  },
  experience: {
    kicker: "Kinh nghiệm",
    kickerRight: "Dự án tiêu biểu",
    title: "Kinh nghiệm từ những nhóm sản phẩm thực tế.",
    internDate: "Tháng 8 - 12/2025",
    internCompany: "FPT Software",
    internRole: "Thực tập sinh Frontend Developer",
    internDetail1:
      "Xây dựng giao diện responsive cho hệ thống quản lý nông nghiệp của chính phủ Nhật Bản dựa trên thiết kế Figma.",
    internDetail2:
      "Tạo hơn 15 component React tái sử dụng và tích hợp REST API trong nhóm làm việc Agile/Scrum.",
    eduDate: "2022 - 2026",
    eduSchool: "Đại học FPT Đà Nẵng",
    eduMajor: "Kỹ thuật Phần mềm",
    eduDetail:
      "Sinh viên năm cuối, tìm hiểu hệ thống full-stack có khả năng mở rộng, AI ứng dụng và thiết kế tương tác sáng tạo.",
  },
  work: {
    kicker: "Dự án nổi bật",
    kickerRight: "2025 - Nay",
    title: "Dự án tiêu biểu",
  },
  stack: {
    kicker: "Kỹ năng",
    kickerRight: "Công cụ tôi sử dụng",
    title: "Từ lớp giao diện đến hệ thống bên dưới.",
  },
  skills: [
    ["Frontend", "React", "Next.js", "TypeScript", "Tailwind CSS", "3D tương tác"],
    ["Backend", "Java", "Spring Boot", "Node.js", "Express", "REST APIs"],
    ["Dữ liệu & AI", "MySQL", "MongoDB", "Gemini AI", "Tích hợp NLP", "Phân tích dữ liệu"],
    ["Quy trình", "Git", "Postman", "Docker cơ bản", "Agile / Scrum", "Figma"],
  ],
  projects: {
    lexigrow: {
      kind: "Nền tảng học tập AI",
      description:
        "Nền tảng học tiếng Anh ứng dụng AI với chấm điểm bài luận, phân tích độ đa dạng từ vựng, gợi ý từ vựng thông minh và flashcard 3D tương tác.",
    },
    drivon: {
      kind: "Hệ thống cho thuê xe",
      description:
        "Nền tảng cho thuê xe phân quyền cho quản trị viên, chủ xe và khách hàng, với nhắn tin thời gian thực, tự động xuất hợp đồng PDF và phân tích doanh thu.",
    },
  },
  contact: {
    kicker: "Liên hệ",
    kickerRight: "Cùng tạo nên điều gì đó",
    prompt: "Bạn có một dự án, một cơ hội, hoặc một ý tưởng muốn khám phá?",
    cta: "LIÊN HỆ",
  },
  footer: {
    rights: "© 2026 Lê Thế Cường",
    github: "GitHub",
    resume: "CV",
    top: "Về đầu trang ↑",
  },
};

export const translations: Record<Language, Translation> = { en, vi };