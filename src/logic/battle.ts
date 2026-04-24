import type { Card, BattleOutcome, RoundResult, PoliticalType } from '../types/card'

const TYPE_ADVANTAGE: Record<PoliticalType, PoliticalType> = {
  izquierda: 'derecha',
  derecha: 'centro',
  centro: 'izquierda',
}

function typeMultiplier(attacker: PoliticalType, defender: PoliticalType): number {
  if (TYPE_ADVANTAGE[attacker] === defender) return 1.25
  if (TYPE_ADVANTAGE[defender] === attacker) return 0.8
  return 1.0
}

export function calculateScore(card: Card, opponent: Card): number {
  const base = card.stats.propuestas + card.stats.experiencia * 0.5 - card.stats.escandalos * 0.3
  const mult = typeMultiplier(card.type, opponent.type)
  return Math.round(base * mult)
}

export function resolveBattle(playerCard: Card, cpuCard: Card): RoundResult {
  const playerScore = calculateScore(playerCard, cpuCard)
  const cpuScore = calculateScore(cpuCard, playerCard)

  let winner: BattleOutcome
  if (playerScore > cpuScore) winner = 'player'
  else if (cpuScore > playerScore) winner = 'cpu'
  else winner = 'tie'

  return { playerCard, cpuCard, playerScore, cpuScore, winner }
}
