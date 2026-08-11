-- StoryVerse Azure SQL seed baseline
-- Data migration will be handled through repository layer

-- Reserved for initial roles/system data
INSERT INTO Users (username, email, passwordHash, role)
VALUES ('system', 'system@storyverse.local', 'disabled', 'admin');
