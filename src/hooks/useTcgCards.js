import { useEffect, useState } from 'react'

// Busca as cartas físicas (Pokémon TCG) de um Pokémon pelo número da Pokédex.
// API pública: https://pokemontcg.io  (não exige chave para uso básico)
const API = 'https://api.pokemontcg.io/v2/cards'
const TIMEOUT_MS = 12000

// Cache em memória: evita refazer a requisição ao reabrir o mesmo Pokémon.
const cache = new Map()

async function fetchCards(id, signal) {
  const params = new URLSearchParams({
    q: `nationalPokedexNumbers:${id}`,
    pageSize: '24',
    orderBy: '-set.releaseDate',
    select: 'id,name,images,set,rarity',
  })
  const res = await fetch(`${API}?${params}`, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  return (json.data ?? []).filter((c) => c.images?.large || c.images?.small)
}

/**
 * Retorna { status: 'loading' | 'ok' | 'empty' | 'error', cards }.
 */
export default function useTcgCards(id) {
  const [state, setState] = useState({ id: null, status: 'loading', cards: [] })

  useEffect(() => {
    if (cache.has(id)) return

    const controller = new AbortController()
    let timedOut = false
    let cancelled = false
    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, TIMEOUT_MS)

    fetchCards(id, controller.signal)
      .then((cards) => {
        cache.set(id, cards)
        if (!cancelled) {
          setState({ id, status: cards.length ? 'ok' : 'empty', cards })
        }
      })
      .catch(() => {
        // Erros não entram no cache: tenta de novo na próxima abertura.
        if (!cancelled || timedOut) setState({ id, status: 'error', cards: [] })
      })
      .finally(() => clearTimeout(timer))

    return () => {
      cancelled = true
      clearTimeout(timer)
      controller.abort()
    }
  }, [id])

  const cached = cache.get(id)
  if (cached) return { status: cached.length ? 'ok' : 'empty', cards: cached }
  if (state.id !== id) return { status: 'loading', cards: [] }
  return { status: state.status, cards: state.cards }
}
