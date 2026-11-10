import { useState } from 'react'
import Modal from './Modal'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import PokemonImage from './PokemonImage'
import CardViewer from './CardViewer'
import TypeScene from './TypeScene'
import HeroCard from './HeroCard'
import PokemonAnimated from './PokemonAnimated'
import { STATS, getPalette, isLegendary, formatId, totalStats } from '../utils/pokemon'
import '../css/PokemonDetails.css'

const MODES = [
  { id: 'card', label: '🃏 Carta', title: 'Carta oficial animada' },
  { id: 'anim', label: '🎞️ Animado', title: 'Animação do Pokémon' },
  { id: '2d', label: '🖼️ HD', title: 'Arte oficial em alta resolução' },
]

function PokemonDetails({
  pokemon,
  trainers,
  isFavorite,
  onClose,
  onToggleFavorite,
  onPrev,
  onNext,
}) {
  const [tab, setTab] = useState('info') // 'info' | 'card'
  const [mode, setMode] = useState('card') // 'card' | 'anim' | '2d'

  const { c1, c2 } = getPalette(pokemon)
  const legendary = isLegendary(pokemon)

  return (
    <Modal onClose={onClose}>
      <div className="details" style={{ '--c1': c1, '--c2': c2 }}>
        <div className="details__tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'info'}
            className={tab === 'info' ? 'is-active' : ''}
            onClick={() => setTab('info')}
          >
            📊 Atributos
          </button>
          <button
            role="tab"
            aria-selected={tab === 'card'}
            className={tab === 'card' ? 'is-active' : ''}
            onClick={() => setTab('card')}
          >
            🃏 Carta
          </button>
        </div>

        {/* key força a animação de "virar" a cada troca de aba ou de Pokémon */}
        <div className="details__flip" key={`${tab}-${pokemon.id}`}>
          {tab === 'info' ? (
            <div className="details__grid">
              <div className="details__hero">
                <TypeScene pokemon={pokemon} count={16} variant="hero" />
                <span className="details__id">{formatId(pokemon.id)}</span>
                <div className="details__ring" aria-hidden="true" />

                {mode === 'card' && <HeroCard key={pokemon.id} pokemon={pokemon} />}
                {mode === 'anim' && (
                  <PokemonAnimated pokemon={pokemon} className="details__img details__img--anim" />
                )}
                {mode === '2d' && <PokemonImage pokemon={pokemon} className="details__img" />}

                <div className="details__shadow" aria-hidden="true" />

                <div className="details__modes" role="group" aria-label="Modo de exibição">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      className={mode === m.id ? 'is-active' : ''}
                      aria-pressed={mode === m.id}
                      title={m.title}
                      onClick={() => setMode(m.id)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="details__info">
                <div className="details__title">
                  <h2>{pokemon.name}</h2>
                  {legendary && <span className="details__legend">👑 Lendário</span>}
                  <button
                    className={`details__fav ${isFavorite ? 'is-on' : ''}`}
                    onClick={() => onToggleFavorite(pokemon.id)}
                    aria-label="Favoritar"
                  >
                    {isFavorite ? '⭐' : '☆'}
                  </button>
                </div>

                <div className="details__types">
                  {pokemon.types.map((t) => (
                    <TypeBadge key={t.id} name={t.name} />
                  ))}
                </div>

                <div className="details__stats">
                  {STATS.map((s) => (
                    <StatBar
                      key={s.key}
                      label={s.label}
                      icon={s.icon}
                      value={pokemon.stats[s.key]}
                      color={c1}
                    />
                  ))}
                  <div className="details__total">
                    Total: <strong>{totalStats(pokemon)}</strong>
                  </div>
                </div>

                {trainers.length > 0 && (
                  <div className="details__trainers">
                    <h4>🧑‍🚀 Treinadores</h4>
                    <p>{trainers.map((t) => t.name).join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="details__card-tab">
              <TypeScene pokemon={pokemon} count={12} variant="soft" />
              <h2 className="details__card-title">
                {pokemon.name} <small>{formatId(pokemon.id)}</small>
              </h2>
              <CardViewer key={pokemon.id} pokemon={pokemon} />
            </div>
          )}
        </div>

        <div className="details__nav">
          <button className="btn" onClick={onPrev} disabled={!onPrev}>
            ◀ Anterior
          </button>
          <button className="btn" onClick={onNext} disabled={!onNext}>
            Próximo ▶
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonDetails
