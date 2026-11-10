import { useEffect, useState } from 'react'
import useTcgCards from '../hooks/useTcgCards'
import TiltCard from './TiltCard'
import TradingCard from './TradingCard'
import '../css/CardViewer.css'

// Mostra as cartas físicas (oficiais) do Pokémon, com navegação e efeito 3D.
// Se a API estiver indisponível, exibe a carta gerada pela Pokédex.
function CardViewer({ pokemon }) {
  const { status, cards } = useTcgCards(pokemon.id)
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState({}) // cartas cuja imagem falhou ao carregar

  const total = cards.length
  const card = cards[index]

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  // Setas do teclado trocam de carta
  useEffect(() => {
    if (total < 2) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % total)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [total])

  const showOfficial = status === 'ok' && card && !broken[card.id]

  let notice = null
  if (status === 'error') {
    notice = 'Não foi possível carregar as cartas oficiais (sem conexão com a API). Exibindo a carta gerada pela Pokédex.'
  } else if (status === 'empty') {
    notice = 'Nenhuma carta oficial encontrada para este Pokémon. Exibindo a carta gerada pela Pokédex.'
  } else if (status === 'ok' && !showOfficial) {
    notice = 'A imagem desta carta não carregou. Exibindo a carta gerada pela Pokédex.'
  }

  return (
    <div className="cardv">
      <div className="cardv__stage">
        {status === 'loading' ? (
          <div className="cardv__skeleton" role="status" aria-label="Carregando cartas">
            <span>Buscando cartas de {pokemon.name}…</span>
          </div>
        ) : (
          <>
            {showOfficial && total > 1 && (
              <button className="cardv__nav" onClick={prev} aria-label="Carta anterior">
                ◀
              </button>
            )}

            <TiltCard key={showOfficial ? card.id : 'generated'}>
              {showOfficial ? (
                <img
                  className="cardv__img"
                  src={card.images.large ?? card.images.small}
                  alt={`Carta de ${card.name} — ${card.set?.name ?? ''}`}
                  draggable={false}
                  onError={(e) => {
                    const small = card.images.small
                    if (small && e.currentTarget.src !== small) {
                      e.currentTarget.src = small
                    } else {
                      setBroken((b) => ({ ...b, [card.id]: true }))
                    }
                  }}
                />
              ) : (
                <TradingCard pokemon={pokemon} />
              )}
            </TiltCard>

            {showOfficial && total > 1 && (
              <button className="cardv__nav" onClick={next} aria-label="Próxima carta">
                ▶
              </button>
            )}
          </>
        )}
      </div>

      {showOfficial && (
        <div className="cardv__meta">
          <strong>{card.set?.name ?? 'Coleção'}</strong>
          {card.rarity && <span> · {card.rarity}</span>}
          <span className="cardv__count">
            {index + 1} / {total}
          </span>
        </div>
      )}

      {notice && <p className="cardv__notice">{notice}</p>}

      <p className="cardv__hint">
        Passe o mouse sobre a carta para ver o efeito 3D holográfico
        {showOfficial && total > 1 ? ' • use ◀ ▶ para ver outras versões' : ''}.
      </p>
      <p className="cardv__credit">
        Cartas: <a href="https://pokemontcg.io" target="_blank" rel="noreferrer">Pokémon TCG API</a>.
        Pokémon e suas cartas são marcas e direitos de Nintendo, Creatures, GAME FREAK e The Pokémon Company.
      </p>
    </div>
  )
}

export default CardViewer
