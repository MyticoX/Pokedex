import { useState } from 'react'
import PokemonImage from './PokemonImage'
import useTilt from '../hooks/useTilt'
import { formatId } from '../utils/pokemon'
import '../css/TrainerList.css'

function TrainerCard({ trainer, team, onSelectPokemon }) {
  const [open, setOpen] = useState(true)
  const { ref, handlers } = useTilt({ max: 5 })

  return (
    <article className="trainer" ref={ref} {...handlers}>
      <header className="trainer__head">
        <div className="trainer__avatar" aria-hidden="true">
          {trainer.name.charAt(0)}
        </div>
        <div>
          <h3>{trainer.name}</h3>
          <div className="trainer__badges" title={`${trainer.badges} insígnias`}>
            🏅 {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}
          </div>
        </div>
        <button
          className="trainer__toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {open ? '▲' : '▼'}
        </button>
      </header>

      {open && (
        <ul className="trainer__team">
          {team.length === 0 && <li className="trainer__none">Sem Pokémon</li>}
          {team.map((p) => (
            <li key={p.id}>
              <button onClick={() => onSelectPokemon(p)} title={p.name}>
                <PokemonImage pokemon={p} className="trainer__img" />
                <span>{p.name}</span>
                <small>{formatId(p.id)}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

function TrainerList({ trainers, pokemonById, onSelectPokemon }) {
  const [query, setQuery] = useState('')

  const filtered = trainers.filter((t) =>
    t.name.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <section>
      <div className="trainers__search">
        <input
          type="text"
          placeholder="Pesquisar treinador..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Pesquisar treinador"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty" role="status">
          <div className="empty__icon">🧑‍🚀</div>
          <h2>Nenhum treinador encontrado</h2>
        </div>
      ) : (
        <div className="trainers">
          {filtered.map((t) => (
            <TrainerCard
              key={t.id}
              trainer={t}
              team={t.pokemonIds.map((id) => pokemonById.get(id)).filter(Boolean)}
              onSelectPokemon={onSelectPokemon}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default TrainerList
