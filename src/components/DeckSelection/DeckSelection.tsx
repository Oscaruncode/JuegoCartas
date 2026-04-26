import { useGameStore } from '../../store/gameStore'
import { politicians } from '../../data/politicians'
import { CardComponent } from '../Card/CardComponent'

export function DeckSelection() {
  const { selectedDeck, selectDeckCard, confirmDeck } = useGameStore()

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center gap-6 p-4 text-white">
      <h2 className="text-2xl font-bold">Elige tus 4 candidatos</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {politicians.map(card => {
          const selected = selectedDeck.some(c => c.id === card.id)

          return (
            <CardComponent
              key={card.id}
              card={card}
              selected={selected}
              onClick={() => selectDeckCard(card)}
              revealStats = {false}
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