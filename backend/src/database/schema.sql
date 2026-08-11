-- StoryVerse Azure SQL schema foundation
-- Application state is persisted in Azure SQL so App Service redeploys do not erase data.

IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE Users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        username NVARCHAR(100) NOT NULL UNIQUE,
        email NVARCHAR(255) NOT NULL UNIQUE,
        passwordHash NVARCHAR(255) NOT NULL,
        role NVARCHAR(50) NOT NULL DEFAULT 'user',
        createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END;

IF OBJECT_ID('dbo.Profiles', 'U') IS NULL
BEGIN
    CREATE TABLE Profiles (
        id INT IDENTITY(1,1) PRIMARY KEY,
        userId INT NOT NULL UNIQUE,
        hp INT NOT NULL DEFAULT 100,
        level INT NOT NULL DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES Users(id)
    );
END;

IF OBJECT_ID('dbo.Stories', 'U') IS NULL
BEGIN
    CREATE TABLE Stories (
        id INT IDENTITY(1,1) PRIMARY KEY,
        authorId INT NULL,
        title NVARCHAR(255) NOT NULL,
        type NVARCHAR(50) NOT NULL,
        content NVARCHAR(MAX) NOT NULL,
        createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (authorId) REFERENCES Users(id)
    );
END;

IF OBJECT_ID('dbo.StoryVerseState', 'U') IS NULL
BEGIN
    CREATE TABLE StoryVerseState (
        id INT NOT NULL PRIMARY KEY,
        stateJson NVARCHAR(MAX) NOT NULL,
        updatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END;
