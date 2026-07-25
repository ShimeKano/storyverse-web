# StoryVerse System Design
# Chapter 2 - System Architecture

Version: 1.0

---

# 1. Overview

StoryVerse được thiết kế theo kiến trúc Client - Server kết hợp Cloud Native nhằm đảm bảo:

- Dễ mở rộng
- Dễ bảo trì
- Có khả năng chịu tải cao
- Phân tách rõ Frontend và Backend
- Có thể triển khai độc lập

Kiến trúc hiện tại sử dụng:

- Frontend: React + Vite (Vercel)
- Backend: ExpressJS (Azure App Service)
- Database: Azure SQL
- Storage: Azure Blob Storage

---

# 2. Overall Architecture

```

+--------------------------------------------------------+
\| Internet |
+--------------------------------------------------------+

|

HTTPS

|

v

+-----------------------+

Frontend

React + Vite

Vercel

+-----------------------+

|

REST API

|

v

+-----------------------+

Backend API

ExpressJS

Azure App Service

+-----------------------+

|

+-----------+------------+--------------+

| | |

v v v

Azure SQL Azure Blob Future Services

Database Storage Redis / AI

```

---

# 3. System Modules

StoryVerse được chia thành các module độc lập.

```

StoryVerse

│

├── Authentication

├── User

├── Story

├── Story Editor

├── Story Player

├── RPG

├── Inventory

├── Ranking

├── Achievement

├── Community

├── Payment

├── Notification

└── Administration

```

Mỗi module chỉ giao tiếp thông qua API.

Không truy cập trực tiếp vào module khác.

---

# 4. Frontend Architecture

```

src/

│

├── api/

├── assets/

├── components/

├── context/

├── hooks/

├── layouts/

├── pages/

├── router/

├── services/

├── styles/

├── utils/

└── App.jsx

```

---

## api/

Quản lý toàn bộ request.

Ví dụ

```

login()

register()

getStories()

saveStory()

```

---

## pages/

Bao gồm:

```

Home

Login

Register

Story

StoryEditor

Profile

Ranking

Dashboard

Admin

```

---

## components/

Ví dụ

```

Button

Modal

Navbar

StoryCard

ChoiceButton

Inventory

HPBar

```

---

## context/

Quản lý trạng thái toàn cục.

```

AuthContext

ThemeContext

PlayerContext

StoryContext

```

---

# 5. Backend Architecture

```

src/

│

├── config/

├── controllers/

├── middleware/

├── routes/

├── services/

├── repository/

├── models/

├── utils/

├── lib/

└── server.js

```

---

## Routes

Nhận request.

↓

Controller

↓

Service

↓

Repository

↓

Database

---

Luồng chuẩn

```

Browser

↓

Route

↓

Controller

↓

Service

↓

Repository

↓

Azure SQL

```

Controller không chứa business logic.

Service mới là nơi xử lý nghiệp vụ.

---

# 6. Authentication Flow

```

Login

↓

POST /api/auth/login

↓

Validate

↓

Password Verify

↓

Generate JWT

↓

Return Token

↓

Frontend Save Token

↓

Authenticated

```

---

Mỗi request tiếp theo

```

Browser

↓

Authorization Bearer Token

↓

Middleware

↓

JWT Verify

↓

Controller

```

---

# 7. Story Creation Flow

```

Author

↓

Story Editor

↓

Create Node

↓

Create Choice

↓

Preview

↓

Validate

↓

Save Draft

↓

Publish

↓

Waiting Approval

↓

Admin Approve

↓

Public Story

```

---

# 8. Story Playing Flow

```

Player

↓

Open Story

↓

Load Story

↓

Load First Node

↓

Display Content

↓

Player Choice

↓

Next Node

↓

Ending

↓

Save Progress

```

---

# 9. Story Editor Flow

```

Create Story

↓

Canvas

↓

Add Node

↓

Add Choice

↓

Connect Node

↓

Validate

↓

Preview

↓

Export JSON

↓

Save Database

```

---

# 10. RPG Flow

```

Start Game

↓

Create Character

↓

Level

↓

Quest

↓

Battle

↓

Reward

↓

Inventory

↓

Continue Story

```

---

# 11. Story Engine

```

Story

↓

Chapter

↓

Node

↓

Choice

↓

Condition

↓

Ending

```

Mỗi Story gồm nhiều Node.

Mỗi Node có nhiều Choice.

Mỗi Choice dẫn tới một Node khác.

---

# 12. Data Flow

```

Browser

↓

React Component

↓

API Layer

↓

Axios / Fetch

↓

Express

↓

Service

↓

Repository

↓

Azure SQL

↓

Repository

↓

Service

↓

Controller

↓

JSON

↓

Browser

```

---

# 13. Error Flow

```

Request

↓

Middleware

↓

Controller

↓

Exception

↓

ErrorHandler

↓

JSON Error

↓

Frontend Toast

```

Ví dụ

```

401 Unauthorized

403 Forbidden

404 Not Found

500 Server Error

```

---

# 14. Deployment Architecture

```

Developer

↓

Git Push

↓

GitHub

↓

GitHub Actions

↓

Frontend Build

↓

Deploy Vercel

↓

Backend Build

↓

Deploy Azure

```

---

# 15. Cloud Resources

## Azure App Service

Chạy Express API.

---

## Azure SQL

Lưu toàn bộ dữ liệu.

---

## Azure Blob

Lưu

- Cover
- Avatar
- Audio
- Video
- Image

---

## Future

Redis

Queue

AI

SignalR

CosmosDB

---

# 16. Security Architecture

```

Browser

↓

HTTPS

↓

JWT

↓

Role Check

↓

Rate Limit

↓

Validation

↓

Controller

↓

Database

```

Bao gồm

- HTTPS
- JWT
- bcrypt
- Helmet
- CORS
- Rate Limit

---

# 17. Scalability

Mục tiêu hệ thống:

- 100.000 Users
- 10.000 Stories
- 1.000.000 Nodes
- 5.000 Concurrent Players

Có thể mở rộng bằng:

- Redis Cache
- Load Balancer
- Azure CDN
- Azure Functions

---

# 18. Future Architecture

```

Browser

↓

API Gateway

↓

Microservices

├── User Service

├── Story Service

├── RPG Service

├── Payment Service

├── Notification Service

└── AI Service

```

Hiện tại dự án sử dụng Monolith.

Khi đạt quy mô lớn sẽ chuyển sang Microservices.

---

# 19. Architecture Principles

StoryVerse tuân theo các nguyên tắc:

- Separation of Concerns
- Single Responsibility
- Modular Design
- RESTful API
- Reusable Components
- Cloud Native
- Security First
- Scalability First

---

# 20. Next Chapter

Tài liệu tiếp theo:

```

03_DATABASE_DESIGN.md

```

Nội dung sẽ bao gồm:

- ERD hoàn chỉnh
- Hơn 25 bảng dữ liệu
- Quan hệ giữa các bảng
- Chỉ mục (Index)
- Khóa chính và khóa ngoại
- Thiết kế hỗ trợ Story Engine, RPG và Community
