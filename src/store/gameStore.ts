import { create } from 'zustand'
import type { Card, GameState, Player } from '../types/card'
import { politicians, shuffleDeck, dealHand } from '../data/politicians'
import { resolveBattle } from '../logic/battle'

const HAND_SIZE = 4
const TOTAL_ROUNDS = 4

// 🔥 URL dinámica (local + prod)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function createPlayer(id: 'player' | 'cpu', name: string, hand: Card[]): Player {
  return { id, name, deck: [], hand, score: 0 }
}

// 🔥 Extensión del estado
interface ExtendedGameState extends GameState {
  selectedDeck: Card[]
  popularity: { candidateId: string; totalVotes: number }[]
}

interface GameActions {
  startGame: () => void
  selectCard: (card: Card) => void
  playRound: () => void
  resetGame: () => void

  selectDeckCard: (card: Card) => void
  confirmDeck: () => Promise<void>

  fetchPopularity: () => Promise<void>
}

export const useGameStore = create<ExtendedGameState & GameActions>((set, get) => ({
  phase: 'idle',
  player: createPlayer('player', 'Tú', []),
  cpu: createPlayer('cpu', 'CPU', []),
  currentRound: 1,
  totalRounds: TOTAL_ROUNDS,
  roundHistory: [],
  selectedCard: null,

  selectedDeck: [],
  popularity: [],

  startGame: () => {
    set({ phase: 'deckSelection', selectedDeck: [] })
  },

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

  confirmDeck: async () => {
    const { selectedDeck } = get()

    if (selectedDeck.length !== HAND_SIZE) return

    try {
      await fetch(`${API_URL}/api/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateIds: selectedDeck.map(c => c.id),
        }),
      })

      // 🔥 refresca ranking después de votar
      await get().fetchPopularity()

    } catch (err) {
      console.error('Error guardando votos', err)
    }

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

fetchPopularity: async () => {
  try {
    const res = await fetch(`${API_URL}/api/votes/popularity`)
    const data = await res.json()

    const normalized = data.map((p: any) => ({
      candidateId: p.candidate_id, // 👈 FIX CLAVE
      totalVotes: Number(p.totalVotes), // 👈 FIX CLAVE (string → number)
    }))

    set({ popularity: normalized })
  } catch (err) {
    console.error('Error cargando popularidad', err)
  }
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
      popularity: [],
    })
  },
}))