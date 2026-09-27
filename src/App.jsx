import { useState } from 'react'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import ProductCard from './components/ProductCard.jsx'
import RewardCard from './components/RewardCard.jsx'
import {
  PRODUCTS, LAST_ORDER, PICKUP_LABELS, IVA_RATE,
  CHALLENGES, CREDITS_PER_CORRECT, REWARDS_CATALOG, greeting,
} from './data.js'

const HEADER_SUBTITLES = {
  home: 'CAFÉ DE CÁPSULA · PARA LLEVAR',
  carta: 'CAFÉ DE CÁPSULA · PARA LLEVAR',
  carrito: 'TU PEDIDO',
  pago: 'PAGO SEGURO',
  confirmacion: 'PEDIDO CONFIRMADO',
  retiro: 'TU PEDIDO ESTÁ LISTO',
  desafios: 'DESAFÍOS DE IA',
  perfil: 'MI CUENTA',
  rewards: 'MIS RECOMPENSAS',
  quiensoy: '¿QUIÉN SOY?',
}

const BACK_TARGETS = {
  carrito: 'carta',
  pago: 'carrito',
  confirmacion: 'carta',
  retiro: 'confirmacion',
  desafios: 'retiro',
  perfil: 'carta',
  rewards: 'perfil',
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [cart, setCart] = useState([]) // [{id, qty}]
  const [qtyMap, setQtyMap] = useState({})
  const [pickupTime, setPickupTime] = useState('10 min')
  const [orderNumber, setOrderNumber] = useState(null)
  const [credits, setCredits] = useState(0)
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [challengeSelected, setChallengeSelected] = useState(null)
  const [rewardsTab, setRewardsTab] = useState('disponibles')
  const [redeemedIds, setRedeemedIds] = useState([])
  const [justRedeemed, setJustRedeemed] = useState(null)

  const goTo = (s) => setScreen(s)

  const incQty = (id) => setQtyMap((m) => ({ ...m, [id]: Math.min((m[id] || 1) + 1, 10) }))
  const decQty = (id) => setQtyMap((m) => ({ ...m, [id]: Math.max((m[id] || 1) - 1, 1) }))

  const addToCart = (id) => {
    const qty = qtyMap[id] || 1
    setCart((c) => {
      const existing = c.find((x) => x.id === id)
      return existing
        ? c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x))
        : [...c, { id, qty }]
    })
    setQtyMap((m) => ({ ...m, [id]: 1 }))
  }

  const removeFromCart = (id) => setCart((c) => c.filter((x) => x.id !== id))

  const repeatLastOrder = () => {
    setCart(LAST_ORDER.map((x) => ({ ...x })))
    goTo('carrito')
  }

  const confirmPayment = () => {
    const num = 'SF-' + Math.floor(1000 + Math.random() * 9000)
    setOrderNumber(num)
    goTo('confirmacion')
  }

  const resetOrder = () => {
    setCart([])
    setQtyMap({})
    setPickupTime('10 min')
    setOrderNumber(null)
    goTo('carta')
  }

  const selectChallengeOption = (optId) => setChallengeSelected(optId)

  const nextChallenge = () => {
    const challenge = CHALLENGES[challengeIndex]
    if (!challengeSelected) return
    const earned = challengeSelected === challenge.correct ? CREDITS_PER_CORRECT : 0
    setCredits((c) => c + earned)
    if (challengeIndex >= CHALLENGES.length - 1) {
      setChallengeIndex(0)
      setChallengeSelected(null)
      setRewardsTab('disponibles')
      goTo('rewards')
    } else {
      setChallengeIndex((i) => i + 1)
      setChallengeSelected(null)
    }
  }

  const redeemReward = (id, cost, name) => {
    if (credits < cost || redeemedIds.includes(id)) return
    setCredits((c) => c - cost)
    setRedeemedIds((ids) => [...ids, id])
    setJustRedeemed(name)
  }

  // --- derived values ---
  const cartItems = cart.map((c) => {
    const p = PRODUCTS.find((x) => x.id === c.id)
    return { ...p, qty: c.qty, subtotal: p.price * c.qty }
  })
  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0)
  const cartSubtotal = cartItems.reduce((s, c) => s + c.subtotal, 0)
  const cartIva = Math.round(cartSubtotal * IVA_RATE)
  const cartTotal = cartSubtotal + cartIva
  const hasCartItems = cartCount > 0

  const showBack = Object.prototype.hasOwnProperty.call(BACK_TARGETS, screen)
  const backAction = () => goTo(BACK_TARGETS[screen] || 'home')
  const showProfileIcon = screen === 'home' || screen === 'carta'
  const showCartIcon = screen === 'carta' || screen === 'carrito'
  const showCartBar = screen === 'carta' && hasCartItems

  const currentChallenge = CHALLENGES[challengeIndex]
  const isLastChallenge = challengeIndex >= CHALLENGES.length - 1

  const redeemedItems = REWARDS_CATALOG.filter((r) => redeemedIds.includes(r.id))

  return (
    <div className="phone">
      {/* decorative coffee-bean background */}
      <svg width="390" height="844" viewBox="0 0 390 844" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <path id="coffee-bean" d="M100 15 C145 15 175 55 172 110 C170 165 145 215 100 222 C58 215 28 165 30 108 C32 52 60 15 100 15 Z" />
          <path id="coffee-bean-crease" d="M100 30 C90 70 110 100 95 140 C82 175 105 195 100 215" fill="none" />
        </defs>
        <g transform="translate(-25,-20) rotate(-12) scale(0.52)" opacity="0.14">
          <use href="#coffee-bean" fill="#5C3A21" /><use href="#coffee-bean-crease" stroke="#2E1D10" strokeWidth="5" />
        </g>
        <g transform="translate(345,-10) rotate(20) scale(0.48)" opacity="0.14">
          <use href="#coffee-bean" fill="#7A4B25" /><use href="#coffee-bean-crease" stroke="#3E2A18" strokeWidth="5" />
        </g>
        <g transform="translate(-30,430) rotate(95) scale(0.5)" opacity="0.15">
          <use href="#coffee-bean" fill="#A76C35" /><use href="#coffee-bean-crease" stroke="#5C3A21" strokeWidth="5" />
        </g>
        <g transform="translate(280,760) rotate(150) scale(0.55)" opacity="0.15">
          <use href="#coffee-bean" fill="#3E2A18" /><use href="#coffee-bean-crease" stroke="#1D1109" strokeWidth="5" />
        </g>
      </svg>

      <div className="phone-content">
        <Header
          showBack={showBack}
          onBack={backAction}
          subtitle={HEADER_SUBTITLES[screen] || ''}
          showProfileIcon={showProfileIcon}
          onProfile={() => goTo('perfil')}
          showCartIcon={showCartIcon}
          onCart={() => goTo('carrito')}
          cartCount={cartCount}
        />

        <div className="main-scroll">
          {screen === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#29392C', lineHeight: 1.2 }}>{greeting()}</div>
                <div style={{ fontSize: 12.5, color: '#5E4330', marginTop: 4 }}>Bienvenido a Café SofIA Costa Rica</div>
              </div>

              <div style={{ width: '100%', height: 240, borderRadius: 20, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
                <img src="/images/barista.png" alt="SofIA, tu barista, saludando con una taza de café" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#29392C', lineHeight: 1.35, textAlign: 'center' }}>
                "Disfruta de un café gratis mientras aprendes de IA"
              </div>

              <div style={{ fontSize: 13, color: '#5E4330', textAlign: 'center', lineHeight: 1.5 }}>
                Creá tu cuenta para obtener beneficios exclusivos de SofIA Rewards.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="card-white">
                  <div style={{ fontSize: 11, color: '#5E4330', fontWeight: 600, marginBottom: 4 }}>Nombre</div>
                  <input type="text" placeholder="Tu nombre" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13.5, color: '#29392C', padding: 0 }} />
                </div>
                <div className="card-white">
                  <div style={{ fontSize: 11, color: '#5E4330', fontWeight: 600, marginBottom: 4 }}>Email</div>
                  <input type="email" placeholder="tucorreo@ejemplo.com" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13.5, color: '#29392C', padding: 0 }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '2px 2px 0 2px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginTop: 2, width: 15, height: 15, flexShrink: 0, accentColor: '#1F3624' }} />
                  <span style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.4 }}>Acepto los Términos y Condiciones</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '0 2px', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginTop: 2, width: 15, height: 15, flexShrink: 0, accentColor: '#1F3624' }} />
                  <span style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.4 }}>Quiero recibir el Newsletter de SofIA Costa Rica</span>
                </label>
              </div>

              <button className="btn-primary" onClick={() => goTo('perfil')}>CREAR MI CUENTA</button>
              <button className="btn-link" onClick={() => goTo('carta')}>Explorar el menú</button>
            </div>
          )}

          {screen === 'carta' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4536' }}>
                Elegí tus cápsulas, pagá desde el celular y retirá tu café ya listo en el local. Sin filas, sin vueltas.
              </div>
              <button onClick={repeatLastOrder} className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                Repetir mi último pedido
              </button>
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  qty={qtyMap[p.id] || 1}
                  onInc={() => incQty(p.id)}
                  onDec={() => decQty(p.id)}
                  onAdd={() => addToCart(p.id)}
                />
              ))}
            </div>
          )}

          {screen === 'carrito' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cartItems.length === 0 && (
                <div style={{ textAlign: 'center', color: '#4A4536', fontSize: 14, padding: '60px 10px', lineHeight: 1.6 }}>
                  Tu carrito está vacío.<br />Volvé a la carta para agregar tus cápsulas.
                </div>
              )}
              {cartItems.map((c) => (
                <div key={c.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px' }}>
                  <div style={{ width: 38, height: 38, flexShrink: 0 }}>
                    <img src="/images/cup.png" alt="Café SofIA" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <div style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#DDD6C4' }}>₡{c.price} c/u</div>
                    <div className="qty-pill" style={{ padding: '3px 8px', width: 'fit-content' }}>
                      <button onClick={() => decQty(c.id)} aria-label="Restar una unidad" style={{ fontSize: 14, width: 14 }}>−</button>
                      <span style={{ minWidth: 12, textAlign: 'center', fontSize: 12.5, color: '#FFFFFF' }}>{c.qty}</span>
                      <button onClick={() => incQty(c.id)} aria-label="Sumar una unidad" style={{ fontSize: 14, width: 14 }}>+</button>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--price-color)', whiteSpace: 'nowrap' }}>₡{c.subtotal}</div>
                  <button onClick={() => removeFromCart(c.id)} aria-label={`Quitar ${c.name} del carrito`} style={{ background: 'none', border: 'none', color: '#DDD6C4', cursor: 'pointer', padding: 6, display: 'flex' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    </svg>
                  </button>
                </div>
              ))}
              {hasCartItems && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 12, borderTop: '1px solid #5E4330' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#4A4536' }}>Subtotal</span>
                      <span style={{ fontSize: 13, color: '#29392C' }}>₡{cartSubtotal}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: '#4A4536' }}>IVA (13%)</span>
                      <span style={{ fontSize: 13, color: '#29392C' }}>₡{cartIva}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#4A4536' }}>Total</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--price-color)' }}>₡{cartTotal}</span>
                    </div>
                  </div>
                  <button className="btn-accent" style={{ color: '#DDD6C4' }} onClick={() => goTo('pago')}>Proceder al pago</button>
                  <button className="btn-link" style={{ padding: 2 }} onClick={() => goTo('carta')}>Seguir comprando</button>
                </>
              )}
            </div>
          )}

          {screen === 'pago' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div style={{ fontSize: 13, color: '#4A4536', marginBottom: 10, fontWeight: 600 }}>Método de pago</div>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #1F3624', background: '#A76C35', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#DDD6C4' }}>SINPE Móvil</span>
                </div>
              </div>

              <div className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 12.5, color: '#5E4330', lineHeight: 1.5 }}>Realizá el pago desde tu app bancaria utilizando SINPE Móvil.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.4 }}>① Escaneá el código o ingresá el número.</div>
                  <div style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.4 }}>② Realizá el pago por el monto total.</div>
                  <div style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.4 }}>③ Confirmá tu pago en la siguiente pantalla.</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#DDD6C4', borderRadius: 10, padding: '10px 14px', marginTop: 4 }}>
                  <div>
                    <div style={{ fontSize: 10.5, color: '#5E4330' }}>Número SINPE Móvil</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#29392C' }}>8888-8888</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#5E4330', fontWeight: 600 }}>Copiar</span>
                </div>
              </div>

              <div className="card">
                <div style={{ fontSize: 13, color: '#DDD6C4', marginBottom: 8 }}>Resumen del pedido</div>
                {cartItems.map((c) => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#FFFFFF', padding: '4px 0' }}>
                    <span>{c.qty} × {c.name}</span>
                    <span>₡{c.subtotal}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#DDD6C4', padding: '4px 0' }}>
                  <span>Subtotal</span><span>₡{cartSubtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#DDD6C4', padding: '4px 0' }}>
                  <span>IVA (13%)</span><span>₡{cartIva}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, paddingTop: 8, marginTop: 6, borderTop: '1px solid #5E4330' }}>
                  <span style={{ color: '#FFFFFF' }}>Total</span><span style={{ color: 'var(--price-color)' }}>₡{cartTotal}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 13, color: '#4A4536', marginBottom: 10 }}>¿Cuándo lo retirás?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {PICKUP_LABELS.map((label) => {
                    const selected = pickupTime === label
                    return (
                      <button
                        key={label}
                        onClick={() => setPickupTime(label)}
                        style={{
                          flex: '1 1 0', padding: '11px 0', borderRadius: 999, border: '1px solid #6b451f',
                          background: selected ? '#A76C35' : 'transparent', color: selected ? '#14111A' : '#6b451f',
                          fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 12, color: '#29392C', lineHeight: 1.4 }}>
                  Este es un prototipo académico: no se procesa un pago real por SINPE Móvil. Al confirmar, se simula la confirmación de tu pedido.
                </div>
              </div>

              <button className="btn-accent" style={{ color: '#DDD6C4' }} onClick={confirmPayment}>Confirmar pago realizado</button>
            </div>
          )}

          {screen === 'confirmacion' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '24px 4px' }}>
              <div style={{ width: 68, height: 68, borderRadius: '50%', background: '#A76C35', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#14111A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="font-display" style={{ fontSize: 21, fontWeight: 700, color: '#29392C' }}>¡Pedido confirmado!</div>
              <div style={{ fontSize: 13.5, color: '#4A4536', lineHeight: 1.5 }}>Retiralo en el local cuando esté listo.</div>
              <div className="card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: '#DDD6C4' }}>No. de pedido</span><span style={{ color: '#DDD6C4', fontWeight: 700 }}>{orderNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: '#DDD6C4' }}>Retiro</span><span style={{ color: '#FFFFFF', fontWeight: 600 }}>{pickupTime}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span style={{ color: '#DDD6C4' }}>Total pagado</span><span style={{ color: 'var(--price-color)', fontWeight: 600 }}>₡{cartTotal}</span></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', marginTop: 6 }}>
                <button className="btn-primary" onClick={() => goTo('retiro')}>Ver mi pedido</button>
                <button className="btn-outline" onClick={resetOrder}>Volver al menú</button>
              </div>
            </div>
          )}

          {screen === 'retiro' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14, padding: '20px 4px' }}>
              <div style={{ width: 104, height: 104, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src="/images/cup.png" alt="Vaso de Café SofIA" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#29392C' }}>¡Tu café ya está listo!</div>
              <div style={{ fontSize: 13.5, color: '#5E4330', lineHeight: 1.5 }}>Podés retirarlo en el local de Café SofIA CR.</div>

              <div className="card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, width: '100%', textAlign: 'left' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#DDD6C4', fontWeight: 700 }}>DIRECCIÓN</div>
                  <div style={{ fontSize: 13, color: '#DDD6C4', marginTop: 2 }}>Campus ADEN, Costa Rica</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#DDD6C4', fontWeight: 700 }}>HORARIO DE RETIRO</div>
                  <div style={{ fontSize: 13, color: '#DDD6C4', marginTop: 2 }}>Lun – Vie · 8:00 am – 5:00 pm</div>
                </div>
              </div>

              <button className="btn-primary" style={{ padding: '13px 28px', marginTop: 4 }} onClick={() => goTo('confirmacion')}>Ver mi pedido</button>

              <div className="card-white" style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', marginTop: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#29392C' }}>Mientras esperás, ganá créditos</div>
                <div style={{ fontSize: 12, color: '#5E4330', lineHeight: 1.5 }}>Respondé los 5 desafíos de SofIA sobre IA agéntica y sumá créditos para canjear por café.</div>
                <button className="btn-accent" style={{ marginTop: 4, padding: 11 }} onClick={() => goTo('desafios')}>Responder desafíos</button>
              </div>
            </div>
          )}

          {screen === 'desafios' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ flex: '1 1 auto', height: 6, background: '#C9BFAE', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.round(((challengeIndex + 1) / CHALLENGES.length) * 100)}%`, background: '#1F3624', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, color: '#5E4330', fontWeight: 600, whiteSpace: 'nowrap' }}>{challengeIndex + 1} / {CHALLENGES.length}</span>
              </div>

              <div className="card-white" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#7A846B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#29392C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.5 2A4.5 4.5 0 0 0 5 6.5v.5a3 3 0 0 0-1 5.6V15a3 3 0 0 0 3 3h.5" /><path d="M14.5 2A4.5 4.5 0 0 1 19 6.5v.5a3 3 0 0 1 1 5.6V15a3 3 0 0 1-3 3h-.5" /><path d="M9.5 21V7.5A2.5 2.5 0 0 1 12 5a2.5 2.5 0 0 1 2.5 2.5V21" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#5E4330', fontWeight: 700 }}>{currentChallenge.title}</div>
                    <div className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#29392C' }}>{currentChallenge.subtitle}</div>
                  </div>
                </div>

                <div style={{ fontSize: 14, color: '#29392C', fontWeight: 600, lineHeight: 1.4 }}>{currentChallenge.question}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {currentChallenge.options.map((opt) => {
                    const selected = challengeSelected === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => selectChallengeOption(opt.id)}
                        style={{
                          textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                          background: selected ? '#DDD6C4' : '#FFFFFF', border: `1px solid ${selected ? '#1F3624' : '#C9BFAE'}`,
                          borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
                        }}
                      >
                        <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${selected ? '#1F3624' : '#C9BFAE'}`, background: selected ? '#1F3624' : 'transparent', flexShrink: 0, display: 'inline-block' }} />
                        <span style={{ fontSize: 12.5, color: '#29392C', lineHeight: 1.4 }}>{opt.text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                className="btn-accent"
                style={{ color: '#DDD6C4', opacity: challengeSelected ? 1 : 0.5 }}
                disabled={!challengeSelected}
                onClick={nextChallenge}
              >
                {isLastChallenge ? 'Finalizar' : 'Siguiente'} →
              </button>
            </div>
          )}

          {screen === 'perfil' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1F3624', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="font-display" style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700 }}>TL</span>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#29392C' }}>Tamara López</div>
                  <div style={{ fontSize: 12.5, color: '#5E4330' }}>tamara@email.com</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: 14, boxShadow: 'inset 0 0 0 1px #C9BFAE', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #DDD6C4' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v13H7l-4 4V3Z" /></svg>
                  <span style={{ flex: '1 1 auto', fontSize: 13.5, color: '#29392C' }}>Mis pedidos</span>
                </div>
                <button onClick={() => goTo('rewards')} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #DDD6C4' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6 6.5 1-4.7 4.6L18 20l-6-3.2L6 20l1.2-6.4L2.5 9l6.5-1 3-6Z" /></svg>
                  <span style={{ flex: '1 1 auto', textAlign: 'left', fontSize: 13.5, color: '#29392C' }}>Mis recompensas</span>
                  <span style={{ fontSize: 11, color: '#A76C35', fontWeight: 700 }}>{credits} pts ›</span>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid #DDD6C4' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></svg>
                  <span style={{ flex: '1 1 auto', fontSize: 13.5, color: '#29392C' }}>Mis datos</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4330" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                  <span style={{ flex: '1 1 auto', fontSize: 13.5, color: '#29392C' }}>Métodos de pago</span>
                </div>
              </div>
            </div>
          )}

          {screen === 'rewards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#29392C', borderRadius: 16, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 11, color: '#DDD6C4', opacity: 0.85 }}>Mis créditos</div>
                  <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#FFFFFF' }}>{credits}</div>
                </div>
                <span style={{ fontSize: 11.5, color: '#DDD6C4', fontWeight: 600 }}>Ver historial ›</span>
              </div>

              {justRedeemed && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1F3624', borderRadius: 14, padding: '12px 14px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DDD6C4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span style={{ flex: '1 1 auto', fontSize: 12.5, color: '#DDD6C4', lineHeight: 1.4 }}>¡Listo! Ya tenés tu {justRedeemed}.</span>
                  <button onClick={() => setJustRedeemed(null)} aria-label="Cerrar" style={{ background: 'none', border: 'none', color: '#DDD6C4', cursor: 'pointer', padding: 2, display: 'flex', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', gap: 18, borderBottom: '1px solid #C9BFAE' }}>
                <button
                  onClick={() => setRewardsTab('disponibles')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px 10px 2px', fontSize: 13, fontWeight: 700, color: rewardsTab === 'disponibles' ? '#1F3624' : '#A79E8C', borderBottom: `2px solid ${rewardsTab === 'disponibles' ? '#1F3624' : 'transparent'}` }}
                >
                  Recompensas disponibles
                </button>
                <button
                  onClick={() => setRewardsTab('canjes')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px 10px 2px', fontSize: 13, fontWeight: 700, color: rewardsTab === 'canjes' ? '#1F3624' : '#A79E8C', borderBottom: `2px solid ${rewardsTab === 'canjes' ? '#1F3624' : 'transparent'}` }}
                >
                  Mis canjes
                </button>
              </div>

              {rewardsTab === 'disponibles' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {REWARDS_CATALOG.map((r) => {
                    const redeemed = redeemedIds.includes(r.id)
                    const canAfford = credits >= r.cost
                    return (
                      <RewardCard
                        key={r.id}
                        reward={r}
                        redeemed={redeemed}
                        disabled={redeemed || !canAfford}
                        onRedeem={() => redeemReward(r.id, r.cost, r.name)}
                      />
                    )
                  })}
                </div>
              )}

              {rewardsTab === 'canjes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {redeemedItems.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#4A4536', fontSize: 13.5, padding: '40px 10px', lineHeight: 1.6 }}>
                      Todavía no canjeaste ninguna recompensa.
                    </div>
                  )}
                  {redeemedItems.map((r) => (
                    <RewardCard key={r.id} reward={r} redeemed />
                  ))}
                </div>
              )}
            </div>
          )}

          {screen === 'quiensoy' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="font-display" style={{ fontSize: 19, fontWeight: 700, color: '#29392C' }}>¡Hola, soy SofIA!</div>
              <div style={{ fontSize: 13.5, color: '#5E4330', lineHeight: 1.6 }}>
                Soy la inteligencia artificial agéntica de este café. No soy un chatbot que solo responde preguntas: tomo decisiones y ejecuto acciones dentro de la app para que tu pedido fluya sin filas ni vueltas, desde que elegís tu café hasta que lo retirás.
              </div>
              <div style={{ fontSize: 13.5, color: '#5E4330', lineHeight: 1.6 }}>
                Mientras disfrutás tu café, también te acompaño a aprender sobre IA agéntica: respondé mis 5 desafíos y ganá créditos para canjear por más café.
              </div>
              <button className="btn-accent" style={{ padding: 13 }} onClick={() => goTo('desafios')}>Responder desafíos</button>
              <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#29392C' }}>Proyecto MVP · ADEN Business School</div>
                <div style={{ fontSize: 12.5, color: '#29392C', lineHeight: 1.5 }}>
                  Café SofIA es un prototipo desarrollado como parte de un proyecto universitario que explora cómo la IA agéntica puede mejorar experiencias reales de servicio, como pedir un café sin filas ni vueltas.
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: '#5E4330', lineHeight: 1.6 }}>
                Este es un MVP: algunas funciones (como el pago real o el registro de cuentas) todavía están en desarrollo.
              </div>
            </div>
          )}
        </div>

        {showCartBar && (
          <button onClick={() => goTo('carrito')} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#A76C35', color: '#DDD6C4', border: 'none', padding: '15px 20px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', margin: 0 }}>
            <span>{cartCount} ítem(s) · ₡{cartTotal}</span>
            <span>Ver carrito ›</span>
          </button>
        )}

        <BottomNav
          screen={screen}
          onHome={() => goTo('home')}
          onMenu={() => goTo('carta')}
          onQuienSoy={() => goTo('quiensoy')}
        />
      </div>
    </div>
  )
}
