# StoryVerse System Design
# Chapter 1 - Introduction

Version: 1.0

Author: StoryVerse Team

Last Update: 2026

---

# 1. Project Overview

StoryVerse là một nền tảng Web Game thế hệ mới cho phép người dùng tạo, chia sẻ và trải nghiệm các trò chơi kể chuyện tương tác (Interactive Story Games) kết hợp với các yếu tố RPG (Role Playing Game).

Khác với các nền tảng đọc truyện truyền thống, StoryVerse cho phép người chơi đưa ra lựa chọn trong từng tình huống, từ đó tạo nên nhiều hướng phát triển và nhiều kết thúc khác nhau. Người dùng không chỉ đóng vai trò là người chơi mà còn có thể trở thành tác giả, tự xây dựng thế giới, nhân vật và hệ thống nhiệm vụ thông qua giao diện trực quan.

StoryVerse hướng đến việc trở thành một nền tảng sáng tạo nội dung cộng đồng, nơi bất kỳ ai cũng có thể tạo ra một trò chơi mà không cần biết lập trình.

---

# 2. Project Goals

## Primary Goals

- Xây dựng nền tảng tạo truyện tương tác trực tuyến.
- Hỗ trợ nhiều kết thúc trong cùng một cốt truyện.
- Cho phép tạo game mà không cần viết mã nguồn.
- Tích hợp hệ thống RPG.
- Xây dựng cộng đồng sáng tạo nội dung.
- Hỗ trợ nhiều thể loại game.

---

## Secondary Goals

- Hệ thống bảng xếp hạng.
- Thành tựu (Achievement).
- Hồ sơ người chơi.
- Theo dõi tiến trình.
- Quản trị nội dung.
- Kiếm tiền từ nền tảng.

---

# 3. Project Scope

StoryVerse bao gồm ba nhóm chức năng chính.

## 3.1 Story Platform

Cho phép người chơi:

- Đọc truyện
- Chơi game tương tác
- Lưu tiến trình
- Thu thập Ending
- Mở khóa Achievement

---

## 3.2 Story Creation Platform

Cho phép tác giả:

- Tạo truyện
- Chỉnh sửa truyện
- Quản lý node
- Quản lý lựa chọn
- Preview
- Publish

---

## 3.3 RPG Platform

Cho phép:

- Level
- EXP
- HP
- Inventory
- Equipment
- Skill
- Quest
- Boss Battle

---

# 4. User Roles

Hệ thống sử dụng Role Based Access Control (RBAC).

## Guest

Không cần đăng nhập.

Có thể:

- Xem trang chủ
- Xem danh sách truyện
- Đăng ký

---

## Player

Có thể:

- Chơi game
- Lưu tiến trình
- Bình luận
- Đánh giá
- Theo dõi tác giả

---

## Author

Có thể:

- Tạo truyện
- Chỉnh sửa truyện
- Quản lý truyện
- Gửi duyệt

---

## Moderator

Có thể:

- Kiểm tra báo cáo
- Duyệt truyện
- Khóa truyện vi phạm

---

## Administrator

Có thể:

- Quản lý người dùng
- Quản lý hệ thống
- Quản lý thanh toán
- Quản lý dữ liệu
- Thống kê

---

## Owner

Toàn quyền.

Bao gồm:

- Backup
- Restore
- Deployment
- System Settings

---

# 5. Functional Requirements

## Authentication

- Register
- Login
- Logout
- Refresh Token
- JWT Authentication

---

## Story

- Create Story
- Edit Story
- Delete Story
- Publish Story
- Draft Story

---

## Story Player

- Continue Reading
- Save Progress
- Story History
- Multiple Endings

---

## RPG

- Character
- Level
- EXP
- Inventory
- Quest
- Boss

---

## Community

- Like
- Rating
- Comment
- Bookmark
- Follow

---

## Admin

- User Management
- Story Management
- Report Management
- Dashboard

---

# 6. Non Functional Requirements

## Performance

- API Response < 300 ms
- Story Load < 2 s
- Login < 1 s

---

## Security

- JWT Authentication
- Password Hashing
- HTTPS
- Rate Limiting
- XSS Protection
- SQL Injection Protection

---

## Scalability

Hệ thống có thể mở rộng tới:

- 100.000 Users
- 10.000 Stories
- 1.000.000 Story Nodes

---

## Availability

- 99.9% Uptime

---

# 7. Technology Stack

## Frontend

- React
- Vite
- React Router
- React Flow
- Axios

---

## Backend

- Node.js
- Express.js
- JWT
- bcrypt

---

## Database

- Azure SQL Database

---

## Cloud

- Azure App Service
- Azure Blob Storage

---

## Deployment

- GitHub
- GitHub Actions
- Vercel

---

# 8. High Level Architecture

```
                    Internet
                        │
                        │
              HTTPS Request
                        │
                        ▼
          +-------------------------+
          |        Frontend         |
          |   React + Vite (Vercel) |
          +-------------------------+
                        │
                        │ HTTPS API
                        ▼
          +-------------------------+
          |       Backend API       |
          |     Express (Azure)     |
          +-------------------------+
             │        │        │
             │        │        │
             ▼        ▼        ▼
      Azure SQL   Blob Storage Future Services
         DB          Assets     (Redis/AI)
```

---

# 9. Core Modules

StoryVerse được chia thành các module độc lập.

- Authentication
- User Management
- Story Engine
- Story Editor
- Story Player
- RPG Engine
- Inventory
- Achievement
- Community
- Ranking
- Payment
- Notification
- Administration

Mỗi module hoạt động độc lập và giao tiếp thông qua REST API.

---

# 10. Development Roadmap

Phase 1

✔ Authentication

✔ Story CRUD

✔ Azure Deployment

✔ SQL

---

Phase 2

Story Editor

---

Phase 3

Story Player

---

Phase 4

RPG System

---

Phase 5

Community

---

Phase 6

Admin Dashboard

---

Phase 7

Monetization

---

Phase 8

Optimization

---

# 11. Design Principles

Trong suốt quá trình phát triển, dự án tuân theo các nguyên tắc sau:

- Modular Architecture
- Separation of Concerns
- RESTful API
- Responsive UI
- Scalability First
- Security by Default
- Reusable Components
- Cloud Native Design

---

# 12. Next Chapter

Tài liệu tiếp theo:

```
02_SYSTEM_ARCHITECTURE.md
```

Nội dung sẽ trình bày:

- Kiến trúc tổng thể hệ thống
- Luồng dữ liệu
- Luồng đăng nhập
- Luồng tạo truyện
- Luồng chơi game
- Kiến trúc Azure
- Kiến trúc React
- Kiến trúc Express
- Kiến trúc Database