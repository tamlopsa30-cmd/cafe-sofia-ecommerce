export const PRODUCTS = [
  { id: 'espresso', name: 'Cápsula Espresso', desc: 'Intenso y directo, ideal para arrancar el día.', price: 1350 },
  { id: 'capuchino', name: 'Cápsula Capuchino', desc: 'Cremoso y suave, con un toque de leche.', price: 1500 },
  { id: 'latte', name: 'Cápsula Latte', desc: 'Café suave con mucha leche, para llevar tranquilo.', price: 1550 },
  { id: 'vainilla', name: 'Cápsula Vainilla', desc: 'Dulce y aromático, un capricho distinto.', price: 1600 },
]

export const LAST_ORDER = [
  { id: 'espresso', qty: 2 },
  { id: 'latte', qty: 1 },
]

export const PICKUP_LABELS = ['10 min', '20 min', '30 min']

export const IVA_RATE = 0.13

export const CHALLENGES = [
  {
    title: 'Desafío 1',
    subtitle: 'Conoce a SofIA',
    question: '¿Qué es SofIA en este café?',
    options: [
      { id: 'a', text: 'Una IA que solo responde preguntas sobre café.' },
      { id: 'b', text: 'Una IA agéntica que te ayuda a vivir una experiencia de café mientras aprendes de IA.' },
      { id: 'c', text: 'Una persona que atiende el mostrador en el local.' },
    ],
    correct: 'b',
  },
  {
    title: 'Desafío 2',
    subtitle: 'IA agéntica',
    question: '¿Qué significa que una IA sea "agéntica"?',
    options: [
      { id: 'a', text: 'Que puede tomar decisiones y ejecutar acciones por sí misma.' },
      { id: 'b', text: 'Que solo genera texto sin actuar.' },
      { id: 'c', text: 'Que necesita que un humano apruebe cada respuesta antes de mostrarla.' },
    ],
    correct: 'a',
  },
  {
    title: 'Desafío 3',
    subtitle: 'El proyecto',
    question: '¿Dónde nace este proyecto de Café SofIA?',
    options: [
      { id: 'a', text: 'Como una cadena internacional de café.' },
      { id: 'b', text: 'Como un MVP universitario de ADEN Business School.' },
      { id: 'c', text: 'Como una app creada por el gobierno de Costa Rica.' },
    ],
    correct: 'b',
  },
  {
    title: 'Desafío 4',
    subtitle: 'Explorar sin cuenta',
    question: '¿Qué podés hacer sin necesidad de crear una cuenta en la app?',
    options: [
      { id: 'a', text: 'Nada, hay que registrarse primero.' },
      { id: 'b', text: 'Explorar el menú y ver los productos.' },
      { id: 'c', text: 'Solo ver el precio de un producto, no el menú completo.' },
    ],
    correct: 'b',
  },
  {
    title: 'Desafío 5',
    subtitle: 'SofIA Rewards',
    question: '¿Para qué sirven los créditos de SofIA Rewards?',
    options: [
      { id: 'a', text: 'Para canjearlos por café en la sección de recompensas.' },
      { id: 'b', text: 'No sirven para nada todavía.' },
      { id: 'c', text: 'Para pagar el costo total de tu pedido en la app.' },
    ],
    correct: 'a',
  },
]

export const CREDITS_PER_CORRECT = 30

export const REWARDS_CATALOG = [
  { id: 'espresso', name: 'Café Espresso', cost: 10 },
  { id: 'capuchino', name: 'Café Capuchino', cost: 15 },
  { id: 'latte', name: 'Café Latte', cost: 35 },
  { id: 'vainilla', name: 'Café Vainilla', cost: 40 },
]

export function greeting() {
  const h = new Date().getHours()
  if (h < 12) return '¡Buenos días!'
  if (h < 19) return '¡Buenas tardes!'
  return '¡Buenas noches!'
}
