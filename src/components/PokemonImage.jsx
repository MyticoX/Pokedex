import { useState } from 'react'
import { spriteUrl, formatId } from '../utils/pokemon'

// Imagem do Pokémon (PokéAPI). Se falhar (offline), mostra um fallback com o ID.
function PokemonImage({ pokemon, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`pokemon-img-fallback ${className}`} aria-label={pokemon.name}>
        <span>{formatId(pokemon.id)}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={spriteUrl(pokemon.id)}
      alt={pokemon.name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default PokemonImage
