import { useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { politicians } from '../../data/politicians'

export function Ranking() {
  const { popularity, fetchPopularity } = useGameStore()

  useEffect(() => {
    fetchPopularity()
  }, [])

  const getCandidate = (id: string) =>
    politicians.find(p => p.id === id)

  const maxVotes = Math.max(...popularity.map(p => p.totalVotes), 1)

  const totalVotesAll = popularity.reduce((acc, p) => acc + p.totalVotes, 0)

  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="bg-gray-800 p-5 rounded-2xl text-white w-full max-w-md shadow-lg">
      <h3 className="text-xl font-bold text-center">
        📊 Popularidad de candidatos
      </h3>

      {/* 🔥 DESCRIPCIÓN */}
      <p className="text-xs text-white/60 text-center mt-2 mb-4 leading-relaxed">
        Este ranking muestra cuántas veces los jugadores han elegido a cada
        candidato como parte de sus mazos. No refleja la popularidad real, sino las elecciones dentro del juego. ¡Elige sabiamente! (No es una encuesta oficial, la encuesta tiene fines academicos)
      </p>

      {popularity.length === 0 ? (
        <p className="text-white/60 text-center">Cargando...</p>
      ) : (
        <div className="space-y-3">
          {popularity.slice(0, 5).map((p, i) => {
            const candidate = getCandidate(p.candidateId)

            const percentageBar = (p.totalVotes / maxVotes) * 100
            const percentReal =
              totalVotesAll > 0
                ? (p.totalVotes / totalVotesAll) * 100
                : 0

            return (
              <div
                key={p.candidateId}
                className="bg-gray-700 rounded-lg p-3"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {medals[i] || `${i + 1}.`}
                    </span>
                    <span className="font-semibold">
                      {candidate?.name || p.candidateId}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-yellow-400 font-bold block">
                      {p.totalVotes}
                    </span>
                    <span className="text-xs text-white/60">
                      {percentReal.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Barra */}
                <div className="w-full bg-gray-600 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-yellow-400 h-2"
                    style={{ width: `${percentageBar}%` }}
                  />
                </div>

                {/* Texto */}
                <p className="text-xs text-white/60 mt-1">
                  Elegido {p.totalVotes} veces
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}