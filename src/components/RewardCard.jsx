export default function RewardCard({ reward, redeemed, disabled, onRedeem }) {
  const btnBg = redeemed ? '#C9BFAE' : disabled ? '#DDD6C4' : '#1F3624'
  const btnColor = redeemed ? '#5E4330' : disabled ? '#A79E8C' : '#FFFFFF'
  const btnLabel = redeemed ? 'Canjeado' : 'Canjear'

  return (
    <div className="card-white" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
      <div style={{ width: 36, height: 36, flexShrink: 0 }}>
        <img src="/images/cup.png" alt="Café SofIA" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
      </div>
      <div style={{ flex: '1 1 auto', minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#29392C' }}>{reward.name}</div>
        <div style={{ fontSize: 12, color: '#5E4330' }}>
          {redeemed ? `Canjeado · ${reward.cost} créditos` : `${reward.cost} créditos`}
        </div>
      </div>
      {onRedeem && (
        <button
          onClick={onRedeem}
          disabled={disabled}
          style={{ background: btnBg, color: btnColor, border: 'none', borderRadius: 999, padding: '9px 16px', fontSize: 12.5, fontWeight: 700, cursor: disabled ? 'default' : 'pointer' }}
        >
          {btnLabel}
        </button>
      )}
    </div>
  )
}
