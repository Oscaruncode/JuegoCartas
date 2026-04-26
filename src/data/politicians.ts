import type { Card } from '../types/card'


export const politicians: Card[] = [
  {
    id: 'ivan-cepeda',
    name: 'Iván Cepeda',
    party: 'Pacto Histórico',
    type: 'izquierda',
    image: '/images/ivan_cepeda.png',
    stats: { 
      // popularidad: 85,
       propuestas: 78, experiencia: 82, escandalos: 15 },
  },
  {
    id: 'abelardo-espriella',
    name: 'Abelardo de la Espriella',
    party: 'Independiente (Derecha)',
    type: 'derecha',
    image: '/images/abelardo.png',
    stats: { //popularidad: 80, 
      propuestas: 62, experiencia: 45, escandalos: 48 },
  },
  {
    id: 'paloma-valencia',
    name: 'Paloma Valencia',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/paloma_valencia.png',
    stats: { //popularidad: 78,
      propuestas: 75, experiencia: 80, escandalos: 22 },
  },
  {
    id: 'claudia-lopez',
    name: 'Claudia López',
    party: 'Alianza Verde',
    type: 'centro',
    image: '/images/claudia_lopez.png',
    stats: { //popularidad: 72,
      propuestas: 82, experiencia: 88, escandalos: 20 },
  },
  {
    id: 'sergio-fajardo',
    name: 'Sergio Fajardo',
    party: 'Dignidad y Compromiso',
    type: 'centro',
    image: '/images/sergio_fajardo.png',
    stats: { //popularidad: 68,
      propuestas: 85, experiencia: 92, escandalos: 12 },
  },
  {
    id: 'luis-g-murillo',
    name: 'Luis Gilberto Murillo',
    party: 'Colombia Renaciente',
    type: 'centro',
    image: '/images/luis_murillo.png',
    stats: { //popularidad: 65,
      propuestas: 80, experiencia: 90, escandalos: 8 },
  },
  {
    id: 'miguel-uribe',
    name: 'Miguel Uribe Londoño',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/miguel_uribe.png',
    stats: { //popularidad: 60,
      propuestas: 74, experiencia: 70, escandalos: 18 },
  },
  {
    id: 'roy-barreras',
    name: 'Roy Barreras',
    party: 'La Fuerza de la Paz',
    type: 'centro',
    image: '/images/roy_barrera.png',
    stats: { //popularidad: 58,
      propuestas: 88, experiencia: 95, escandalos: 35 },
  },
  {
    id: 'carlos-caicedo',
    name: 'Carlos Caicedo',
    party: 'Fuerza Ciudadana',
    type: 'izquierda',
    image: '/images/carlos_caicedo.png',
    stats: { //popularidad: 55,
      propuestas: 72, experiencia: 78, escandalos: 25 },
  },
  {
    id: 'clara-lopez',
    name: 'Clara López',
    party: 'Todos Somos Colombia',
    type: 'izquierda',
    image: '/images/clara_lopez.png',
    stats: { //popularidad: 52,
      propuestas: 84, experiencia: 94, escandalos: 14 },
  },
  {
    id: 'gustavo-matamoros',
    name: 'Gustavo Matamoros',
    party: 'Independiente (Militar r.)',
    type: 'derecha',
    image: '/images/gustavo_matamoros.png',
    stats: { //popularidad: 45,
      propuestas: 65, experiencia: 60, escandalos: 5 },
  },
  {
    id: 'santiago-botero',
    name: 'Santiago Botero',
    party: 'Independiente',
    type: 'derecha',
    image: '/images/santiago_botero.png',
    stats: { //popularidad: 42,
      propuestas: 58, experiencia: 40, escandalos: 10 },
  },
  {
    id: 'sondra-mccollins',
    name: 'Sondra Macollins',
    party: 'Independiente',
    type: 'centro',
    image: '/imagenes/sandra_macollins.png',
    stats: { //popularidad: 40,
      propuestas: 68, experiencia: 50, escandalos: 12 },
  },
]

export function shuffleDeck(cards: Card[]): Card[] {
  return [...cards].sort(() => Math.random() - 0.5)
}

export function dealHand(deck: Card[], size: number): { hand: Card[]; remaining: Card[] } {
  return { hand: deck.slice(0, size), remaining: deck.slice(size) }
}
