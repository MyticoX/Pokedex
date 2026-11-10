import TypeBadge from './TypeBadge'
import { SORT_OPTIONS } from '../utils/pokemon'
import '../css/Filters.css'

function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onSortBy,
  sortDir,
  onToggleDir,
  onlyFavorites,
  onToggleFavorites,
  onRandom,
  onClear,
  hasActiveFilters,
}) {
  return (
    <section className="filters" aria-label="Filtros">
      <div className="filters__types">
        <button
          className={`filters__all ${selectedType === 'all' ? 'is-active' : ''}`}
          onClick={() => onSelectType('all')}
        >
          Todos
        </button>
        {types.map((t) => (
          <TypeBadge
            key={t.id}
            name={t.name}
            active={selectedType === t.name}
            onClick={() => onSelectType(selectedType === t.name ? 'all' : t.name)}
          />
        ))}
      </div>

      <div className="filters__row">
        <label className="filters__sort">
          Ordenar por
          <select value={sortBy} onChange={(e) => onSortBy(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <button
          className="btn"
          onClick={onToggleDir}
          title="Inverter ordem"
          aria-label="Inverter ordem de classificação"
        >
          {sortDir === 'asc' ? '⬆️ Crescente' : '⬇️ Decrescente'}
        </button>

        <button
          className={`btn ${onlyFavorites ? 'btn--active' : ''}`}
          onClick={onToggleFavorites}
        >
          ⭐ Favoritos
        </button>

        <button className="btn btn--accent" onClick={onRandom}>
          🎲 Aleatório
        </button>

        {hasActiveFilters && (
          <button className="btn btn--ghost" onClick={onClear}>
            ✕ Limpar filtros
          </button>
        )}
      </div>
    </section>
  )
}

export default Filters
