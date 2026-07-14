# Database Design

## Local runtime store (current implementation)

File: `backend/src/data/local-db.json`

Collections:
- `users`
- `profiles`
- `hearts`
- `inventory`
- `stories`
- `storyNodes`
- `storyChoices`
- `progress`
- `endings`

## Azure SQL target schema

SQL schema template: `database/schema.sql`

Core entities:
- Roles, Users, Profiles, UserHearts
- Stories, StoryNodes, StoryChoices
- Inventory / Payments (future-ready)

## Migration strategy

1. Keep API contracts stable.
2. Replace local data-service methods bằng Azure SQL repository tương ứng.
3. Dùng `DATA_PROVIDER=azure` để switch provider.
4. Nếu Azure unavailable, backend fallback local để không downtime local/dev.
