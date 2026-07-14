# API Design

## Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

## Player Profile
- `GET /api/profile/me` (auth)
- `PUT /api/profile/me` (auth)

## Stories (Upload/CMS)
- `GET /api/stories` (public approved, auth can query own drafts)
- `GET /api/stories/:id`
- `POST /api/stories` (auth)
- `PUT /api/stories/:id` (owner/admin/manager)
- `POST /api/stories/:id/submit` (owner)
- `DELETE /api/stories/:id` (owner/admin/manager with policy)

## Gameplay
- `GET /api/game/:storyId/start` (auth, consumes 1 heart)
- `POST /api/game/:storyId/choice` (auth)

## Leaderboard
- `GET /api/ranking`

## Admin / Manager
- `GET /api/users` (manager/admin)
- `POST /api/users/ban` (manager/admin)
- `POST /api/admin/gift-hearts` (manager/admin)
- `POST /api/admin/stories/:id/review` (manager/admin)
