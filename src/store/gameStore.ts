import { create } from 'zustand'
import type { Card, GameState, Player } from '../types/card'
import { politicians, shuffleDeck, dealHand } from '../data/politicians'
import { resolveBattle } from '../logic/battle'

const HAND_SIZE = 4
const TOTAL_ROUNDS = 4

function createPlayer(id: 'player' | 'cpu', name: string, hand: Card[]): Player {
  return { id, name, deck: [], hand, score: 0 }
}

// 🔥 Extensión del estado
interface ExtendedGameState extends GameState {
  selectedDeck: Card[]
}

interface GameActions {
  startGame: () => void
  selectCard: (card: Card) => void
  playRound: () => void
  resetGame: () => void

  // 🆕 nuevas acciones
  selectDeckCard: (card: Card) => void
  confirmDeck: () => void
}

export const useGameStore = create<ExtendedGameState & GameActions>((set, get) => ({
  phase: 'idle',
  player: createPlayer('player', 'Tú', []),
  cpu: createPlayer('cpu', 'CPU', []),
  currentRound: 1,
  totalRounds: TOTAL_ROUNDS,
  roundHistory: [],
  selectedCard: null,

  // 🆕 nuevo estado
  selectedDeck: [],

  // 🚀 ahora solo cambia de fase
  startGame: () => {
    set({ phase: 'deckSelection', selectedDeck: [] })
  },

  // 🆕 selección de cartas del usuario
  selectDeckCard: (card) => {
    const { selectedDeck } = get()

    const exists = selectedDeck.find(c => c.id === card.id)

    if (exists) {
      set({ selectedDeck: selectedDeck.filter(c => c.id !== card.id) })
    } else {
      if (selectedDeck.length >= HAND_SIZE) return
      set({ selectedDeck: [...selectedDeck, card] })
    }
  },

  // 🧠 confirmación del mazo (aquí capturas data)
  confirmDeck: () => {
    const { selectedDeck } = get()

    if (selectedDeck.length !== HAND_SIZE) return

    // 🔥 AQUÍ puedes enviar esto a tu backend
    console.log('Intención de voto:', selectedDeck.map(c => c.name))

    const cpuHand = dealHand(shuffleDeck(politicians), HAND_SIZE).hand

    set({
      phase: 'playing',
      player: createPlayer('player', 'Tú', selectedDeck),
      cpu: createPlayer('cpu', 'CPU', cpuHand),
      currentRound: 1,
      roundHistory: [],
      selectedCard: null,
    })
  },

  selectCard: (card) => {
    if (get().phase !== 'playing') return
    set({ selectedCard: card })
  },

  playRound: () => {
    const { selectedCard, cpu, player, currentRound, roundHistory } = get()
    if (!selectedCard) return

    const cpuCard = cpu.hand[Math.floor(Math.random() * cpu.hand.length)]
    const result = resolveBattle(selectedCard, cpuCard)

    const newPlayerScore = player.score + (result.winner === 'player' ? 1 : 0)
    const newCpuScore = cpu.score + (result.winner === 'cpu' ? 1 : 0)
    const newRound = currentRound + 1
    const isLastRound = currentRound >= TOTAL_ROUNDS

    set({
      phase: isLastRound ? 'gameover' : 'battle',
      player: {
        ...player,
        score: newPlayerScore,
        hand: player.hand.filter((c) => c.id !== selectedCard.id),
      },
      cpu: {
        ...cpu,
        score: newCpuScore,
        hand: cpu.hand.filter((c) => c.id !== cpuCard.id),
      },
      currentRound: newRound,
      roundHistory: [...roundHistory, result],
      selectedCard: null,
    })
  },

  resetGame: () => {
    set({
      phase: 'idle',
      roundHistory: [],
      selectedCard: null,
      currentRound: 1,
      selectedDeck: [],
    })
  },
}))