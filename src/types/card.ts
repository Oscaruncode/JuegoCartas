export type PoliticalType = 'izquierda' | 'centro' | 'derecha'

export interface Card {
  id: string
  name: string
  party: string
  type: PoliticalType
  image: string
  stats: {
    popularidad: number   // HP
    propuestas: number    // ataque
    experiencia: number   // defensa
    escandalos: number    // debilidad (resta)
  }
}

export interface Player {
  id: 'player' | 'cpu'
  name: string
  deck: Card[]
  hand: Card[]
  score: number
}

export type BattleOutcome = 'player' | 'cpu' | 'tie'

export interface RoundResult {
  playerCard: Card
  cpuCard: Card
  playerScore: number
  cpuScore: number
  winner: BattleOutcome
}

export interface GameState {
  phase: 'idle' | 'playing' | 'battle' | 'result' | 'gameover'
  player: Player
  cpu: Player
  currentRound: number
  totalRounds: number
  roundHistory: RoundResult[]
  selectedCard: Card | null
}
