const ACTIVE = '#1F3624'
const INACTIVE = '#A79E8C'

export default function BottomNav({ screen, onHome, onMenu, onQuienSoy }) {
  return (
    <div className="bottom-nav">
      <button onClick={onHome} style={{ color: screen === 'home' ? ACTIVE : INACTIVE }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" />
        </svg>
        <span>INICIO</span>
      </button>
      <button onClick={onMenu} style={{ color: screen === 'carta' ? ACTIVE : INACTIVE }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z" /><path d="M16 9h2a2 2 0 0 1 0 4h-2" /><path d="M6 2v2M10 2v2M14 2v2" />
        </svg>
        <span>MENÚ</span>
      </button>
      <button onClick={onQuienSoy} style={{ color: screen === 'quiensoy' ? ACTIVE : INACTIVE }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5" /><path d="M12 17h.01" />
        </svg>
        <span>¿QUIÉN SOY?</span>
      </button>
    </div>
  )
}
