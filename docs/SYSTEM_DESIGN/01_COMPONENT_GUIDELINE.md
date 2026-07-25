# StoryVerse Design System
# 01_COMPONENT_GUIDELINE.md

Version: 1.0

---

# 1. Mục tiêu

Tài liệu này định nghĩa toàn bộ Component của StoryVerse.

Mọi giao diện trong hệ thống phải được xây dựng từ các Component này.

Không được tạo Component mới nếu đã có Component có thể tái sử dụng.

---

# 2. Design Principles

StoryVerse sử dụng triết lý:

> Atomic Design + Reusable Components

Component được chia thành nhiều cấp độ.

```
Atom

↓

Molecule

↓

Organism

↓

Template

↓

Page
```

---

# 3. Component Hierarchy

```
Button

↓

Login Form

↓

Login Page
```

Ví dụ

```
Button

+

Input

+

Checkbox

↓

Login Form

↓

Public Layout

↓

Login Page
```

---

# 4. Component Categories

## 4.1 Atoms

Các component nhỏ nhất.

```
Button

Input

Label

Icon

Badge

Avatar

Spinner

Divider

Checkbox

Radio

Switch

Progress

Tooltip

Chip

Tag
```

---

## 4.2 Molecules

```
SearchBox

StoryCard

CommentCard

UserCard

InventoryCard

NotificationCard

AchievementCard

Dropdown

Pagination

Toast

Dialog

```

---

## 4.3 Organisms

```
Navbar

Sidebar

Footer

Hero Banner

Story List

Inventory Grid

Leaderboard

Dashboard Panel

Comment Section

Story HUD

Battle HUD

Node Toolbar
```

---

## 4.4 Templates

```
Public Layout

Player Layout

Author Layout

Admin Layout

Blank Layout
```

---

## 4.5 Pages

```
Home

Login

Register

Story Player

Story Editor

Profile

Ranking

Admin Dashboard
```

---

# 5. Button

## Variants

```
Primary

Secondary

Success

Danger

Warning

Ghost

Outline

Link
```

---

## Sizes

```
XS

SM

MD

LG

XL
```

---

## States

```
Normal

Hover

Focus

Pressed

Loading

Disabled
```

---

## Props

```
variant

size

icon

loading

disabled

fullWidth

onClick
```

---

# 6. Input

Hỗ trợ:

```
Text

Email

Password

Number

Search

Textarea
```

---

Props

```
label

placeholder

helperText

error

disabled

icon

required
```

---

# 7. Card

Variants

```
Story

Profile

Inventory

Admin

Dashboard

Glass

Normal
```

---

# 8. Modal

Variants

```
Default

Confirm

Delete

Image

Fullscreen

Form
```

---

# 9. Dialog

```
Confirm

Warning

Error

Success
```

---

# 10. Toast

```
Success

Error

Warning

Info
```

Xuất hiện góc phải trên.

Tự động biến mất.

---

# 11. Badge

```
Role

Status

Genre

Difficulty

New

Premium
```

---

# 12. Avatar

Kích thước

```
XS

SM

MD

LG

XL
```

Hỗ trợ:

```
Image

Fallback

Online

Offline
```

---

# 13. Loading

```
Spinner

Dots

Pulse

Skeleton

Progress
```

---

# 14. Navbar

Thành phần

```
Logo

Search

Navigation

Notification

Profile

Theme

```

---

# 15. Sidebar

```
Collapse

Expand

Icon

Text

Badge

Group
```

---

# 16. Footer

```
About

Contact

Terms

Privacy

Version

Copyright
```

---

# 17. Story Components

## Story Card

Hiển thị:

```
Cover

Title

Author

Genre

Ending Count

Difficulty

Like

Favorite

Play
```

---

## Story Dialogue

```
Character

Avatar

Dialogue

Typing Effect
```

---

## Story Choice

```
Choice Button

Requirement

Locked

Reward
```

---

## Story HUD

```
HP

EXP

Inventory

Save

Setting

History

Music
```

---

# 18. RPG Components

```
HP Bar

EXP Bar

Mana Bar

Quest Card

Item Card

Inventory Grid

Equipment Slot

Battle HUD
```

---

# 19. Profile Components

```
Profile Card

Achievement

Statistics

Inventory

Continue Playing

Favorite Story
```

---

# 20. Admin Components

```
Dashboard Card

Chart

Table

Data Grid

Approval Card

Report Card

Audit Log
```

---

# 21. Animation Rules

Component phải có animation thống nhất.

```
Hover

Fade

Slide

Scale

Ripple

Blur
```

Không sử dụng animation gây rối mắt.

---

# 22. Spacing

Sử dụng hệ thống 8-point.

```
4px

8px

16px

24px

32px

48px

64px
```

---

# 23. Border Radius

```
SM

MD

LG

XL

FULL
```

---

# 24. Shadow

```
Small

Medium

Large

Glass

Floating
```

---

# 25. Color Rules

Primary

→ Purple

Secondary

→ Blue

Success

→ Green

Danger

→ Red

Warning

→ Orange

Info

→ Cyan

Background

→ Dark

Card

→ Glass

---

# 26. Typography

Heading

```
H1

H2

H3

H4

H5

H6
```

Body

```
Large

Normal

Small
```

Caption

```
XS
```

---

# 27. Icon Rules

Sử dụng duy nhất một bộ icon.

Đề xuất:

```
Lucide React
```

Không trộn nhiều thư viện icon.

---

# 28. Accessibility

Tất cả Component phải hỗ trợ:

```
Keyboard

ARIA

Focus

Screen Reader

Responsive
```

---

# 29. Reuse Rules

Không được tạo:

```
LoginButton

DeleteButton

SaveButton

PlayButton
```

Chỉ có:

```
Button
```

Ví dụ:

```jsx
<Button variant="primary">
Đăng nhập
</Button>

<Button variant="danger">
Xóa
</Button>

<Button variant="success">
Chơi ngay
</Button>
```

---

# 30. Folder Structure

```
components/

common/

navigation/

feedback/

forms/

story/

editor/

profile/

admin/

rpg/
```

---

# 31. Definition of Done

Một Component chỉ được coi là hoàn thành khi:

- Có thể tái sử dụng.
- Responsive.
- Có đầy đủ trạng thái (loading, disabled, hover...).
- Có animation phù hợp.
- Có thể dùng ở nhiều màn hình.
- Không chứa logic nghiệp vụ đặc thù của một trang.

---

# 32. Future Components

Các Component dự kiến bổ sung:

```
Rich Text Editor

Markdown Viewer

AI Chat

Voice Recorder

Timeline

Quest Tree

Skill Tree

Guild Card

Marketplace Card

Season Pass

Mini Game Widget
```

---

# 33. Tổng kết

Design System là nền tảng của toàn bộ giao diện StoryVerse.

Mọi màn hình mới phải ưu tiên sử dụng Component có sẵn trước khi tạo Component mới.

Mục tiêu cuối cùng là xây dựng một hệ thống giao diện thống nhất, dễ bảo trì và dễ mở rộng trong nhiều năm phát triển.