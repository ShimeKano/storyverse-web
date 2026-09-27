import { useState, type ReactNode } from "react"

type Screen = "home" | "detail" | "player" | "creator"
type IconName = "search" | "bell" | "play" | "arrow" | "star" | "heart" | "share" | "plus" | "book" | "compass" | "trophy" | "pen" | "settings" | "save" | "exit" | "auto" | "chevron" | "menu" | "close" | "users" | "branch" | "image" | "check" | "more"

const art = {
  castle:
    "/assets/castle.jpg",
  lake: "/assets/lake.jpg",
  tower:
    "/assets/tower.jpg",
  mountain:
    "/assets/mountain.jpg",
  church:
    "/assets/church.jpg",
  forest:
    "/assets/forest.jpg",
  road: "/assets/road.jpg",
  water:
    "/assets/water.jpg",
}

function Icon({ name, size = 18 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5V7Z" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    star: (
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="m8 11 8-5M8 13l8 5" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
        <path d="M6 6H3v2a4 4 0 0 0 4 4M18 6h3v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6" />
      </>
    ),
    pen: (
      <>
        <path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" />
        <path d="m14 7 3 3" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19 13.5v-3l-2-.7-.7-1.7.9-2-2.2-2-1.8 1-1.8-.7L10.5 2h-3l-.7 2.3-1.7.8-2-.9-2 2.1 1 1.9-.7 1.7-2.4.8v3l2.4.7.7 1.7-1 2 2.2 2 1.8-1 1.8.7.8 2.3h3l.7-2.3 1.7-.8 2 .9 2-2.1-1-1.9.9-1.7 2-.7Z"
          transform="scale(.78) translate(3.4 3.4)"
        />
      </>
    ),
    save: (
      <>
        <path d="M5 4h12l2 2v14H5V4Z" />
        <path d="M8 4v6h8V4M8 20v-6h8v6" />
      </>
    ),
    exit: (
      <>
        <path d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" />
      </>
    ),
    auto: (
      <>
        <path d="M4 12a8 8 0 0 1 14-5l2 2" />
        <path d="M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2" />
        <path d="M4 20v-5h5" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c0-4 2-7 6-7s6 3 6 7M16 5a3 3 0 0 1 0 6M17 13c3 .5 4 3 4 6" />
      </>
    ),
    branch: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="M6 7v5c0 3 2 5 5 5h5M8 8c2-1 4-1 8-1" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m3 17 5-5 4 4 3-3 6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function Title({
  children,
  as = 2,
  className = "",
}: {
  children: ReactNode
  as?: number
  className?: string
}) {
  return (
    <div role="heading" aria-level={as} className={`title ${className}`}>
      {children}
    </div>
  )
}

function Button({
  children,
  icon,
  variant = "primary",
  onClick,
  disabled,
  loading,
  className = "",
}: {
  children?: ReactNode
  icon?: IconName
  variant?: "primary" | "secondary" | "ghost" | "icon" | "danger"
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="spinner" />
      ) : icon ? (
        <Icon name={icon} />
      ) : null}
      {children && <span>{children}</span>}
    </button>
  )
}

function Tag({
  children,
  active = false,
}: {
  children: ReactNode
  active?: boolean
}) {
  return <span className={`tag ${active ? "tag-active" : ""}`}>{children}</span>
}

function Progress({
  value,
  compact = false,
}: {
  value: number
  compact?: boolean
}) {
  return (
    <div className={`progress ${compact ? "progress-compact" : ""}`}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function Avatar({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <img
      className={`avatar avatar-${size}`}
      src="/assets/profile.jpg"
      alt="Profile of Maya"
    />
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="logo-mark">S</span>
      {!compact && (
        <span>
          Story<span>Verse</span>
        </span>
      )}
    </div>
  )
}

function Navigation({
  screen,
  setScreen,
}: {
  screen: Screen
  setScreen: (screen: Screen) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className="topbar">
      <div className="nav-wrap">
        <div onClick={() => setScreen("home")} className="logo-click">
          <Logo />
        </div>
        <nav
          className={`nav-links ${open ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <Button
            variant={screen === "home" ? "secondary" : "ghost"}
            onClick={() => {
              setScreen("home")
              setOpen(false)
            }}
            icon="compass"
          >
            Discover
          </Button>
          <Button variant="ghost" icon="book">
            Library
          </Button>
          <Button variant="ghost" icon="trophy">
            Rankings
          </Button>
          <Button
            variant={screen === "creator" ? "secondary" : "ghost"}
            onClick={() => {
              setScreen("creator")
              setOpen(false)
            }}
            icon="pen"
          >
            Create
          </Button>
        </nav>
        <div className="nav-actions">
          <div className="search">
            <Icon name="search" />
            <input
              aria-label="Search stories"
              placeholder="Search worlds, authors…"
            />
          </div>
          <Button variant="icon" icon="bell" className="notification" />
          <Avatar />
          <Button
            variant="icon"
            icon={open ? "close" : "menu"}
            className="menu-button"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </header>
  )
}

const featured = [
  {
    title: "The Hollow Crown",
    author: "Elena Voss",
    genre: "Dark Fantasy",
    rating: "4.9",
    endings: 12,
    img: art.castle,
    progress: 62,
  },
  {
    title: "Where Stars Drown",
    author: "R. K. Amari",
    genre: "Mystery",
    rating: "4.8",
    endings: 8,
    img: art.lake,
  },
  {
    title: "The Ninth Bell",
    author: "Julian Cross",
    genre: "Horror",
    rating: "4.7",
    endings: 6,
    img: art.tower,
  },
  {
    title: "Ashes of Evermere",
    author: "Sora Wren",
    genre: "Adventure",
    rating: "4.9",
    endings: 14,
    img: art.mountain,
  },
]

function StoryCard({
  story,
  onOpen,
}: {
  story: typeof featured[number]
  onOpen: () => void
}) {
  return (
    <article className="story-card" onClick={onOpen}>
      <div className="cover-wrap">
        <img src={story.img} alt={`${story.title} cover`} />
        <div className="cover-shade" />
        <Tag>{story.genre}</Tag>
        <Button variant="icon" icon="heart" className="heart-button" />
        {story.progress && (
          <div className="cover-progress">
            <Progress value={story.progress} compact />
          </div>
        )}
      </div>
      <div className="card-copy">
        <Title as={3}>{story.title}</Title>
        <p>by {story.author}</p>
        <div className="card-meta">
          <span>
            <Icon name="star" size={14} /> {story.rating}
          </span>
          <span>
            <Icon name="branch" size={14} /> {story.endings} endings
          </span>
        </div>
      </div>
    </article>
  )
}

function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string
  title: string
  action?: string
}) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Title>{title}</Title>
      </div>
      {action && (
        <Button variant="ghost">
          {action}
          <Icon name="arrow" />
        </Button>
      )}
    </div>
  )
}

function Home({ go }: { go: (screen: Screen) => void }) {
  const categories = [
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Adventure",
    "Thriller",
  ]
  return (
    <main>
      <section
        className="hero"
        style={{ backgroundImage: `url(${art.castle})` }}
      >
        <div className="hero-overlay" />
        <div className="hero-grain" />
        <div className="hero-content page-shell">
          <div className="hero-kicker">
            <span /> Featured story of the week
          </div>
          <Title as={1} className="hero-title">
            The Hollow
            <br />
            <em>Crown</em>
          </Title>
          <p className="hero-description">
            The throne remembers every hand that held it. Return to a kingdom
            bound by blood, where one impossible choice will decide who survives
            the long night.
          </p>
          <div className="tag-row">
            <Tag active>Dark Fantasy</Tag>
            <Tag>Mystery</Tag>
            <Tag>Choice-Driven</Tag>
          </div>
          <div className="author-row">
            <img
              src="/assets/elena.jpg"
              alt="Elena Voss"
            />
            <span>
              <small>A story by</small>Elena Voss
            </span>
            <span className="divider" />
            <span>
              <Icon name="star" size={16} /> 4.9 <small>12.8k ratings</small>
            </span>
          </div>
          <div className="hero-actions">
            <Button icon="play" onClick={() => go("player")}>
              Continue story
            </Button>
            <Button variant="secondary" onClick={() => go("detail")}>
              View story
            </Button>
          </div>
          <div className="hero-progress">
            <div>
              <span>Chapter 7 of 12</span>
              <span>62% complete</span>
            </div>
            <Progress value={62} />
          </div>
        </div>
        <div className="hero-index">
          01 <span>/ 05</span>
        </div>
      </section>

      <div className="page-shell home-content">
        <section>
          <SectionHeader
            eyebrow="Curated for you"
            title="Featured stories"
            action="Browse all"
          />
          <div className="story-grid">
            {featured.map((story) => (
              <StoryCard
                key={story.title}
                story={story}
                onOpen={() => go("detail")}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Your journeys"
            title="Continue reading"
            action="Open library"
          />
          <div className="continue-grid">
            {[featured[0], featured[2]].map((story, index) => (
              <article className="continue-card" key={story.title}>
                <img src={story.img} alt={`${story.title} cover`} />
                <div className="continue-copy">
                  <span className="eyebrow">
                    Chapter {index ? "3" : "7"} ·{" "}
                    {index ? "The ringing room" : "A debt in moonlight"}
                  </span>
                  <Title as={3}>{story.title}</Title>
                  <p>Last played {index ? "yesterday" : "2 hours ago"}</p>
                  <div className="continue-progress">
                    <Progress value={index ? 28 : 62} />
                    <span>{index ? "28" : "62"}%</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  icon="play"
                  onClick={() => go("player")}
                >
                  Continue
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Find your next world"
            title="Explore by genre"
          />
          <div className="categories">
            {categories.map((category, index) => (
              <div className={`category category-${index + 1}`} key={category}>
                <span>0{index + 1}</span>
                <Title as={3}>{category}</Title>
                <Icon name="arrow" />
              </div>
            ))}
          </div>
        </section>

        <section className="trending-section">
          <SectionHeader
            eyebrow="What readers love"
            title="Trending now"
            action="See rankings"
          />
          <div className="trending">
            {[
              ["01", "The Bone Orchard", "Mira Vale", art.church, "+18%"],
              ["02", "Vespers at Midnight", "Jon Bellamy", art.road, "+12%"],
              ["03", "The Last Tide", "Asha North", art.water, "+9%"],
            ].map(([rank, title, author, img, growth]) => (
              <article className="trend-item" key={title}>
                <span className="rank">{rank}</span>
                <img src={img} alt={`${title} cover`} />
                <div>
                  <Title as={3}>{title}</Title>
                  <p>by {author}</p>
                </div>
                <div className="trend-genre">Dark fantasy</div>
                <div className="popularity">
                  <span>↗</span>
                  {growth}
                  <small> this week</small>
                </div>
                <Button variant="icon" icon="more" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function Detail({ go }: { go: (screen: Screen) => void }) {
  return (
    <main className="detail-page">
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${art.castle})` }}
      >
        <div className="detail-scrim" />
        <div className="page-shell detail-layout">
          <img
            className="detail-cover"
            src={art.castle}
            alt="The Hollow Crown cover"
          />
          <div className="detail-copy">
            <span className="eyebrow">An interactive original</span>
            <Title as={1}>The Hollow Crown</Title>
            <p className="detail-author">
              Written by <strong>Elena Voss</strong>
            </p>
            <div className="detail-stats">
              <span>
                <Icon name="star" /> <strong>4.9</strong> rating
              </span>
              <span>12 chapters</span>
              <span>12 endings</span>
              <span>
                <Icon name="users" /> 486k players
              </span>
            </div>
            <div className="tag-row">
              <Tag active>Dark Fantasy</Tag>
              <Tag>Mystery</Tag>
              <Tag>Political</Tag>
            </div>
            <p className="synopsis">
              For three hundred years, the crown of Veyra has chosen its ruler.
              Tonight, it chose you—a forgotten heir carrying a dangerous gift.
              Every alliance has a cost, every secret has teeth, and the throne
              remembers every betrayal.
            </p>
            <div className="detail-actions">
              <Button icon="play" onClick={() => go("player")}>
                Continue story
              </Button>
              <Button variant="secondary" icon="plus">
                Add to library
              </Button>
              <Button variant="icon" icon="heart" />
              <Button variant="icon" icon="share" />
            </div>
            <small className="resume-note">
              Your story resumes at Chapter 7 · A Debt in Moonlight
            </small>
          </div>
        </div>
      </section>

      <div className="page-shell detail-body">
        <div className="detail-main">
          <SectionHeader eyebrow="Your path" title="Chapters" />
          <div className="chapter-list">
            {[
              ["01", "The summons", "Completed", "18 min"],
              ["02", "A crown of thorns", "Completed", "24 min"],
              ["03", "The feast of wolves", "Completed", "31 min"],
              ["04", "Beneath the chapel", "Completed", "22 min"],
              ["05", "The oathbreaker", "Completed", "28 min"],
              ["06", "Glass and poison", "Completed", "25 min"],
              ["07", "A debt in moonlight", "In progress", "32 min"],
              ["08", "The nameless door", "Locked", "—"],
            ].map(([num, name, status, time]) => (
              <div
                className={`chapter ${
                  status === "In progress" ? "chapter-active" : ""
                } ${status === "Locked" ? "chapter-locked" : ""}`}
                key={num}
              >
                <span className="chapter-num">{num}</span>
                <span className="chapter-state">
                  {status === "Completed" && <Icon name="check" size={14} />}
                  {status}
                </span>
                <Title as={3}>{name}</Title>
                <span>{time}</span>
                {status === "In progress" ? (
                  <Button
                    variant="secondary"
                    icon="play"
                    onClick={() => go("player")}
                  >
                    Resume
                  </Button>
                ) : (
                  <Icon name="chevron" />
                )}
              </div>
            ))}
          </div>
        </div>
        <aside className="detail-aside">
          <div className="ending-card">
            <span className="eyebrow">Paths discovered</span>
            <Title as={2}>Your ending tree</Title>
            <div className="tree">
              <div className="tree-root">The heir returns</div>
              <div className="tree-lines">
                <span />
                <span />
                <span />
              </div>
              <div className="tree-nodes">
                <span className="found">The loyalist</span>
                <span className="current">Unknown path</span>
                <span>Locked</span>
              </div>
              <div className="tree-endings">
                <span>Ending 03</span>
                <span>?</span>
                <span>?</span>
              </div>
            </div>
            <p>3 of 12 endings discovered</p>
            <Progress value={25} />
          </div>
          <div className="review-card">
            <SectionHeader title="Reader notes" />
            {[
              [
                "AV",
                "Avery",
                "The atmosphere is incredible. Chapter six completely changed who I trusted.",
              ],
              [
                "MK",
                "Mika",
                "Every choice feels consequential. I’m already planning my second path.",
              ],
            ].map(([initials, name, review]) => (
              <div className="review" key={name}>
                <span>{initials}</span>
                <div>
                  <strong>{name}</strong>
                  <span className="stars">★★★★★</span>
                  <p>{review}</p>
                </div>
              </div>
            ))}
            <Button variant="secondary">Read all 2,418 reviews</Button>
          </div>
        </aside>
      </div>
    </main>
  )
}

function Player({ go }: { go: (screen: Screen) => void }) {
  const [choice, setChoice] = useState<number | null>(null)
  return (
    <main className="player" style={{ backgroundImage: `url(${art.forest})` }}>
      <div className="player-scrim" />
      <div className="player-top">
        <Button variant="icon" icon="exit" onClick={() => go("detail")} />
        <div className="player-chapter">
          <span>THE HOLLOW CROWN</span>
          <strong>Chapter 7 · A Debt in Moonlight</strong>
        </div>
        <div className="player-progress">
          <Progress value={62} compact />
          <span>62%</span>
        </div>
        <div className="player-tools">
          <Button variant="ghost" icon="auto">
            Auto
          </Button>
          <Button variant="icon" icon="save" />
          <Button variant="icon" icon="settings" />
        </div>
      </div>
      <div className="character character-left">
        <div className="character-silhouette" />
        <span>LYSANDER</span>
      </div>
      <div className="character character-right">
        <div className="character-silhouette second" />
        <span>SERAPHINE</span>
      </div>
      <div className="story-ui">
        <div className="choice-prompt">
          <span className="eyebrow">A defining choice</span>
          <Title as={2}>The queen offers you the blade.</Title>
          <p>
            “One life for the kingdom,” she whispers. Beyond the door, your
            brother waits—unaware that his fate now rests in your hands.
          </p>
        </div>
        <div className="choices">
          {[
            [
              "01",
              "Take the blade",
              "Accept the crown’s burden. Your loyalty will be remembered.",
              "choice-danger",
            ],
            [
              "02",
              "Refuse her command",
              "Risk the kingdom to protect the last of your blood.",
              "choice-light",
            ],
            [
              "03",
              "Turn the blade on the queen",
              "Break the ancient pact. There may be no path back.",
              "choice-gold",
            ],
          ].map(([num, title, description, className], index) => (
            <button
              key={num}
              className={`choice ${className} ${
                choice === index ? "selected" : ""
              }`}
              onClick={() => setChoice(index)}
            >
              <span>{num}</span>
              <div>
                <strong>{title}</strong>
                <small>{description}</small>
              </div>
              <Icon name={choice === index ? "check" : "arrow"} />
            </button>
          ))}
        </div>
        <div className="dialogue">
          <div className="speaker">QUEEN SERAPHINE</div>
          <p>
            Choose carefully, little heir. Mercy is a luxury the crown has never
            afforded.
          </p>
          <span className="continue-mark">
            <Icon name="chevron" />
          </span>
        </div>
      </div>
    </main>
  )
}

function Creator() {
  const [tab, setTab] = useState("Story")
  return (
    <main className="creator">
      <aside className="creator-sidebar">
        <div className="creator-brand">
          <Logo compact />
          <div>
            <span>STORYVERSE STUDIO</span>
            <strong>The Hollow Crown</strong>
          </div>
        </div>
        <Button variant="secondary" icon="plus" className="new-scene">
          New scene
        </Button>
        <div className="side-group">
          <span>STORY PROJECT</span>
          {[
            ["book", "Story map", "12"],
            ["pen", "Chapters", "12"],
            ["users", "Characters", "8"],
            ["image", "Asset library", "48"],
            ["branch", "Endings", "12"],
          ].map(([icon, label, count], index) => (
            <button
              className={`side-item ${index === 0 ? "active" : ""}`}
              key={label}
            >
              <Icon name={icon as IconName} />
              <span>{label}</span>
              <small>{count}</small>
            </button>
          ))}
        </div>
        <div className="project-health">
          <span>PROJECT HEALTH</span>
          <div>
            <strong>78%</strong>
            <small>Ready to publish</small>
          </div>
          <Progress value={78} />
          <p>3 unresolved branches</p>
        </div>
        <div className="sidebar-profile">
          <Avatar size="sm" />
          <div>
            <strong>Elena Voss</strong>
            <span>Creator plan</span>
          </div>
          <Icon name="more" />
        </div>
      </aside>
      <section className="creator-workspace">
        <header className="creator-top">
          <div>
            <span className="eyebrow">STORY MAP</span>
            <Title as={1}>The Hollow Crown</Title>
          </div>
          <div className="save-state">
            <Icon name="check" /> Saved just now
          </div>
          <div className="creator-actions">
            <Button variant="secondary" icon="play">
              Preview
            </Button>
            <Button>Publish story</Button>
          </div>
        </header>
        <div className="mobile-tabs">
          {["Story", "Scenes", "Cast", "Assets"].map((item) => (
            <Button
              key={item}
              variant={tab === item ? "secondary" : "ghost"}
              onClick={() => setTab(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="workspace-body">
          <div className="graph-panel">
            <div className="graph-toolbar">
              <div>
                <Button variant="secondary">Story graph</Button>
                <Button variant="ghost">Outline</Button>
              </div>
              <div>
                <Button variant="icon" icon="plus" />
                <span>100%</span>
                <Button variant="icon" icon="more" />
              </div>
            </div>
            <div className="graph-canvas">
              <div className="graph-orbit orbit-one" />
              <div className="graph-orbit orbit-two" />
              <div className="node start-node">
                <span>CHAPTER 06</span>
                <strong>Glass & Poison</strong>
                <small>8 scenes · Complete</small>
                <i />
              </div>
              <div className="connector c-main" />
              <div className="node choice-node">
                <span>CHOICE POINT</span>
                <strong>The Queen’s Offer</strong>
                <small>3 choices · 1 unresolved</small>
                <i />
                <i />
                <i />
              </div>
              <div className="connector c-left" />
              <div className="connector c-center" />
              <div className="connector c-right" />
              <div className="node branch-node left">
                <span>CHAPTER 08A</span>
                <strong>The Loyalist</strong>
                <small>5 scenes</small>
              </div>
              <div className="node branch-node center">
                <span>CHAPTER 08B</span>
                <strong>Blood Before Crown</strong>
                <small>7 scenes</small>
              </div>
              <div className="node branch-node right warning">
                <span>UNRESOLVED</span>
                <strong>The Usurper</strong>
                <small>Add next chapter</small>
              </div>
              <div className="ending-pill ending-one">
                ENDING 03 · The Iron Dawn
              </div>
              <div className="ending-pill ending-two">ENDING 07 · Exile</div>
            </div>
          </div>
          <aside className="editor-panel">
            <div className="editor-head">
              <div>
                <span className="eyebrow">SELECTED SCENE</span>
                <Title as={2}>The Queen’s Offer</Title>
              </div>
              <Button variant="icon" icon="more" />
            </div>
            <label className="field-label">
              Scene title
              <input defaultValue="The Queen’s Offer" />
            </label>
            <label className="field-label">
              Background
              <div className="asset-field">
                <img src={art.forest} alt="Moonlit forest scene" />
                <span>
                  moonlit_courtyard.jpg<small>1920 × 1080</small>
                </span>
                <Button variant="ghost">Change</Button>
              </div>
            </label>
            <label className="field-label">
              Character
              <div className="select-field">
                <span className="mini-avatar">S</span>
                <span>Queen Seraphine</span>
                <Icon name="chevron" />
              </div>
            </label>
            <label className="field-label">
              Dialogue
              <textarea defaultValue="Choose carefully, little heir. Mercy is a luxury the crown has never afforded." />
            </label>
            <div className="choices-editor">
              <div>
                <span className="field-label">Player choices</span>
                <Button variant="ghost" icon="plus">
                  Add choice
                </Button>
              </div>
              {[
                "Take the blade",
                "Refuse her command",
                "Turn the blade on the queen",
              ].map((item, index) => (
                <div className="choice-row" key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                  <Tag>{index === 2 ? "Unlinked" : `Path ${index + 1}`}</Tag>
                  <Icon name="more" />
                </div>
              ))}
            </div>
            <Button variant="secondary" className="save-scene" icon="save">
              Save scene
            </Button>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home")
  const navigate = (next: Screen) => {
    setScreen(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <div className="app">
      {screen !== "player" && screen !== "creator" && (
        <Navigation screen={screen} setScreen={navigate} />
      )}
      {screen === "home" && <Home go={navigate} />}
      {screen === "detail" && <Detail go={navigate} />}
      {screen === "player" && <Player go={navigate} />}
      {screen === "creator" && <Creator />}
    </div>
  )
}
