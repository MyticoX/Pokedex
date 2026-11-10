import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { STATS, TYPE_EMOJI, getPalette, formatId, STAT_MAX } from '../utils/pokemon'
import '../css/TradingCard.css'

// Carta colecionável gerada pela própria Pokédex (design original),
// usada quando a carta oficial não está disponível.
function TradingCard({ pokemon }) {
  const main = pokemon.types[0]?.name
  const { c1, c2 } = getPalette(pokemon)
  const moves = STATS.filter((s) => s.key !== 'hp')

  return (
    <div
      className="tcard"
      style={{ '--c1': c1, '--c2': c2 }}
    >
      <div className="tcard__frame">
        <header className="tcard__head">
          <div>
            <small>Pokémon {formatId(pokemon.id)}</small>
            <h3>{pokemon.name}</h3>
          </div>
          <span className="tcard__hp">
            <small>HP</small> {pokemon.stats.hp} {TYPE_EMOJI[main]}
          </span>
        </header>

        <div className="tcard__art">
          <PokemonImage pokemon={pokemon} className="tcard__img" />
        </div>

        <div className="tcard__types">
          {pokemon.types.map((t) => (
            <TypeBadge key={t.id} name={t.name} />
          ))}
        </div>

        <ul className="tcard__moves">
          {moves.map((s) => (
            <li key={s.key}>
              <span>
                {s.icon} {s.label}
              </span>
              <div className="tcard__bar">
                <i style={{ width: `${(pokemon.stats[s.key] / STAT_MAX) * 100}%` }} />
              </div>
              <strong>{pokemon.stats[s.key]}</strong>
            </li>
          ))}
        </ul>

        <footer className="tcard__foot">
          <span>Pokédex React</span>
          <span>{formatId(pokemon.id)}</span>
        </footer>
      </div>
    </div>
  )
}

export default TradingCard
