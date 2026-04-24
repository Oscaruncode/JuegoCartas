import { useGameStore } from '../../store/gameStore'
import { CardComponent } from '../Card/CardComponent'
import { BattleResult } from '../BattleResult/BattleResult'

export function Board() {
  const { phase, player, cpu, currentRound, totalRounds, roundHistory, selectedCard, selectCard, playRound } =
    useGameStore()

  const lastResult = roundHistory[roundHistory.length - 1]
  const isFinal = phase === 'gameover'

  if (phase === 'battle' || phase === 'gameover') {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-white/60 text-sm">Ronda {currentRound - 1} / {totalRounds}</p>
        <BattleResult
          result={lastResult}
          playerScore={player.score}
          cpuScore={cpu.score}
          isFinal={isFinal}
          onContinue={() => {
            if (isFinal) {
              useGameStore.getState().resetGame()
            } else {
              useGameStore.setState({ phase: 'playing' })
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-8 text-white">
        <span>Ronda <strong>{currentRound}</strong> / {totalRounds}</span>
        <span>Tú: <strong className="text-green-400">{player.score}</strong></span>
        <span>CPU: <strong className="text-red-400">{cpu.score}</strong></span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-white/60 text-sm">Cartas de la CPU</p>
        <div className="flex gap-3">
          {cpu.hand.map((_, i) => (
            <CardComponent key={i} card={_} faceDown />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-white/20" />

      <div className="flex flex-col items-center gap-2">
        <p className="text-white/80 text-sm">Tu mano — selecciona una carta para jugar</p>
        <div className="flex gap-3 flex-wrap justify-center">
          {player.hand.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              selected={selectedCard?.id === card.id}
              onClick={() => selectCard(card)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={playRound}
        disabled={!selectedCard}
        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold rounded-xl text-lg transition-colors"
      >
        ⚔️ ¡Jugar carta!
      </button>
    </div>
  )
}
