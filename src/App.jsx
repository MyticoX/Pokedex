import { useEffect, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import extra from './data/extra-pokemon.json'
import useLocalStorage from './hooks/useLocalStorage'
import { sortPokemon } from './utils/pokemon'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import Backdrop from './components/Backdrop'
import { CompareBar, CompareModal } from './components/ComparePanel'

import './css/App.css'

const { trainers, types: allTypes } = data

// Os 151 Pokémon do arquivo oficial da atividade + extras (ex.: Rayquaza),
// mantidos em um arquivo separado para não alterar o pokedex-data.json original.
const allPokemon = [...data.pokemon, ...extra.pokemon]

// Apenas os tipos que realmente aparecem nos Pokémon (ex.: "Typeless" não aparece).
const usedTypeNames = new Set(allPokemon.flatMap((p) => p.types.map((t) => t.name)))
const availableTypes = allTypes.filter((t) => usedTypeNames.has(t.name))

const pokemonById = new Map(allPokemon.map((p) => [p.id, p]))

function App() {
  // ----- Estados -----
  const [view, setView] = useState('pokedex') // 'pokedex' | 'trainers'
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selected, setSelected] = useState(null) // Pokémon aberto nos detalhes
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)

  // Persistidos no localStorage
  const [favorites, setFavorites] = useLocalStorage('pokedex:favorites', [])
  const [darkMode, setDarkMode] = useLocalStorage(
    'pokedex:dark',
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  )

  // ----- Efeitos -----
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
  }, [darkMode])

  useEffect(() => {
    document.title = selected ? `${selected.name} • Pokédex` : 'Pokédex React'
  }, [selected])

  // ----- Estado derivado: lista filtrada + ordenada -----
  const visiblePokemon = useMemo(() => {
    const q = search.trim().toLowerCase().replace(/^#/, '')

    const filtered = allPokemon.filter((p) => {
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        String(p.id).includes(q) ||
        String(p.id).padStart(3, '0').includes(q)
      const matchesType =
        selectedType === 'all' || p.types.some((t) => t.name === selectedType)
      const matchesFav = !onlyFavorites || favorites.includes(p.id)
      return matchesSearch && matchesType && matchesFav
    })

    return sortPokemon(filtered, sortBy, sortDir)
  }, [search, selectedType, sortBy, sortDir, onlyFavorites, favorites])

  const hasActiveFilters =
    search !== '' || selectedType !== 'all' || onlyFavorites || sortBy !== 'id' || sortDir !== 'asc'

  // ----- Handlers -----
  const clearFilters = () => {
    setSearch('')
    setSelectedType('all')
    setOnlyFavorites(false)
    setSortBy('id')
    setSortDir('asc')
  }

  const toggleFavorite = (id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))

  // Mantém no máximo 2 Pokémon para comparação (o mais antigo sai).
  const toggleCompare = (id) =>
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id)
      return prev.length >= 2 ? [prev[1], id] : [...prev, id]
    })

  const pickRandom = () => {
    const pool = visiblePokemon.length > 0 ? visiblePokemon : allPokemon
    setSelected(pool[Math.floor(Math.random() * pool.length)])
  }

  // Navegação anterior/próximo dentro da lista visível
  const selectedIndex = selected ? visiblePokemon.findIndex((p) => p.id === selected.id) : -1
  const goPrev = selectedIndex > 0 ? () => setSelected(visiblePokemon[selectedIndex - 1]) : null
  const goNext =
    selectedIndex >= 0 && selectedIndex < visiblePokemon.length - 1
      ? () => setSelected(visiblePokemon[selectedIndex + 1])
      : null

  const selectedTrainers = selected
    ? trainers.filter((t) => t.pokemonIds.includes(selected.id))
    : []

  const comparePokemon = compareIds.map((id) => pokemonById.get(id))

  return (
    <>
    <Backdrop />
    <div className="app">
      <Header
        view={view}
        onChangeView={setView}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
        favoritesCount={favorites.length}
      />

      <main className="app__main">
        {view === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              types={availableTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              sortBy={sortBy}
              onSortBy={setSortBy}
              sortDir={sortDir}
              onToggleDir={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites(!onlyFavorites)}
              onRandom={pickRandom}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <p className="app__count" aria-live="polite">
              Exibindo <strong>{visiblePokemon.length}</strong> de {allPokemon.length} Pokémon
            </p>

            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              compareIds={compareIds}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
              onReset={clearFilters}
            />
          </>
        ) : (
          <TrainerList
            trainers={trainers}
            pokemonById={pokemonById}
            onSelectPokemon={setSelected}
          />
        )}
      </main>

      <footer className="app__footer">
        Dados: <code>pokedex-data.json</code> + extras • Imagens: PokéAPI sprites • {allPokemon.length} Pokémon
      </footer>

      <CompareBar
        selected={comparePokemon}
        onRemove={toggleCompare}
        onOpen={() => setShowCompare(true)}
        onClear={() => setCompareIds([])}
      />

      {selected && (
        <PokemonDetails
          pokemon={selected}
          trainers={selectedTrainers}
          isFavorite={favorites.includes(selected.id)}
          onClose={() => setSelected(null)}
          onToggleFavorite={toggleFavorite}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      {showCompare && comparePokemon.length === 2 && (
        <CompareModal
          a={comparePokemon[0]}
          b={comparePokemon[1]}
          onClose={() => setShowCompare(false)}
        />
      )}
    </div>
    </>
  )
}

export default App
