import '../css/Header.css'

function Header({ view, onChangeView, darkMode, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <div className="header__brand">
        <img src="/pokeball.svg" alt="" className="header__logo" />
        <h1>Pokédex</h1>
      </div>

      <nav className="header__nav" aria-label="Navegação principal">
        <button
          className={`header__tab ${view === 'pokedex' ? 'is-active' : ''}`}
          onClick={() => onChangeView('pokedex')}
        >
          🐾 Pokémon
        </button>
        <button
          className={`header__tab ${view === 'trainers' ? 'is-active' : ''}`}
          onClick={() => onChangeView('trainers')}
        >
          🧑‍🚀 Treinadores
        </button>
      </nav>

      <div className="header__actions">
        <span className="header__fav-count" title="Favoritos">
          ⭐ {favoritesCount}
        </span>
        <button
          className="header__theme"
          onClick={onToggleDark}
          aria-label="Alternar tema claro/escuro"
          title="Alternar tema"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header
