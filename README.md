# 🎮 StoryVerse Web Game
> Interactive Story + RPG Platform

---

# 📖 Giới thiệu

StoryVerse là nền tảng cho phép người dùng:

- Chơi truyện tương tác nhiều kết thúc
- Tạo truyện bằng giao diện trực quan (không cần biết lập trình)
- Chơi RPG ngay trong trình duyệt
- Chia sẻ truyện với cộng đồng
- Xếp hạng người chơi và tác giả
- Phát triển hệ thống nhiệm vụ, vật phẩm và nhân vật

Frontend được deploy trên **Vercel**.

Backend được deploy trên **Azure App Service**.

Database sử dụng **Azure SQL Database**.

---

# 🏗️ Kiến trúc

```
Frontend (React + Vite)
        │
        ▼
Azure App Service (Express API)
        │
        ▼
Azure SQL Database

        │
        ▼
Azure Blob Storage (Image / Audio / Video)

        │
        ▼
Future
Azure Cosmos DB
Redis
SignalR
```

---

# 🛣️ ROADMAP

---

# ✅ PHASE 1
## Foundation

Mục tiêu

Xây dựng hệ thống nền.

### Authentication

- [x] Register
- [x] Login
- [x] JWT
- [x] Logout

### Backend

- [x] Express
- [x] Azure Deploy
- [x] SQL Connection
- [x] API Health

### Story

- [x] Upload Story
- [x] Upload JSON
- [x] Draft
- [x] Approve

### User

- [x] Profile
- [x] Ranking

---

# 🚀 PHASE 2
# Story Editor (Quan trọng nhất)

Không dùng JSON nữa.

Người dùng sẽ kéo thả.

```
(Start)

     |

Node 1

 /   \

A     B

|      |

Node2 Node3

 \    /

 Ending
```

---

## Chức năng

### Story Canvas

- [ ] React Flow
- [ ] Zoom
- [ ] Drag
- [ ] Pan

---

### Story Node

Mỗi Node gồm

- [ ] Title
- [ ] Content
- [ ] Image
- [ ] GIF
- [ ] Video
- [ ] Audio
- [ ] EXP
- [ ] Gold
- [ ] HP
- [ ] Item
- [ ] Ending

---

### Choice

Mỗi lựa chọn gồm

- [ ] Text
- [ ] Next Node
- [ ] Điều kiện
- [ ] Tăng EXP
- [ ] Trừ HP
- [ ] Thêm Item
- [ ] Xóa Item

---

### Preview

- [ ] Play Story
- [ ] Test Ending
- [ ] Auto Save

---

### Validate

- [ ] Thiếu Ending
- [ ] Thiếu Start
- [ ] Node mồ côi
- [ ] Choice lỗi
- [ ] Loop Detection

---

### Export

- [ ] Export JSON
- [ ] Import JSON

---

# 🚀 PHASE 3
# Story Player

Trang đọc truyện thật.

```
Ảnh

Bạn bước vào căn phòng.

Có tiếng khóc.

[Mở cửa]

[Bỏ chạy]

[Trốn]
```

---

## Giao diện

- [ ] Typing Effect
- [ ] Fade Animation
- [ ] Background Music
- [ ] Sound Effect
- [ ] Video Background
- [ ] GIF

---

## Save

- [ ] Continue
- [ ] Auto Save
- [ ] Save Slot

---

# 🚀 PHASE 4
# Player System

## HP

❤❤❤❤❤

---

## EXP

- [ ] Level
- [ ] EXP
- [ ] Skill Point

---

## Inventory

- [ ] Key
- [ ] Knife
- [ ] Gun
- [ ] Book
- [ ] Potion
- [ ] Flashlight

---

## Achievement

- [ ] Hidden Ending
- [ ] 100% Ending
- [ ] Speed Run

---

# 🚀 PHASE 5
# RPG System

## Character

- [ ] Class
- [ ] Level
- [ ] Skill

---

## Combat

- [ ] Turn Base
- [ ] Boss
- [ ] Damage

---

## NPC

- [ ] Shop
- [ ] Quest
- [ ] Dialogue

---

## Item

- [ ] Weapon
- [ ] Armor
- [ ] Consumable

---

# 🚀 PHASE 6
# Community

## Story

- [ ] Like
- [ ] Rating
- [ ] Comment

---

## User

- [ ] Follow
- [ ] Favorite
- [ ] Collection

---

## Feed

- [ ] Trending
- [ ] New Story
- [ ] Popular Author

---

# 🚀 PHASE 7
# Admin Panel

Dashboard

- [ ] User
- [ ] Story
- [ ] Report
- [ ] Income

---

## Story

- [ ] Approve
- [ ] Reject
- [ ] Delete

---

## User

- [ ] Ban
- [ ] Unban
- [ ] Reset Password

---

# 🚀 PHASE 8
# Monetization

- [ ] Google Ads
- [ ] Premium
- [ ] VIP
- [ ] Donate

---

## Heart

- [ ] Buy Heart
- [ ] Watch Ads
- [ ] Daily Reward

---

## Shop

- [ ] Avatar
- [ ] Theme
- [ ] Frame

---

# 🚀 PHASE 9
# Polish

## UI

- [ ] Dark Mode
- [ ] Animation
- [ ] Mobile

---

## Login

- [ ] Google
- [ ] Discord
- [ ] Facebook

---

## Notification

- [ ] Email
- [ ] Push
- [ ] Discord Webhook

---

## Performance

- [ ] Cache
- [ ] Lazy Load
- [ ] SEO

---

# 📂 Folder Structure

```
frontend/

backend/

database/

docs/

assets/

scripts/
```

---

# 🎯 Mục tiêu cuối cùng

StoryVerse sẽ là nền tảng nơi người dùng:

- Không cần biết lập trình vẫn tạo được truyện.
- Kéo thả để tạo nhiều nhánh và nhiều kết thúc.
- Chơi truyện tương tác và RPG trong cùng một hệ thống.
- Chia sẻ truyện với cộng đồng.
- Có hệ thống xếp hạng, thành tựu và kiếm tiền từ nội dung.

---

# 📌 Tiến độ

```
Phase 1  ██████████ 100%

Phase 2  ░░░░░░░░░░   0%

Phase 3  ░░░░░░░░░░   0%

Phase 4  ░░░░░░░░░░   0%

Phase 5  ░░░░░░░░░░   0%

Phase 6  ░░░░░░░░░░   0%

Phase 7  ░░░░░░░░░░   0%

Phase 8  ░░░░░░░░░░   0%

Phase 9  ░░░░░░░░░░   0%
```
