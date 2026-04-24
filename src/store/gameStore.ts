import { create } from 'zustand'
import type { Card, GameState, Player } from '../types/card'
import { politicians, shuffleDeck, dealHand } from '../data/politicians'
import { resolveBattle } from '../logic/battle'

const HAND_SIZE = 4
const TOTAL_ROUNDS = 4

function createPlayer(id: 'player' | 'cpu', name: string, hand: Card[]): Player {
  return { id, name, deck: [], hand, score: 0 }
}

interface GameActions {
  startGame: () => void
  selectCard: (card: Card) => void
  playRound: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  phase: 'idle',
  player: createPlayer('player', 'Tú', []),
  cpu: createPlayer('cpu', 'CPU', []),
  currentRound: 1,
  totalRounds: TOTAL_ROUNDS,
  roundHistory: [],
  selectedCard: null,

  startGame: () => {
    const deck = shuffleDeck(politicians)
    const { hand: playerHand, remaining } = dealHand(deck, HAND_SIZE)
    const { hand: cpuHand } = dealHand(shuffleDeck(politicians), HAND_SIZE)

    set({
      phase: 'playing',
      player: createPlayer('player', 'Tú', playerHand),
      cpu: createPlayer('cpu', 'CPU', cpuHand),
      currentRound: 1,
      roundHistory: [],
      selectedCard: null,
    })
    void remaining
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
    set({ phase: 'idle', roundHistory: [], selectedCard: null, currentRound: 1 })
  },
}))
