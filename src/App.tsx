import { useGameStore } from './store/gameStore'
import { Board } from './components/Board/Board'

function App() {
  const { phase, player, cpu, startGame } = useGameStore()

  if (phase === 'idle') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🗳️ PoliCartas</h1>
          <p className="text-white/60 text-lg">Elecciones Colombia 2026</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 text-white text-sm max-w-sm w-full space-y-2">
          <p className="font-bold text-yellow-400 mb-3">¿Cómo jugar?</p>
          <p>🃏 Cada jugador recibe 4 cartas de políticos</p>
          <p>⚔️ Selecciona tu carta y enfréntalas en batalla</p>
          <p>📊 El score se calcula por Propuestas + Experiencia - Escándalos</p>
          <p>🔥 Los tipos tienen ventajas: Izquierda &gt; Derecha &gt; Centro &gt; Izquierda</p>
          <p>🏆 Gana quien acumule más rondas en 4 turnos</p>
        </div>
        <button
          onClick={startGame}
          className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-xl transition-colors shadow-lg"
        >
          🚀 Comenzar juego
        </button>
      </div>
    )
  }

  const gameWinner =
    phase !== 'gameover'
      ? null
      : player.score > cpu.score
      ? 'Tú'
      : cpu.score > player.score
      ? 'la CPU'
      : null

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-3 mt-4">
        <h1 className="text-2xl font-bold text-white">🗳️ PoliCartas</h1>
        <span className="text-white/40 text-sm">Colombia 2026</span>
      </div>

      {phase === 'gameover' && gameWinner === null && (
        <div className="text-yellow-400 font-bold text-lg">¡Empate total!</div>
      )}
      {phase === 'gameover' && gameWinner && (
        <div className="text-green-400 font-bold text-xl">
          {gameWinner === 'Tú' ? '🏆 ¡Ganaste el juego!' : `💀 Ganó ${gameWinner}`}
        </div>
      )}

      <Board />
    </div>
  )
}

export default App
