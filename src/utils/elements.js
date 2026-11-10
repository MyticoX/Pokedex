// Elementos decorativos de cada tipo: quais símbolos aparecem no fundo
// e como se movem. "bubble" é desenhado em CSS (não é emoji).
//
// motion:
//  rise  – sobe (chamas, bolhas, fumaça)
//  fall  – cai girando (folhas, neve, pedras)
//  drift – atravessa a tela devagar (nuvens, fantasmas, insetos)
//  flash – pisca em pontos aleatórios (raios)
//  orbit – gira em órbita ao redor do Pokémon (psíquico, dragão)
//  spin  – fica no lugar girando (engrenagens)
//  pulse – pulsa como impacto (lutador)
export const ELEMENTS = {
  Normal: { glyphs: ['⭐', '✨', '💫'], motion: 'drift' },
  Fire: { glyphs: ['🔥', '🔥', '✨', '🔥'], motion: 'rise' },
  Water: { glyphs: ['bubble', 'bubble', '💧', 'bubble', '🌊'], motion: 'rise' },
  Grass: { glyphs: ['🍃', '🌿', '🍀', '🍃'], motion: 'fall' },
  Electric: { glyphs: ['⚡', '⚡', '✨'], motion: 'flash' },
  Ice: { glyphs: ['❄️', '❄️', '💎', '✨'], motion: 'fall' },
  Fighting: { glyphs: ['💥', '🥊', '💢'], motion: 'pulse' },
  Poison: { glyphs: ['bubble', '☠️', '🧪', 'bubble'], motion: 'rise' },
  Ground: { glyphs: ['🪨', '🟤', '⛰️'], motion: 'rise' },
  Flying: { glyphs: ['☁️', '💨', '☁️', '🕊️'], motion: 'drift' },
  Psychic: { glyphs: ['🔮', '✨', '🌀', '💫'], motion: 'orbit' },
  Bug: { glyphs: ['🐛', '🍃', '🕸️', '🦋'], motion: 'drift' },
  Rock: { glyphs: ['🪨', '💎', '⛰️'], motion: 'fall' },
  Ghost: { glyphs: ['👻', '🌫️', '🕯️', '👻'], motion: 'drift' },
  Dark: { glyphs: ['🌑', '🌙', '🦇', '✨'], motion: 'drift' },
  Dragon: { glyphs: ['🐉', '🔥', '✨', '💫'], motion: 'orbit' },
  Steel: { glyphs: ['⚙️', '🔩', '✨', '⚙️'], motion: 'spin' },
  Typeless: { glyphs: ['✨', '⭐'], motion: 'drift' },
}

export const elementFor = (typeName) => ELEMENTS[typeName] ?? ELEMENTS.Normal
