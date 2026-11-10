import { useMemo } from 'react'
import { elementFor } from '../utils/elements'
import { seededRandom } from '../utils/random'
import '../css/TypeScene.css'

/**
 * Fundo decorativo com os elementos do tipo do Pokémon
 * (chamas, bolhas, folhas, raios...). Tipo principal em maior quantidade,
 * tipo secundário completa o cenário.
 *
 * variant: 'hero' (grande, nos detalhes) | 'soft' (discreto) | 'card' (miniatura na lista)
 */
function TypeScene({ pokemon, count = 16, variant = 'hero' }) {
  const particles = useMemo(() => {
    const rand = seededRandom(pokemon.id * 9973 + 17)
    const list = []

    pokemon.types.forEach((type, typeIndex) => {
      const element = elementFor(type.name)
      const amount = typeIndex === 0 ? count : Math.max(2, Math.ceil(count * 0.45))

      for (let i = 0; i < amount; i++) {
        list.push({
          key: `${type.name}-${i}`,
          motion: element.motion,
          glyph: element.glyphs[Math.floor(rand() * element.glyphs.length)],
          x: rand() * 100, // % horizontal
          y: rand() * 100, // % vertical (para movimentos que não sobem/descem)
          size: 0.9 + rand() * 1.7, // rem
          delay: -rand() * 14, // delay negativo: já começa "no meio" da animação
          duration: 7 + rand() * 9,
          sway: (rand() - 0.5) * 90, // px de balanço lateral
          angle: rand() * 360,
          radius: 22 + rand() * 26, // raio da órbita (% do menor lado)
          opacity: 0.35 + rand() * 0.55,
        })
      }
    })
    return list
  }, [pokemon, count])

  const mainElement = elementFor(pokemon.types[0]?.name)
  const mark = mainElement.glyphs.find((g) => g !== 'bubble') ?? '✨'

  return (
    <div className={`scene scene--${variant}`} aria-hidden="true">
      {variant === 'hero' && <span className="scene__mark">{mark}</span>}
      {particles.map((p) => (
        <span
          key={p.key}
          className={`scene__p scene__p--${p.motion} ${p.glyph === 'bubble' ? 'scene__bubble' : ''}`}
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--s': `${p.size}rem`,
            '--d': `${p.delay}s`,
            '--t': `${p.duration}s`,
            '--sway': `${p.sway}px`,
            '--a': `${p.angle}deg`,
            '--rad': `${p.radius}cqmin`,
            '--o': p.opacity,
          }}
        >
          {p.glyph === 'bubble' ? '' : p.glyph}
        </span>
      ))}
    </div>
  )
}

export default TypeScene
