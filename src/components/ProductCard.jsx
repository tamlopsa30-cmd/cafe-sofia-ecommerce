export default function ProductCard({ product, qty, onInc, onDec, onAdd }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 14 }}>
      <div style={{ width: 60, height: 60, flexShrink: 0 }}>
        <img src="/images/cup.png" alt="Café SofIA" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <div className="font-display" style={{ fontSize: 15.5, fontWeight: 700, color: '#FFFFFF' }}>{product.name}</div>
        <div style={{ fontSize: 12, color: '#DDD6C4', lineHeight: 1.4 }}>{product.desc}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--price-color)', marginTop: 2 }}>
          ₡{product.price} <span style={{ fontSize: 10, fontWeight: 400, color: '#DDD6C4', opacity: 0.75 }}>(provisional)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 4 }}>
          <div className="qty-pill">
            <button onClick={onDec} aria-label="Restar una unidad">−</button>
            <span style={{ minWidth: 14, textAlign: 'center', fontSize: 13, color: '#FFFFFF' }}>{qty}</span>
            <button onClick={onInc} aria-label="Sumar una unidad">+</button>
          </div>
          <button onClick={onAdd} style={{ background: 'var(--caramelo)', color: 'var(--bg)', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
