export function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>, bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    play: <path d="m9 7 8 5-8 5V7Z" />, arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    share: <><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" /></>, plus: <><path d="M12 5v14M5 12h14" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>, trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M6 6H3v2a4 4 0 0 0 4 4M18 6h3v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6" /></>,
    pen: <><path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z" /><path d="m14 7 3 3" /></>, settings: <><circle cx="12" cy="12" r="3" /><path d="M19 13.5v-3l-2-.7-.7-1.7.9-2-2.2-2-1.8 1-1.8-.7L10.5 2h-3l-.7 2.3-1.7.8-2-.9-2 2.1 1 1.9-.7 1.7-2.4.8v3l2.4.7.7 1.7-1 2 2.2 2 1.8-1 1.8.7.8 2.3h3l.7-2.3 1.7-.8 2 .9 2-2.1-1-1.9.9-1.7 2-.7Z" transform="scale(.78) translate(3.4 3.4)" /></>,
    save: <><path d="M5 4h12l2 2v14H5V4Z" /><path d="M8 4v6h8V4M8 20v-6h8v6" /></>, exit: <><path d="M10 5H5v14h5M14 8l4 4-4 4M9 12h9" /></>,
    auto: <><path d="M4 12a8 8 0 0 1 14-5l2 2" /><path d="M20 4v5h-5M20 12a8 8 0 0 1-14 5l-2-2" /><path d="M4 20v-5h5" /></>, chevron: <path d="m9 6 6 6-6 6" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />, close: <path d="m6 6 12 12M18 6 6 18" />, users: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-7 6-7s6 3 6 7M16 5a3 3 0 0 1 0 6M17 13c3 .5 4 3 4 6" /></>,
    branch: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="7" r="2" /><circle cx="18" cy="17" r="2" /><path d="M6 7v5c0 3 2 5 5 5h5M8 8c2-1 4-1 8-1" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m3 17 5-5 4 4 3-3 6 6" /></>, check: <path d="m5 12 4 4L19 6" />, more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export function Title({ children, as = 2, className = '' }) { return <div role="heading" aria-level={as} className={`title ${className}`}>{children}</div>; }
export function Button({ children, icon, variant = 'primary', onClick, disabled, loading, className = '', type = 'button', ariaLabel }) { return <button type={type} aria-label={ariaLabel} className={`btn btn-${variant} ${className}`} onClick={onClick} disabled={disabled || loading}>{loading ? <span className="spinner" aria-hidden="true" /> : icon ? <Icon name={icon} /> : null}{children && <span>{children}</span>}</button>; }
export function Tag({ children, active = false }) { return <span className={`tag ${active ? 'tag-active' : ''}`}>{children}</span>; }
export function Progress({ value, compact = false, label = 'Progress' }) { const safeValue = Math.max(0, Math.min(100, Number(value) || 0)); return <div className={`progress ${compact ? 'progress-compact' : ''}`} role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={safeValue}><span style={{ width: `${safeValue}%` }} /></div>; }
export function Avatar({ size = 'md', src = '/assets/profile.jpg', alt = 'Your profile' }) { return <img className={`avatar avatar-${size}`} src={src || '/assets/profile.jpg'} alt={alt} />; }
export function Logo({ compact = false }) { return <div className="logo"><span className="logo-mark">S</span>{!compact && <span>Story<span>Verse</span></span>}</div>; }
export function SectionHeader({ eyebrow, title, action, onAction }) { return <div className="section-head"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<Title>{title}</Title></div>{action && <Button variant="ghost" onClick={onAction}>{action}<Icon name="arrow" /></Button>}</div>; }
