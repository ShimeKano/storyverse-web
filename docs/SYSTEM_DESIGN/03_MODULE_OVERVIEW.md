# StoryVerse System Design
# 03_MODULE_OVERVIEW.md

Version: 1.0

---

# 1. Overview

StoryVerse được thiết kế theo kiến trúc Modular Monolith.

Mỗi chức năng được chia thành một Module độc lập.

Các Module giao tiếp thông qua REST API và Database.

Điều này giúp hệ thống:

- Dễ mở rộng
- Dễ bảo trì
- Dễ kiểm thử
- Có thể tách thành Microservice trong tương lai

---

# 2. Module Architecture

```
                           StoryVerse
                                │
 ┌──────────────────────────────┼──────────────────────────────┐
 │                              │                              │
 ▼                              ▼                              ▼
Authentication              Story Engine                  Community
 │                              │                              │
 ▼                              ▼                              ▼
User Management            Story Editor                  Ranking
 │                              │                              │
 ▼                              ▼                              ▼
Profile                  Story Player                 Notification
 │                              │
 ▼                              ▼
RPG Engine              Achievement
 │
 ▼
Inventory
 │
 ▼
Payment
 │
 ▼
Administration
```

---

# 3. Module Dependency

```
Authentication
        │
        ▼
User Management
        │
        ▼
Profile
        │
        ▼
Story Engine
        │
        ├─────────────┐
        ▼             ▼
Story Editor    Story Player
                     │
                     ▼
                 RPG Engine
                     │
                     ▼
                 Inventory
                     │
                     ▼
                Achievement

Community

Ranking

Notification

Admin
```

---

# 4. Authentication Module

## Purpose

Quản lý toàn bộ việc xác thực người dùng.

---

## Features

- Register
- Login
- Logout
- Refresh Token
- JWT
- Password Hash
- Email Verification (Future)

---

## API

```
POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout
```

---

## Database

```
Users

Roles

UserRoles

RefreshTokens
```

---

# 5. User Module

## Purpose

Quản lý hồ sơ người dùng.

---

## Features

- Profile
- Avatar
- Cover
- Bio
- Statistics
- Friend (Future)

---

## Database

```
Users
```

---

# 6. Story Engine Module

Đây là Module quan trọng nhất của StoryVerse.

Nó chịu trách nhiệm quản lý:

- Story
- Node
- Choice
- Ending
- Condition

---

## Structure

```
Story

↓

Node

↓

Choice

↓

Next Node

↓

Ending
```

---

## Database

```
Stories

StoryNodes

StoryChoices

StoryConditions

StoryAssets
```

---

# 7. Story Editor Module

Module dành cho Author.

Cho phép tạo truyện bằng giao diện kéo thả.

---

## Features

- Create Story
- Create Node
- Create Choice
- Preview
- Validate
- Publish

---

## Future

React Flow

Undo

Redo

Copy Node

Import

Export

---

# 8. Story Player Module

Hiển thị nội dung truyện cho người chơi.

---

## Features

- Continue
- Save
- Choice
- Ending
- Auto Save
- Background Music
- Image
- Video

---

## Database

```
PlayerProgress

PlayerChoice

PlayerEnding
```

---

# 9. RPG Module

Module này mở rộng Story thành Game RPG.

---

## Features

- HP
- Mana
- EXP
- Gold
- Level
- Quest
- Monster
- Battle

---

## Database

```
PlayerStats

Quest

QuestProgress

Monster

BattleHistory
```

---

# 10. Inventory Module

Quản lý vật phẩm.

---

## Features

- Add Item
- Remove Item
- Equip
- Consume
- Drop

---

## Database

```
Items

Inventory

Equipment
```

---

# 11. Achievement Module

Lưu thành tích.

---

## Features

- Ending Collection
- Hidden Achievement
- Story Completion
- RPG Achievement

---

## Database

```
Achievements

PlayerAchievements
```

---

# 12. Community Module

Cho phép người dùng tương tác.

---

## Features

- Comment
- Rating
- Like
- Bookmark
- Follow Author

---

## Database

```
Comments

Likes

Bookmarks

Followers
```

---

# 13. Ranking Module

Hiển thị bảng xếp hạng.

---

## Features

- Top EXP
- Top Level
- Top Story
- Top Author
- Weekly
- Monthly

---

## Database

```
RankingSeason

RankingScore
```

---

# 14. Notification Module

Thông báo trong hệ thống.

---

## Features

- New Comment
- New Follower
- Story Approved
- Story Rejected
- Quest Complete

---

## Database

```
Notifications
```

---

# 15. Payment Module

Quản lý thanh toán.

---

## Features

- Buy Hearts
- Buy Premium
- Buy Item
- Advertisement Reward

---

## Database

```
Orders

Products

HeartTransactions

Advertisements
```

---

# 16. Administration Module

Module dành cho Admin.

---

## Features

- Dashboard
- User Management
- Story Approval
- Report Management
- Analytics

---

## Database

```
Reports

AuditLogs
```

---

# 17. Future AI Module

Module dành cho AI.

Hiện chưa triển khai.

---

## Future Features

- AI Story Generator
- AI NPC
- AI Dialogue
- AI Quest
- AI Image

---

# 18. Module Communication

```
Frontend

↓

REST API

↓

Controller

↓

Service

↓

Repository

↓

Azure SQL
```

Không Module nào truy cập trực tiếp Database của Module khác.

Mọi giao tiếp đều thông qua Service Layer.

---

# 19. Module Priority

## Core

- Authentication
- Story Engine
- Story Player

---

## Important

- Story Editor
- RPG
- Community

---

## Secondary

- Ranking
- Achievement
- Notification

---

## Optional

- AI
- Multiplayer
- Marketplace

---

# 20. Development Order

```
Phase 1

Authentication

↓

Story CRUD

↓

Azure

↓

SQL

──────────────────────

Phase 2

Story Editor

──────────────────────

Phase 3

Story Player

──────────────────────

Phase 4

RPG

──────────────────────

Phase 5

Community

──────────────────────

Phase 6

Admin

──────────────────────

Phase 7

Payment

──────────────────────

Phase 8

Optimization

──────────────────────

Phase 9

AI

──────────────────────

Phase 10

Mobile
```

---

# 21. Module Design Principles

Tất cả Module trong StoryVerse tuân theo các nguyên tắc:

- Single Responsibility Principle
- Separation of Concerns
- Reusable Components
- RESTful Communication
- Stateless Backend
- Secure by Default
- Database First Design
- Cloud Native Deployment

---

# 22. Summary

StoryVerse được chia thành nhiều Module độc lập nhưng có khả năng phối hợp chặt chẽ.

Việc phân tách rõ ràng giữa các Module giúp:

- Dễ mở rộng tính năng
- Dễ bảo trì
- Dễ kiểm thử
- Giảm phụ thuộc giữa các thành phần
- Chuẩn bị sẵn cho việc chuyển sang Microservices nếu cần trong tương lai

---

# Next Chapter

```
04_USER_FLOW.md
```

Bao gồm:

- Guest Flow
- Register Flow
- Login Flow
- Story Creation Flow
- Story Playing Flow
- RPG Flow
- Payment Flow
- Admin Flow
- Logout Flow