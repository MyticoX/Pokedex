import { useState } from 'react'
import PokemonImage from './PokemonImage'
import { animatedSpriteUrl } from '../utils/pokemon'

// Animação 2D do Pokémon (GIF do PokéAPI). Se não existir para esse Pokémon
// ou falhar o carregamento, cai para a imagem estática.
//
// Os GIFs são pixel art pequenos (60–200 px). Ampliar com um fator quebrado
// deixa os pixels com tamanhos desiguais e "serrilhados"; por isso medimos o
// GIF e o painel e ampliamos por um fator INTEIRO (3x, 4x...) sem suavização.
function PokemonAnimated({ pokemon, className = '' }) {
  const [failed, setFailed] = useState(false)
  const [size, setSize] = useState(null)

  if (failed) return <PokemonImage pokemon={pokemon} className={className} />

  const onLoad = (e) => {
    const img = e.currentTarget
    const { naturalWidth: w, naturalHeight: h } = img
    // ocupa o máximo do painel onde está, sempre em escala inteira (nítido)
    const box = img.parentElement
    const maxW = (box?.clientWidth || 360) * 0.92
    const maxH = (box?.clientHeight || 430) * 0.8
    let scale = Math.max(1, Math.floor(Math.min(maxW / w, maxH / h)))
    // se faltar pouco para o próximo inteiro, vale arredondar para cima
    const up = Math.min(maxW / w, maxH / h)
    if (up - scale > 0.7) scale += 1
    setSize({ width: w * scale, height: h * scale })
  }

  return (
    <img
      className={className}
      src={animatedSpriteUrl(pokemon.id)}
      alt={pokemon.name}
      draggable={false}
      onLoad={onLoad}
      onError={() => setFailed(true)}
      // invisível até saber o tamanho, para não "pular" na tela
      style={size ? size : { visibility: 'hidden' }}
    />
  )
}

export default PokemonAnimated
