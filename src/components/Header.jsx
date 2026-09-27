export default function Header({
  showBack,
  onBack,
  subtitle,
  showProfileIcon,
  onProfile,
  showCartIcon,
  onCart,
  cartCount,
}) {
  return (
    <div className="header">
      <div className="header-left">
        {showBack && (
          <button onClick={onBack} aria-label="Volver" className="icon-btn" style={{ margin: '0 -4px 0 -8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div>
          <div className="logo">
            <span style={{ color: 'var(--ink-primary)' }}>Sof</span>
            <span style={{ color: 'var(--caramelo)' }}>IA</span>
          </div>
          <div className="header-subtitle">{subtitle}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showProfileIcon && (
          <button onClick={onProfile} aria-label="Mi cuenta" className="icon-btn">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}
        {showCartIcon && (
          <button onClick={onCart} aria-label="Ver carrito" className="icon-btn" style={{ position: 'relative' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2, background: '#A76C35', color: '#FFFFFF',
                fontSize: 11, fontWeight: 700, minWidth: 16, height: 16, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
              }}>{cartCount}</span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
