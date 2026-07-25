# StoryVerse UI/UX Blueprint
# 02_PAGE_BLUEPRINT.md

Version: 1.0

---

# 1. Purpose

Tài liệu này mô tả bố cục (Blueprint) của toàn bộ các trang trong StoryVerse.

Mục tiêu:

- Thống nhất giao diện.
- Giúp Frontend Developer biết mỗi trang cần những thành phần nào.
- Hạn chế việc thiết kế lại khi phát triển.
- Đảm bảo trải nghiệm người dùng đồng nhất.

Tài liệu này KHÔNG mô tả CSS hay Framework.

Chỉ mô tả cấu trúc giao diện.

---

# 2. Common Layout

Toàn bộ website sử dụng chung cấu trúc sau.

```

Navbar

↓

Page Content

↓

Footer

```

Riêng Dashboard và Story Editor sẽ sử dụng Sidebar.

```

Navbar

↓

Sidebar + Content

↓

Footer

```

---

# 3. Public Pages

---

## 3.1 Landing Page

```

Navbar

│

├── Logo

├── Home

├── Story

├── RPG

├── Ranking

├── Login

└── Register

──────────────────────────────

Hero Banner

──────────────────────────────

Continue Playing

──────────────────────────────

Trending Stories

──────────────────────────────

Popular Horror

──────────────────────────────

Popular RPG

──────────────────────────────

Latest Stories

──────────────────────────────

Top Authors

──────────────────────────────

Community News

──────────────────────────────

Footer

```

---

## 3.2 Login

```

Background

↓

Glass Card

↓

Logo

↓

Welcome Text

↓

Email

↓

Password

↓

Remember Me

↓

Login Button

↓

Forgot Password

↓

Register

```

---

## 3.3 Register

```

Background

↓

Glass Card

↓

Username

↓

Display Name

↓

Email

↓

Password

↓

Confirm Password

↓

Register Button

↓

Login

```

---

## 3.4 Forgot Password

```

Background

↓

Email

↓

OTP

↓

New Password

↓

Confirm Password

↓

Reset

```

---

# 4. Player Pages

---

## 4.1 Home

```

Hero Banner

↓

Continue Playing

↓

Recommended Stories

↓

Popular Horror

↓

Popular RPG

↓

Top Authors

↓

Newest Stories

↓

Advertisement

↓

Footer

```

---

## 4.2 Story List

```

Filter

Search

Sort

────────────────

Story Card

Story Card

Story Card

Story Card

────────────────

Pagination

```

---

## 4.3 Story Detail

```

Cover

↓

Story Information

↓

Author

↓

Genre

↓

Difficulty

↓

Ending Count

↓

Play Button

↓

Favorite

↓

Comments

↓

Recommended Story

```

---

## 4.4 Story Player

```

Background Image

↓

Background Music

↓

Top HUD

HP

EXP

Inventory

Setting

↓

Story Content

↓

Character

↓

Dialogue

↓

Choices

↓

Bottom Action

Save

Auto

History

Setting

```

---

## 4.5 Ending Page

```

Ending Illustration

↓

Ending Name

↓

Ending Description

↓

Reward

↓

Achievement

↓

Restart

↓

Continue

↓

Back Home

```

---

# 5. RPG Pages

---

## 5.1 RPG Status

```

Character

↓

HP

↓

Mana

↓

Level

↓

EXP

↓

Gold

↓

Equipment

↓

Inventory

↓

Quest

```

---

## 5.2 Inventory

```

Search

↓

Category

↓

Grid Item

↓

Item Detail

↓

Equip

↓

Use

↓

Drop

```

---

## 5.3 Quest

```

Quest List

↓

Quest Detail

↓

Reward

↓

Progress

```

---

## 5.4 Battle

```

Enemy

↓

Battle Animation

↓

Skill

↓

Attack

↓

Item

↓

Escape

↓

Battle Log

```

---

# 6. Profile

---

## 6.1 Profile

```

Cover

↓

Avatar

↓

Username

↓

Level

↓

EXP

↓

HP

↓

Achievement

↓

Statistics

↓

Continue Playing

↓

Favorite Stories

↓

Inventory

```

---

## 6.2 Achievement

```

Achievement Grid

↓

Achievement Detail

↓

Progress

```

---

## 6.3 Settings

```

Account

↓

Password

↓

Notification

↓

Theme

↓

Language

↓

Security

```

---

# 7. Author Pages

---

## 7.1 Story Dashboard

```

Search

↓

Create Story

↓

My Stories

↓

Draft

↓

Published

↓

Rejected

↓

Statistics

```

---

## 7.2 Story Editor

```

────────────────────────────────────────────

Top Toolbar

Save

Publish

Undo

Redo

Preview

────────────────────────────────────────────

Left Sidebar

Node Library

Story Assets

Search

────────────────────────────────────────────

Center Canvas

React Flow

Drag & Drop

────────────────────────────────────────────

Right Sidebar

Node Properties

Choice

Condition

Reward

Image

Sound

────────────────────────────────────────────

Bottom

Mini Map

Zoom

Status

```

---

## 7.3 Story Preview

```

Preview Window

↓

Story Player Simulation

↓

Validation

↓

Publish

```

---

# 8. Community

---

## 8.1 Community

```

Popular

↓

Newest

↓

Following

↓

Search

↓

Post

↓

Comment

↓

Like

```

---

## 8.2 Author Page

```

Cover

↓

Avatar

↓

Biography

↓

Published Stories

↓

Followers

↓

Rating

↓

Latest Update

```

---

# 9. Ranking

---

## 9.1 Ranking

```

Top Player

↓

Top Story

↓

Top Author

↓

Weekly

↓

Monthly

↓

Season

```

---

# 10. Payment

---

## 10.1 Store

```

Heart Pack

↓

Premium

↓

Coin

↓

Subscription

↓

History

```

---

# 11. Administration

---

## 11.1 Dashboard

```

Sidebar

↓

Statistics

↓

Charts

↓

User Growth

↓

Story Growth

↓

Revenue

↓

Realtime

↓

Server Status

```

---

## 11.2 User Management

```

Search

↓

Filter

↓

User Table

↓

User Detail

↓

Role

↓

Ban

↓

Delete

```

---

## 11.3 Story Approval

```

Pending Stories

↓

Preview

↓

Approve

↓

Reject

↓

Comment

```

---

## 11.4 Reports

```

Report List

↓

Reporter

↓

Story

↓

Evidence

↓

Action

```

---

# 12. Notification Center

```

Unread

↓

Today

↓

Yesterday

↓

Older

```

---

# 13. Global Components

Các thành phần sử dụng trên toàn bộ website.

```

Navbar

Footer

Sidebar

Button

Card

Input

Textarea

Dropdown

Select

Checkbox

Radio

Badge

Tooltip

Toast

Dialog

Modal

Pagination

Search Box

Loading

Skeleton

Avatar

Progress Bar

Tabs

Breadcrumb

```

---

# 14. Animation Blueprint

Các animation tiêu chuẩn.

```

Hover

Fade

Slide

Scale

Zoom

Ripple

Blur

Page Transition

Loading

Toast

Dialog

Story Transition

```

---

# 15. Responsive Blueprint

Desktop

≥ 1440px

Full Layout

────────────────────

Laptop

1024 ~ 1439px

Compact Layout

────────────────────

Tablet

768 ~ 1023px

Responsive Layout

────────────────────

Mobile

≤ 767px

Mobile Navigation

Bottom Navigation

Drawer Menu

---

# 16. Future UI

Các giao diện dự kiến bổ sung.

```

Guild

Marketplace

AI Story

Multiplayer

Dungeon

World Boss

Season Event

Admin Analytics

```

---

# 17. UI Design Goals

Mọi giao diện của StoryVerse cần đáp ứng các mục tiêu sau:

- Đơn giản nhưng hiện đại.
- Mang cảm giác của một Game Client.
- Dễ sử dụng cho người mới.
- Hỗ trợ đầy đủ trên Desktop và Mobile.
- Có tính nhất quán giữa các trang.
- Hỗ trợ mở rộng tính năng trong tương lai mà không phải thiết kế lại.

---

# 18. Summary

Tài liệu này là Blueprint cho toàn bộ giao diện StoryVerse.

Trong quá trình phát triển:

- Không tự ý thay đổi bố cục của các trang.
- Nếu cần thêm màn hình mới, hãy cập nhật tài liệu này trước khi triển khai.
- Mọi giao diện mới phải tuân theo Design System và UI/UX Vision của StoryVerse.