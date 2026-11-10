// Utilitários compartilhados pelos componentes.

// Cor associada a cada tipo (usada em badges, bordas e gradientes dos cards).
export const TYPE_COLORS = {
  Typeless: '#9aa0a6',
  Normal: '#a8a77a',
  Fire: '#ee8130',
  Water: '#6390f0',
  Grass: '#7ac74c',
  Electric: '#f7d02c',
  Ice: '#96d9d6',
  Fighting: '#c22e28',
  Poison: '#a33ea1',
  Ground: '#e2bf65',
  Flying: '#a98ff3',
  Psychic: '#f95587',
  Bug: '#a6b91a',
  Rock: '#b6a136',
  Ghost: '#735797',
  Dark: '#705746',
  Dragon: '#6f35fc',
  Steel: '#b7b7ce',
}

export const TYPE_EMOJI = {
  Normal: '⚪',
  Fire: '🔥',
  Water: '💧',
  Grass: '🌱',
  Electric: '⚡',
  Ice: '❄️',
  Fighting: '🥊',
  Poison: '☠️',
  Ground: '⛰️',
  Flying: '🕊️',
  Psychic: '🧠',
  Bug: '🐛',
  Rock: '🪨',
  Ghost: '👻',
  Dark: '🌑',
  Dragon: '🐉',
  Steel: '⚙️',
  Typeless: '❔',
}

export const typeColor = (name) => TYPE_COLORS[name] ?? '#9aa0a6'

// Pokémon lendários / míticos (ganham selo e borda dourada).
export const LEGENDARY_IDS = [144, 145, 146, 150, 151, 384]
export const isLegendary = (pokemon) => LEGENDARY_IDS.includes(pokemon.id)

// Cores principais do Pokémon. Por padrão vêm dos tipos, mas um Pokémon
// pode definir `palette: [cor1, cor2]` (ex.: Rayquaza é verde).
export function getPalette(pokemon) {
  if (pokemon.palette) return { c1: pokemon.palette[0], c2: pokemon.palette[1] }
  const main = pokemon.types[0]?.name
  const second = pokemon.types[1]?.name ?? main
  return { c1: typeColor(main), c2: typeColor(second) }
}

// Atributos exibidos na interface (chave no JSON -> rótulo).
export const STATS = [
  { key: 'hp', label: 'HP', icon: '❤️' },
  { key: 'attack', label: 'Ataque', icon: '⚔️' },
  { key: 'defense', label: 'Defesa', icon: '🛡️' },
  { key: 'specialAttack', label: 'Atq. Especial', icon: '✨' },
  { key: 'specialDefense', label: 'Def. Especial', icon: '🔰' },
  { key: 'speed', label: 'Velocidade', icon: '💨' },
]

export const STAT_MAX = 255

export const totalStats = (pokemon) =>
  STATS.reduce((sum, s) => sum + pokemon.stats[s.key], 0)

export const formatId = (id) => `#${String(id).padStart(3, '0')}`

// Sprite oficial hospedado na PokéAPI (opcional; há fallback no componente).
export const spriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

// Animação 2D (GIF) do Pokémon, também hospedada nos sprites do PokéAPI.
export const animatedSpriteUrl = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`

// Opções de ordenação.
export const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'specialAttack', label: 'Special Attack' },
  { value: 'specialDefense', label: 'Special Defense' },
  { value: 'speed', label: 'Speed' },
]

export function sortPokemon(list, sortBy, direction) {
  const dir = direction === 'desc' ? -1 : 1
  return [...list].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name) * dir
    if (sortBy === 'id') return (a.id - b.id) * dir
    return (a.stats[sortBy] - b.stats[sortBy]) * dir || a.id - b.id
  })
}
