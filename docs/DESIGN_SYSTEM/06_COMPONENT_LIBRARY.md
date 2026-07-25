# StoryVerse Component Library

Version: 1.0

---

# 1. Purpose

Component Library định nghĩa toàn bộ thành phần giao diện được phép sử dụng trong StoryVerse.

Mọi trang trong hệ thống phải tái sử dụng các component này.

Không tạo component mới nếu có thể mở rộng component hiện có.

---

# 2. Design Principles

Mỗi component phải:

- Reusable
- Responsive
- Accessible
- Themeable
- Stateless nếu có thể
- Tách biệt Business Logic và UI

---

# 3. Folder Structure

frontend/

src/

components/

base/

layout/

story/

editor/

profile/

admin/

common/

---

# 4. Base Components

Đây là các component nền tảng.

## Button

Các biến thể:

Primary

Secondary

Danger

Ghost

Outline

Icon Button

Loading Button

Props

variant

size

loading

disabled

icon

fullWidth

---

## Input

Text

Password

Email

Search

Number

Props

label

placeholder

error

helperText

disabled

---

## Textarea

Auto Resize

Character Counter

Markdown Support (Future)

---

## Checkbox

---

## Radio

---

## Switch

---

## Select

---

## Badge

Success

Warning

Danger

Info

Premium

Genre

---

## Avatar

Image

Fallback

Status

Size

---

## Tooltip

---

## Modal

Small

Medium

Large

Fullscreen

---

## Dialog

Confirm

Delete

Warning

---

## Dropdown

---

## Tabs

---

## Accordion

---

## Progress Bar

HP

EXP

Upload

Loading

---

## Spinner

---

## Skeleton

Loading Placeholder

---

# 5. Layout Components

## Sidebar

Collapsible

Nested Menu

Permission Support

---

## Top Navigation

---

## Footer

---

## Container

---

## Section

---

## Grid

---

## Card

---

# 6. Story Components

## Story Card

Cover

Title

Genre

Author

Views

Rating

Status

---

## Story Banner

---

## Story Detail

---

## Story Reader

Background

Content

Choice Area

Overlay

---

## Choice Button

Normal

Locked

Danger

Premium

---

## Chapter Progress

---

## Ending Badge

Happy

Bad

Secret

True

---

## Story Timeline

---

# 7. Story Editor Components

## Editor Canvas

Zoom

Pan

Grid

Snap

---

## Story Node

Start

Normal

Ending

Locked

Conditional

---

## Node Connection

Bezier Line

Arrow

Highlight

---

## Mini Map

---

## Toolbar

Undo

Redo

Save

Preview

Import

Export

---

## Property Panel

Node

Choice

Story

---

## Choice Editor

---

## Search Node

---

## Story Statistics

Node Count

Ending Count

Choice Count

Dead End Count

---

# 8. Profile Components

Profile Header

Achievement Card

Inventory Card

Story History

Created Story

Favorite Story

Following

Follower

Statistics

---

# 9. Admin Components

Dashboard Card

Chart Card

Report Table

User Table

Story Table

Approval Card

---

# 10. Common Components

Notification

Toast

Empty State

Error State

Loading State

Pagination

Breadcrumb

Search Box

Filter

Tag

Chip

---

# 11. Future Components

Inventory Panel

Quest Panel

Mission Card

Dialogue Box

NPC Card

Map Viewer

Achievement Popup

Daily Reward

Battle UI

Skill Tree

---

# 12. Component Rules

Không component nào được:

- Hardcode màu
- Hardcode font
- Hardcode khoảng cách

Tất cả sử dụng Design Token.

---

# 13. Naming Convention

PascalCase

Ví dụ:

StoryCard

ChoiceButton

InventoryPanel

NodeEditor

AchievementCard

UserAvatar

---

# 14. Props Convention

Các component ưu tiên nhận dữ liệu qua props.

Không truy cập API trực tiếp bên trong component.

Business Logic nằm ở Page hoặc Hook.

---

# 15. State Management

Component UI

↓

Hook

↓

Service

↓

API

Không gọi fetch() trực tiếp trong UI Component.

---

# 16. Accessibility

Mọi component phải:

- Keyboard Navigation
- Focus State
- Screen Reader Label
- ARIA Attribute khi cần

---

# 17. Estimated Components

Base

20

Layout

10

Story

25

Editor

30

Profile

15

Admin

20

Common

20

Tổng cộng khoảng:

140 Component

---

# 18. Development Order

Phase 1

Base Components

↓

Layout

↓

Authentication

↓

Story

↓

Profile

↓

Admin

↓

Editor

---

# 19. Final Goal

Toàn bộ StoryVerse chỉ sử dụng component trong thư viện này.

Điều này giúp:

- Giao diện nhất quán
- Code dễ bảo trì
- Dễ mở rộng
- Dễ thay đổi theme
- Tăng tốc phát triển