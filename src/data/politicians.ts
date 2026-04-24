import type { Card } from '../types/card'

export const politicians: Card[] = [
  {
    id: 'petro',
    name: 'Gustavo Petro',
    party: 'Pacto Histórico',
    type: 'izquierda',
    image: '/images/petro.jpg',
    stats: { popularidad: 80, propuestas: 85, experiencia: 75, escandalos: 30 },
  },
  {
    id: 'fico',
    name: 'Federico Gutiérrez',
    party: 'Equipo por Colombia',
    type: 'derecha',
    image: '/images/FedericoGuitierrez.jpeg',
    stats: { popularidad: 72, propuestas: 68, experiencia: 80, escandalos: 15 },
  },
  {
    id: 'fajardo',
    name: 'Sergio Fajardo',
    party: 'Independiente',
    type: 'centro',
    image: '/images/SergioFajardo.png',
    stats: { popularidad: 65, propuestas: 78, experiencia: 85, escandalos: 10 },
  },
  {
    id: 'galان',
    name: 'Carlos Fernando Galán',
    party: 'Nuevo Liberalismo',
    type: 'centro',
    image: '/images/alcalde-carlos-galan.jpeg.jpg',
    stats: { popularidad: 70, propuestas: 72, experiencia: 70, escandalos: 8 },
  },
  {
    id: 'bolivar',
    name: 'Gustavo Bolívar',
    party: 'Colombia Humana',
    type: 'izquierda',
    image: '/images/Gustavo_Bolívar.jpg',
    stats: { popularidad: 60, propuestas: 65, experiencia: 55, escandalos: 20 },
  },
  {
    id: 'vargas',
    name: 'Germán Vargas Lleras',
    party: 'Cambio Radical',
    type: 'derecha',
    image: '/images/GermanVargas.jpg',
    stats: { popularidad: 58, propuestas: 62, experiencia: 88, escandalos: 35 },
  },
  {
    id: 'cabal',
    name: 'María Fernanda Cabal',
    party: 'Centro Democrático',
    type: 'derecha',
    image: '/images/MariaFdaCabal.jpg',
    stats: { popularidad: 62, propuestas: 70, experiencia: 72, escandalos: 22 },
  },
  {
    id: 'colombia',
    name: 'Francia Márquez',
    party: 'Pacto Histórico',
    type: 'izquierda',
    image: '/images/FranciaMarquez.jpg',
    stats: { popularidad: 68, propuestas: 74, experiencia: 50, escandalos: 12 },
  },
]

export function shuffleDeck(cards: Card[]): Card[] {
  return [...cards].sort(() => Math.random() - 0.5)
}

export function dealHand(deck: Card[], size: number): { hand: Card[]; remaining: Card[] } {
  return { hand: deck.slice(0, size), remaining: deck.slice(size) }
}
