import TypeBadge from './TypeBadge'
import PokemonImage from './PokemonImage'
import TypeScene from './TypeScene'
import useTilt from '../hooks/useTilt'
import { STATS, getPalette, isLegendary, formatId } from '../utils/pokemon'
import '../css/PokemonCard.css'

function PokemonCard({
  pokemon,
  index = 0,
  isFavorite,
  isCompared,
  onSelect,
  onToggleFavorite,
  onToggleCompare,
}) {
  const { ref, handlers } = useTilt({ max: 14 })

  const { c1, c2 } = getPalette(pokemon)
  const legendary = isLegendary(pokemon)

  // O corpo do card é um div com role="button" (e não <button>) para que
  // os elementos internos possam "saltar" em 3D.
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(pokemon)
    }
  }

  return (
    <article
      ref={ref}
      {...handlers}
      className={`card ${legendary ? 'card--legendary' : ''}`}
      style={{
        '--c1': c1,
        '--c2': c2,
        '--i': index,
      }}
    >
      {/* Elementos do tipo (chamas, bolhas, folhas...) no topo do card */}
      <TypeScene pokemon={pokemon} count={5} variant="card" />
      {legendary && <span className="card__legend">👑 Lendário</span>}

      <div className="card__actions">
        <button
          className={`card__icon-btn ${isFavorite ? 'is-on' : ''}`}
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-label={isFavorite ? `Remover ${pokemon.name} dos favoritos` : `Favoritar ${pokemon.name}`}
          title="Favoritar"
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <button
          className={`card__icon-btn ${isCompared ? 'is-on' : ''}`}
          onClick={() => onToggleCompare(pokemon.id)}
          aria-label={`Comparar ${pokemon.name}`}
          title="Comparar"
        >
          ⚔️
        </button>
      </div>

      <div
        className="card__body"
        role="button"
        tabIndex={0}
        aria-label={`Ver detalhes de ${pokemon.name}`}
        onClick={() => onSelect(pokemon)}
        onKeyDown={onKeyDown}
      >
        <span className="card__id">{formatId(pokemon.id)}</span>
        <PokemonImage pokemon={pokemon} className="card__img" />
        <h3 className="card__name">{pokemon.name}</h3>

        <div className="card__types">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.id} name={t.name} />
          ))}
        </div>

        <ul className="card__stats">
          {STATS.map((s) => (
            <li key={s.key}>
              <span>{s.icon} {s.label}</span>
              <strong>{pokemon.stats[s.key]}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="card__glare" aria-hidden="true" />
    </article>
  )
}

export default PokemonCard
