CREATE TABLE Roles(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL
);

CREATE TABLE Users(
    Id INT PRIMARY KEY IDENTITY(1,1),
    RoleId INT NOT NULL,

    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,

    PasswordHash NVARCHAR(MAX) NOT NULL,

    IsVerified BIT DEFAULT 0,
    IsBanned BIT DEFAULT 0,

    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY(RoleId)
    REFERENCES Roles(Id)
);

CREATE TABLE Profiles(
    Id INT PRIMARY KEY IDENTITY(1,1),

    UserId INT UNIQUE NOT NULL,

    DisplayName NVARCHAR(100),

    AvatarUrl NVARCHAR(MAX),

    Level INT DEFAULT 1,
    Exp INT DEFAULT 0,

    Gold INT DEFAULT 0,
    Diamond INT DEFAULT 0,

    FOREIGN KEY(UserId)
    REFERENCES Users(Id)
);

CREATE TABLE UserHearts(
    Id INT PRIMARY KEY IDENTITY(1,1),

    UserId INT UNIQUE NOT NULL,

    CurrentHearts INT DEFAULT 5,
    MaxHearts INT DEFAULT 5,

    LastRecoverTime DATETIME,

    FOREIGN KEY(UserId)
    REFERENCES Users(Id)
);
-- Bảng lưu danh sách truyện/game (Cả Horror và RPG nếu RPG làm dạng text-adventure)
CREATE TABLE Stories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AuthorId INT NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Type NVARCHAR(50) NOT NULL, -- 'HORROR' hoặc 'RPG'
    Status NVARCHAR(50) DEFAULT 'PENDING', -- 'PENDING' (Chờ duyệt), 'APPROVED' (Đã duyệt), 'REJECTED'
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(AuthorId) REFERENCES Users(Id)
);

-- Bảng các nút nội dung truyện (Các phân đoạn cảnh)
CREATE TABLE StoryNodes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    StoryId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL, -- Nội dung chữ dẫn dắt
    IsEnding BIT DEFAULT 0,         -- 1 là nút kết thúc game, 0 là nút thường
    EndingType NVARCHAR(50) NULL,   -- 'BAD_END', 'TRUE_END', 'HAPPY_END'
    FOREIGN KEY(StoryId) REFERENCES Stories(Id) ON DELETE CASCADE
);

-- Bảng lưu các lựa chọn phân nhánh của từng nút
CREATE TABLE StoryChoices (
    Id INT PRIMARY KEY IDENTITY(1,1),
    NodeId INT NOT NULL,                  -- Thuộc nút nào?
    ChoiceText NVARCHAR(255) NOT NULL,    -- Chữ trên nút bấm (Ví dụ: "Trốn vào tủ")
    NextNodeId INT NULL,                  -- Bấm vào thì nhảy tới Node Id nào?
    FOREIGN KEY(NodeId) REFERENCES StoryNodes(Id) ON DELETE CASCADE
);
-- Danh mục tất cả Vật phẩm/Trang bị có trong game (Do Admin tạo sẵn)
CREATE TABLE Items (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    Type NVARCHAR(50) NOT NULL,     -- 'EQUIPMENT' (Trang bị), 'POTION' (Bình máu/Tim), 'KEY' (Vật phẩm nhiệm vụ)
    Slot NVARCHAR(50) NULL,         -- 'WEAPON' (Vũ khí), 'ARMOR' (Giáp), 'ACCESSORY' (Trang sức) nếu là trang bị
    BonusStats NVARCHAR(MAX) NULL,  -- Lưu chuỗi JSON chỉ số cộng thêm, ví dụ: '{"atk": 15, "def": 5}'
    Price INT DEFAULT 0             -- Giá mua bằng Vàng (Gold)
);

-- Hòm đồ (Túi đồ) của từng người chơi
CREATE TABLE UserInventory (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    ItemId INT NOT NULL,
    Quantity INT DEFAULT 1,         -- Số lượng vật phẩm đang sở hữu
    IsEquipped BIT DEFAULT 0,       -- 1 là đang mặc trên người, 0 là đang cất trong túi
    UpdatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY(ItemId) REFERENCES Items(Id) ON DELETE CASCADE
);
CREATE TABLE Payments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    TransactionId NVARCHAR(100) NOT NULL UNIQUE, -- Mã giao dịch từ cổng thanh toán (Momo, VNPAY, Paypal...)
    Amount DECIMAL(18, 2) NOT NULL,              -- Số tiền nạp thực tế (ví dụ: 50000.00 VND)
    Currency NVARCHAR(10) DEFAULT 'VND',
    Status NVARCHAR(50) DEFAULT 'PENDING',       -- 'PENDING', 'SUCCESS', 'FAILED'
    DiamondGained INT DEFAULT 0,                 -- Số Kim cương nhận được từ gói nạp này
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY(UserId) REFERENCES Users(Id) ON DELETE CASCADE
);