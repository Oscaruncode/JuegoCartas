import { useGameStore } from './store/gameStore'
import { Board } from './components/Board/Board'
import { DeckSelection } from './components/DeckSelection/DeckSelection'
import { Ranking } from './components/Ranking/Ranking'
import { useState } from 'react'

function App() {
  const { phase, player, cpu, startGame } = useGameStore()
  const [showRanking, setShowRanking] = useState(false)

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
          onClick={() => {
            setShowRanking(false) // 🔥 reset ranking
            startGame()
          }}
          className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-xl transition-colors shadow-lg"
        >
          🚀 Comenzar juego
        </button>
      </div>
    )
  }

  if (phase === 'deckSelection') {
    return <DeckSelection />
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

      {/* 🔥 RESULTADO FINAL */}
      {phase === 'gameover' && (
        <div className="flex flex-col items-center gap-4">
          {gameWinner === null && (
            <div className="text-yellow-400 font-bold text-lg">
              ¡Empate total!
            </div>
          )}

          {gameWinner && (
            <div className="text-green-400 font-bold text-xl">
              {gameWinner === 'Tú'
                ? '🏆 ¡Ganaste el juego!'
                : `💀 Ganó ${gameWinner}`}
            </div>
          )}

          {/* 🔥 BOTÓN PARA VER RANKING */}
          {!showRanking && (
            <button
              onClick={() => setShowRanking(true)}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors"
            >
              📊 Ver ranking de popularidad
            </button>
          )}

          {/* 🔥 RANKING */}
          {showRanking && (
            <div className="mt-2 w-full flex flex-col items-center gap-2">
              <Ranking />

              <button
                onClick={() => setShowRanking(false)}
                className="text-sm text-white/60 underline"
              >
                Ocultar ranking
              </button>
            </div>
          )}
        </div>
      )}

      <Board />
    </div>
  )
}

export default App