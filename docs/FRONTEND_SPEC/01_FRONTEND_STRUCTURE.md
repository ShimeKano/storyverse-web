# StoryVerse Frontend Roadmap

Version: 1.0

---

# Mục tiêu

Tài liệu này định nghĩa toàn bộ lộ trình phát triển Frontend của StoryVerse.

Mỗi Sprint chỉ tập trung vào một mục tiêu.

Không tạo file dư thừa.

Không viết trước những module chưa sử dụng.

Không phá vỡ kiến trúc hiện tại.

---

# Nguyên tắc phát triển

✔ Refactor thay vì Rewrite

✔ Chỉ tạo file khi chuẩn bị sử dụng

✔ Component phải tái sử dụng

✔ Không hardcode giao diện

✔ Tách UI khỏi Business Logic

✔ Mỗi Sprint đều có thể Deploy

---

# Kiến trúc Frontend

React + Vite

↓

Tailwind CSS

↓

shadcn/ui

↓

React Router

↓

React Flow

↓

Framer Motion

↓

Axios

↓

Zustand (khi cần)

---

# Sprint 1
## UI Foundation

### Mục tiêu

Chuẩn hóa toàn bộ Frontend.

Tạo Design System.

Tạo Layout.

Không thêm tính năng mới.

---

### Thư mục tạo mới

src/

├── assets/

├── components/

│   ├── common/

│   └── navigation/

├── layout/

├── styles/

├── theme/

├── routes/

├── services/

└── utils/

---

### File cần tạo

components/common/

Button.jsx

Input.jsx

Card.jsx

Modal.jsx

Loading.jsx

Avatar.jsx

Badge.jsx

---

components/navigation/

Navbar.jsx

Sidebar.jsx

Footer.jsx

---

layout/

PublicLayout.jsx

PlayerLayout.jsx

AuthorLayout.jsx

AdminLayout.jsx

---

styles/

globals.css

variables.css

animation.css

scrollbar.css

---

theme/

colors.js

theme.js

typography.js

spacing.js

radius.js

shadow.js

---

routes/

AppRouter.jsx

ProtectedRoute.jsx

---

### File cần sửa

App.jsx

main.jsx

api/api.js

---

### Deliverable

Dark Theme

Navbar

Footer

Layout

Button

Input

Card

Responsive

---

# Sprint 2
## Authentication UI

### Mục tiêu

Làm lại toàn bộ giao diện đăng nhập.

---

### Thư mục tạo

pages/auth/

components/forms/

---

### File

Login.jsx

Register.jsx

ForgotPassword.jsx

LoginForm.jsx

RegisterForm.jsx

---

### Deliverable

Glass UI

Animation

Validation

Responsive

Remember Login

---

# Sprint 3
## Home Page

### Mục tiêu

Thiết kế lại Homepage.

---

### Thư mục

pages/home/

components/story/

---

### File

Home.jsx

HeroBanner.jsx

StoryCard.jsx

StoryCarousel.jsx

CategorySection.jsx

ContinuePlaying.jsx

---

### Deliverable

Hero Banner

Trending

Continue Playing

Latest Story

Category

Footer

---

# Sprint 4
## Story Module

### Mục tiêu

Hoàn thiện trải nghiệm đọc truyện.

---

### File

StoryList.jsx

StoryDetail.jsx

StoryPlayer.jsx

Ending.jsx

StoryChoice.jsx

StoryDialogue.jsx

StoryHUD.jsx

---

### Deliverable

Story Player

Choice Animation

Music

HP

Inventory

Save

History

---

# Sprint 5
## Story Editor

### Mục tiêu

Xây dựng Editor kéo thả.

---

### Công nghệ

React Flow

---

### File

StoryEditor.jsx

NodeCanvas.jsx

NodeToolbar.jsx

PropertyPanel.jsx

ChoiceEditor.jsx

MiniMap.jsx

Preview.jsx

---

### Deliverable

Drag & Drop

Zoom

Undo

Redo

Mini Map

Validation

Auto Save

Preview

---

# Sprint 6
## Profile

### File

Profile.jsx

Inventory.jsx

Achievement.jsx

Settings.jsx

StatisticsCard.jsx

---

### Deliverable

Avatar

Cover

HP

EXP

Achievement

Inventory

Continue Playing

---

# Sprint 7
## Community

### File

Community.jsx

AuthorPage.jsx

Comment.jsx

Review.jsx

Notification.jsx

---

### Deliverable

Comment

Rating

Like

Bookmark

Follow

Author Page

---

# Sprint 8
## Ranking

### File

Ranking.jsx

Leaderboard.jsx

TopStory.jsx

TopAuthor.jsx

---

### Deliverable

Weekly

Monthly

Season

Global

---

# Sprint 9
## RPG

### File

Character.jsx

Quest.jsx

Battle.jsx

InventoryGrid.jsx

Equipment.jsx

HPBar.jsx

EXPBar.jsx

---

### Deliverable

Character

Inventory

Battle

Quest

Equipment

---

# Sprint 10
## Admin Dashboard

### File

Dashboard.jsx

Users.jsx

Stories.jsx

Reports.jsx

DashboardCard.jsx

UserTable.jsx

StoryTable.jsx

---

### Deliverable

Dashboard

Charts

Approve Story

Manage User

Report Center

---

# Sprint 11
## Payment

### File

Store.jsx

Premium.jsx

HeartShop.jsx

History.jsx

---

### Deliverable

Heart Pack

Premium

Advertisement Reward

Purchase History

---

# Sprint 12
## Polish

### Công việc

Animation

Loading

Optimization

SEO

Accessibility

Responsive

Performance

Dark Theme

Light Theme

---

# Sprint 13
## Release Candidate

### Checklist

☐ Responsive

☐ Performance

☐ Lighthouse

☐ Security

☐ Error Handling

☐ Loading

☐ Skeleton

☐ Lazy Loading

☐ Deploy

☐ Final Testing

---

# Module Dependency

Sprint 1

↓

Sprint 2

↓

Sprint 3

↓

Sprint 4

↓

Sprint 5

↓

Sprint 6

↓

Sprint 7

↓

Sprint 8

↓

Sprint 9

↓

Sprint 10

↓

Sprint 11

↓

Sprint 12

↓

Release

---

# Quy tắc phát triển

Không tạo file khi chưa sử dụng.

Không tạo Component trùng chức năng.

Ưu tiên tái sử dụng Component.

Mỗi Sprint đều phải Deploy lên Vercel.

Backend luôn tương thích với Frontend hiện tại.

Không thay đổi API nếu không thực sự cần thiết.

---

# Definition of Done

Một Sprint chỉ được coi là hoàn thành khi:

- Code sạch.
- Component tái sử dụng.
- Responsive.
- Deploy thành công.
- Không làm hỏng Sprint trước.
- Có thể tiếp tục phát triển Sprint kế tiếp mà không cần refactor lớn.

---

# Ghi chú

Frontend của StoryVerse sẽ được phát triển theo hướng "Game Platform" thay vì "Website CRUD".

Mọi quyết định về giao diện phải hướng đến:

- Trực quan.
- Mượt mà.
- Hiện đại.
- Dễ mở rộng.
- Mang cảm giác của một Game Launcher và Visual Novel Platform.