import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({
  pokemon,
  favorites,
  compareIds,
  onSelect,
  onToggleFavorite,
  onToggleCompare,
  onReset,
}) {
  // Tratamento de "nenhum Pokémon encontrado"
  if (pokemon.length === 0) {
    return (
      <div className="empty" role="status">
        <div className="empty__icon">🔍</div>
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente outro nome, ID ou tipo — ou limpe os filtros.</p>
        <button className="btn btn--accent" onClick={onReset}>
          Limpar filtros
        </button>
      </div>
    )
  }

  return (
    <div className="list">
      {pokemon.map((p, i) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          index={i}
          isFavorite={favorites.includes(p.id)}
          isCompared={compareIds.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  )
}

export default PokemonList
