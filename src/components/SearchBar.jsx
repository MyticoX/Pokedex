import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span className="search__icon" aria-hidden="true">🔎</span>
      <input
        type="text"
        className="search__input"
        placeholder="Pesquisar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar Pokémon por nome ou ID"
      />
      {value && (
        <button
          className="search__clear"
          onClick={() => onChange('')}
          aria-label="Limpar pesquisa"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
