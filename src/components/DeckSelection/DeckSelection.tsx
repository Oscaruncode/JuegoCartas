import { useGameStore } from '../../store/gameStore'
import { politicians } from '../../data/politicians'
import { CardComponent } from '../Card/CardComponent'

export function DeckSelection() {
  const { selectedDeck, selectDeckCard, confirmDeck } = useGameStore()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center gap-6 p-4 text-white">
      <h2 className="text-2xl font-bold">Elige tus 4 candidatos</h2>

      {/* 🔥 ACLARACIÓN */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-xs text-white/70 max-w-xl leading-relaxed">
        <p className="font-semibold text-yellow-400 mb-2">ℹ️ Importante</p>
        <ul className="space-y-1">
          <li>
            • Las estadísticas de los candidatos son simuladas y no reflejan la realidad.
          </li>
          <li>
            • El juego incluye factores de azar en los resultados.
          </li>
          <li>
            • Elige los candidatos que prefieras libremente.
          </li>
          <li>
            • Tu selección será usada de forma anónima para medir tendencias politicas de los jugadores(no es una encuesta oficial, fines academicos)
          </li>
          <li>
            • Este sistema no representa una encuesta oficial ni resultados reales.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {politicians.map(card => {
          const selected = selectedDeck.some(c => c.id === card.id)

          return (
            <CardComponent
              key={card.id}
              card={card}
              selected={selected}
              onClick={() => selectDeckCard(card)}
              revealStats={false}
            />
          )
        })}
      </div>

      <p>{selectedDeck.length} / 4 seleccionados</p>

      <button
        disabled={selectedDeck.length !== 4}
        onClick={confirmDeck}
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl disabled:opacity-50"
      >
        Confirmar mazo
      </button>
    </div>
  )
}