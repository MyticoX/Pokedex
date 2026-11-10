import { useState } from 'react'
import useTcgCards from '../hooks/useTcgCards'
import TiltCard from './TiltCard'
import TradingCard from './TradingCard'
import '../css/HeroCard.css'

// Carta oficial animada no painel principal: brilho holográfico e balanço
// automáticos; ao passar o mouse a carta passa a seguir o ponteiro.
// Sem carta oficial (offline / sem resultado), mostra a carta gerada pela Pokédex.
function HeroCard({ pokemon }) {
  const { status, cards } = useTcgCards(pokemon.id)
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState({})

  const total = cards.length
  const card = cards[index]
  const official = status === 'ok' && card && !broken[card.id]

  return (
    <div className="herocard">
      {status === 'loading' ? (
        <div className="herocard__loading" role="status">
          Buscando cartas…
        </div>
      ) : (
        <>
          {official && total > 1 && (
            <button
              className="herocard__nav"
              aria-label="Carta anterior"
              onClick={() => setIndex((i) => (i - 1 + total) % total)}
            >
              ◀
            </button>
          )}

          <TiltCard key={official ? card.id : 'generated'} idle className="herocard__tilt">
            {official ? (
              <img
                className="herocard__img"
                src={card.images.large ?? card.images.small}
                alt={`Carta de ${card.name} — ${card.set?.name ?? ''}`}
                draggable={false}
                onError={(e) => {
                  const small = card.images.small
                  if (small && e.currentTarget.src !== small) e.currentTarget.src = small
                  else setBroken((b) => ({ ...b, [card.id]: true }))
                }}
              />
            ) : (
              <div className="herocard__generated">
                <TradingCard pokemon={pokemon} />
              </div>
            )}
          </TiltCard>

          {official && total > 1 && (
            <button
              className="herocard__nav"
              aria-label="Próxima carta"
              onClick={() => setIndex((i) => (i + 1) % total)}
            >
              ▶
            </button>
          )}

          {official && (
            <span className="herocard__meta">
              {card.set?.name ?? 'Coleção'}
              {total > 1 ? ` · ${index + 1}/${total}` : ''}
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default HeroCard
