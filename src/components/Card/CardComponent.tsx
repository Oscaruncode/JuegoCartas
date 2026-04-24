import type { Card } from '../../types/card'

const typeColors = {
  izquierda: 'from-red-800 to-red-600 border-red-400',
  centro: 'from-yellow-700 to-yellow-500 border-yellow-300',
  derecha: 'from-blue-800 to-blue-600 border-blue-400',
}

const typeBadge = {
  izquierda: 'bg-red-500',
  centro: 'bg-yellow-500',
  derecha: 'bg-blue-500',
}

interface Props {
  card: Card
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
  faceDown?: boolean
}

export function CardComponent({ card, selected, onClick, disabled, faceDown }: Props) {
  if (faceDown) {
    return (
      <div className="w-36 h-64 rounded-xl border-2 border-gray-600 bg-gradient-to-b from-gray-800 to-gray-700 flex items-center justify-center select-none">
        <span className="text-4xl">🃏</span>
      </div>
    )
  }

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`
        w-36 h-64 rounded-xl border-2 bg-gradient-to-b ${typeColors[card.type]}
        flex flex-col cursor-${disabled ? 'default' : 'pointer'} select-none
        transition-all duration-200
        ${selected ? 'scale-110 shadow-lg shadow-yellow-400/50 border-yellow-300' : 'hover:scale-105'}
        ${disabled ? 'opacity-60' : ''}
      `}
    >
      <div className="p-2 flex flex-col items-center gap-1">
        {card.image.startsWith('/') ? (
          <img src={card.image} alt={card.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/30" />
        ) : (
          <span className="text-3xl">{card.image}</span>
        )}
        <p className="text-white font-bold text-xs text-center leading-tight">{card.name}</p>
        <span className={`text-white text-[10px] px-1.5 py-0.5 rounded-full ${typeBadge[card.type]}`}>
          {card.type}
        </span>
        <p className="text-white/70 text-[9px] text-center">{card.party}</p>
      </div>
      <div className="mx-2 mt-auto mb-2 bg-black/30 rounded-lg p-1.5 text-[10px] text-white space-y-0.5">
        <div className="flex justify-between"><span>❤️ Popularidad</span><span className="font-bold">{card.stats.popularidad}</span></div>
        <div className="flex justify-between"><span>⚔️ Propuestas</span><span className="font-bold">{card.stats.propuestas}</span></div>
        <div className="flex justify-between"><span>🛡️ Experiencia</span><span className="font-bold">{card.stats.experiencia}</span></div>
        <div className="flex justify-between"><span>💣 Escándalos</span><span className="font-bold text-red-300">{card.stats.escandalos}</span></div>
      </div>
    </div>
  )
}
