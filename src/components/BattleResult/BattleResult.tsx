import type { RoundResult } from '../../types/card'
import { CardComponent } from '../Card/CardComponent'

interface Props {
  result: RoundResult
  onContinue: () => void
  isFinal?: boolean
  playerScore: number
  cpuScore: number
}

const outcomeText = {
  player: { msg: '¡Ganaste la ronda! 🎉', color: 'text-green-400' },
  cpu: { msg: 'La CPU ganó la ronda 😤', color: 'text-red-400' },
  tie: { msg: 'Empate 🤝', color: 'text-yellow-400' },
}

export function BattleResult({ result, onContinue, isFinal, playerScore, cpuScore }: Props) {
  const { msg, color } = outcomeText[result.winner]

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className={`text-2xl font-bold ${color}`}>{msg}</h2>

      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/70 text-sm">Tu carta</p>
          <CardComponent card={result.playerCard} />
          <p className="text-white font-bold">Score: {result.playerScore}</p>
        </div>
        <span className="text-white text-3xl font-bold">VS</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-white/70 text-sm">Carta CPU</p>
          <CardComponent card={result.cpuCard} />
          <p className="text-white font-bold">Score: {result.cpuScore}</p>
        </div>
      </div>

      <div className="flex gap-8 text-white text-lg">
        <span>Tú: <strong className="text-green-400">{playerScore}</strong></span>
        <span>CPU: <strong className="text-red-400">{cpuScore}</strong></span>
      </div>

      <button
        onClick={onContinue}
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors"
      >
        {isFinal ? 'Ver resultado final' : 'Siguiente ronda →'}
      </button>
    </div>
  )
}
